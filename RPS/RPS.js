const computerHand = document.getElementById('conputer-hand')
const yourHand = document.getElementById('your-hand')
const controller = document.getElementById('controller')
const computerScoreboard = document.getElementById('computer-scoreboard')
const yourScoreboard = document.getElementById('your-scoreboard')
const resetBtn = document.getElementById('reset-btn')
const versus = document.getElementById('versus')
let computerScore = 0
let yourScore = 0
let isBtnsActive = true

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

resetBtn.addEventListener('click', reset)

function reset() {
    computerScore = 0
    yourScore = 0
    computerScoreboard.textContent = computerScore
    yourScoreboard.textContent = yourScore
    document.getElementById('container').style.removeProperty('filter')
    document.getElementById('white-bg').style.display = 'none'
    document.getElementById('result').style.display = 'none'
    document.body.style.backgroundColor = 'whitesmoke'
    yourHand.setAttribute('src', `images/paper-y.png`)
    computerHand.setAttribute('src', `images/paper-c.png`)
    versus.innerHTML = `<img class="versus-img" src="images/versus.png"></img>`
    if (window.matchMedia('(max-width: 1100px').matches) {
        versus.innerHTML = `<p class="bold">VS</p>`
    }
}

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
    isBtnsActive = false
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
        showResult('win')
    } else if ((yourMove === 'scissor' && computerMove === 'rock') || (yourMove === "rock" && computerMove === 'paper') || (yourMove === 'paper' && computerMove === 'scissor')) {
        computerScore += 1
        computerScoreboard.textContent = computerScore
        document.body.style.backgroundColor = '#FFADAD'
        showResult('lose')
    } else {
        document.body.style.backgroundColor = '#FDFFB6'
        showResult('draw')
    }
}

function decideWinner() {
    isBtnsActive = true
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
// 이겼어요, 비겼어요, 졌어요
function showResult(result) {
    if (result === 'win') {
        versus.innerHTML = `<p class="bold">이겼어요</p>`
    } else if (result === 'lose') {
        versus.innerHTML = `<p class="bold">졌어요</p>`
    } else {
        versus.innerHTML = `<p class="bold">비겼어요</p>`
    }
    // if (window.matchMedia('(min-width: 1100px').matches) {
    //     if (result === 'win') {
    //         versus.innerHTML = `<p class="bold">이겼어요</p>`
    //     } else if (result === 'lose') {
    //         versus.innerHTML = `<p class="bold">졌어요</p>`
    //     } else {
    //         versus.innerHTML = `<p class="bold">비겼어요</p>`
    //     }
    // }
}

reset()