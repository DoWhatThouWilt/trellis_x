import { createWebHistory, createRouter } from 'vue-router'
import Board from './views/Board.vue'
import Task from './views/Task.vue'

const routes = [
  {
    path: '/',
    name: 'board',
    component: Board,
    children: [
      {
        path: 'task/:id',
        name: 'task',
        component: Task
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
