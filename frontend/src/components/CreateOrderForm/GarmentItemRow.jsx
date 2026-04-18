import Select from "../ui/Select";
import Input from "../ui/Input";

export default function GarmentItemRow({
  garment,
  index,
  garmentTypes,
  onGarmentChange,
  onRemoveGarment,
  canRemove,
}) {
  return (
    <div className="grid grid-cols-12 gap-4 items-end bg-surface-container-lowest p-4 rounded-lg shadow-sm border border-outline-variant/10">
      <div className="col-span-12 md:col-span-5">
        <Select
          label="Garment Type"
          className="bg-transparent focus:ring-0 text-on-surface font-medium p-0"
          value={garment.type}
          options={garmentTypes.map((type) => ({ label: type, value: type }))}
          onChange={(e) => onGarmentChange(index, "type", e.target.value)}
        />
      </div>
      <div className="col-span-4 md:col-span-3">
        <Input
          label="Quantity"
          className="bg-transparent focus:ring-0 text-on-surface font-medium p-0"
          type="number"
          min="1"
          value={garment.quantity}
          onChange={(e) => onGarmentChange(index, "quantity", e.target.value)}
        />
      </div>
      <div className="col-span-5 md:col-span-3">
        <div className="space-y-2">
          {/* Custom rendering due to the "$" prefix needed */}
          <label className="block font-label text-[10px] font-bold text-outline uppercase tracking-tighter">
            Price
          </label>
          <div className="flex items-center gap-1">
            <span className="text-on-surface-variant">$</span>
            <input
              className="w-full bg-transparent border-none focus:ring-0 text-on-surface font-medium p-0 outline-none placeholder:text-outline-variant"
              type="number"
              min="0"
              step="0.01"
              value={garment.price}
              onChange={(e) => onGarmentChange(index, "price", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="col-span-3 md:col-span-1 flex justify-end">
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemoveGarment(index)}
            className="text-error hover:bg-error-container/10 p-1 rounded transition-colors"
          >
            <span className="material-symbols-outlined">delete_outline</span>
          </button>
        )}
      </div>
    </div>
  );
}
