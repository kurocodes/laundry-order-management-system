export default function Navbar() {
  return (
    <nav className="w-full top-0 sticky z-50 bg-slate-50  border-b border-outline-variant/10">
      <div className="flex justify-between items-center h-16 px-8 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-slate-900 tracking-tighter brand-logo">
            Laundry Manager
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-container-high rounded-md transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined text-outline">
              notifications
            </span>
          </button>
          <button className="p-2 hover:bg-surface-container-high rounded-md transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined text-outline">
              account_circle
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
