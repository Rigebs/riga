import { Plus, Minus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
}) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden shadow-sm">
      <button
        onClick={onDecrease}
        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition disabled:opacity-50"
        disabled={quantity <= 1}
      >
        <Minus size={14} />
      </button>
      <span className="px-3 text-gray-800 font-medium">{quantity}</span>
      <button
        onClick={onIncrease}
        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};
