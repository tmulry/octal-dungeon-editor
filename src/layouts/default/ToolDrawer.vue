<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item title="Tools"></v-list-item>
      <v-list-item>
        <Palette :tile-set="store.activeToolSet.tileSet" />
      </v-list-item>
      <v-list-item>
        <ColorSelector @color-selected="onSelectedTileSet" />
      </v-list-item>
      <v-list-item>
        <v-container>
          <v-row @click="methods.toggleGrid" align="stretch">
            <v-col cols="3" class="d-flex justify-center align-center">
              <svg :class="{ 'grid-enabled': store.activeToolSet.showGrid }" :width="toolIconHeight"
                :height="toolIconWidth">
                <rect :width="toolIconHeight" :height="toolIconWidth" style="fill:none" />
              </svg>
            </v-col>

            <v-col cols="9">
              <button class="p1">{{ store.activeToolSet.showGrid ? 'Hide Grid' : 'Show Grid' }}</button>
            </v-col>
          </v-row>
        </v-container>
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
import { injectStrict } from '@/utils/injectStrict';
import { DataStoreKey } from '@/types/symbols'



const { store, methods } = injectStrict(DataStoreKey);



const toolIconHeight = 32;
const toolIconWidth = 32;

const onSelectedTileSet = (selectedSet: string) => {
  methods.setSelectedTileSet(selectedSet)
}


</script>

<style scoped>
.grid-enabled {
  background: url("@/assets/ToolIcons/grid-enabled.png") 0px 0px no-repeat;
}
</style>
