export type ConfigValueType = string | number | boolean | Array<string | number | boolean>;

export interface ConfigValueNode {
    default: ConfigValueType;
    desc?: string;
}

export interface ConfigSectionNode {
    __desc__?: string;
    [key: string]: ConfigSectionNode | ConfigValueNode | string | undefined;
}

// 根类型
export type ConfigRoot = {
    [key: string]: ConfigSectionNode | ConfigValueNode;
};
