<script setup >
import { defineEmits } from 'vue'

const emit = defineEmits(['drop'])

function onDrop(e) {
  const transferData = JSON.parse(e.dataTransfer.getData('payload'))
  emit('drop', transferData)
}
</script>

<template>
  <div @drop.self="onDrop" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>
