<template>
  <Default />
</template>

<script lang="ts" setup>

import Default from '@/layouts/default/Default.vue'
import { provide } from 'vue';
import store from '@/store'
import { DataStoreKey } from '@/types/symbols'

provide(DataStoreKey, store)

</script>


<style></style>
