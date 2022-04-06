<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  transferData: {
    type: Object,
    required: true
  }
})

function onDrag(e) {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.dropEffect = 'move'
  e.dataTransfer.setData('payload', JSON.stringify(props.transferData))
}
</script>

<template>
  <div
    class="supercalifragiliousexpialidocius"
    draggable="true"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template> 
