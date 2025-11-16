import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { ChartData } from '@/types/chart';
import type { PlanetData, HoraryChartInput } from '@/api/types';

// Style Guide Colors (converted to RGB)
const COLORS = {
  primaryDark: [10, 10, 10] as [number, number, number],
  textPrimary: [255, 255, 255] as [number, number, number],
  textSecondary: [184, 184, 184] as [number, number, number],
  accentGold: [212, 175, 55] as [number, number, number],
  accentPurple: [139, 92, 246] as [number, number, number],
  surfaceElevated: [26, 26, 26] as [number, number, number],
  borderSubtle: [51, 51, 51] as [number, number, number],
};

export const exportChartToPDF = async (chartData: ChartData) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;
    let yPosition = margin;

    // Set background color (dark theme)
    pdf.setFillColor(...COLORS.primaryDark);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Helper function to add a new page if needed
    const checkAddPage = (requiredHeight: number) => {
      if (yPosition + requiredHeight > pageHeight - margin) {
        pdf.addPage();
        // Set background for new page
        pdf.setFillColor(...COLORS.primaryDark);
        pdf.rect(0, 0, pageWidth, pageHeight, 'F');
        yPosition = margin;
        return true;
      }
      return false;
    };

    // Helper function to add decorative line (Style Guide: border-subtle)
    const addDecorativeLine = () => {
      pdf.setDrawColor(...COLORS.borderSubtle);
      pdf.setLineWidth(0.5);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 5;
    };

    // Add main title (Style Guide: Cinzel font family, text-6xl equivalent)
    pdf.setTextColor(...COLORS.textPrimary);
    pdf.setFontSize(32);
    pdf.setFont('helvetica', 'bold'); // Using helvetica as substitute for Cinzel
    const title = `${chartData.type === 'natal' ? 'NATAL' : 'HORARY'} CHART`;
    const titleWidth = pdf.getTextWidth(title);
    pdf.text(title, (pageWidth - titleWidth) / 2, yPosition);
    yPosition += 8;

    // Add decorative line
    addDecorativeLine();
    yPosition += 3;

    // Personal Information Section (if name exists)
    if (chartData.input?.name) {
      checkAddPage(30);

      // Section header with accent color
      pdf.setTextColor(...COLORS.accentPurple);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PERSONAL INFORMATION', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(...COLORS.textSecondary);

      // Name
      pdf.setTextColor(...COLORS.accentGold);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Name:', margin + 5, yPosition);
      pdf.setTextColor(...COLORS.textPrimary);
      pdf.setFont('helvetica', 'normal');
      pdf.text(chartData.input?.name, margin + 25, yPosition);
      yPosition += 6;

      // Place of Birth (if available)
      if (chartData.input?.place_of_birth) {
        pdf.setTextColor(...COLORS.accentGold);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Place of Birth:', margin + 5, yPosition);
        pdf.setTextColor(...COLORS.textPrimary);
        pdf.setFont('helvetica', 'normal');
        pdf.text(chartData.input?.place_of_birth, margin + 35, yPosition);
        yPosition += 6;
      }

      yPosition += 5;
      addDecorativeLine();
      yPosition += 3;
    }

    // Birth Details Section
    checkAddPage(40);

    pdf.setTextColor(...COLORS.accentPurple);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('BIRTH DETAILS', margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...COLORS.textSecondary);

    const birthDetails = [
      {
        label: 'Date:',
        value: `${String(chartData.input?.day).padStart(2, '0')}/${String(chartData.input?.month).padStart(2, '0')}/${chartData.input?.year}`,
      },
      {
        label: 'Time:',
        value: `${String(chartData.input?.hour).padStart(2, '0')}:${String(chartData.input?.minute).padStart(2, '0')}:${String(chartData.input?.second).padStart(2, '0')}`,
      },
      {
        label: 'Timezone:',
        value: chartData.input?.utc,
      },
      {
        label: 'Coordinates:',
        value: `${chartData.input?.latitude.toFixed(4)}°, ${chartData.input?.longitude.toFixed(4)}°`,
      },
      {
        label: 'Ayanamsa:',
        value: chartData.input?.ayanamsa,
      },
      {
        label: 'House System:',
        value: chartData.input?.house_system,
      },
    ];

    if (chartData.type === 'horary' && chartData.input && 'horary_number' in chartData.input) {
      const horaryInput = chartData.input as HoraryChartInput;
      birthDetails.push({
        label: 'Horary Number:',
        value: horaryInput.horary_number.toString(),
      });
    }

    birthDetails.forEach((detail) => {
      checkAddPage(6);
      pdf.setTextColor(...COLORS.accentGold);
      pdf.setFont('helvetica', 'bold');
      pdf.text(detail.label, margin + 5, yPosition);
      pdf.setTextColor(...COLORS.textPrimary);
      pdf.setFont('helvetica', 'normal');
      pdf.text(detail.value || '', margin + 35, yPosition);
      yPosition += 6;
    });

    yPosition += 5;
    addDecorativeLine();
    yPosition += 5;

    // Capture and add chart wheels
    const chartWheelElement = document.querySelector('.chart-wheel-container');
    if (chartWheelElement) {
      checkAddPage(120);

      pdf.setTextColor(...COLORS.accentPurple);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('CHART WHEELS', margin, yPosition);
      yPosition += 10;

      try {
        const canvas = await html2canvas(chartWheelElement as HTMLElement, {
          scale: 2,
          backgroundColor: '#0a0a0a',
          logging: false,
          ignoreElements: (element) => {
            // Skip elements that might have unsupported color formats
            const computedStyle = window.getComputedStyle(element);
            const color = computedStyle.color;
            const bgColor = computedStyle.backgroundColor;
            // Check if oklch or other unsupported formats are used
            if (color?.includes('oklch') || bgColor?.includes('oklch')) {
              return true;
            }
            return false;
          },
          onclone: (clonedDoc) => {
            // Convert any oklch colors to rgb in the cloned document
            const allElements = clonedDoc.querySelectorAll('*');
            allElements.forEach((el) => {
              const htmlEl = el as HTMLElement;
              const style = window.getComputedStyle(htmlEl);

              // Replace oklch with fallback colors
              if (style.color?.includes('oklch')) {
                htmlEl.style.color = '#ffffff'; // fallback to white
              }
              if (style.backgroundColor?.includes('oklch')) {
                htmlEl.style.backgroundColor = '#1f2937'; // fallback to gray
              }
              if (style.borderColor?.includes('oklch')) {
                htmlEl.style.borderColor = '#333333'; // fallback to gray
              }
            });
          },
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - 2 * margin;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (yPosition + imgHeight > pageHeight - margin) {
          pdf.addPage();
          pdf.setFillColor(...COLORS.primaryDark);
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
          yPosition = margin;
        }

        pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
        yPosition += imgHeight + 10;
      } catch (error) {
        console.error('Error capturing chart wheel:', error);
      }
    }

    // Add Planets Table
    if (chartData.data.planets_data) {
      checkAddPage(20);
      pdf.addPage();
      pdf.setFillColor(...COLORS.primaryDark);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      yPosition = margin;

      pdf.setTextColor(...COLORS.accentPurple);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PLANETARY POSITIONS', margin, yPosition);
      yPosition += 10;

      const planetsTableData = chartData.data.planets_data.map((planet: PlanetData) => [
        planet.name || 'N/A',
        planet.sign || 'N/A',
        planet.rasi_lord || 'N/A',
        planet.sign_degree ? `${planet.sign_degree.toFixed(2)}°` : 'N/A',
        planet.nakshatra || 'N/A',
        planet.nakshatra_lord || 'N/A',
        planet.house ? planet.house.toString() : 'N/A',
        planet.retrograde ? 'R' : 'D',
      ]);

      drawStyledTable(
        pdf,
        ['Planet', 'Sign', 'Sign Lord', 'Degree', 'Nakshatra', 'Nak. Lord', 'House', 'Status'],
        planetsTableData,
        margin,
        yPosition,
        pageWidth - 2 * margin
      );

      yPosition += (planetsTableData.length + 2) * 7 + 10;
    }

    // Add Houses Table
    if (chartData.data.houses_data) {
      checkAddPage(20);
      pdf.addPage();
      pdf.setFillColor(...COLORS.primaryDark);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      yPosition = margin;

      pdf.setTextColor(...COLORS.accentPurple);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('HOUSE CUSPS', margin, yPosition);
      yPosition += 10;

      const housesTableData = chartData.data.houses_data.map((house: any) => [
        house.house_number ? house.house_number.toString() : 'N/A',
        house.sign || 'N/A',
        house.cusp_degree ? `${house.cusp_degree.toFixed(2)}°` : 'N/A',
        house.lord || 'N/A',
      ]);

      drawStyledTable(
        pdf,
        ['House', 'Sign', 'Cusp Degree', 'Lord'],
        housesTableData,
        margin,
        yPosition,
        pageWidth - 2 * margin
      );

      yPosition += (housesTableData.length + 2) * 7 + 10;
    }

    // Add Vimshottari Dasa Table
    if (chartData.data.vimshottari_dasa_table) {
      checkAddPage(20);
      pdf.addPage();
      pdf.setFillColor(...COLORS.primaryDark);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      yPosition = margin;

      pdf.setTextColor(...COLORS.accentPurple);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('VIMSHOTTARI DASA PERIODS', margin, yPosition);
      yPosition += 10;

      const dasaTableData = Object.entries(chartData.data.vimshottari_dasa_table).map(
        ([planet, period]: [string, any]) => [
          planet,
          period.start_date || 'N/A',
          period.end_date || 'N/A',
          (period.duration || period.years || 'N/A').toString(),
        ]
      );

      drawStyledTable(
        pdf,
        ['Planet', 'Start Date', 'End Date', 'Duration (Years)'],
        dasaTableData,
        margin,
        yPosition,
        pageWidth - 2 * margin
      );

      yPosition += (dasaTableData.length + 2) * 7 + 10;
    }

    // Add Planetary Aspects
    if (chartData.data.planetary_aspects && Array.isArray(chartData.data.planetary_aspects) && chartData.data.planetary_aspects.length > 0) {
      checkAddPage(20);
      pdf.addPage();
      pdf.setFillColor(...COLORS.primaryDark);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      yPosition = margin;

      pdf.setTextColor(...COLORS.accentPurple);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PLANETARY ASPECTS', margin, yPosition);
      yPosition += 10;

      const aspectsTableData = chartData.data.planetary_aspects.map((aspect: any) => [
        aspect.P1 || aspect.planet1 || aspect.from_planet,
        aspect.AspectType || aspect.aspect_type || aspect.aspect,
        aspect.P2 || aspect.planet2 || aspect.to_planet,
        aspect.AspectOrb
          ? `${Number(aspect.AspectOrb).toFixed(2)}°`
          : aspect.orb
          ? `${Number(aspect.orb).toFixed(2)}°`
          : 'N/A',
      ]);

      drawStyledTable(
        pdf,
        ['Planet 1', 'Aspect Type', 'Planet 2', 'Orb'],
        aspectsTableData,
        margin,
        yPosition,
        pageWidth - 2 * margin
      );
    }

    // Add Planet Significators
    if (chartData.data.planet_significators) {
      pdf.addPage();
      pdf.setFillColor(...COLORS.primaryDark);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      yPosition = margin;

      pdf.setTextColor(...COLORS.accentPurple);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('PLANET SIGNIFICATORS (KP SYSTEM)', margin, yPosition);
      yPosition += 10;

      const planetSigTableData = Object.entries(chartData.data.planet_significators).map(
        ([planet, houses]: [string, any]) => [planet, Array.isArray(houses) ? houses.join(', ') : String(houses)]
      );

      drawStyledTable(
        pdf,
        ['Planet', 'Signifies Houses'],
        planetSigTableData,
        margin,
        yPosition,
        pageWidth - 2 * margin
      );
    }

    // Add House Significators
    if (chartData.data.house_significators) {
      pdf.addPage();
      pdf.setFillColor(...COLORS.primaryDark);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      yPosition = margin;

      pdf.setTextColor(...COLORS.accentPurple);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('HOUSE SIGNIFICATORS (KP SYSTEM)', margin, yPosition);
      yPosition += 10;

      const houseSigTableData = Object.entries(chartData.data.house_significators).map(
        ([house, planets]: [string, any]) => [
          `House ${house}`,
          Array.isArray(planets) ? planets.join(', ') : String(planets),
        ]
      );

      drawStyledTable(
        pdf,
        ['House', 'Significator Planets'],
        houseSigTableData,
        margin,
        yPosition,
        pageWidth - 2 * margin
      );
    }

    // Add footer on last page
    pdf.setFontSize(8);
    pdf.setTextColor(...COLORS.textSecondary);
    pdf.setFont('helvetica', 'italic');
    const footerText = `Generated by Bobo Astrologer - ${new Date().toLocaleDateString()}`;
    const footerWidth = pdf.getTextWidth(footerText);
    pdf.text(footerText, (pageWidth - footerWidth) / 2, pageHeight - 10);

    // Save the PDF
    const fileName = `${chartData.type}_chart_${chartData.input?.name ? chartData.input?.name.replace(/\s+/g, '_') : 'chart'}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

    return { success: true, fileName };
  } catch (error) {
    console.error('Error generating PDF:', error);
    return { success: false, error };
  }
};

// Helper function to draw styled tables following the style guide
function drawStyledTable(
  pdf: jsPDF,
  headers: string[],
  data: string[][],
  x: number,
  y: number,
  width: number
) {
  const columnWidth = width / headers.length;
  const rowHeight = 7;

  // Draw header (Style Guide: accent-purple background)
  pdf.setFillColor(...COLORS.accentPurple);
  pdf.rect(x, y, width, rowHeight, 'F');
  pdf.setTextColor(...COLORS.textPrimary);
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');

  headers.forEach((header, i) => {
    pdf.text(header, x + i * columnWidth + 2, y + 5, { maxWidth: columnWidth - 4 });
  });

  // Draw rows (Style Guide: alternate surface colors)
  pdf.setTextColor(...COLORS.textSecondary);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);

  data.forEach((row, rowIndex) => {
    const rowY = y + (rowIndex + 1) * rowHeight;

    // Alternate row colors (Style Guide: surface-elevated / surface-hover)
    if (rowIndex % 2 === 0) {
      pdf.setFillColor(...COLORS.surfaceElevated);
      pdf.rect(x, rowY, width, rowHeight, 'F');
    }

    row.forEach((cell, colIndex) => {
      const cellText = String(cell || '');
      pdf.text(cellText, x + colIndex * columnWidth + 2, rowY + 5, { maxWidth: columnWidth - 4 });
    });
  });

  // Draw borders (Style Guide: border-subtle)
  pdf.setDrawColor(...COLORS.borderSubtle);
  pdf.setLineWidth(0.3);

  // Horizontal lines
  for (let i = 0; i <= data.length + 1; i++) {
    pdf.line(x, y + i * rowHeight, x + width, y + i * rowHeight);
  }

  // Vertical lines
  for (let i = 0; i <= headers.length; i++) {
    pdf.line(x + i * columnWidth, y, x + i * columnWidth, y + (data.length + 1) * rowHeight);
  }
}
