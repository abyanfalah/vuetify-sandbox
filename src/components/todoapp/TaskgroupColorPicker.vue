<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['selectedTaskGroup']);
const emits = defineEmits(['changeColor']);

const selectedColor = ref();

watch(selectedColor, (val) => {
  console.log(val);
})


</script>

<template>
  <v-color-picker hide-canvas
                  hide-inputs
                  hide-sliders
                  v-model="selectedColor"
                  width="100%"
                  show-swatches>asdfa</v-color-picker>
</template>
