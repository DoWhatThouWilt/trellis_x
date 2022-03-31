<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const route = useRoute()

const store = useStore()
const task = computed(() => store.getters.getTask(route.params.id))

/*
The computed property from the store, task, was not getting passed into the mutation by direct
reference to it... in Vue 2 passing this.task worked. In Vue 3, the task had to be passed into
the event handler in the template in order for it to get to the mutation, and thus change the state.
*/
function updateTaskProperty(event, key, task) {
  store.commit('update_task', {
    task,
    key,
    value: event.target.value
  })
}

</script>

<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input
        type="text"
        @change="updateTaskProperty($event, 'name', task)"
        @keyup.enter="updateTaskProperty($event, 'name', task)"
        :value="task.name"
        class="p-2 mr-2 flex-grow w-full text-xl font-bold"
      />
      <textarea
        :value="task.description"
        @change="updateTaskProperty($event, 'description', task)"
        class="relative bg-transparent px-2 border w-full mt-2 h-64 border-none"
      ></textarea>
    </div>
  </div>
</template>

<style>
.task-view {
  @apply relative flex bg-white inset-0 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
