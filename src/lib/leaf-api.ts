export type ProjectResponse = {
  project_id: string
  project_name: string
  version_groups: string[]
  versions: string[]
}

export type VersionResponse = {
  project_id: string
  project_name: string
  version: string
  builds: number[]
}

export type BuildChange = {
  commit: string
  summary: string
  message: string
}

export type BuildDownload = {
  name: string
  sha256: string
}

export type BuildResponse = {
  project_id: string
  project_name: string
  version: string
  build: number
  time: string
  channel: "default" | "experimental"
  promoted: boolean
  changes?: BuildChange[]
  downloads?: Record<string, BuildDownload>
}

const BASE_URL = "https://api.leafmc.one/v2"
const HEADERS = { "User-Agent": "Leaf-Website" }
const MAX_ATTEMPTS = 3

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })

async function fetchWithRetry<T>(url: string, init?: RequestInit): Promise<T> {
  const mergedHeaders = new Headers(HEADERS)
  if (init?.headers) {
    const initHeaders = new Headers(init.headers)
    initHeaders.forEach((value, key) => {
      mergedHeaders.set(key, value)
    })
  }

  const requestInit: RequestInit = init
    ? { ...init, headers: mergedHeaders }
    : { headers: mergedHeaders }

  const attemptFetch = async (attempt: number): Promise<T> => {
    try {
      const res = await fetch(url, requestInit)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return (await res.json()) as T
    } catch (error) {
      if (attempt >= MAX_ATTEMPTS) throw error
      await sleep(1000 * 2 ** attempt)
      return attemptFetch(attempt + 1)
    }
  }

  return attemptFetch(1)
}

export async function getProject(): Promise<ProjectResponse> {
  return fetchWithRetry<ProjectResponse>(`${BASE_URL}/projects/leaf`, { cache: "no-store" })
}

export async function getVersion(version: string): Promise<VersionResponse> {
  return fetchWithRetry<VersionResponse>(`${BASE_URL}/projects/leaf/versions/${version}`, {
    cache: "no-store",
  })
}

export async function getBuild(version: string, build: number): Promise<BuildResponse> {
  return fetchWithRetry<BuildResponse>(
    `${BASE_URL}/projects/leaf/versions/${version}/builds/${build}`,
    { cache: "no-store" }
  )
}

export function getDownloadUrl(version: string, build: number, filename: string): string {
  return `${BASE_URL}/projects/leaf/versions/${version}/builds/${build}/downloads/${filename}`
}
