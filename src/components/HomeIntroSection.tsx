import "../styles/HomeIntroSection.css";

type Props = {
    content: any;
};

export function HomeIntroSection({content}: Props) {
    return content ? <section className="hero-section container">
        <div className="hero-content">
            <h1 className="hero-title">
                {content.title}
            </h1>
            <p className="hero-description">
                {content.description}
            </p>
            {content.buttonLink &&
            <button
                className="hero-cta"
                type="button"
                aria-label="Start building a development team">
                {content.buttonLink} →
            </button>
        }
        </div>
        <div className="hero-image">
            <img src={content.image} alt="Hero Image" loading="lazy"/>
        </div>
    </section> : <></>
}
