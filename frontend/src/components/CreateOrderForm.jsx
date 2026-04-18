import { useState } from "react";
import api from "../services/api";
import Input from "./ui/Input";
import GarmentItemRow from "./CreateOrderForm/GarmentItemRow";

export default function CreateOrderForm({ onOrderCreated }) {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [garments, setGarments] = useState([
    { type: "Shirt (Formal/Casual)", quantity: 1, price: 12.0 },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const garmentTypes = [
    "Shirt (Formal/Casual)",
    "Pants / Trousers",
    "Saree (Silk/Cotton)",
    "Blazer / Suit",
  ];

  const handleAddGarment = () => {
    setGarments([
      ...garments,
      { type: "Shirt (Formal/Casual)", quantity: 1, price: 12.0 },
    ]);
  };

  const handleRemoveGarment = (index) => {
    setGarments(garments.filter((_, i) => i !== index));
  };

  const handleGarmentChange = (index, field, value) => {
    const newGarments = [...garments];
    newGarments[index][field] = value;
    setGarments(newGarments);
  };

  const totalAmount = garments.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !phoneNumber || garments.length === 0) {
      setError("Please fill in customer details and at least one garment.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.post("/orders", {
        customerName,
        phone: phoneNumber,
        items: garments.map((g) => ({
          type: g.type,
          quantity: Number(g.quantity),
          price: Number(g.price),
        })),
        totalAmount,
      });

      // Reset form
      setCustomerName("");
      setPhoneNumber("");
      setGarments([
        { type: "Shirt (Formal/Casual)", quantity: 1, price: 12.0 },
      ]);
      if (onOrderCreated) onOrderCreated();
    } catch (err) {
      console.error(err);
      setError("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="lg:col-span-8 bg-surface-container-low rounded-xl p-8 space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Create New Order</h2>
        {error && (
          <span className="text-sm font-medium text-error">{error}</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Customer Name"
          className="focus:ring-0 text-on-surface font-medium p-4"
          placeholder="e.g. Jonathan Doe"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <Input
          label="Phone Number"
          className="focus:ring-0 text-on-surface font-medium p-4"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-widest text-on-surface-variant">
            Garments Inventory
          </h3>
          <button
            type="button"
            onClick={handleAddGarment}
            className="flex items-center gap-1 text-primary text-sm font-bold hover:opacity-80 transition-opacity"
          >
            <span className="material-symbols-outlined text-sm">
              add_circle
            </span>
            Add Item
          </button>
        </div>

        <div className="space-y-3">
          {garments.map((garment, index) => (
            <GarmentItemRow
              key={index}
              index={index}
              garment={garment}
              garmentTypes={garmentTypes}
              onGarmentChange={handleGarmentChange}
              onRemoveGarment={handleRemoveGarment}
              canRemove={garments.length > 1}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20">
        <div className="space-y-1">
          <span className="text-on-surface-variant text-sm">
            Estimated Total
          </span>
          <div className="text-2xl font-extrabold text-on-surface">
            ${totalAmount.toFixed(2)}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold shadow-sm shadow-primary/20 hover:bg-primary-dim transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span
              className="material-symbols-outlined animate-spin text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              progress_activity
            </span>
          ) : (
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: '"FILL" 1' }}
            >
              check_circle
            </span>
          )}
          {loading ? "Processing..." : "Create Order"}
        </button>
      </div>
    </form>
  );
}
