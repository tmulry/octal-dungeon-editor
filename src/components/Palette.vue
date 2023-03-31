<template>
    <div>
        <TileGrid :num-rows="toolSetRows" :num-cols="toolSetColumns" :rows="toolSet" @tile-clicked="clickedTile" />
    </div>
</template>

<script lang="ts" setup>
import TileGrid from '@/components/TileGrid.vue';
import { reactive, watch } from 'vue';
import { TileData } from '@/types/tile-data';
import { makeGrid, clearGridSelection, changeToolSet } from '@/utils/useTiles';

import { injectStrict } from '@/utils/injectStrict';
import { DataStoreKey } from '@/types/symbols';

const { store, methods } = injectStrict(DataStoreKey)



const toolSetRows = 8;
const toolSetColumns = 8;

const initToolSet = () => {

    return makeGrid(toolSetColumns, toolSetRows, (rowIdx: number, colIdx: number): TileData => ({
        selected: (rowIdx === colIdx && colIdx === 0),
        visible: true,
        tileSet: store.activeToolSet.tileSet,
        tileType: `${colIdx}${rowIdx}`
    }));

}

const toolSet = reactive(initToolSet())


const clickedTile = (coords: { y: number; x: number; }, data: TileData) => {
    clearGridSelection(toolSet)
    toolSet[coords.y][coords.x].selected = true
    methods.setSelectedTileType(data.tileType ? [data.tileType] : undefined)
}

methods.setSelectedTileType(['00'])

// todo use this method for a custom cursor? https://www.freecodecamp.org/news/how-to-make-a-custom-mouse-cursor-with-css-and-javascript/


</script>

<style scoped></style>