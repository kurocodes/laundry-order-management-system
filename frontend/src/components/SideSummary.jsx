export default function SideSummary() {
  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="bg-surface-container-highest rounded-xl p-6 relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-lg font-bold mb-2">Priority Cleaning</h3>
          <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
            3 orders are exceeding the 24-hour turnaround window. Actions required.
          </p>
          <button className="bg-on-surface text-surface text-xs font-bold px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
            Review Now
          </button>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <span className="material-symbols-outlined text-[120px]">local_laundry_service</span>
        </div>
      </div>
      
      <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-xl p-6 space-y-4">
        <h3 className="font-label font-bold text-sm uppercase tracking-widest text-on-surface-variant">Active Stage Stepper</h3>
        <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-surface-container-highest">
          <div className="flex gap-4 relative">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center z-10 ring-4 ring-surface">
              <span className="material-symbols-outlined text-surface text-sm">check</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-on-surface">Washing</p>
              <p className="text-xs text-on-surface-variant">Completed at 09:30 AM</p>
            </div>
          </div>
          <div className="flex gap-4 relative">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center z-10 ring-4 ring-surface">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-on-surface">Drying</p>
              <p className="text-xs text-primary font-medium">Currently Processing...</p>
            </div>
          </div>
          <div className="flex gap-4 relative">
            <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center z-10 ring-4 ring-surface"></div>
            <div className="flex-1">
              <p className="text-sm font-bold text-outline">Folding</p>
            </div>
          </div>
          <div className="flex gap-4 relative">
            <div className="w-6 h-6 rounded-full bg-surface-container-highest flex items-center justify-center z-10 ring-4 ring-surface"></div>
            <div className="flex-1">
              <p className="text-sm font-bold text-outline">Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
