;(function () {
  'use strict'

  var docEl = document.documentElement
  var savedTheme = null
  var unfolded = []
  var prepared = false

  function prepare () {
    if (prepared) return
    prepared = true
    // print on white paper even when a dark theme is active
    if ((savedTheme = docEl.getAttribute('data-theme'))) docEl.removeAttribute('data-theme')
    // unfold collapsible blocks, otherwise their content is missing from the page
    ;[].slice.call(document.querySelectorAll('.doc details:not([open])')).forEach(function (details) {
      details.setAttribute('open', '')
      unfolded.push(details)
    })
    stampSource()
  }

  function stampSource () {
    var url = document.querySelector('.print-header-url')
    if (url) url.textContent = window.location.href.split('#')[0]
    var date = document.querySelector('.print-header-date')
    if (date) date.textContent = new Date().toISOString().split('T')[0]
  }

  function restore () {
    if (!prepared) return
    prepared = false
    if (savedTheme) docEl.setAttribute('data-theme', savedTheme)
    savedTheme = null
    unfolded.forEach(function (details) {
      details.removeAttribute('open')
    })
    unfolded = []
  }

  window.addEventListener('beforeprint', prepare)
  if ('onafterprint' in window) {
    window.addEventListener('afterprint', restore)
  } else if (window.matchMedia) {
    window.matchMedia('print').addListener(function (mql) {
      if (!mql.matches) restore()
    })
  }

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.print-button')
    if (!button) return
    button.addEventListener('click', function () {
      prepare()
      window.print()
    })
  })
})()
