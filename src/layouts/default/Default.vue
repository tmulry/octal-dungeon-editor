<template>
  <v-app>

    <default-bar></default-bar>

    <ToolDrawer />

    <!-- someday you'll be able to save and switch between multiple levels here, but not today -->
    <!-- <LevelDrawer /> -->

    <v-main>

      <MapView />

    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import MapView from '../../components/MapView.vue'
import ToolDrawer from './ToolDrawer.vue'


</script>

