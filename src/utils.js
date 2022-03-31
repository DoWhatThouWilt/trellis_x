export function saveStatePlugin(store) {
  store.subscribe(
    (_mutation, state) => {
      localStorage.setItem(
        'board',
        JSON.stringify(state.board)
      )
    }
  )
}
