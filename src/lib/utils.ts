export function formatDate(date?: Date | null) {
  if (!date) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function shortenText(text: string, length = 140) {
  if (text.length <= length) {
    return text;
  }

  return `${text.slice(0, length).trim()}...`;
}
