export interface KVNamespace {
  get(key: string, options?: { type?: string }): Promise<string | null>
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
  delete(key: string): Promise<void>
  list(options?: { prefix?: string; limit?: number; cursor?: string }): Promise<{
    keys: Array<{ name: string }>
    list_complete: boolean
    cursor?: string
  }>
}

let kv: KVNamespace | null = null

export function setKV(ns: KVNamespace): void {
  kv = ns
}

export function getKV(): KVNamespace | null {
  return kv
}
