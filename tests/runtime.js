import ring from '../index.js'

QUnit.test('runtime', assert => {
  assert.expect(14)
  const end = assert.async()
  var i = 0
  const R = [
    'base',
    'base -> init',
    'next (1.init)',
    'next (1.init) -> click',
    'next (2.click)',
    'next (4.view)',
    'lie -> done',
    'next (3.done)',
    'another lie -> init',
    'next (1.init)',
    'next (1.init) -> done',
    'next (3.done)'
  ]
  const kill = ring({
    init: 'base',
    register: (update, dispatch) => ({
      init: state => {
        update(() => `${state} -> init`)
        dispatch('next', 'init', 1)
      },
      next: (a, b) => update(() => `next (${b}.${a})`),
      click: () => {
        update(state => `${state} -> click`)
        dispatch('next', 'click', 2)
      },
      done: state => {
        update(() => `${state} -> done`)
        dispatch('next', 'done', 3)
      }
    }),
    view: (state, {init, next, click, done}) => {
      assert.deepEqual(state, R[i++])
      if (i == 3) {
        click()
      } else if (i == 5) {
        next('view', 4)
      } else if (i == 6) {
        done('lie')
      } else if (i == 8) {
        init('another lie')
      } else if (i == 12) {
        setTimeout(() => {
          assert.deepEqual(true, true, 'must run!')
          init('killed')
          click()
          next('killed', 'dead', 5)
          done('killed')
          end()
        })
      } else if (i > 12) {
        assert.deepEqual(true, false, 'cannot run after killed')
      }
    }
  })
  assert.deepEqual(i, 10)
  kill()
  kill()
  kill()
})
