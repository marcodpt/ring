import ring from '../index.js'

QUnit.test('should call view() initially', assert => {
  const initialState = 1
  ring({
    init: [initialState],
    view (state) {
      assert.deepEqual(state, initialState)
    }
  })
})

QUnit.test('should call view() after dispatch', assert => {
  let count = 0
  ring({
    init: ['init'],
    update (msg) {
      return [msg]
    },
    view (state, dispatch) {
      count++
      if (state === 'init') {
        return dispatch('next')
      }
      if (state === 'next') {
        return dispatch('done')
      }
      if (state === 'done') {}
    }
  })
  assert.deepEqual(count, 3)
})

QUnit.test('should call done() when stopped', assert => {
  const initialState = 'state'
  const stop = ring({
    init: [initialState],
    update (msg, state) {
      return state
    },
    view () {},
    done (state) {
      assert.deepEqual(state, initialState, 'the state is passed')
    }
  })

  stop()
})

QUnit.test('should not call update/view if stopped', assert => {
  let initialRender = true
  const initialState = 'state'
  const afterKillEffect = dispatch => {
    assert.deepEqual(typeof dispatch, 'function', 'dispatch is passed')
    setTimeout(() => {
      dispatch()
    }, 10)
  }
  const stop = ring({
    init: [initialState, afterKillEffect],
    update () {
      assert.false(true, 'update() should not be called')
    },
    view () {
      if (initialRender) {
        initialRender = false
        assert.true(true, 'view() is called once')
        return
      }

      assert.false(true, 'view() should not be called more than once')
    }
  })

  stop()
})

QUnit.test('should only call done() once', assert => {
  let initialCall = true
  const stop = ring({
    init: [],
    update () {},
    view () {},
    done () {
      if (initialCall) {
        initialCall = false
        assert.true(true, 'done() was called once')
        return
      }

      assert.false(true, 'done() should not be called more than once')
    }
  })

  stop()
  stop()
})
