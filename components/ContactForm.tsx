"use client";

import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { validateContactDetails, validateContactName, validateContactPhone } from "@/lib/contact-validation";

type FormStatus = "idle" | "loading" | "success" | "error";
const interests = ["Торговый комплекс", "Тканевый комплекс", "Промышленный комплекс", "Жилой комплекс", "Партнёрство"];

export function ContactForm({ compact = false, interestValue, showDetails = false, submitLabel = "Оставить заявку" }: { compact?: boolean; interestValue?: string; showDetails?: boolean; submitLabel?: string }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneInputError, setPhoneInputError] = useState("");
  const [details, setDetails] = useState("");
  const [interest, setInterest] = useState("");
  const [touched, setTouched] = useState({ name: false, phone: false, details: false });
  const [submitted, setSubmitted] = useState(false);
  const nameId = compact ? "name-compact" : "name";
  const phoneId = compact ? "phone-compact" : "phone";
  const detailsId = compact ? "contact-details-compact" : "contact-details";
  const nameError = submitted || touched.name || (name && !/^[\p{L}\p{M}][\p{L}\p{M}\s.'’\-]*$/u.test(name)) ? validateContactName(name) : null;
  const phoneError = phoneInputError || (submitted || touched.phone ? validateContactPhone(phone) : null);
  const detailsError = showDetails && (submitted || touched.details) ? validateContactDetails(details) : null;
  const interestError = !compact && submitted && !interest ? "Выберите направление" : null;

  function clearFeedback() {
    if (status !== "idle") setStatus("idle");
    if (message) setMessage("");
  }

  function handlePhoneChange(value: string) {
    const cleaned = value.replace(/[^0-9+ ()\-]/g, "").replace(/(?!^)\+/g, "");
    setPhone(cleaned);
    setPhoneInputError(cleaned !== value ? "В номере можно вводить только цифры, +, пробелы и скобки" : "");
    clearFeedback();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitted(true);
    const invalidField = validateContactName(name) ? "name" : phoneInputError || validateContactPhone(phone) ? "phone" : showDetails && validateContactDetails(details) ? "details" : !compact && !interest ? "interest" : null;
    if (invalidField) {
      form.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${invalidField}"]`)?.focus();
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
      setPhoneInputError("");
      setDetails("");
      setInterest("");
      setTouched({ name: false, phone: false, details: false });
      setSubmitted(false);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Не удалось отправить заявку");
    }
  }

  return (
    <form className={`contact-form ${compact ? "is-compact" : ""}`} onSubmit={handleSubmit} noValidate>
      {compact && interestValue && <input type="hidden" name="interest" value={interestValue} />}
      <div className={`form-field ${nameError ? "is-invalid" : ""}`}>
        <label htmlFor={nameId}>Ваше имя</label>
        <input id={nameId} name="name" type="text" autoComplete="name" placeholder="Как к вам обращаться" required maxLength={80} value={name} onChange={event => { setName(event.target.value); clearFeedback(); }} onBlur={() => setTouched(current => ({ ...current, name: true }))} aria-invalid={!!nameError} aria-describedby={nameError ? `${nameId}-error` : undefined} />
        {nameError && <p className="form-field-error" id={`${nameId}-error`}>{nameError}</p>}
      </div>
      <div className={`form-field ${phoneError ? "is-invalid" : ""}`}>
        <label htmlFor={phoneId}>Номер телефона</label>
        <input id={phoneId} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+996 555 123 456" required maxLength={30} value={phone} onChange={event => handlePhoneChange(event.target.value)} onBlur={() => setTouched(current => ({ ...current, phone: true }))} aria-invalid={!!phoneError} aria-describedby={phoneError ? `${phoneId}-error` : undefined} />
        {phoneError && <p className="form-field-error" id={`${phoneId}-error`}>{phoneError}</p>}
      </div>
      {showDetails && (
        <div className={`form-field form-field-wide ${detailsError ? "is-invalid" : ""}`}>
          <label htmlFor={detailsId}>Ваше предложение</label>
          <textarea id={detailsId} name="details" rows={4} required minLength={15} maxLength={1200} placeholder="Чем занимается ваша компания и что вы предлагаете" value={details} onChange={event => { setDetails(event.target.value); clearFeedback(); }} onBlur={() => setTouched(current => ({ ...current, details: true }))} aria-invalid={!!detailsError} aria-describedby={detailsError ? `${detailsId}-error` : undefined} />
          {detailsError && <p className="form-field-error" id={`${detailsId}-error`}>{detailsError}</p>}
        </div>
      )}
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
        {status === "loading" ? "Отправляем" : submitLabel}
      </button>
      <p className={`form-message ${status}`} aria-live="polite">{message}</p>
    </form>
  );
}
