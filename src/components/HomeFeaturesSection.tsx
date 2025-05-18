import "../styles/HomeFeatures.css";
import React, { useCallback } from 'react';

interface FeatureItem {
    title: string;
    description: string;
    image: string;
}

interface HomeFeaturesProps {
    content: {
        featureItems: FeatureItem[];
    } | null;
}

const ServiceCard: React.FC<{ item: FeatureItem; index: number }> = React.memo(({ item, index }) => {
    return (
        <div className="service" key={index}>
            <div className="content">
                <div className="service-header">
                    <img 
                        src={item.image} 
                        alt={item.title} 
                        className="service-icon" 
                        loading="lazy"
                    />
                    <h3 className="service-title">{item.title}</h3>
                </div>
                <p className="service-description">
                    {item.description}
                </p>
            </div>
        </div>
    );
});

ServiceCard.displayName = 'ServiceCard';

export const HomeFeaturesSection: React.FC<HomeFeaturesProps> = ({ content }) => {
    const renderServiceCard = useCallback((item: FeatureItem, index: number) => {
        return <ServiceCard key={index} item={item} index={index} />;
    }, []);

    if (!content) return null;

    return (
        <div className="services-wrapper">
            <section className="services w-full">
                {content.featureItems.map(renderServiceCard)}
            </section>
        </div>
    );
};
