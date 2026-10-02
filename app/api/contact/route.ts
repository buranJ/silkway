import { NextResponse } from "next/server";
import { z } from "zod";
import { validateContactDetails, validateContactName, validateContactPhone } from "@/lib/contact-validation";

const contactSchema = z.object({
  name: z.string().trim().refine(value => !validateContactName(value), { message: "Укажите корректное имя" }),
  phone: z.string().trim().refine(value => !validateContactPhone(value), { message: "Укажите корректный номер телефона" }),
  interest: z.string().trim().max(120).optional(),
  details: z.string().trim().max(1200).optional(),
});

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message || "Проверьте данные формы" }, { status: 400 });
  }
  if (parsed.data.interest === "Партнёрство" && validateContactDetails(parsed.data.details || "")) {
    return NextResponse.json({ message: validateContactDetails(parsed.data.details || "") }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { message: "Онлайн-отправка пока не подключена. Позвоните нам по номеру 0559 22 55 88." },
      { status: 503 },
    );
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...parsed.data, source: "silkway.kg" }),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ message: "Сервис временно недоступен. Позвоните нам напрямую." }, { status: 502 });
  }

  return NextResponse.json({ message: "Спасибо! Мы свяжемся с вами в ближайшее время." });
}
