from typing import Optional
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from concurrent.futures import ThreadPoolExecutor
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import json
from vedicastro import VedicAstro
try:
    from vedicastro import horary_chart, utils
except Exception as e:
    print(f"Warning: Could not import horary_chart module: {e}")

app = FastAPI()

class ChartInput(BaseModel):
    year: int
    month: int
    day: int
    hour: int
    minute: int
    second: int
    utc: str
    latitude: float
    longitude: float
    ayanamsa: str = "Lahiri"
    house_system: str = "Equal"
    return_style: Optional[str] = None

class HoraryChartInput(BaseModel):
    horary_number: int
    year: int
    month: int
    day: int
    hour: int
    minute: int
    second: int
    utc: str
    latitude: float
    longitude: float
    ayanamsa: str = "Krishnamurti"
    house_system: str = "Placidus"
    return_style: Optional[str] = None

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
async def read_root():
    return {"message": "Welcome to VedicAstro FastAPI Service!",
            "info": "Visit http://127.0.0.1:8088/docs to test the API functions"}


@app.post("/get_all_horoscope_data")
async def get_chart_data(input: ChartInput):
    """
    Generates all data for a given time and location, based on the selected ayanamsa & house system
    """
    # Convert UTC offset string (e.g., "+05:30") to hours for timedelta
    # Parse the offset string
    utc_offset = input.utc
    sign = 1 if utc_offset[0] == '+' else -1
    hours, minutes = map(int, utc_offset[1:].split(':'))
    offset_hours = sign * (hours + minutes / 60.0)

    # Create local datetime
    local_time = datetime(input.year, input.month, input.day,
                         input.hour, input.minute, input.second)

    # Convert to UTC by subtracting the offset
    utc_time = local_time - timedelta(hours=offset_hours)

    # VedicAstro VedicHoroscopeData with UTC time and tz=None
    horoscope = VedicAstro.VedicHoroscopeData(utc_time.year, utc_time.month, utc_time.day,
                                              utc_time.hour, utc_time.minute, utc_time.second,
                                              input.latitude, input.longitude,
                                              None,  # timezone - None means UTC
                                              input.ayanamsa, input.house_system)
    chart = horoscope.generate_chart()
    
    planets_data = horoscope.get_planets_data_from_chart(chart)
    houses_data = horoscope.get_houses_data_from_chart(chart)
    planet_significators = horoscope.get_planet_wise_significators(planets_data, houses_data)
    planetary_aspects = horoscope.get_planetary_aspects(chart)
    house_significators = horoscope.get_house_wise_significators(planets_data, houses_data)
    vimshottari_dasa_table = horoscope.compute_vimshottari_dasa(chart)

    # Temporarily disable consolidated_chart_data due to polars compatibility issue
    # consolidated_chart_data = horoscope.get_consolidated_chart_data(planets_data=planets_data,
    #                                                                 houses_data=houses_data,
    #                                                                 return_style = input.return_style)

    # Map the data to frontend-expected format
    planets_mapped = []
    for planet in planets_data:
        p_dict = planet._asdict()
        planets_mapped.append({
            "name": p_dict.get("Object"),
            "sign": p_dict.get("Rasi"),
            "sign_degree": p_dict.get("SignLonDecDeg"),
            "house": p_dict.get("HouseNr"),
            "retrograde": p_dict.get("isRetroGrade") or False,
            "nakshatra": p_dict.get("Nakshatra"),
            "rasi_lord": p_dict.get("RasiLord"),
            "nakshatra_lord": p_dict.get("NakshatraLord"),
        })

    houses_mapped = []
    for house in houses_data:
        h_dict = house._asdict()
        houses_mapped.append({
            "house_number": h_dict.get("House"),
            "sign": h_dict.get("Rasi"),
            "cusp_degree": h_dict.get("cuspDecDeg"),
            "lord": h_dict.get("Lord"),
        })

    response_data = {
        "planets_data": planets_mapped,
        "houses_data": houses_mapped,
        "planet_significators": planet_significators,
        "planetary_aspects": planetary_aspects,
        "house_significators": house_significators,
        "vimshottari_dasa_table": vimshottari_dasa_table,
    }

    # Return with proper UTF-8 encoding
    return JSONResponse(
        content=response_data,
        media_type="application/json; charset=utf-8"
    )

@app.post("/get_all_horary_data")
async def get_horary_data(input: HoraryChartInput):
    """
    Generates all data for a given horary number, time and location as per KP Astrology system
    """
    matched_time, vhd_hora_houses_chart, houses_data  = horary_chart.find_exact_ascendant_time(input.year, input.month, input.day, input.utc, input.latitude, input.longitude, input.horary_number, input.ayanamsa)
    vhd_hora = VedicAstro.VedicHoroscopeData(input.year, input.month, input.day, 
                                              input.hour, input.minute, input.second,
                                              input.utc, input.latitude, input.longitude, 
                                              input.ayanamsa, input.house_system)
    
    vhd_hora_planets_chart = vhd_hora.generate_chart()
    planets_data = vhd_hora.get_planets_data_from_chart(vhd_hora_planets_chart, vhd_hora_houses_chart)
    planet_significators = vhd_hora.get_planet_wise_significators(planets_data, houses_data)
    planetary_aspects = vhd_hora.get_planetary_aspects(vhd_hora_planets_chart)
    house_significators = vhd_hora.get_house_wise_significators(planets_data, houses_data)
    vimshottari_dasa_table = vhd_hora.compute_vimshottari_dasa(vhd_hora_planets_chart)
    consolidated_chart_data = vhd_hora.get_consolidated_chart_data(planets_data=planets_data, 
                                                                    houses_data=houses_data,
                                                                    return_style = input.return_style)

    return {
        "planets_data": [planet._asdict() for planet in planets_data],
        "houses_data": [house._asdict() for house in houses_data],
        "planet_significators": planet_significators,
        "planetary_aspects": planetary_aspects,
        "house_significators": house_significators,
        "vimshottari_dasa_table": vimshottari_dasa_table,
        "consolidated_chart_data": consolidated_chart_data
    }