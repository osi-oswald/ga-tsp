import React from 'react';
import { City } from '../State/RootState';
import { observer } from 'mobx-react-lite';

export const CitiesPane = observer(
  ({ scale, cities }: { scale: number; cities: City[] }) => (
    <svg
      viewBox={`-50 -50 ${scale + 100} ${scale + 100}`}
      preserveAspectRatio="true"
      style={{ maxWidth: '100%', maxHeight: '100%' }}
    >
      {cities.map(city => (
        <circle cx={city.x} cy={city.y} r="5" fill="red" />
      ))}
    </svg>
  )
);
