<script setup>
import { onBeforeMount, ref, watch } from 'vue';

const props = defineProps(['selectedTask']);
const task = ref({});

watch(() => task.value, () => {
  console.log('switching task');
});

onBeforeMount(() => {
  task.value = props.selectedTask;
});
</script>

<template>
  <v-card class="pa-8">
    {{ task }}
  </v-card>
</template>
