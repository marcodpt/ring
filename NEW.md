# ![](favicon.ico) Ring

Minimalist and functional javascript state manager.

  [![Demo](https://img.shields.io/badge/Demo-blue)](https://marcodpt.github.io/ring/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![GitHub Tag](https://img.shields.io/github/v/tag/marcodpt/ring)](https://github.com/marcodpt/ring/tags)

## ❤️ Features
 - [ES6 module](https://github.com/marcodpt/ring/blob/main/index.js).
 - Pure functional design.
 - View layer agnostic.
 - [Tiny codebase](https://github.com/marcodpt/ring/blob/main/index.js),
very understandable.
 - Designed following the principles of
[UNIX philosophy](https://en.wikipedia.org/wiki/Unix_philosophy).
 - Very well [tested](https://marcodpt.github.io/ring/tests/).
 - Ridiculously small [API](#-api). After reading this file you will
understand `Ring` better than me.

## 💡 Showcase
A counter that increments by one every time the user confirms.

[![Demo](https://img.shields.io/badge/Demo-blue)](https://marcodpt.github.io/ring/)

```js
import ring from "https://cdn.jsdelivr.net/gh/marcodpt/ring/index.js"

ring({
  init: [0],
  update: (message, state) => {
    return [state + 1]
  },
  view: (state, dispatch) => {
    if (window.confirm(`Count is ${state}. Increment?`)) {
      dispatch()
    }
  }
})
```

## 📖 API

### app({init, builder, view}) => stop

#### init: _
The initial `state` of the `app`. It can be any type of data.

#### builder: (update, dispatch) => events
This function is called before starting the app and must return the events that
will be heard in the app.

##### update: (state => newState) => ()
Receives a `setter` to `update` the `state` and call `view` with the
`newState`.

##### dispatch: (event, ...args) => ()
It will call the `event` with `args`, if it exists in the `events` object.

##### events: {init: () => (), event: (...args) => (), done: () => ()}
Object with the `events` that will be heard when running the `app`.

##### init: () => ()
Special event called when starting `app`.

##### done: () => ()
Special event called when `app` ends.

#### view: (state, events) => ()
Updates the `view` of the `app`, it is always called after an `update` or when
starting.

#### stop: () => ()
Returns a function that `stops` the `app`.

## 📦 Projects using this module
If your project is not on the list, submit a pull request, it is a way to
increase awareness of your project and this module.

 - [Merlin](https://github.com/marcodpt/merlin): A functional JS framework that
values elegance, simplicity and minimalism. 

## 🤝 Contributing
It's a very simple project.
Any contribution, any feedback is greatly appreciated.

## ⭐ Support
If this project was useful to you, consider giving it a star on github, it's a
way to increase evidence and attract more contributors.

## 🙏 Acknowledgment
This work is hugely influenced by these amazing projects:
 - [raj](https://github.com/andrejewski/raj)
 - [hyperapp](https://github.com/jorgebucaran/hyperapp)
 - [elm](https://github.com/elm)
 - [vue](https://github.com/vuejs/vue)

A huge thank you to all the people who contributed to these projects.
