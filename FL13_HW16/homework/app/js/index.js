const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');
const TABLE = document.querySelector('table')
const FORM_CHILDREN = document.forms['f1'].children
const FORM = document.forms['f1']
const LOADING = document.querySelector('.loading')
let statusButton = false
let id

createRequest()

FORM_CHILDREN[2].addEventListener('click', () => {
    if (FORM_CHILDREN[0].children[0].value && FORM_CHILDREN[1].children[0].value) {
        disabled(true)
        const user = {
            name: FORM_CHILDREN[0].children[0].value,
            username: FORM_CHILDREN[1].children[0].value
        }
        FORM.reset()
        FORM_CHILDREN[2].textContent = 'Add New User'
        statusButton
            ? createRequest('PUT', JSON.stringify(user), `users/${id}`) 
            : createRequest('POST', JSON.stringify(user))
        createRequest()
        statusButton = false
    }
});

function disabled(disabled) {
    let button = document.querySelectorAll('button')
    button.forEach(button => {
        button.disabled = disabled
    })
}


function createRequest(metod = 'GET', newUser = null, users = 'users') {
    let request = new XMLHttpRequest()
    request.open(`${metod}`, `${baseUrl}/${users}`, true)
    if (metod === 'DELETE') {
        request.setRequestHeader('Authorization', 'admin')
    } else {
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8')
    }
    if(metod === 'GET'){
        LOADING.style.display = 'block'
    }
    request.responseType = 'json'
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE && request.status >= 200 && request.status < 300) {
            console.log(request.response)
            if (request.response) {
                create(request.response)
                LOADING.style.display = 'none'
            }
        }
    }
    request.send(newUser)
}

function create(data) {
    TABLE.innerHTML = ''
    data.forEach(user => {
        let tr = document.createElement('tr')
        TABLE.appendChild(tr)
        for (let i = 0; i < 5; i++) {
            let td = document.createElement('td')
            tr.appendChild(td)
        }
        let td = tr.children
        td[0].textContent = user.id
        td[1].textContent = user.name
        td[2].textContent = user.username
        let updateUser = document.createElement('button')
        let deleteUser = document.createElement('button')
        updateUser.textContent = 'Update'
        updateUser.type = 'button'
        deleteUser.textContent = 'Delete'
        deleteUser.type = 'button'
        td[3].appendChild(updateUser)
        td[4].appendChild(deleteUser)
        deleteUser.addEventListener('click', () => {
            statusButton = false
            FORM_CHILDREN[2].textContent = 'Add New User'
            FORM.reset()
            disabled(true)
            createRequest('DELETE', null, `users/${user.id}`)
            createRequest()
        })
        updateUser.addEventListener('click', () => {
            FORM_CHILDREN[0].children[0].value = user.name
            FORM_CHILDREN[1].children[0].value = user.username
            statusButton = true
            id = user.id
            FORM_CHILDREN[2].textContent = 'update'
        })
    });
    disabled(false)
}