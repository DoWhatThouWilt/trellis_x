<script setup>
import { defineProps, computed } from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { moveTaskOrColumn, useColumnProps } from "../composables/task_and_columns"

defineProps({
  task: {
    type: Object,
    required: true
  },
  taskIndex: {
    type: Number,
    required: true
  },
  ...useColumnProps
})


const store = useStore()
const board = computed(() => store.state.board)

const router = useRouter()

function goToTask(task) {
  router.push({ name: 'task', params: { id: task.id } })
}

function pickupTask(e, taskIndex, fromColumnIndex) {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.dropEffect = 'move'

  e.dataTransfer.setData('type', 'task')
  e.dataTransfer.setData('from-task-index', taskIndex)
  e.dataTransfer.setData('from-column-index', fromColumnIndex)
}

</script>

<template>
  <div
    class="task"
    @click="goToTask(task)"
    draggable="true"
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @dragover="prevent"
    @dragenter="prevent"
    @drop.stop="moveTaskOrColumn($event, column.tasks, board, columnIndex, taskIndex)"
  >
    <!-- stopPropagation from bubbling up from the task to the column, 
          because they are listening for the same event, @drop.  If not for the modifier,
          the event fires twice, first for the task, second for the column, which the event
    bubbles up to.-->

    <span class="w-full flex-shrink-0 font-bold">{{ task.name }}</span>
    <p v-if="task.description" class="w-full flex-shrink-0 mt-1 text-sm">{{ task.description }}</p>
  </div>
</template>



<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 p-2 rounded bg-white text-gray-900;
}
</style>
