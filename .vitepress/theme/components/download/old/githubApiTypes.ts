export interface Branch {
    name: string;
}

export interface ReleaseAsset {
    name: string;
    browser_download_url: string;
    size: number;
    created_at: string;
    download_count: number;
}

export interface Release {
    assets: ReleaseAsset[];
    published_at: string;
    name: string;
    body: string;
    tag_name: string;
}

export interface WorkflowRun {
    id: string;
    created_at?: string;
    head_branch?: string;
    html_url?: string;
    head_commit?: {
        message: string;
        id: string;
    };
}
