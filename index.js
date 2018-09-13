'use strict'

const picks = []

document
  .querySelectorAll('.choice')
  .forEach((button) => {
    button.onclick = function () {
      picks.push(this.dataset.pick)
    }
  })
