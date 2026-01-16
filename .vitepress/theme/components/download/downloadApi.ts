import { getVerStatus } from "./versionStatus";
import semver from "semver";

export interface ApiBuild {
    build: number;
    time: string;
    channel: "default" | "experimental";
    changes: {
        commit: string;
        summary: string;
        message: string;
    }[];
    downloads: {
        primary: {
            name: string;
            sha256: string;
        };
    };
}

export interface ApiProject {
    versions: string[];
}

export interface ApiBuilds {
    builds: ApiBuild[];
}

const API_BASE = "https://api.leafmc.one/v2";

export async function getVersions(): Promise<string[]> {
    const rawData = await fetch(`${API_BASE}/projects/leaf`);
    const data = (await rawData.json()) as ApiProject;
    // TODO: temp fix
    // Find another way before 26.1
    // or if Fillv3 also does not return ordered versions
    return semver.sort(data.versions).reverse();
}

export async function getBuilds(version: string): Promise<ApiBuild[]> {
    const rawData = await fetch(`${API_BASE}/projects/leaf/versions/${version}/builds`);
    const data = (await rawData.json()) as ApiBuilds;
    return data.builds.reverse();
}

export function getBuildLink(version: string, build: ApiBuild): string {
    return `${API_BASE}/projects/leaf/versions/${version}/builds/${build.build}/downloads/${build.downloads.primary.name}`;
}

export function getLatestStable(versions: string[]): string {
    return versions.filter((it) => getVerStatus(it).name == "stable")[0];
}
