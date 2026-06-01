declare global {
  var umami: { track: (event: string, data?: Record<string, unknown>) => void } | undefined
}

export function trackDownload(version: string, build: number, filename: string): void {
  globalThis.umami?.track("download", { build, filename, version })
}
