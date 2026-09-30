"use client";

import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { validateContactName, validateContactPhone } from "@/lib/contact-validation";

type FormStatus = "idle" | "loading" | "success" | "error";
const interests = ["Торговый комплекс", "Тканевый комплекс", "Промышленный комплекс", "Жилой комплекс", "Партнёрство"];

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [touched, setTouched] = useState({ name: false, phone: false });
  const [submitted, setSubmitted] = useState(false);
  const nameId = compact ? "name-compact" : "name";
  const phoneId = compact ? "phone-compact" : "phone";
  const nameError = submitted || touched.name ? validateContactName(name) : null;
  const phoneError = submitted || touched.phone ? validateContactPhone(phone) : null;
  const interestError = !compact && submitted && !interest ? "Выберите направление" : null;

  function clearFeedback() {
    if (status !== "idle") setStatus("idle");
    if (message) setMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitted(true);
    const invalidField = validateContactName(name) ? "name" : validateContactPhone(phone) ? "phone" : !compact && !interest ? "interest" : null;
    if (invalidField) {
      form.querySelector<HTMLInputElement>(`[name="${invalidField}"]`)?.focus();
      return;
    }
    setStatus("loading");
    setMessage("");
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Не удалось отправить заявку");
      setStatus("success");
      setMessage(result.message || "Заявка отправлена");
      setName("");
      setPhone("");
      setInterest("");
      setTouched({ name: false, phone: false });
      setSubmitted(false);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Не удалось отправить заявку");
    }
  }

  return (
    <form className={`contact-form ${compact ? "is-compact" : ""}`} onSubmit={handleSubmit} noValidate>
      <div className={`form-field ${nameError ? "is-invalid" : ""}`}>
        <label htmlFor={nameId}>Ваше имя</label>
        <input id={nameId} name="name" type="text" autoComplete="name" placeholder="Как к вам обращаться" required maxLength={80} value={name} onChange={event => { setName(event.target.value); clearFeedback(); }} onBlur={() => setTouched(current => ({ ...current, name: true }))} aria-invalid={!!nameError} aria-describedby={nameError ? `${nameId}-error` : undefined} />
        {nameError && <p className="form-field-error" id={`${nameId}-error`}>{nameError}</p>}
      </div>
      <div className={`form-field ${phoneError ? "is-invalid" : ""}`}>
        <label htmlFor={phoneId}>Номер телефона</label>
        <input id={phoneId} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+996 555 123 456" required maxLength={30} value={phone} onChange={event => { setPhone(event.target.value); clearFeedback(); }} onBlur={() => setTouched(current => ({ ...current, phone: true }))} aria-invalid={!!phoneError} aria-describedby={phoneError ? `${phoneId}-error` : undefined} />
        {phoneError && <p className="form-field-error" id={`${phoneId}-error`}>{phoneError}</p>}
      </div>
      {!compact && (
        <fieldset className={`form-interests form-field-wide ${interestError ? "is-invalid" : ""}`} aria-describedby={interestError ? "interest-error" : undefined}>
          <legend>Что вас интересует</legend>
          <div className="form-interest-options">
            {interests.map(option => (
              <label className="form-interest-option" key={option}>
                <input type="radio" name="interest" value={option} checked={interest === option} onChange={() => { setInterest(option); clearFeedback(); }} />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {interestError && <p className="form-field-error" id="interest-error">{interestError}</p>}
        </fieldset>
      )}
      <button className="button button-primary form-submit" type="submit" disabled={status === "loading"}>
        {status === "loading" ? <LoaderCircle className="spin" size={19} aria-hidden="true" /> : status === "success" ? <CheckCircle2 size={19} aria-hidden="true" /> : <ArrowRight size={19} aria-hidden="true" />}
        {status === "loading" ? "Отправляем" : "Оставить заявку"}
      </button>
      <p className={`form-message ${status}`} aria-live="polite">{message}</p>
    </form>
  );
}
