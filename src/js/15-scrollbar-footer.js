;(function () {
  'use strict'

  var footer = document.querySelector('footer.footer')
  if (!footer) return

  var root = document.documentElement

  // Visible height of the footer, so the page scrollbar track ends where the footer starts.
  function update () {
    var visible = Math.max(0, Math.min(footer.offsetHeight, window.innerHeight - footer.getBoundingClientRect().top))
    root.style.setProperty('--nds-sb-footer', Math.round(visible) + 'px')
  }

  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  update()
})()
