const page = document.body.dataset.page;
const reviewLinks = [['home', '/', 'Главная'], ['trade', '/trade.html', 'Торговый'], ['motion', '/motion.html', 'Движение'], ['materials', '/materials.html', 'Материалы']];

document.querySelector('[data-review-shell]').innerHTML = `<div class="review-bar"><span>Этап 1 · Макет для согласования, не рабочий сайт</span><nav aria-label="Просмотр макетов">${reviewLinks.map(([key, href, label]) => `<a href="${href}"${page === key ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav></div>`;
document.querySelector('[data-site-header]').innerHTML = `<div class="site-header wrap"><a class="brand" href="/" aria-label="Silk Way — макет главной"><img src="/logo.png" width="156" height="48" alt="Silk Way"></a><nav class="desktop-nav" aria-label="Навигация макета"><a href="/#about">О парке</a><a href="/#directions">Направления</a><a href="/#territory">Территория</a><a href="/materials.html#next-pages">Сотрудничество</a><a class="header-contact" href="/#contact">Связаться ↗</a></nav><button class="menu-toggle" type="button" aria-haspopup="dialog" aria-controls="mobile-menu">Меню</button></div><dialog class="mobile-menu" id="mobile-menu" aria-label="Меню Silk Way"><div class="menu-top"><img src="/logo.png" width="138" height="42" alt="Silk Way"><button type="button" class="menu-close" aria-label="Закрыть меню">×</button></div><nav aria-label="Мобильная навигация"><a href="/">Главная</a><a href="/#directions">Направления</a><a href="/trade.html">Торговый комплекс</a><a href="/#territory">Территория</a><a href="/materials.html#next-pages">Сотрудничество</a><a href="/#contact">Контакты</a></nav><p class="source-note">Бишкек, с. Ленинское,<br>ул. Алма-Атинская, 1/3</p><a href="tel:+996559225588">0559 22 55 88</a></dialog>`;
const menu = document.querySelector('#mobile-menu');
const trigger = document.querySelector('.menu-toggle');
trigger.addEventListener('click', () => menu.showModal());
document.querySelector('.menu-close').addEventListener('click', () => menu.close());
menu.addEventListener('close', () => trigger.focus());
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.close()));

const contact = document.querySelector('[data-contact]');
if (contact) {
  contact.id = 'contact';
  contact.className = 'contact dark';
  contact.innerHTML = `<div class="wrap contact-inner"><div><span class="eyebrow">Обсудим вашу задачу</span><h2>Ваш следующий шаг — здесь.</h2></div><div class="contact-copy"><p>Расскажите, какое пространство нужно вашему бизнесу. Отдел продаж уточнит наличие и условия размещения.</p><div class="contact-links"><a class="contact-phone" href="tel:+996559225588">0559 22 55 88</a><a class="light-link" href="https://wa.me/996559225588" target="_blank" rel="noreferrer">WhatsApp <span aria-hidden="true">↗</span></a></div><p class="source-note">В макете формы отправки нет. Номер и WhatsApp взяты из текущего проекта; ссылки открывают реальные приложения.</p></div></div>`;
}
document.querySelector('[data-site-footer]').innerHTML = `<div class="site-footer wrap"><img src="/logo.png" width="115" height="36" alt="Silk Way"><p>Кыргызская Республика, г. Бишкек,<br>с. Ленинское, ул. Алма-Атинская, 1/3</p><p>Проектная концепция · сентябрь 2026<br>* Данные из исходного сайта, не подтверждение текущего статуса.</p></div>`;

const frames = {
  arrival: { image: 'ren1-web.jpg', alt: 'Проектный общий вид Silk Way', caption: 'Исходный рендер территории, без сгенерированной архитектуры', label: 'Первое впечатление', title: 'Архитектура сразу.', desktop: 'Текст доступен сразу. Изображение раскрывается один раз за 600–800 мс. Нет заставки и обязательного пролёта перед содержимым.', mobile: 'Крупный спокойный кадр, обычная прокрутка. Не расходуем WebGL на эффект наклона плоской фотографии.' },
  overview: { image: 'ren3-web.jpg', alt: 'Генеральный план Silk Way сверху', caption: 'Опорный вид сверху. Границы зон ещё требуют согласования.', label: 'Самостоятельный блок территории', title: 'Весь комплекс перед вами.', desktop: 'После блока направлений — необязательный интерактивный генплан. До готовности WebGL остаётся этот исходный кадр. Вид сверху и общий ракурс доступны кнопками.', mobile: 'Сначала план, затем крупный выбор направления. Короткое объяснение, без заголовка на половину экрана и мелких подписей поверх корпусов.' },
  focus: { image: 'ren2-web.jpg', alt: 'Передние EXPO-корпуса Silk Way на проектном рендере', caption: 'Референс ракурса приближения, не готовая новая 3D-модель.', label: 'Осознанный выбор', title: 'Камера следует за задачей.', desktop: 'Выбор направления подсвечивает подтверждённую зону и плавно переводит камеру к ней. Рядом появляются исходное изображение и факты. Новое нажатие отменяет предыдущий перелёт.', mobile: 'Выбор касанием. Карточка находится под сценой и не перекрывает её. Вертикальный свайп продолжает прокручивать страницу, а не вращает макет.' },
  detail: { image: 'sa-1.png', alt: 'Исходное изображение торгового комплекса', caption: 'Превью 375 px. Для полноэкранного перехода нужен крупный исходник.', label: 'Из обзора — к подробностям', title: 'Не потерять выбранный объект.', desktop: 'Ссылка ведёт на страницу направления. Сохраняем визуальную связь через изображение и название. Переход короткий; история браузера и прямые ссылки остаются рабочими.', mobile: 'Без тяжёлого морфинга. Обычный переход, ясный заголовок и полезные параметры. Возврат восстанавливает выбранную зону, если это поддерживает навигационный сценарий.' }
};
document.querySelectorAll('[data-frame]').forEach(button => button.addEventListener('click', () => {
  const frame = frames[button.dataset.frame];
  document.querySelectorAll('[data-frame]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  const image = document.querySelector('#story-image');
  image.src = `/assets/photo/${frame.image}`;
  image.alt = frame.alt;
  image.style.objectFit = button.dataset.frame === 'detail' ? 'contain' : 'cover';
  if (button.dataset.frame === 'detail') { image.style.maxWidth = '375px'; image.style.marginInline = 'auto'; } else { image.style.maxWidth = ''; image.style.marginInline = ''; }
  document.querySelector('#story-caption').textContent = frame.caption;
  document.querySelector('#story-label').textContent = frame.label;
  document.querySelector('#story-title').textContent = frame.title;
  document.querySelector('#story-desktop').textContent = `Компьютер. ${frame.desktop}`;
  document.querySelector('#story-mobile').textContent = `Телефон. ${frame.mobile}`;
}));

const assets = [
  ['hero-1.jpg','3840 × 2160','Фасад Silk Way'],
  ['ren1.jpg','7680 × 4320','Общая перспектива территории','ren1-web.jpg'],
  ['ren2.jpg','7680 × 4320','EXPO и территория; не жилые дома','ren2-web.jpg'],
  ['ren3.jpg','6876 × 4248','Проектный генплан сверху','ren3-web.jpg'],
  ['sa-1.png','375 × 204','Торговый визуал'],['sa-2.png','375 × 204','Тканевый визуал'],['st1.png','375 × 204','Промышленный визуал'],
  ['sa2.png','375 × 231','Торговая галерея'],['blok1.png','375 × 216','Номер корпуса требует сверки'],['blok2.png','375 × 197','Номер корпуса требует сверки'],
  ['tex1.png','375 × 204','Тканевая галерея'],['til1.png','375 × 204','Двухуровневые помещения'],['til2.png','375 × 208','Двухуровневые помещения'],
  ['t1.png','375 × 204','Промышленная галерея'],['project1.png','375 × 231','Общий вид, маленький исходник'],['benefits1.png','375 × 291','Материал старого блока преимуществ'],
  ['comf-1.png','375 × 195','Из старого блока медцентра'],['comfort2.png','375 × 199','Назначение требует сверки'],
  ['r1.png','101 × 87','Старый логотип, название не указано'],['r2.png','101 × 87','Старый логотип, название не указано'],['r3.png','101 × 87','Старый логотип, название не указано']
];
const grid = document.querySelector('#asset-grid');
if (grid) assets.forEach(([file, size, description, preview]) => {
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = `/assets/photo/${preview || file}`;
  img.alt = description;
  img.loading = 'lazy';
  const caption = document.createElement('figcaption');
  const name = document.createElement('strong'); name.textContent = file;
  const dimensions = document.createElement('span'); dimensions.textContent = size;
  const text = document.createElement('span'); text.textContent = description;
  caption.append(name, dimensions, text); figure.append(img, caption); grid.append(figure);
});
