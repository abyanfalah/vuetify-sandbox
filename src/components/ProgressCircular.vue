<script setup>
const props = defineProps(['size', 'width', 'color']);

</script>

<template>
  <v-progress-circular indeterminate
                       :width="props.width"
                       :size="props.size"
                       :color="props.color ?? 'warning'"></v-progress-circular>
</template>
