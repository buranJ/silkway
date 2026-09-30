export function validateContactName(value: string): string | null {
  const name = value.trim();
  if (!name) return "Введите ваше имя";
  if ((name.match(/\p{L}/gu) || []).length < 2) return "Имя должно содержать не менее 2 букв";
  if (name.length > 80) return "Имя слишком длинное";
  if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'’\-]*$/u.test(name)) {
    return "Используйте буквы, пробелы и дефис";
  }
  return null;
}

export function validateContactPhone(value: string): string | null {
  const phone = value.trim();
  if (!phone) return "Введите номер телефона";
  if (phone.length > 30) return "Номер телефона слишком длинный";
  if (!/^\+?[0-9 ()\-]+$/.test(phone)) return "В номере допустимы только цифры, +, пробелы и скобки";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) return "Укажите номер от 9 до 15 цифр";
  return null;
}
