class Book {
    constructor(name, author, image, plot, id) {
        this.name = name;
        this.author = author;
        this.image = image;
        this.plot = plot;
        this.id = id;
    }
}

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
}
if (!localStorage.getItem('books')) {
    for (let i = 0; i < 3; i++) {
        const BOOK = new Book(`book${i+1}`,
            `author${i+1}`,
            'https://i.pinimg.com/originals/21/d9/3b/21d93b1c028116f96a26c249e684b2c4.png',
            `plot${i+1}`,
            uuid())
        let local = []
        if (localStorage.length > 0 && localStorage.getItem('books')) {
            local = JSON.parse(localStorage.getItem('books'))
            local.push(BOOK)
            localStorage.setItem('books', JSON.stringify(local))
        } else {
            local.push(BOOK)
            localStorage.setItem('books', JSON.stringify(local))
        }
    }
}

const root = document.getElementById('root');
const LEFT = document.createElement('div')
const EDIT_ADD = document.createElement('div')
const PREVIEW = document.createElement('div')

if (!window.location.href.includes('#')) {
    window.location.hash = '#home'
}

root.appendChild(LEFT)
root.appendChild(EDIT_ADD)
root.appendChild(PREVIEW)

const LOCAL_ARR = JSON.parse(localStorage.getItem('books'))
const BOOK_ALL = document.createElement('div')
LEFT.appendChild(BOOK_ALL)
const BOOK_ADD = document.createElement('button')
LEFT.appendChild(BOOK_ADD)
BOOK_ADD.textContent = 'Add'
BOOK_ADD.addEventListener('click', () => {
    window.location.hash = '#add'
    window.location.search = ''
})
if (LOCAL_ARR) {
    LOCAL_ARR.forEach(book => {
        const BOOK_BODY = document.createElement('div')
        BOOK_BODY.classList.add('book')
        BOOK_ALL.appendChild(BOOK_BODY)
        const BOOK_TEXT = document.createElement('p')
        const BOOK_CHANGE = document.createElement('button')
        BOOK_CHANGE.type = 'button'
        BOOK_BODY.appendChild(BOOK_TEXT)
        BOOK_BODY.appendChild(BOOK_CHANGE)
        BOOK_TEXT.textContent = book.name
        BOOK_CHANGE.textContent = 'Change'
        BOOK_TEXT.addEventListener('click', () => {
            let locatHash = window.location.hash
            let locatSearch = window.location.search
            window.location.hash = '#preview'
            window.location.search = `${book.id}`
            if (window.location.hash !== locatHash && window.location.search !== locatSearch) {
                window.location.search = `${book.id}`
                location.reload()
            } else {
                location.reload()
                window.location.search = `${book.id}`
            }
        })
        BOOK_CHANGE.addEventListener('click', () => {
            let locatHash = window.location.hash
            let locatSearch = window.location.search
            window.location.hash = '#edit'
            window.location.search = `${book.id}`
            if (window.location.hash !== locatHash && window.location.search !== locatSearch) {
                window.location.search = `${book.id}`
                location.reload()
            } else {
                location.reload()
                window.location.search = `${book.id}`
            }
        })
    });
}

function editADD() {
    const FORM = document.createElement('form')
    EDIT_ADD.appendChild(FORM)
    FORM.classList.add('form')
    for (let i = 0; i < 4; i++) {
        const LABEL = document.createElement('label')
        const INPUT = document.createElement('input')
        INPUT.type = 'text'
        INPUT.required = true
        FORM.appendChild(LABEL)
        FORM.appendChild(INPUT)
        LABEL.setAttribute('for', `label${i}`)
        INPUT.id = `label${i}`
    }
    const LABEL = document.getElementsByTagName('label')
    LABEL[0].textContent = 'Book name'
    LABEL[1].textContent = 'Author'
    LABEL[2].textContent = 'Image'
    LABEL[3].textContent = 'Plot'
    const CANCEL = document.createElement('button')
    const SAVE = document.createElement('button')
    const COL_BUTTON = document.createElement('div')
    EDIT_ADD.appendChild(FORM)
    CANCEL.type = 'button'
    SAVE.type = 'button'
    CANCEL.textContent = 'Cancel'
    SAVE.textContent = 'Save'
    EDIT_ADD.appendChild(COL_BUTTON)
    COL_BUTTON.appendChild(SAVE)
    COL_BUTTON.appendChild(CANCEL)
    CANCEL.addEventListener('click', () => {
        if (confirm('Discard changes?')) {
            window.location.href = '#home'
            window.location.search = ''
        }
    })
    SAVE.addEventListener('click', () => {
        let input = document.getElementsByTagName('input');
        if (input[0].value && input[1].value && input[2].value && input[3].value) {
            let local = JSON.parse(localStorage.getItem('books'))
            if (window.location.hash === '#edit') {
                let BOOK = new Book(input[0].value,
                    input[1].value,
                    input[2].value,
                    input[3].value,
                    window.location.search.slice(1))
                let indexBook = local.findIndex(book => book.id === location.search.slice(1))
                local.splice(indexBook, 1, BOOK)
            } else if (window.location.hash === '#add') {
                let BOOK = new Book(input[0].value, input[1].value, input[2].value, input[3].value, uuid())
                local.push(BOOK)
            }
            localStorage.setItem('books', JSON.stringify(local))
            setTimeout(() => {
                alert('Успішно')
            }, 300)
            window.location.href = '#preview'
            location.reload()
        }
    })
}

function preview() {
    for (let i = 0; i < 3; i++) {
        const DESCRIPTION = document.createElement('p')
        DESCRIPTION.classList.add('description')
        PREVIEW.appendChild(DESCRIPTION)
    }
    const IMG = document.createElement('img')
    PREVIEW.appendChild(IMG)
}

if (window.location.hash === '#edit') {
    editADD()
    let right = document.querySelector('#root > div:nth-child(2)')
    right.style.display = 'flex'
    let local = JSON.parse(localStorage.getItem('books'))
    let book = local.filter(book => book.id === location.search.slice(1))
    let addInput = document.getElementsByTagName('input')
    addInput[0].value = book[0].name
    addInput[1].value = book[0].author
    addInput[2].value = book[0].image
    addInput[3].value = book[0].plot
} else if (window.location.hash === '#add') {
    editADD()
    let right = document.querySelector('#root > div:nth-child(2)')
    right.style.display = 'flex'
} else if (window.location.hash === '#preview') {
    preview()
    let right = document.querySelector('#root > div:nth-child(3)')
    right.style.display = 'block'
    let local = JSON.parse(localStorage.getItem('books'))
    let book = local.filter(book => book.id === location.search.slice(1))
    let description = document.getElementsByClassName('description')
    let img = document.getElementsByTagName('img')
    description[0].textContent = book[0].name
    description[1].textContent = book[0].author
    description[2].textContent = book[0].plot
    img[0].src = book[0].image
} else {
    window.location.href = '#home'
    let add = document.querySelector('#root > div:nth-child(2)')
    add.style.display = 'none'
    let preview = document.querySelector('#root > div:nth-child(3)')
    preview.style.display = 'block'
}