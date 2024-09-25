export default ({init, builder, view}) => {
  var state
  var isRunning = false

  const dispatch = (event, ...args) => {
    if (isRunning && typeof events[event] == 'function') {
      events[event](...args)
    }
  }

  const update = setter => {
    if (isRunning) {
      state = setter(state)
      view(state, events)
    }
  }

  const events = builder(update, dispatch)
  isRunning = true
  update(() => init)
  dispatch('init', state)

  return () => {
    dispatch('done', state)
    isRunning = false
  }
}
