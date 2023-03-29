<template>
  <TileGrid :num-rows="rowCount" :num-cols="colCount" :rows="mapTiles" @tile-clicked="clickedTile" />
</template>

<script lang="ts" setup>
import TileGrid from '@/components/TileGrid.vue';
import { TileData } from '@/types/tile-data';
import { ToolSet } from '@/types/tool-set';
import { makeGrid } from '@/utils/useTiles';
import { reactive } from 'vue';

const props = defineProps<{ toolSet?: ToolSet }>()
const rowCount = 32
const colCount = 32;
const initMapTiles = (): TileData[][] => {
  return makeGrid(rowCount, colCount)
}

const mapTiles = reactive(initMapTiles())


const clickedTile = (coords: { y: number; x: number; }, _data: TileData) => {
  mapTiles[coords.y][coords.x].visible = !!props.toolSet?.tileType;
  mapTiles[coords.y][coords.x].tileSet = props.toolSet?.tileSet;
  mapTiles[coords.y][coords.x].tileType = props.toolSet?.tileType;
}

</script>



<style>
.tile-grid {
  margin-top: 64px;

  /* todo how to add a 1 px bleed to left edge */
  /* border-left: 1px black; */

}
</style>