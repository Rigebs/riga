import { CheckCircle, Clock, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const base =
    "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1";

  switch (status) {
    case "PROCESSING":
      return (
        <span className={`${base} bg-green-100 text-green-700`}>
          <CheckCircle className="h-4 w-4" /> En proceso
        </span>
      );
    case "PENDING":
      return (
        <span className={`${base} bg-yellow-100 text-yellow-700`}>
          <Clock className="h-4 w-4" /> Pendiente
        </span>
      );
    case "CANCELED":
      return (
        <span className={`${base} bg-red-100 text-red-700`}>
          <XCircle className="h-4 w-4" /> Cancelado
        </span>
      );
    default:
      return (
        <span className={`${base} bg-gray-100 text-gray-600`}>{status}</span>
      );
  }
}
