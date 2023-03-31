import { ToolSet } from "./tool-set";

export type  Store = {
    activeToolSet: ToolSet;
};

export interface DataStore {
    store: Store;
    methods: {
        toggleGrid: () => void;
        setSelectedTileType : (tileType?: string[]) => void;
        setSelectedTileSet : (tileSet?: string) => void;
    };
    getters: {
        getActiveToolSet: () => ToolSet;
    };

}