let userName = prompt('login')
let hours = new Date().getHours()
let minWord = 4
let minHour = 8
let maxHour = 20

if (!userName) {
    alert('Canceled')
} else if (userName.length < minWord) {
    alert('I dont know any users having name length less than 4 symbols')
} else if (userName === 'User' || userName === 'Admin') {
    let password = prompt('password')
    if (!password) {
        alert('Canceled')
    } else if (userName === 'User' & password === 'UserPass' || userName === 'Admin' & password === 'RootPass') {
        hours >= minHour & hours <= maxHour ?
            alert(`Good day, dear ${userName}!`) :
            alert(`Good evening, dear ${userName}!`)
    } else {
        alert('Wrong password')
    }
} else {
    alert('I don’t know you')
}