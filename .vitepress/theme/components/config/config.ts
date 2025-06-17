import type { ConfigRoot } from "./types";

export class ConfigElement {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class ConfigValue extends ConfigElement {
    default: string | number | boolean | Array<string | number | boolean>;
    description?: string;

    constructor(
        name: string,
        defaultVal: string | number | boolean | Array<string | number | boolean>,
        description?: string
    ) {
        super(name);
        this.default = defaultVal;
        this.description ??= description;
    }
}

export class ConfigSection extends ConfigElement {
    nodes: ConfigElement[] = [];
    description?: string;

    constructor(name: string, nodes?: ConfigElement[], description?: string) {
        super(name);
        this.nodes = nodes || [];
        this.description = description;
    }
}

function parseNode(rawNodeName: string, rawNodeData: any): ConfigElement {
    // if node is value
    if ("default" in rawNodeData || "desc" in rawNodeData) {
        return new ConfigValue(rawNodeName, rawNodeData.default, rawNodeData.desc);
    }

    // else node is section
    const parsedNodes: ConfigElement[] = [];
    let sectionDescription = undefined;

    // 支持 __desc__ 字段作为分组描述
    for (const loopNodeName in rawNodeData) {
        if (loopNodeName === "__desc__" && typeof rawNodeData[loopNodeName] === "string") {
            sectionDescription = rawNodeData[loopNodeName];
            continue;
        }
        parsedNodes.push(parseNode(loopNodeName, rawNodeData[loopNodeName]));
    }
    return new ConfigSection(rawNodeName, parsedNodes, sectionDescription);
}

export function serializeConfig(json: ConfigRoot): ConfigElement[] {
    return Object.keys(json).map((section) => parseNode(section, json[section]));
}
