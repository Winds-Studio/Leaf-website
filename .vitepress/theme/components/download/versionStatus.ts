import { Branch } from "./old/githubApiTypes";
import { version } from "vue";

export interface VersionStatus {
    versions: Array<string>;
    icon: string;
    cssClass: string;
    branchPrefix?: string;
    name?: string;
}

export interface Version {
    name: string;
    status: "dev" | "stable" | "eol" | "dead";
    branch: string;
}

export const versionStatusMap: { [name: string]: VersionStatus } = {
    dev: {
        versions: ["1.21.11", "1.21.8"],
        icon: "lucide:flask-conical",
        cssClass: "status-dev"
        //branchPrefix: "dev/"
    },

    stable: {
        versions: ["1.21.4"],
        cssClass: "status-stable",
        icon: "lucide:check-circle"
    },

    eol: {
        versions: ["1.21.1", "1.20.4"],
        cssClass: "status-eol",
        icon: "lucide:alert-circle"
    },

    dead: {
        versions: [
            "1.21.7",
            "1.21.6",
            "1.21.5",
            "1.21.3",
            "1.21",
            "1.20.6",
            "1.20.2",
            "1.20.1",
            "1.20",
            "1.19.4",
            "1.19.3",
            "1.19.2",
            "1.19.1",
            "1.19",
            "1.18.2"
        ],
        cssClass: "status-dead",
        icon: "lucide:archive-x"
    }
};

export const DEFAULT_VER_BRANCH_PREFIX = "ver/";

export function branchNameToVerName(branchName: string): string | null {
    const res = {};
    Object.values(versionStatusMap).forEach((versionStatus) => {
        let branchPrefix = versionStatus.branchPrefix || DEFAULT_VER_BRANCH_PREFIX;
        versionStatus.versions.forEach((ver) => {
            res[branchPrefix + ver] = ver;
        });
    });
    return res[branchName];
}

export function branchesToVers(branches: Array<Branch>): Array<Version> {
    let res: Array<Version> = [];
    for (const branch of branches) {
        let verName = branchNameToVerName(branch.name);
        for (const [status, data] of Object.entries(versionStatusMap)) {
            if (data.versions.includes(verName)) {
                res.push(<Version>{ name: verName, status: status, branch: branch.name });
            }
        }
    }
    return res;
}

export function getLatestStable(vers: Array<Version>): Version {
    for (const ver of vers) {
        if (ver.status == "stable") return ver;
    }
    return vers[0];
}

export const getVerInfo = (ver: Version) => versionStatusMap[ver.status];

export function getVerStatus(ver: string): VersionStatus {
    let versionStatus: VersionStatus | null = null;
    for (const key in versionStatusMap) {
        if (versionStatusMap[key].versions.includes(ver)) {
            versionStatus = versionStatusMap[key];
            versionStatus.name = key;
        }
    }
    if (versionStatus == null) {
        versionStatus = versionStatusMap["stable"];
        versionStatus.name = "stable";
    }
    return versionStatus;
}
