export function formatDate(dateString: Date) {
  return new Date(dateString).toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
