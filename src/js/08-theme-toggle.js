/* global localStorage */
;(function () {
  var STORAGE_KEY = 'neptune-docs-theme'
  var MQ = window.matchMedia('(prefers-color-scheme: dark)')

  // Map retired stored theme values to dark.
  function getStored () {
    var stored
    try {
      stored = localStorage.getItem(STORAGE_KEY)
    } catch (e) {}
    stored = stored || 'system'
    return stored.indexOf('dark') === 0 ? 'dark' : stored
  }

  function applyTheme (stored) {
    var isDark = stored === 'system' ? MQ.matches : stored === 'dark'
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    updateButtons(stored)
  }

  function updateButtons (stored) {
    var btns = document.querySelectorAll('.theme-switch-btn')
    for (var i = 0; i < btns.length; i++) {
      var active = btns[i].getAttribute('data-theme-value') === stored
      btns[i].classList.toggle('is-active', active)
      btns[i].setAttribute('aria-pressed', active ? 'true' : 'false')
    }
  }

  function setTheme (value) {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch (e) {}
    applyTheme(value)
  }

  applyTheme(getStored())

  MQ.addEventListener('change', function () {
    if (getStored() === 'system') applyTheme('system')
  })

  document.addEventListener('DOMContentLoaded', function () {
    updateButtons(getStored())
    var btns = document.querySelectorAll('.theme-switch-btn')
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        setTheme(this.getAttribute('data-theme-value'))
      })
    }
  })
})()
