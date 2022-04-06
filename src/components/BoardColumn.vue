<script setup>
import { defineProps, computed } from 'vue';
import { useStore } from "vuex";
import { useColumnProps, moveTaskOrColumn } from '../composables/task_and_columns.js'
import ColumnTask from '../components/ColumnTask.vue';

defineProps({
  ...useColumnProps
})

const store = useStore()
const board = computed(() => store.state.board)

function createTask(event, tasks) {
  store.commit('create_task', {
    tasks, // tasks: tasks
    name: event.target.value
  })
  event.target.value = ''
}

function pickupColumn(e, fromColumnIndex) {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.dropEffect = 'move'

  e.dataTransfer.setData('type', 'column')
  e.dataTransfer.setData('from-column-index', fromColumnIndex)
}

</script>

<template>
  <div
    class="column"
    @drop="moveTaskOrColumn($event, column.tasks, board, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    draggable="true"
    @dragstart.self="pickupColumn($event, columnIndex)"
  >
    <div class="flex items-center mb-2 font-bold">{{ column.name }}</div>

    <ColumnTask
      v-for="(task, $taskIndex) of column.tasks"
      :key="task.uuid"
      :task="task"
      :taskIndex="$taskIndex"
      :board="board"
      :column="column"
      :columnIndex="columnIndex"
    />

    <input
      @keyup.enter="createTask($event, column.tasks)"
      type="text"
      class="block p-2 w-full bg-transparent"
      placeholder="+ Enter new task"
    />
  </div>
</template>

<style lang="css">
.column {
  @apply bg-gray-200 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
