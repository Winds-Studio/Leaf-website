export class ConfigElement {
    name: string;

    constructor(name: string) {
        this.name = name
    }
}

export class ConfigValue extends ConfigElement {
    default: string;
    description?: string;

    constructor(name: string, defaultVal: string | number | boolean, description?: string) {
        super(name);
        this.default = defaultVal.toString();
        this.description ??= description;
    }
}

export class ConfigSection extends ConfigElement {
    nodes: ConfigElement[] = [];

    constructor(name: string, nodes?: ConfigElement[]) {
        super(name);
        this.nodes = nodes;
    }
}

function parseNode(rawNodeName: string, rawNodeData: any): ConfigElement {

    // if node is value
    if ("default" in rawNodeData || "desc" in rawNodeData) {
        return new ConfigValue(rawNodeName, rawNodeData.default, rawNodeData.desc)
    }

    // else node is section
    const parsedNodes: ConfigElement[] = [];
    for (const loopNodeName in rawNodeData) {
        parsedNodes.push(parseNode(loopNodeName, rawNodeData[loopNodeName]));
    }
    return new ConfigSection(rawNodeName, parsedNodes);

}

export function serializeConfig(json: any): ConfigElement[] {
    return Object.keys(json).map(section => parseNode(section, json[section]));
}