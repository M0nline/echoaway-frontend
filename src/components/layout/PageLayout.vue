<template>
  <div class="page-layout" :class="pageClass">
    <q-page :class="pageContentClass">
      <slot />
    </q-page>
  </div>
</template>

<script setup lang="ts">
interface Props {
  pageClass?: string
  pageContentClass?: string
}

withDefaults(defineProps<Props>(), {
  pageClass: '',
  pageContentClass: 'q-pa-md',
})
</script>

<style scoped>
.page-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
