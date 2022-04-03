<script setup>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import BoardColumn from '../components/BoardColumn.vue'

const store = useStore()
const board = computed(() => store.state.board)

const route = useRoute()
const router = useRouter()

const isTaskOpen = computed(() => { return route.name === 'task' })

const newColumnName = ref('')

function close() {
  router.push({ name: 'board' })
}

function createColumn() {
  store.commit('create_column', {
    name: newColumnName.value
  })
  newColumnName.value = ''
}

</script>

<template>
  <div class="board">
    <div class="flex items-start">
      <BoardColumn
        :key="column.name"
        v-for="(column, $columnIndex) of board.columns"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
      />

      <div class="column flex">
        <input
          class="p-2 mr-2 flex-grow"
          type="text"
          placeholder="Name of New Column"
          v-model="newColumnName"
          @keyup.enter="createColumn"
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
