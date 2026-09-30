import { ContactForm } from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { contacts } from "@/content/site";

type ContactBandProps = {
  title?: string;
  text?: string;
};

export function ContactBand({
  title = "Расскажем о комплексе подробнее",
  text = "Оставьте номер телефона или свяжитесь с отделом продаж напрямую.",
}: ContactBandProps) {
  return (
    <section className="contact-band section-pad" id="contact">
      <div className="container contact-band-grid">
        <div data-reveal>
          <span className="eyebrow light">Связь с нами</span>
          <h2>{title}</h2>
          <p>{text}</p>
          <a className="whatsapp-link" href={contacts.whatsapp} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={19} aria-hidden="true" />Написать в WhatsApp
          </a>
        </div>
        <div data-reveal><ContactForm compact /></div>
      </div>
    </section>
  );
}
