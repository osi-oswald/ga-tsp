import React from 'react';
import { City } from '../State/RootState';
import { observer } from 'mobx-react-lite';

export const CitiesPane = observer(
  ({
    scale,
    cities,
    paths
  }: {
    scale: number;
    cities: City[];
    paths: City[];
  }) => (
    <svg
      viewBox={`-50 -50 ${scale + 100} ${scale + 100}`}
      preserveAspectRatio="xMidYMid"
      style={{ maxWidth: '100%', maxHeight: '100%' }}
    >
      {cities.map(city => (
        <circle key={city.id} cx={city.x} cy={city.y} r="5" fill="red" />
      ))}
      {paths.map((city, i) => (
        <line
          key={city.id}
          x1={city.x}
          y1={city.y}
          x2={(paths[i === paths.length - 1 ? 0 : i + 1] || paths[0]).x}
          y2={(paths[i === paths.length - 1 ? 0 : i + 1] || paths[0]).y}
          strokeWidth="3"
          stroke="lime"
        />
      ))}
    </svg>
  )
);
