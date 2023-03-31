
import { DataStore, Store } from "@/types/store";
import { reactive, readonly } from "vue";



const store: Store = reactive({
    activeToolSet: {
        tileSet: 'evil-red',
        tileType: '00',
        showGrid: true
    },
});

export const methods = {
    toggleGrid : () => {
        store.activeToolSet.showGrid = !store.activeToolSet.showGrid
      },
    setSelectedTileType : (tileType?: string[]) => {
        // todo allow for multiple tile types when randomizing
        store.activeToolSet.tileType = tileType ? tileType[0] : undefined;
    },
    setSelectedTileSet : (tileSet?: string) => {
        store.activeToolSet.tileSet = tileSet;
    }
}

export const getters = {
    getActiveToolSet: () => {
        return store.activeToolSet;
    },
}

export default {
    store:readonly(store),
    methods,
    getters
} as DataStore;
