import React from 'react';
import { observer } from 'mobx-react-lite';
import { City } from '../algorithms/common/cities';

export const CitiesCanvas = observer<{ cities: City[]; path: City[] }>(({ cities, path }) => (
  <svg
    viewBox={`-0.05 -0.05 1.1 1.1`}
    preserveAspectRatio="xMidYMid"
    style={{ maxWidth: '100%', maxHeight: '100%' }}
  >
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="2" orient="auto">
        <path d="M0,0 L0,4 L3,2 z" fill="lime" />
      </marker>
    </defs>
    {path.map((city, i) => {
      const nextCity = path[(i + 1) % path.length];
      return (
        <>
          <line
            key={city.id}
            x1={city.x}
            y1={city.y}
            x2={nextCity.x}
            y2={nextCity.y}
            strokeWidth="0.003"
            stroke="lime"
            markerEnd="url(#arrow)"
          />
        </>
      );
    })}
    {cities.map(city => (
      <circle key={city.id} cx={city.x} cy={city.y} r="0.005" fill="red" />
    ))}
    <circle cx={cities[0].x} cy={cities[0].y} r="0.003" fill="yellow" />
  </svg>
));
