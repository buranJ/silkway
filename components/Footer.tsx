import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { contacts, navigation } from "@/content/site";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image src="/logo-white.png" width={171} height={54} alt="Silk Way" />
          <p>Многопрофильный промышленно-торговый комплекс в Кыргызстане.</p>
        </div>
        <div>
          <h2>Разделы</h2>
          <nav className="footer-nav" aria-label="Навигация в подвале">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
        </div>
        <div>
          <h2>Контакты</h2>
          <div className="footer-contacts">
            {contacts.phones.map((phone) => (
              <a href={phone.href} key={phone.href}><Phone size={15} aria-hidden="true" />{phone.label}</a>
            ))}
            <a href={contacts.whatsapp} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={15} aria-hidden="true" />WhatsApp<ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="footer-location">
          <h2>Адрес</h2>
          <a
            className="footer-address"
            href={contacts.map2gis}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Открыть адрес в 2ГИС: ${contacts.address}`}
          >
            <MapPin size={17} aria-hidden="true" />
            <span className="footer-address-content">
              <span>{contacts.address}</span>
              <span className="footer-address-map">Открыть в 2ГИС <ArrowUpRight size={14} aria-hidden="true" /></span>
            </span>
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} ОсОО «Silk Way»</span>
        <span>Разработано <a href="https://itdos.dev/" target="_blank" rel="noopener noreferrer">itdos.dev</a></span>
      </div>
    </footer>
  );
}
