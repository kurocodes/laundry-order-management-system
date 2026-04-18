export default function Select({
  label,
  value,
  onChange,
  options,
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
      <select
        className={`w-full bg-surface-container-lowest border-none focus:ring-primary outline-none ${className}`}
        value={value}
        onChange={onChange}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
