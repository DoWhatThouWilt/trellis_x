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

export function moveTaskOrColumn(e, toTasks, board, toColumnIndex, toTaskIndex, store) {
  const type = e.dataTransfer.getData('type')
  if (type === 'task') {
    moveTask(
      e,
      toTasks,
      board,
      toTaskIndex === undefined ? toTasks.length : toTaskIndex,
      store
    )
  } else {
    moveColumn(e, toColumnIndex, store)
  }
}

export function moveTask(e, toTasks, board, toTaskIndex, store) {
  const fromColumnIndex = e.dataTransfer.getData('from-column-index')
  const fromTasks = board.columns[fromColumnIndex].tasks
  const fromTaskIndex = e.dataTransfer.getData('from-task-index')

  store.commit('move_task', {
    fromTasks: fromTasks,
    toTasks: toTasks,
    fromTaskIndex: fromTaskIndex,
    toTaskIndex: toTaskIndex
  })
}

export function moveColumn(e, toColumnIndex, store) {
  const fromColumnIndex = e.dataTransfer.getData('from-column-index')
  store.commit('move_column', {
    fromColumnIndex: fromColumnIndex,
    toColumnIndex: toColumnIndex
  })
}

