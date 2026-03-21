export function LoadingSkeleton() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6">
      <div className="animate-pulse space-y-4">
        <div className="h-10 w-1/3 rounded-xl bg-slate-200" />
        <div className="h-24 rounded-2xl bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-40 rounded-2xl bg-slate-200" />
          <div className="h-40 rounded-2xl bg-slate-200" />
          <div className="h-40 rounded-2xl bg-slate-200" />
        </div>
        <div className="h-64 rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}
