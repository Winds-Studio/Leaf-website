export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div
        aria-label="Loading"
        className="text-fd-muted-foreground inline-flex items-center gap-3 text-sm"
        role="status"
      >
        <span className="border-fd-border border-t-fd-primary size-5 animate-spin rounded-full border-2" />
        <span>Loading...</span>
      </div>
    </div>
  )
}
