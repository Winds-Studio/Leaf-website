type UmamiTrack = (eventName: string, data?: Record<string, unknown>) => void;

type UmamiWindow = Window & {
    umami?: {
        track?: UmamiTrack;
    };
};

interface DownloadEventData {
    version: string;
}

export function trackDownloadEvent(data: DownloadEventData): void {
    if (typeof window === "undefined") return;

    const track = (window as UmamiWindow).umami?.track;
    if (!track) return;

    track("leaf-download", {
        version: data.version,
    });
}
