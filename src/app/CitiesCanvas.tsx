import React from 'react';
import { observer } from 'mobx-react-lite';
import { City } from '../algorithms/common/cities';

export const CitiesCanvas = observer<{ cities: City[]; path: City[] }>(({ cities, path }) => (
  <svg
    viewBox={`-0.05 -0.05 1.1 1.1`}
    preserveAspectRatio="xMidYMid"
    style={{ maxWidth: '100%', maxHeight: '100%' }}
  >
    {cities.map(city => (
      <circle key={city.id} cx={city.x} cy={city.y} r="0.005" fill="red" />
    ))}
    {path.map((city, i) => (
      <line
        key={city.id}
        x1={city.x}
        y1={city.y}
        x2={path[(i + 1) % path.length].x}
        y2={path[(i + 1) % path.length].y}
        strokeWidth="0.003"
        stroke="lime"
      />
    ))}
  </svg>
));