import { createStore } from "vuex"
import defaultBoard from './default-board'
import { saveStatePlugin } from './utils'
import { v4 as uuid } from "uuid"

const board = JSON.parse(localStorage.getItem('board')) ||
  defaultBoard

export default createStore({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask(state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    create_task(_state, { tasks, name }) {
      // tasks are sent from the board (state?), 
      // returns modified copy of ALL tasks? the idea is the mutations are the only methods that
      // modify the state. So modifying the tasks sent from the board modifies the state?
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    update_task(_state, { task, key, value }) {
      task[key] = value
    }
  }
})

