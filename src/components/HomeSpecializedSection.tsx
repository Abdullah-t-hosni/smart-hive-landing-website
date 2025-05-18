import "../styles/SpecializedSection.css";
import { memo } from "react";

interface SkillItem {
    title: string;
    image: string;
}

interface SpecializedContent {
    title: string;
    subtitle: string;
    skills: SkillItem[];
}

type Props = {
    content: SpecializedContent;
}

const SkillCard = memo(({ item, index }: { item: SkillItem; index: number }) => (
    <div className="staff-item" key={index}>
        <img 
            src={item.image} 
            alt={item.title} 
            className="staff-icon" 
            width="50" 
            height="50"
            loading="lazy"
        />
        <span className="staff-title">{item.title}</span>
    </div>
));

SkillCard.displayName = 'SkillCard';

export const HomeSpecializedSection = memo(({ content }: Props) => {
    return (
        <section className="specialized-staff container">
            <h3 className="specialized-title">{content.title}</h3>
            <h2 className="specialized-subtitle">{content.subtitle}</h2>
            <div className="staff-grid">
                {content.skills.map((item, index) => (
                    <SkillCard key={index} item={item} index={index} />
                ))}
            </div>
        </section>
    );
});

HomeSpecializedSection.displayName = 'HomeSpecializedSection';
