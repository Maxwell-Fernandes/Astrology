import { createBrowserRouter } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { NatalChart, HoraryChart } from '@/pages/ChartInput';
import { ChartResults } from '@/pages/ChartResults';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/natal-chart',
    element: <NatalChart />,
  },
  {
    path: '/horary-chart',
    element: <HoraryChart />,
  },
  {
    path: '/chart/results',
    element: <ChartResults />,
  },
]);
