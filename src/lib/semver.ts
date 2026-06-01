// 纯数字分段比较，兼容 1.X.Y 和未来可能出现的 26.X 等新格式
function compareVersionAsc(a: string, b: string): number {
  const pa = a.split(".").map((p) => Number.parseInt(p, 10) || 0)
  const pb = b.split(".").map((p) => Number.parseInt(p, 10) || 0)
  const len = Math.max(pa.length, pb.length)
  for (let i = 0; i < len; i += 1) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0)
    if (diff !== 0) return diff
  }
  return 0
}

export function sortVersionsDesc(versions: readonly string[]): string[] {
  return [...versions].toSorted((a, b) => compareVersionAsc(b, a))
}

export function getLatestVersion(versions: readonly string[]): string {
  const latest = sortVersionsDesc(versions)[0]
  if (!latest) throw new Error("版本列表为空，无法确定最新版本")
  return latest
}

export function isKnownVersion(versions: readonly string[], version: string): boolean {
  return versions.includes(version)
}
