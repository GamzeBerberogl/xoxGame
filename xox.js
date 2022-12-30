const x_class = 'cross'
const o_class = 'circle'
const lineups = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const section = document.getElementById('section')
const boxs = document.querySelectorAll('.box')
const out = document.getElementById('out')
const outText = document.querySelector('.out-text')
const restart = document.getElementById('restart')

let turn // false x , True o

const swapTurn = () => { turn = !turn }
const placeMark = (box,currentClass) => { box.classList.add(currentClass)}
const placeHover = () => {
    section.classList.remove(x_class)
    section.classList.remove(o_class)
    if(turn) section.classList.add(o_class)
    else section.classList.add(x_class)
}

const endGame = (draw) => {
    if(draw) outText.innerText = 'Berabere'
    else outText.innerText = `${turn ? 'O' : 'X'} Kazandı`

    out.classList.add('show')
}

const isDraw = () => {
    return [...boxs].every(box => {
        return box.classList.contains(x_class) || box.classList.contains(o_class)
    })
}

const checkWin = (currentClass) => {
    return lineups.some(combination => {
        return combination.every(index => {
            return boxs[index].classList.contains(currentClass)
        })
    })
}

const handleClick = (e) => {
    const box = e.target
    const currentClass = turn ? o_class : x_class 
    placeMark(box,currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if(isDraw()) {
        endGame(true)
    } else {
        swapTurn()
        placeHover()
    }
}

const resetGame = () => {
    boxs.forEach(box => {
        box.classList.remove(x_class)
        box.classList.remove(o_class)
        box.removeEventListener('click', handleClick)
        box.addEventListener('click', handleClick, {
            once: true
        })
    })
}


const startGame = () => {
    turn = false
    resetGame()
    placeHover()
    out.classList.remove('show')
}

startGame()
restart.addEventListener('click', startGame)
