;(function () {
  'use strict'

  // Same-origin proxy; the server adds the credentials.
  var ENDPOINT = '/feedback-proxy/submit'

  var section = document.querySelector('.page-feedback')
  if (!section) return

  var prompt = section.querySelector('.page-feedback-prompt')
  var thanks = section.querySelector('.page-feedback-thanks')
  var dialog = section.querySelector('.page-feedback-dialog')
  var form = section.querySelector('.page-feedback-form')
  var title = section.querySelector('.page-feedback-dialog-title')
  var comment = section.querySelector('.page-feedback-comment')
  var error = section.querySelector('.page-feedback-error')
  var cancel = section.querySelector('.page-feedback-cancel')
  var submit = section.querySelector('.page-feedback-submit')
  var votes = section.querySelectorAll('.page-feedback-vote')
  var reasonSets = section.querySelectorAll('.page-feedback-reasons')
  var reasonBoxes = section.querySelectorAll('.page-feedback-reasons input')
  var helpful = null

  // <dialog> is missing on old browsers; hide the widget rather than offer a broken one.
  if (typeof dialog.showModal !== 'function') {
    section.hidden = true
    return
  }

  for (var i = 0; i < votes.length; i++) {
    votes[i].addEventListener('click', openDialog)
  }

  function openDialog (e) {
    helpful = e.currentTarget.getAttribute('data-helpful') === 'true'
    for (var i = 0; i < votes.length; i++) votes[i].classList.toggle('is-selected', votes[i] === e.currentTarget)
    title.textContent = helpful
      ? 'Thanks for your feedback! Anything else you’d like to tell us?'
      : 'Sorry this didn’t help.'
    for (var j = 0; j < reasonSets.length; j++) {
      reasonSets[j].hidden = reasonSets[j].getAttribute('data-helpful') !== String(helpful)
    }
    for (var k = 0; k < reasonBoxes.length; k++) reasonBoxes[k].checked = false
    comment.value = ''
    error.hidden = true
    setBusy(false)
    dialog.showModal()
  }

  cancel.addEventListener('click', function () {
    dialog.close()
  })

  // Closing without sending (Cancel, Esc, backdrop) discards the vote.
  dialog.addEventListener('close', function () {
    if (thanks.hidden) {
      for (var i = 0; i < votes.length; i++) votes[i].classList.remove('is-selected')
    }
  })

  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close()
  })

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    error.hidden = true
    setBusy(true)
    send()
      .then(function () {
        prompt.hidden = true
        thanks.hidden = false
        dialog.close()
      })
      .catch(function () {
        error.hidden = false
        setBusy(false)
      })
  })

  function send () {
    var h1 = document.querySelector('article.doc h1.page')
    return window.fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        helpful: helpful,
        reasons: selectedReasons(),
        comment: comment.value.trim() || null,
        pageUrl: window.location.origin + window.location.pathname,
        pageTitle: h1 ? h1.textContent.trim() : document.title,
        component: section.getAttribute('data-component') || null,
        componentTitle: section.getAttribute('data-component-title') || null,
        version: section.getAttribute('data-version') || null,
        module: section.getAttribute('data-module') || null,
      }),
    }).then(function (resp) {
      if (!resp.ok) throw new Error('HTTP ' + resp.status)
      return resp.json()
    }).then(function (data) {
      // The endpoint can answer 200 with status ERROR.
      if (!data || data.status !== 'OK') throw new Error((data && data.message) || 'Rejected')
    })
  }

  // Only the fieldset of the current vote: both lists have an "other" box.
  function selectedReasons () {
    var codes = []
    for (var i = 0; i < reasonBoxes.length; i++) {
      var box = reasonBoxes[i]
      if (box.checked && !box.closest('.page-feedback-reasons').hidden) codes.push(box.value)
    }
    return codes
  }

  function setBusy (busy) {
    submit.disabled = busy
    cancel.disabled = busy
    comment.readOnly = busy
    for (var i = 0; i < reasonBoxes.length; i++) reasonBoxes[i].disabled = busy
    submit.textContent = busy ? 'Sending…' : 'Send feedback'
  }
})()
