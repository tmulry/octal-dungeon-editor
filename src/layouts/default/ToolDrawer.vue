<template>
  <v-navigation-drawer permanent color="black">
    <v-list>
      <v-list-item title="Tools"></v-list-item>
      <v-list-item>
        <Palette :tile-set="activeToolSet.tileSet" @tile-type-selected="onSelectedTileType" />
      </v-list-item>
      <v-list-item>
        <ColorSelector @color-selected="onSelectedTileSet" />
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>


<script lang="ts" setup>
// todo rename palette to toolset
// todo add selector to make tile-set selectable
// todo add "selected tile" view
// todo add 'hide grid' that will set all bg squares to black
// todo add a rotate tool and 'r' key rotate shortcut
// add a randomizer.  when randomized, multiple tiles can be selected and 
// a checkbox can be checked to enter random tiles at a random rotation.
// feature: pull presets from stone soup vaults https://github.com/crawl/crawl/blob/master/crawl-ref/source/dat/des/arrival/simple.des
// feature: add a fill tool?
// feature: store previous grid state, and allow cmd+z (definitely a good use case for pinia)
// feature: change grid size
// new tile ideas: open door, deep and shallow water, tree

import Palette from '@/components/Palette.vue'
import ColorSelector from '@/components/ColorSelector.vue';
import { reactive } from 'vue';
import { ToolSet } from '@/types/tool-set';


const activeToolSet: ToolSet = reactive({
  tileSet: 'monochrome',
  tileType: '00',
  showGrid: true
})


const onSelectedTileSet = (selectedSet: string) => {
  activeToolSet.tileSet = selectedSet
  emit('toolSetUpdated', activeToolSet)

}

const emit = defineEmits(['toolSetUpdated'])

const onSelectedTileType = (tileType: string) => {
  activeToolSet.tileType = tileType
  emit('toolSetUpdated', activeToolSet)
}

</script>
