/** Shared input guards for public application forms. */

const NAME_CHARS = /[^a-zA-ZçÇğĞıİöÖşŞüÜ\s'-]/g;
const MULTI_SPACE = /\s+/g;

export function sanitizePersonName(value: string) {
  return value
    .replace(NAME_CHARS, "")
    .replace(MULTI_SPACE, " ")
    .replace(/^\s+/, "");
}

export function formatPersonName(value: string) {
  return sanitizePersonName(value)
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((part) => {
      const lower = part.toLocaleLowerCase("tr-TR");
      return lower.charAt(0).toLocaleUpperCase("tr-TR") + lower.slice(1);
    })
    .join(" ");
}

export function isValidPersonName(value: string) {
  const cleaned = formatPersonName(value);
  if (cleaned.length < 3) return false;
  const parts = cleaned.split(" ");
  return parts.length >= 2 && parts.every((part) => part.length >= 2);
}

/** Accepts 5A, 5-A, 5 A, 12b → normalized 5-A / 12-B */
export function sanitizeClassSection(value: string) {
  const compact = value.toLocaleUpperCase("tr-TR").replace(/\s+/g, "");
  const match = compact.match(/^(\d{1,2})[-./]?([A-ZÇĞİÖŞÜ])?$/);
  if (!match) {
    return compact.replace(/[^0-9A-ZÇĞİÖŞÜ-]/g, "").slice(0, 5);
  }
  const grade = match[1];
  const section = match[2];
  if (!section) return grade;
  return `${Number(grade)}-${section}`;
}

export function formatClassSection(value: string) {
  const cleaned = sanitizeClassSection(value).trim();
  const match = cleaned.match(/^(\d{1,2})-([A-ZÇĞİÖŞÜ])$/);
  if (!match) return cleaned;
  return `${Number(match[1])}-${match[2]}`;
}

export function isValidClassSection(value: string) {
  const cleaned = formatClassSection(value);
  const match = cleaned.match(/^(\d{1,2})-([A-Z])$/);
  if (!match) return false;
  const grade = Number(match[1]);
  return grade >= 5 && grade <= 12;
}

export function sanitizePhoneDigits(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.startsWith("90") && digits.length > 10) {
    digits = digits.slice(2);
  }
  if (digits.startsWith("0")) {
    digits = digits.slice(0, 11);
  } else if (digits.length > 0) {
    digits = `0${digits}`.slice(0, 11);
  }
  return digits;
}

/** 05xx xxx xx xx */
export function formatPhoneDisplay(value: string) {
  const digits = sanitizePhoneDigits(value);
  const parts = [
    digits.slice(0, 4),
    digits.slice(4, 7),
    digits.slice(7, 9),
    digits.slice(9, 11),
  ].filter(Boolean);
  return parts.join(" ");
}

export function isValidPhone(value: string) {
  const digits = sanitizePhoneDigits(value);
  return /^05\d{9}$/.test(digits);
}

export function normalizePhone(value: string) {
  return sanitizePhoneDigits(value);
}
