import React from 'react';
import { ValueItem as ValueItemType } from '../../types/about';

interface ValueItemProps {
  item: ValueItemType;
}

export const ValueItem: React.FC<ValueItemProps> = React.memo(({ item }) => {
  return (
    <div className="value-item">
      <h2>{item.title}</h2>
      <p>{item.subtitle}</p>
    </div>
  );
});

ValueItem.displayName = 'ValueItem'; 