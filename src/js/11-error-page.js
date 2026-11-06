;(function () {
  'use strict'

  // "Go Back" on the 404 page returns to the previous page; its href (start
  // page) only applies in a fresh tab, where there is no history to go back to.
  var button = document.querySelector('.error-page-back')
  if (!button) return

  button.addEventListener('click', function (e) {
    if (window.history.length < 2) return
    e.preventDefault()
    window.history.back()
  })
})()
