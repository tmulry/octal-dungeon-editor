<template>
  <v-app>

    <default-bar></default-bar>

    <ToolDrawer @toolSetUpdated="changeTileType" />

    <LevelDrawer />

    <v-main color="black">
      <MapView :tool-set="activeToolSet" />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import MapView from '../../components/MapView.vue'
import ToolDrawer from './ToolDrawer.vue'
import LevelDrawer from './LevelDrawer.vue'
import { Ref, ref } from 'vue';
import { ToolSet } from '@/types/tool-set';

// const selectedTileType: Ref<String | undefined> = ref(undefined);
const activeToolSet: Ref<ToolSet | undefined> = ref({

});

const changeTileType = (toolSet: ToolSet) => {
  // todo having to handle props in a layout file is super annoying I should learn vuex
  // todo make this handle color changes also in a  single "PaletteData" object
  activeToolSet.value = toolSet
}

</script>
