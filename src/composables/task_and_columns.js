import Store from '../store'

export const useColumnProps = {
  column: {
    type: Object,
    required: true
  },
  columnIndex: {
    type: Number,
    required: true
  },
  board: {
    type: Object,
    required: true
  }
}

export function moveTaskOrColumn(e, toTasks, board, toColumnIndex, toTaskIndex) {
  const type = e.dataTransfer.getData('type')
  if (type === 'task') {
    moveTask(
      e,
      toTasks,
      board,
      toTaskIndex === undefined ? toTasks.length : toTaskIndex,
    )
  } else {
    moveColumn(e, toColumnIndex)
  }
}

export function moveTask(e, toTasks, board, toTaskIndex) {
  const fromColumnIndex = e.dataTransfer.getData('from-column-index')
  const fromTasks = board.columns[fromColumnIndex].tasks
  const fromTaskIndex = e.dataTransfer.getData('from-task-index')

  Store.commit('move_task', {
    fromTasks: fromTasks,
    toTasks: toTasks,
    fromTaskIndex: fromTaskIndex,
    toTaskIndex: toTaskIndex
  })
}

export function moveColumn(e, toColumnIndex) {
  const fromColumnIndex = e.dataTransfer.getData('from-column-index')
  Store.commit('move_column', {
    fromColumnIndex: fromColumnIndex,
    toColumnIndex: toColumnIndex
  })
}


