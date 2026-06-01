/**
 * Build channel as encoded in URL search params. Maps to BuildResponse.channel: "stable" ↔
 * "default", "experimental" ↔ "experimental".
 */
export type Channel = "stable" | "experimental" | "all"

/**
 * Parse the `channel` search param permissively; anything other than "experimental" is treated as
 * stable.
 */
export function parseChannel(raw: string | string[] | undefined): Channel {
  const value = Array.isArray(raw) ? raw[0] : raw
  if (value === "experimental") return "experimental"
  if (value === "all") return "all"
  return "stable"
}

/**
 * Map a channel to the API's BuildResponse.channel value.
 */
export function channelToApi(channel: Channel): "default" | "experimental" | null {
  if (channel === "all") return null
  return channel === "stable" ? "default" : "experimental"
}
