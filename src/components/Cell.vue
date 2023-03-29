<template>
    <div @mouseover="onMouseOver">
        <svg v-if="props.tileData.visible" :width="width" :height="height" @mousedown="onClick" class="image-tile"
            :class="[props.tileData.tileSet, props.tileData.selected ? 'selected' : '']" :style="positionStyle">
            <rect :width="width" :height="height" style="fill:none" />
        </svg>
        <svg :width="width" :height="height" @mousedown="onClick" class="background-tile" :class="props.bgTheme">
            <rect :width="width" :height="height" />
        </svg>
    </div>
</template>
  
<script lang="ts" setup>


import { computed } from 'vue';
import { TileData } from '@/types/tile-data';

const props = withDefaults(defineProps<{
    mouseDown: boolean,
    bgTheme: 'dark' | 'light',
    size: number,
    tilePosition: { x: number, y: number }
    tileData?: TileData
}>(), {
    bgTheme: 'dark',
    size: 16,
    tileData: () => ({
        visible: false,
        selected: false,
        tileSet: 'monochrome',
        tileType: '00'
    }),

})

const emit = defineEmits(['tileClicked'])

const { width, height } = {
    width: props.size,
    height: props.size
}

// the current origin is the top left so all pixel counts will be <= 0
const positionStyle = computed(() => {
    const [x, y] = props.tileData.tileType ? [...props.tileData.tileType].map(c => parseInt(c)) : [0, 0];
    return `background-position: ${x * -1 * props.size}px ${y * -1 * props.size}px;`
})


// todo rename tileClicked tile-clicked to Actioned actioned
const onClick = () => {
    emit('tileClicked', props.tilePosition, props.tileData)
}


const onMouseOver = () => {
    // todo this makes click handling VERY slow
    // console.log('mouseOver', props.tilePosition, 'down?', props.mouseDown)
    if (props.mouseDown) {
        emit('tileClicked', props.tilePosition, props.tileData)
    }
}

</script>

<style scoped>
/* todo set colors as scss variables */
svg.dark {
    fill: #282a35b8;
    stroke-width: 0;
    stroke: #282a35b8;
}

svg.light {
    fill: #2d2d2d;
    stroke-width: 0;
    stroke: #2d2d2d;
}

svg.selected {
    stroke-width: 2;
    stroke: rgb(29, 248, 230);
}

.image-tile {
    position: absolute;
}

.background-tile {
    position: static;
}

.lizard {
    background-image: url("../assets/lizard.png");
    background: url("../assets/lizard.png") no-repeat center;
    background-size: cover;
}

/* todo move background images somewhere higher up the chain */
.evil-red {
    background: url("../assets/EggBitDungeon/EggBitDungeon_EvilRed.png") 0px 0px no-repeat;
}

.monochrome {
    background: url("../assets/EggBitDungeon/EggBitDungeon_Monochrome.png") 0px 0px no-repeat;
}

.cold-blue {
    background: url("../assets/EggBitDungeon/EggBitDungeon_ColdBlue.png") 0px 0px no-repeat;
}

.eerie-purple {
    background: url("../assets/EggBitDungeon/EggBitDungeon_EeriePurple.png") 0px 0px no-repeat;
}

.gred {
    background: url("../assets/EggBitDungeon/EggBitDungeon_Gred.png") 0px 0px no-repeat;
}

.sandy-brown {
    background: url("../assets/EggBitDungeon/EggBitDungeon_SandyBrown.png") 0px 0px no-repeat;
}

.pixel-art {
    background: url("../assets/PixelArt/PixelArtPalette.png") 0px 0px no-repeat;
}
</style>
  