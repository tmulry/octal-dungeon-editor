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



const props = withDefaults(defineProps<{
    tileSet?: string
}>(), {})


const toolSetRows = 8;
const toolSetColumns = 8;

const initToolSet = () => {

    return makeGrid(toolSetColumns, toolSetRows, (rowIdx: number, colIdx: number): TileData => ({
        selected: (rowIdx === colIdx && colIdx === 0),
        visible: true,
        tileSet: props.tileSet,
        tileType: `${colIdx}${rowIdx}`
    }));

}

const toolSet = reactive(initToolSet())

const emit = defineEmits(['tileTypeSelected'])

const clickedTile = (coords: { y: number; x: number; }, data: TileData) => {
    clearGridSelection(toolSet)
    toolSet[coords.y][coords.x].selected = true
    emit('tileTypeSelected', data.tileType)
}

watch(() => props.tileSet, (newTileSet, oldTileSet) => {
    console.log(newTileSet, oldTileSet);
    changeToolSet(toolSet, newTileSet)
})
// // set initi
// emit('tileTypeSelected', '00')

// todo use this method for a custom cursor? https://www.freecodecamp.org/news/how-to-make-a-custom-mouse-cursor-with-css-and-javascript/





</script>

<style scoped></style>