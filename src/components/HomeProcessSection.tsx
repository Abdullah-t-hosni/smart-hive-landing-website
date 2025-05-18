import "../styles/ProcessSection.css";

type Props = {
    content: any;
}

const step = (item: { title: string; image: string }, index: number) => {
    return <div className="step" key={index}>
        <img src={item.image} alt={item.title} className="step-icon" width="80" height="80"/>
        <h4 className="step-title">
            <span data-number={`0${index + 1}`}></span> {item.title}
        </h4>
    </div>
}

export function HomeProcessSection({content}: Props) {
    return content ? <section className="process w-full">
        <h3 className="process-title">{content.title}</h3>
        <h2 className="process-subtitle">{content.subtitle}</h2>
        <p className="process-description">
            {content.description}
        </p>
        <div className="steps">
            {
                content.items.map((item: any, index: number) => step(item, index))
            }
        </div>
    </section> : <></>
}
