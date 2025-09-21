export const formatPrice = (value: number): string => `$${value.toFixed(2)}`;

export const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
