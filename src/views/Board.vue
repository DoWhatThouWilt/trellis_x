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
</script>

<template>
  <div class="board">
    <div class="flex items-start">
      <div class="column" :key="column.name" v-for="column of board.columns">
        <div class="flex items-center mb-2 font-bold">{{ column.name }}</div>
        <div class="task" @click="goToTask(task)" :key="task.uuid" v-for="task of column.tasks">
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
