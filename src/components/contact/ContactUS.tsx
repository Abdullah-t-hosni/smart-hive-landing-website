import {useState} from 'react';
import '../styles/Contact.css';
import '../styles/ContactForm.css';


type Props = {
    content: any;
}

function ContactForm({content}: Props) {
    const [formData, setFormData] = useState({
        company: "",
        name: "",
        phone: "",
        email: "",
        projectDetails: "",
        privacy: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value, type, checked} = e.target as HTMLInputElement;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = "YOUR_GOOGLE_APPS_SCRIPT_URL"; // **REPLACE THIS WITH YOUR URL**
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        };

        fetch(url, options)
            .then((res) => res.json())
            .then((data) => console.log("Form Data Sent:", data))
            .catch((err) => console.error("Form Data Submission Error:", err));
    };

    return (
        <div className="contact-us-section container" id="contact">
            {content.image && <div className="contact-us-image">
                <img
                    src={content.image}
                    alt="SmartHive"/>
            </div>}
            <div className={content.image ? "contact-form contact-form-with-image" : "contact-form"}>
                <h2>{content.formTitle}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        {content.formFields.map((field: any, index: number) =>
                            index < 2 && <div className="form-group" key={index}>
                                <label htmlFor={field.label}>{field.label}</label>
                                <input
                                    type={field.fieldType.toLowerCase()}
                                    id={field.label}
                                    name={field.label.toLowerCase() === "company" ? "company" : "name"}
                                    placeholder={field.placeholder}
                                    value={index === 0 ? formData.company : formData.name}
                                    onChange={handleChange}
                                    required={field.required}
                                />
                            </div>)}
                    </div>
                    <div className="form-row">
                        {content.formFields.map((field: any, index: number) =>
                            index > 1 && index < content.formFields.length - 1 &&
                            <div className="form-group" key={index}>
                                <label htmlFor={field.label}>{field.label}</label>
                                <input
                                    type={field.fieldType.toLowerCase() === "phone" ? 'tel' : field.fieldType.toLowerCase()}
                                    id={field.label}
                                    name={field.fieldType.toLowerCase() === "phone" ? "phone" : "email"}
                                    placeholder={field.placeholder}
                                    value={index === 2 ? formData.phone : formData.email}
                                    onChange={handleChange}
                                    required={field.required}
                                />
                            </div>)}

                    </div>
                    <div className="form-group">
                        <label htmlFor={content.formFields[4].label}>{content.formFields[4].label}</label>
                        <textarea
                            id={content.formFields[4].label}
                            name="projectDetails"
                            placeholder={content.formFields[4].placeholder}
                            value={formData.projectDetails}
                            onChange={handleChange}
                            required={content.formFields[4].required}
                        ></textarea>
                    </div>
                    <div className="form-group checkbox-group">
                        <input
                            type="checkbox"
                            id="privacy"
                            name="privacy"
                            checked={formData.privacy}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="privacy">
                            {content.checkboxLabel}
                        </label>
                    </div>
                    <button type="submit">{content.submitButton} →</button>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;
