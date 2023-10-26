let playerText = document.getElementById('playerText')
let restartBtn = document.getElementsByClassName('restartBtn')
let mutePencilBtn = document.getElementsByClassName('mutePencilBtn')
let resetScoreBtn = document.getElementById('resetScore')
let boxes = Array.from(document.getElementsByClassName('box'))
let X_audioFile = "X_audio.mp3"
let O_audioFile = "O_audio.mp3"
let win_audioFile = "win_audio.mp3"
let score = Array(3).fill(0)
let flag = 0

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const O_Text = "O"
const X_Text = "X"
let currentPlayer = X_Text;
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
    boxes.forEach(box => box.addEventListener('mouseover', mouseOver ))
    boxes.forEach(box => box.addEventListener('mouseout', mouseOut))
}

function boxClicked(e){
    const id = e.target.id
    if(!spaces[id] && playerHasWon() == false){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        let X_audio = new Audio(X_audioFile)
        let O_audio = new Audio(O_audioFile)
        let win_audio = new Audio(win_audioFile)
        
        if(currentPlayer == X_Text){
            currentPlayer = O_Text
            e.target.style.color = "var(--x-color)"
            X_audio.play()
        }
        else{
            currentPlayer = X_Text
            e.target.style.color = "var(--yellow)"
            O_audio.play()
        }
        if(!(isDraw())){
            playerText.innerText = currentPlayer + "'s Turn"
        }
        if(playerHasWon() != false) {            
            currentPlayer = currentPlayer == X_Text ? O_Text : X_Text
            
            playerText.innerText = currentPlayer + ' has won!'
            if(currentPlayer == X_Text){score[0]++}
            else{score[1]++}
            let winning_blocks = playerHasWon()
            
            flag = 1
            currentPlayer = ''

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            win_audio.play()

            document.getElementById("x").innerText = score[0]
            document.getElementById("o").innerText = score[1]
        }

        else if(isDraw()) {
            playerText.innerText = "Draw!"
            score[2]++
            document.getElementById("draw").innerText = score[2]
        }
    }
}

function mouseOver(e) {
    const id = e.target.id
    if(!spaces[id]){
        document.getElementById(id).innerText = currentPlayer
    
        if(currentPlayer == X_Text){
            document.getElementById(id).style.color = "var(--x-hover-color)"
        }
        else{
            document.getElementById(id).style.color = "var(--o-hover-color)"
        }
    }
}

function mouseOut(e) {
    const id = e.target.id
    if(!spaces[id]) {
        document.getElementById(id).innerText = ""
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon() {
    for(const condition of winningCombos) {
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            document.querySelector(".turn").getElementsByClassName("imgbox")[0].style.width = "220px"
            return [a,b,c]
        }
    }
    return false
}

function isDraw() {
    for(let i = 0; i < 9; i++){
        if(spaces[i] == null) {
            return false
        }
    }

    if(playerHasWon() == false) {
        return true
    }
}

restartBtn[0].addEventListener('click', restart)
restartBtn[1].addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    playerText.innerText = "X's Turn"
    currentPlayer = X_Text

    document.querySelector(".turn").getElementsByClassName("imgbox")[0].style.width = "0"
}

mutePencilBtn[0].addEventListener('click', mutePencil)
mutePencilBtn[1].addEventListener('click', mutePencil)

function mutePencil() {
    X_audioFile = X_audioFile == "X_audio.mp3" ? "" : "X_audio.mp3"
    O_audioFile = O_audioFile == "O_audio.mp3" ? "" : "O_audio.mp3"
    win_audioFile = win_audioFile == "win_audio.mp3" ? "" : "win_audio.mp3"

    let soundStatus = document.querySelector(".buttons").getElementsByClassName("btn")[1].innerText
    document.getElementsByClassName("mutePencilBtn")[0].innerText = soundStatus == "Mute" ? "Unmute" : "Mute"
    document.getElementsByClassName("mutePencilBtn")[1].innerText = soundStatus == "Mute" ? "Unmute" : "Mute"
}

resetScoreBtn.addEventListener('click', resetScore)

function resetScore() {
    score.fill(0)
    document.getElementById("x").innerText = score[0]
    document.getElementById("o").innerText = score[1]
    document.getElementById("draw").innerText = score[2]
}

startGame()