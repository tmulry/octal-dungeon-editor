<template>
    <v-container color="black" @mousedown="onMouseDown" @mouseup="onMouseUp">
        <v-row v-for="y in props.numRows" :key="y" no-gutters>
            <v-col v-for="x in props.numCols" :key="`[${x}, ${y}]`" no-gutters>
                <TileSpace :mouse-down="mousedown" :size="16" :bg-theme="((x + y) % 2 === 0) ? 'dark' : 'light'"
                    @tile-clicked="onClickedTile" :tile-data="tileAt(x - 1, y - 1)"
                    :tile-position="{ x: x - 1, y: y - 1 }" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import TileSpace from '@/components/Cell.vue'
import { TileData } from '@/types/tile-data';
import { ref } from 'vue';

const props = defineProps<{
    numCols: number,
    numRows: number,
    rows?: TileData[][]
}>()


const emit = defineEmits(['tileClicked'])


const mousedown = ref(false);

const tileAt = (x: number, y: number) => {
    return props.rows ? props.rows?.[y]?.[x] : undefined
}

const onClickedTile = (position: any, data: TileData) => {
    console.log('TileGrid', position, data);
    emit('tileClicked', position, data)
}

const onMouseDown = () => {
    mousedown.value = true
}

const onMouseUp = () => {
    mousedown.value = false
}



</script>

<style scoped>
.v-row {
    line-height: 0.5;
}

.v-col {
    flex-grow: 0;
}
</style>
