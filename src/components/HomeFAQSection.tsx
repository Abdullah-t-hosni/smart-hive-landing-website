import {useState} from "react";
import "../styles/FAQsSection.css";

interface FAQItem {
    title: string;
    description: string;
}

interface FAQContent {
    title: string;
    subtitle: string;
    questionsList: FAQItem[];
}

type Props = {
    content: FAQContent;
};

export function HomeFAQSection({content}: Props) {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [allFaqsOpen, setAllFaqsOpen] = useState(false);
    const [closedFaqs, setClosedFaqs] = useState<number[]>([]);

    const toggleFaq = (index: number) => {
        if (allFaqsOpen) {
            if (closedFaqs.includes(index)) {
                setClosedFaqs(closedFaqs.filter(faqIndex => faqIndex !== index));
            } else {
                setClosedFaqs([...closedFaqs, index]);
            }
        } else {
            setActiveFaq(activeFaq === index ? null : index);
        }
    };

    const openAllFaqs = () => {
        setAllFaqsOpen(true);
        setActiveFaq(null);
        setClosedFaqs([]);
    };

    const closeAllFaqs = () => {
        setAllFaqsOpen(false);
        setClosedFaqs([]);
    };

    const isFaqOpen = (index: number) => {
        if (allFaqsOpen) {
            return !closedFaqs.includes(index);
        }
        return activeFaq === index;
    };

    return content ?
        <section className="faq container">
            <div className="faq-container">
                <h2>{content.title}</h2>
                <p>{content.subtitle}</p>
                <div className="faq-grid">
                    {content.questionsList.map((item: FAQItem, index: number) => (
                        <div
                            className={`faq-item ${isFaqOpen(index) ? "active" : ""}`}
                            key={index}
                            id={`faq-${index}`}>
                            <div className="faq-question"
                                 onClick={() => toggleFaq(index)}>
                                <span className="faq-number">0{index + 1}</span>
                                <h3>{item.title}</h3>
                                <span className="faq-toggle">
                                    {isFaqOpen(index) ? "−" : "+"}
                                </span>
                            </div>
                            <div className="faq-answer">
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={allFaqsOpen ? closeAllFaqs : openAllFaqs}>
                    {allFaqsOpen ? "Close All FAQs" : "Load All FAQs"}
                </button>
            </div>
        </section> : null;
}
