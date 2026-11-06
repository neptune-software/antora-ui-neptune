;(function () {
  'use strict'

  var rail = document.querySelector('.persona-rail')
  if (!rail) return

  var items = rail.querySelectorAll('.persona-item')
  var cards = Array.prototype.slice.call(document.querySelectorAll('.edition-card, .landing-featured'))

  function setInert (card, inert) {
    card.classList.toggle('is-dimmed', inert)
    if (inert) card.setAttribute('aria-disabled', 'true')
    else card.removeAttribute('aria-disabled')
    card.querySelectorAll('a').forEach(function (link) {
      if (inert) link.setAttribute('tabindex', '-1')
      else link.removeAttribute('tabindex')
    })
  }

  items.forEach(function (item) {
    item.addEventListener('click', function () {
      var persona = item.dataset.persona

      items.forEach(function (i) {
        i.classList.remove('is-active')
      })
      item.classList.add('is-active')

      var dimmed = []
      cards.forEach(function (card) {
        var personas = (card.dataset.personas || '').split(' ')
        var matches = persona === 'general-user' || personas.indexOf(persona) !== -1

        setInert(card, !matches)
        if (matches) card.parentNode.appendChild(card)
        else dimmed.push(card)
      })
      dimmed.forEach(function (card) {
        card.parentNode.appendChild(card)
      })
    })
  })
})()
