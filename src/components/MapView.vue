<template>
  <TileGrid :num-rows="rowCount" :num-cols="colCount" :rows="mapTiles" :show-grid="store.activeToolSet.showGrid"
    @tile-clicked="clickedTile" />
</template>

<script lang="ts" setup>
import TileGrid from '@/components/TileGrid.vue';
import { TileData } from '@/types/tile-data';
import { makeGrid } from '@/utils/useTiles';
import { reactive } from 'vue';
import { injectStrict } from '@/utils/injectStrict'
import { DataStoreKey } from '@/types/symbols'

const { store } = injectStrict(DataStoreKey)

const rowCount = 32
const colCount = 32;
const initMapTiles = (): TileData[][] => {
  return makeGrid(rowCount, colCount)
}

const mapTiles = reactive(initMapTiles())


const clickedTile = (coords: { y: number; x: number; }, _data: TileData) => {
  mapTiles[coords.y][coords.x].visible = !!store.activeToolSet?.tileType;
  mapTiles[coords.y][coords.x].tileSet = store.activeToolSet?.tileSet;
  mapTiles[coords.y][coords.x].tileType = store.activeToolSet?.tileType;
}

</script>



<style scoped>
.tile-grid {
  margin-top: 64px;

  /* todo how to add a 1 px bleed to left edge */
  /* border-left: 1px black; */

}

.v-container {
  max-width: fit-content;
}
</style>