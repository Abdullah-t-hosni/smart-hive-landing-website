import "../styles/ClientsSection.css";
import { memo } from "react";

interface ClientContent {
    title: string;
    subtitle: string;
    clientsLogos: string[];
}

type Props = {
    content: ClientContent | null;
};

const ClientLogo = memo(({ logo, title, index }: { logo: string; title: string; index: number }) => (
    <div className="client-logo-wrapper" key={index}>
        <img 
            src={logo}
            alt={`${title} - Client ${index + 1}`}
            className="client-logo"
            loading="lazy"
            onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-logo.png'; 
            }}
        />
    </div>
));

ClientLogo.displayName = 'ClientLogo';

export const HomeClientsSection = memo(({ content }: Props) => {
    if (!content) return null;

    return (
        <section className="our-clients">
            <div className="container">
                <h3 className="clients-title">{content.title}</h3>
                <h2 className="clients-subtitle">{content.subtitle}</h2>
                <div className="clients-grid">
                    {content.clientsLogos.map((logo, index) => (
                        <ClientLogo 
                            key={index}
                            logo={logo}
                            title={content.title}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
});

HomeClientsSection.displayName = 'HomeClientsSection';
