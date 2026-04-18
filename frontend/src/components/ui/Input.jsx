export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  min,
  step,
  className = "",
  containerClassName = "",
}) {
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-surface-container-lowest border-none focus:ring-primary outline-none transition-all placeholder:text-outline-variant ${className}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        step={step}
      />
    </div>
  );
}
