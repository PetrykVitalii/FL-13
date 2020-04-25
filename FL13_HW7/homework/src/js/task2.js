let statusGame = confirm('Do you want to play a game?')
let maxNumber = 5

function possiblePrize(first, second, third, count, multy) {
    if (count === 3) {
        return first * multy
    } else if (count === 2) {
        return second * multy
    } else {
        return third * multy
    }
}

if (statusGame) {
    let first = 100
    let second = 50
    let third = 25
    let again = true
    while (again) {
        let prize = 0
        let multy = 1
        let contin = true
        while (contin) {
            let random = Math.floor(Math.random() * maxNumber * multy + 1)
            let count = 3
            for (; count !== 0; count--) {
                let attempts = +prompt(`Choose a roulette pocket number from 0 to ${maxNumber*multy},
Attempts left:${count},
Total prize:${prize},
Possible prize on current attempt:${possiblePrize(first,second,third,count,multy)}`)
                if (attempts === random) {
                    break
                }
            }
            if (count === 3) {
                prize += first * multy
            } else if (count === 2) {
                prize += second * multy
            } else if (count === 1) {
                prize += third * multy
            } else {
                alert(`Thank you for your participation. Your prize is: ${prize} $`)
                contin = false
            }
            if (count !== 0) {
                contin = confirm(`Congratulation, you won!   Your prize is: ${prize} $. Do you want to continue?`)
                if (contin) {
                    multy++
                }
            }
        }
        again = confirm('Do you wanna play again?')
    }
} else {
    alert('You did not become a billionaire, but can.')
}