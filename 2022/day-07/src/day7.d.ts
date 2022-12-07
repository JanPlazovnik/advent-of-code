export type DirectoryMap = { [key: string]: Directory };

export interface Directory {
    name: string;
    parent: string;
    size: number;
    path: string;
}
