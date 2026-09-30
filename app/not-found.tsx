import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found section-pad">
      <div className="container">
        <span className="eyebrow">Страница не найдена</span>
        <h1>Такого адреса нет</h1>
        <p>Вернитесь на главную страницу и выберите нужное направление.</p>
        <Link href="/" className="button button-primary"><ArrowLeft size={18} />На главную</Link>
      </div>
    </main>
  );
}
