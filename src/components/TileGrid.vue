<template>
    <v-container @mousedown="onMouseDown" @mouseup="onMouseUp" @mouseleave="onMouseUp">
        <v-row v-for="y in props.numRows" :key="y" no-gutters>
            <v-col v-for="x in props.numCols" :key="`[${x}, ${y}]`" no-gutters>
                <TileSpace :mouse-down="mousedown" :size="16" :bg-theme="tileBgTheme(x, y)" @tile-clicked="onClickedTile"
                    :tile-data="tileAt(x - 1, y - 1)" :tile-position="{ x: x - 1, y: y - 1 }" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import TileSpace from '@/components/TileSpace.vue'
import { TileData } from '@/types/tile-data';
import { ref } from 'vue';

const props = withDefaults(defineProps<{
    numCols: number,
    numRows: number,
    rows?: TileData[][],
    showGrid?: boolean
}>(), {
    // grid is not always "hideable" so we need to pull it from a prop instead of direct from the datastore
    showGrid: true
})


const tileBgTheme = (x: number, y: number) => (!props.showGrid || ((x + y) % 2 === 0)) ? 'dark' : 'light';

const emit = defineEmits(['tileClicked'])


const mousedown = ref(false);

const tileAt = (x: number, y: number) => {
    return props.rows ? props.rows?.[y]?.[x] : undefined
}

const onClickedTile = (position: any, data: TileData) => {
    emit('tileClicked', position, data)
}

// todo it might end up being easier to track this in the datastore than locally.
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
