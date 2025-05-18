import React from 'react';
import { BenefitItem } from '../../types/about';

interface BenefitCardProps {
  item: BenefitItem;
}

export const BenefitCard: React.FC<BenefitCardProps> = React.memo(({ item }) => {
  return (
    <div className="benefit-card">
      <span className="benefit-text-icon">
        <span className="benefit-icon-wrapper">
          <img
            src={item.image}
            alt={`${item.title} icon`}
            className="benefit-icon"
            width="50"
            height="50"
            aria-hidden="true"
          />
        </span>
        <h3>{item.title}</h3>
      </span>
      <p className="benefit-card__text">{item.description}</p>
    </div>
  );
});

BenefitCard.displayName = 'BenefitCard'; 