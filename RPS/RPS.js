const computerHand = document.getElementById('conputer-hand')
const yourHand = document.getElementById('your-hand')
const controller = document.getElementById('controller')
const computerScoreboard = document.getElementById('computer-scoreboard')
const yourScoreboard = document.getElementById('your-scoreboard')
const resetBtn = document.getElementById('reset-btn')
let computerScore = 0
let yourScore = 0
let isBtnsActive = 1

controller.addEventListener('click', function (e) {
    if (e.target.classList.contains('icon') && isBtnsActive) {
        const yourMove = e.target.id
        const computerMove = getComputerMove()
        renderHand(yourMove, 'y')
        renderHand(computerMove, 'c')
        setTimeout(function () { calcScore(yourMove, computerMove) }, 800)
        setTimeout(decideWinner, 1300)
    }
})

resetBtn.addEventListener('click', function () {
    computerScore = 0
    yourScore = 0
    computerScoreboard.textContent = computerScore
    yourScoreboard.textContent = yourScore
    document.getElementById('container').style.removeProperty('filter')
    document.getElementById('white-bg').style.display = 'none'
    document.getElementById('result').style.display = 'none'
    document.body.style.backgroundColor = 'whitesmoke'
})

function getComputerMove() {
    let conputerMove = ''
    randomNum = Math.floor(Math.random() * 3)
    if (randomNum === 0) {
        conputerMove = 'scissor'
    } else if (randomNum === 1) {
        conputerMove = 'rock'
    } else {
        conputerMove = 'paper'
    }
    return conputerMove
}

function renderHand(move, player) {
    isBtnsActive = 0
    if (player === 'y') {
        yourHand.classList.add('transform1')
        setTimeout(function () {
            yourHand.classList.remove('transform1')
            yourHand.classList.add('transform2')
        }, 700)
        setTimeout(function () {
            yourHand.setAttribute('src', `images/${move}-${player}.png`)
        }, 800)
        setTimeout(function () {
            yourHand.classList.remove('transform2')
        }, 1000)
    } else {
        computerHand.classList.add('transform3')
        setTimeout(function () {
            computerHand.classList.remove('transform3')
            computerHand.classList.add('transform2')
        }, 700)
        setTimeout(function () {
            computerHand.setAttribute('src', `images/${move}-${player}.png`)
        }, 800)
        setTimeout(function () {
            computerHand.classList.remove('transform2')
        }, 1000)
    }
}

function calcScore(yourMove, computerMove) {
    if ((yourMove === 'scissor' && computerMove === 'paper') || (yourMove === "rock" && computerMove === 'scissor') || (yourMove === 'paper' && computerMove === 'rock')) {
        yourScore += 1
        yourScoreboard.textContent = yourScore
        document.body.style.backgroundColor = '#CAFFBF'
    } else if ((yourMove === 'scissor' && computerMove === 'rock') || (yourMove === "rock" && computerMove === 'paper') || (yourMove === 'paper' && computerMove === 'scissor')) {
        computerScore += 1
        computerScoreboard.textContent = computerScore
        document.body.style.backgroundColor = '#FFADAD'
    } else {
        document.body.style.backgroundColor = '#FDFFB6'
    }
}

function decideWinner() {
    isBtnsActive = 1
    if (yourScore === 2) {
        document.getElementById('result-text').textContent = '당신이 이겼습니다!'
        document.getElementById('container').style.filter = 'blur(5px)'
        document.getElementById('white-bg').style.display = 'block'
        document.getElementById('result').style.display = 'flex'
    } else if (computerScore === 2) {
        document.getElementById('result-text').textContent = '컴퓨터가 이겼습니다!'
        document.getElementById('container').style.filter = 'blur(5px)'
        document.getElementById('white-bg').style.display = 'block'
        document.getElementById('result').style.display = 'flex'
    }
}