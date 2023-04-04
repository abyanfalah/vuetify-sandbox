<script setup>
const props = defineProps(['size', 'width']);

</script>

<template>
  <v-progress-circular indeterminate
                       :width="props.width"
                       :size="props.size"
                       color="orange lighten-1"></v-progress-circular>
</template>
