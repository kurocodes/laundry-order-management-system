export default function StatCard({ label, value, renderIcon }) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/15 flex flex-col justify-between">
      <span className="font-label font-bold uppercase tracking-wider text-on-surface-variant/80 text-xs">
        {label}
      </span>
      <div className="mt-2 flex items-end justify-between">
        <span className="text-3xl font-bold text-on-surface tracking-tight">
          {value}
        </span>
        {renderIcon && renderIcon()}
      </div>
    </div>
  );
}
