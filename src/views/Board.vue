<script setup>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const store = useStore()
const board = computed(() => store.state.board)

const route = useRoute()
const router = useRouter()

const isTaskOpen = computed(() => { return route.name === 'task' })

function goToTask(task) {
  router.push({ name: 'task', params: { id: task.id } })
}

function close() {
  router.push({ name: 'board' })
}

function createTask(event, tasks) {
  store.commit('create_task', {
    tasks, // tasks: tasks
    name: event.target.value
  })
  event.target.value = ''
}

function pickupTask(e, taskIndex, fromColumnIndex) {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.dropEffect = 'move'

  e.dataTransfer.setData('type', 'task')
  e.dataTransfer.setData('task-index', taskIndex)
  e.dataTransfer.setData('from-column-index', fromColumnIndex)
}

function pickupColumn(e, fromColumnIndex) {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.dropEffect = 'move'

  e.dataTransfer.setData('type', 'column')
  e.dataTransfer.setData('from-column-index', fromColumnIndex)
}

function moveTask(e, toTasks, board) {
  const fromColumnIndex = e.dataTransfer.getData('from-column-index')
  const fromTasks = board.columns[fromColumnIndex].tasks
  const taskIndex = e.dataTransfer.getData('task-index')

  store.commit('move_task', {
    fromTasks: fromTasks,
    toTasks: toTasks,
    taskIndex: taskIndex
  })
}
</script>

<template>
  <div class="board">
    <div class="flex items-start">
      <div
        class="column"
        :key="column.name"
        v-for="(column, $columnIndex) of board.columns"
        @drop="moveTask($event, column.tasks, board)"
        @dragover.prevent
        @dragenter.prevent
        draggable="true"
        @dragstart.self="pickupColumn($event, $columnIndex)"
      >
        <div class="flex items-center mb-2 font-bold">{{ column.name }}</div>
        <div
          class="task"
          :key="task.uuid"
          v-for="(task, $taskIndex) of column.tasks"
          draggable="true"
          @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
          @click="goToTask(task)"
        >
          <span class="w-full flex-shrink-0 font-bold">{{ task.name }}</span>
          <p
            v-if="task.description"
            class="w-full flex-shrink-0 mt-1 text-sm"
          >{{ task.description }}</p>
        </div>
        <input
          @keyup.enter="createTask($event, column.tasks)"
          type="text"
          class="block p-2 w-full bg-transparent"
          placeholder="+ Enter new task"
        />
      </div>
    </div>
    <div class="task-bg" @click.self="close" v-if="isTaskOpen">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="css">
.task {
  @apply flex items-center flex-wrap shadow mb-2 p-2 rounded bg-white text-gray-900;
}
.column {
  @apply bg-gray-200 p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
.board {
  @apply p-4 bg-teal-700 h-screen overflow-auto;
}
.task-bg {
  @apply absolute inset-0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
