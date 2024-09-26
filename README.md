# ![](favicon.ico) Ring

Minimalist and functional javascript state manager.

[![Demo](https://img.shields.io/badge/Demo-blue)](https://marcodpt.github.io/ring/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Tag](https://img.shields.io/github/v/tag/marcodpt/ring)](https://github.com/marcodpt/ring/tags)
[![bundlejs](https://deno.bundlejs.com/badge?q=https://raw.githubusercontent.com/marcodpt/ring/main/index.js&treeshake=[{default}])](https://bundlejs.com/?q=https://raw.githubusercontent.com/marcodpt/ring/main/index.js&treeshake=[{default}])

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

[![Demo](https://img.shields.io/badge/Demo-blue)](https://marcodpt.github.io/ring/examples/simple.html)

```js
import ring from "https://cdn.jsdelivr.net/gh/marcodpt/ring/index.js"

ring({
  init: 0,
  builder: update => ({
    inc: () => update(count => count + 1)
  }),
  view: (count, {inc}) => {
    if (window.confirm(`Count is ${count}. Increment?`)) {
      inc()
    }
  }
})
```

## 💯 Examples

 - Counter:
[![Demo](https://img.shields.io/badge/Demo-blue)](https://marcodpt.github.io/ring/examples/counter.html)
[![Source](https://img.shields.io/badge/Source-gray)](https://github.com/marcodpt/ring/blob/main/examples/counter.html)
 - Todo:
[![Demo](https://img.shields.io/badge/Demo-blue)](https://marcodpt.github.io/ring/examples/todo.html)
[![Source](https://img.shields.io/badge/Source-gray)](https://github.com/marcodpt/ring/blob/main/examples/todo.html)
 - Clock:
[![Demo](https://img.shields.io/badge/Demo-blue)](https://marcodpt.github.io/ring/examples/clock.html)
[![Source](https://img.shields.io/badge/Source-gray)](https://github.com/marcodpt/ring/blob/main/examples/clock.html)
 - Stopwatch:
[![Demo](https://img.shields.io/badge/Demo-blue)](https://marcodpt.github.io/ring/examples/stopwatch.html)
[![Source](https://img.shields.io/badge/Source-gray)](https://github.com/marcodpt/ring/blob/main/examples/stopwatch.html)
 - Lazy DB:
[![Demo](https://img.shields.io/badge/Demo-blue)](https://marcodpt.github.io/ring/examples/lazy_db.html)
[![Source](https://img.shields.io/badge/Source-gray)](https://github.com/marcodpt/ring/blob/main/examples/lazy_db.html)

## 📖 API

### ring({init, builder, view}) => stop

#### init: _
The initial `state` of the `ring`. It can be any type of data.

#### builder: (update, dispatch) => events
This function is called before starting the `ring` and must return the events
that will be heard.

##### update: (state => newState) => ()
Receives a `setter` to `update` the `state` and call `view` with the
`newState`.

##### dispatch: (event, ...args) => ()
It will call the `event` with `args`, if it exists in the `events` object.

##### events: {init, ...events, done}
Object with the `events` that will be heard when running the `ring`.

##### init: state => ()
Special `event` called at startup.

##### event: (...args) => ()
The function signature of a user-defined `event` can have any name.

##### done: state => ()
Special `event` triggered when `stop` is called.

#### view: (state, events) => ()
Updates the `view` of the `ring`, it is always called after an `update` or when
starting.

#### stop: () => ()
Returns a function that `stops` the `ring`.

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

## 📢 Motivation
I was extremely delighted and impressed with
[Hyperapp](https://github.com/jorgebucaran/hyperapp) and
[Raj](https://github.com/andrejewski/raj) when I started using them.

But some things started to bother me:
 - `view` receives `dispatch` in [Raj](https://github.com/andrejewski/raj),
which implies that `actions` are not static, and with each call to `view` new
`actions` are generated.
 - [Hyperapp](https://github.com/jorgebucaran/hyperapp) achieves static
`actions` by placing them outside the `app`. Which in my opinion breaks the
paradigm of a pure, internal execution environment.
 - It's hard to know the `state` within `dispatch` calls when it involves
concurrent asynchronous calls both in
[Raj](https://github.com/andrejewski/raj) and in
[Hyperapp](https://github.com/jorgebucaran/hyperapp).
 - I can't understand [Hyperapp](https://github.com/jorgebucaran/hyperapp)'s
`effects` API to this day.
 - It's very difficult to separate layout from javascript logic in
[Hyperapp](https://github.com/jorgebucaran/hyperapp)'s `views`.

What would I want from a state management library?
 - The `actions` define static `events` within the `app`, and these could be
called from each other, also functioning as a library.
 - `State` `updates` must be explicit and always carry the current `state`
value, regardless of the asynchronous sequence of execution.
 - It will be isolated, tiny, easy to understand and there will be no reason
for me to want to modify the [API](#-api). Without integrating
[vDom](https://github.com/jorgebucaran/superfine),
[template engine](https://github.com/marcodpt/tint),
[routing](https://github.com/marcodpt/wand),
and others.

So I decided to try to create my state management library, to serve as a solid
foundation for more [complex problems](https://github.com/marcodpt/merlin).

And I'm happy with the result!
