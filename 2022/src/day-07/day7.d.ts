export type DirectoryMap = { [key: string]: Directory };

export interface Directory {
    parent: string;
    size: number;
    path: string;
}
