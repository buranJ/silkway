# Silk Way

Корпоративный сайт индустриального парка Silk Way на Next.js 16 и TypeScript.

## Запуск

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:3000`.

## Проверки

```bash
npm run lint
npm run typecheck
npm run build
```

## Настройка формы

Скопируйте `.env.example` в `.env.local` и задайте:

- `NEXT_PUBLIC_SITE_URL` — публичный адрес сайта;
- `CONTACT_WEBHOOK_URL` — серверный endpoint, принимающий JSON с полями `name`, `phone`, `interest`, `source`.

Без `CONTACT_WEBHOOK_URL` форма сообщает, что онлайн-отправка не подключена, и показывает телефон отдела продаж.

## Структура

- `app/` — App Router, страницы, metadata и API;
- `components/` — общие компоненты интерфейса;
- `content/site.ts` — единый источник текстов, навигации и контактов;
- `public/` — оптимизированные изображения и логотипы;
- `legacy-vite-src/` — исходники старого Vite-проекта без дублирующих медиафайлов и сборки.
