import React from 'react';
import { City } from '../State/RootState';

export const CitiesPane: React.FC<{ scale: number; cities: City[] }> = ({
  scale,
  cities
}) => (
  <svg
    viewBox={`-50 -50 ${scale + 100} ${scale + 100}`}
    preserveAspectRatio="true"
    style={{ maxWidth: '100%', maxHeight: '100%' }}
  >
    {cities.map(city => (
      <circle cx={city.x} cy={city.y} r="5" fill="red" />
    ))}
  </svg>
);
