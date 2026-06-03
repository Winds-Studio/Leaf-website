export function Spinner({ label }: { label?: string }) {
  return (
    <div
      aria-label={label ?? "Loading"}
      className="text-fd-muted-foreground inline-flex items-center gap-3 text-sm"
      role="status"
    >
      <span className="border-fd-border border-t-fd-primary size-5 animate-spin rounded-full border-2" />
      {label && <span>{label}</span>}
    </div>
  )
}
