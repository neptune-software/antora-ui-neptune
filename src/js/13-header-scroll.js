;(function () {
  'use strict'

  var root = document.documentElement

  function update () {
    root.classList.toggle('nds-scrolled', window.scrollY > 0)
  }

  update()
  window.addEventListener('scroll', update, { passive: true })
})()
