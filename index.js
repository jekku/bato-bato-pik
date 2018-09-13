'use strict'

const picks = {
  rock: 0,
  paper: 0,
  scissors: 0
}

let cpuScore = 0
let humanScore = 0
const botPicks = document.querySelectorAll('.bot-choice')

document
  .querySelectorAll('.choice')
  .forEach((button) => {
    button.onclick = function () {
      picks[this.dataset.pick]++
      const probabilityTable = getProbabilityTable(picks)
      const choice = makeChoice(probabilityTable)
      showChoice(choice)
      decideWinner(this.dataset.pick, choice)
      showScores()
    }
  })

const decideWinner = (humanPick, botPick) => {
  if (humanPick === botPick) return
  if (humanPick === 'rock' && botPick === 'scissors') humanScore++
  else if (humanPick === 'paper' && botPick === 'rock') humanScore++
  else if (humanPick === 'scissors' && botPick === 'paper') humanScore++
  else cpuScore++
}
const showScores = () => {
  document.querySelector('.score.-bot').innerHTML = cpuScore
  document.querySelector('.score.-human').innerHTML = humanScore
}
const showChoice = (choice) => {
  botPicks.forEach(el => el.classList.add('-hidden'))
  const img = [...botPicks]
    .find(el => el.classList.contains(`-${choice}`))
    .classList.remove('-hidden')
}
const getProbabilityTable = (picks) => {
  const total = Object
    .keys(picks)
    .reduce((acc, pick) => acc + picks[pick], 0)

  return {
    rock: picks.rock / total,
    paper: picks.paper / total,
    scissors: picks.scissors / total
  }
}

const makeChoice = (probabilityTable) => {
  const random = Math.random()
  if (random <= probabilityTable.rock) return 'paper'
  if (random <= (probabilityTable.rock + picks.paper)) return 'scissors'
  if (random <= (probabilityTable.rock + picks.paper + picks.scissors)) return 'rock'
}
