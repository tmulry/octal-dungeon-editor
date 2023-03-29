<template>
    <div>
        <TileGrid :num-rows="colorSelectorRows" :num-cols="colorSelectorColumns" :rows="colorSelector"
            @tile-clicked="clickedTile" />
    </div>
</template>

<script lang="ts" setup>
import TileGrid from '@/components/TileGrid.vue';
import { TileData } from '@/types/tile-data';
import { reactive } from 'vue';

import { makeGrid, clearGridSelection } from '@/utils/useTiles';



const colorSchemes = [
    'monochrome',
    'cold-blue',
    'eerie-purple',
    'evil-red ',
    'gred',
    'sandy-brown',
    'pixel-art'
]

const colorSelectorColumns = 8;
const colorSelectorRows = Math.ceil(colorSchemes.length / colorSelectorColumns);
const initColorSelector = () => {
    return makeGrid(colorSelectorRows, colorSelectorColumns, (rowIdx: number, colIdx: number): TileData => ({
        selected: false,
        visible: true,
        tileType: '00',
        tileSet: colorSchemes[rowIdx * colorSelectorColumns + colIdx]
    }));
}

const colorSelector = reactive(initColorSelector())

const emit = defineEmits(['colorSelected']);

const clickedTile = (coords: { y: number; x: number; }, _data: TileData) => {
    clearGridSelection(colorSelector);
    colorSelector[coords.y][coords.x].selected = true
    emit('colorSelected', colorSelector[coords.y][coords.x].tileSet)
}

</script>

<style scoped></style>