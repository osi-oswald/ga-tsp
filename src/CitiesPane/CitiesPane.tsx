import React from 'react';
import { City } from '../State/RootState';
import { observer } from 'mobx-react-lite';

export const CitiesPane = observer(({ cities, paths }: { cities: City[]; paths: City[] }) => (
  <svg
    viewBox={`-0.05 -0.05 1.1 1.1`}
    preserveAspectRatio="xMidYMid"
    style={{ maxWidth: '100%', maxHeight: '100%' }}
  >
    {cities.map(city => (
      <circle key={city.id} cx={city.x} cy={city.y} r="0.005" fill="red" />
    ))}
    {paths.map((city, i) => (
      <line
        key={city.id}
        x1={city.x}
        y1={city.y}
        x2={(paths[i === paths.length - 1 ? 0 : i + 1] || paths[0]).x}
        y2={(paths[i === paths.length - 1 ? 0 : i + 1] || paths[0]).y}
        strokeWidth="0.003"
        stroke="lime"
      />
    ))}
  </svg>
));
