const data = [{
    folder: true,
    title: 'Pictures',
    children: [{
        title: 'logo.png'
      },
      {
        folder: true,
        title: 'Vacations',
        children: [{
          title: 'spain.jpeg'
        } ]
      }
    ]
  },
  {
    folder: true,
    title: 'Desktop',
    children: [{
      folder: true,
      title: 'screenshots',
      children: null
    } ]
  },
  {
    folder: true,
    title: 'Downloads',
    children: [{
        folder: true,
        title: 'JS',
        children: null
      },
      {
        title: 'nvm-setup.exe'
      },
      {
        title: 'node.exe'
      }
    ]
  },
  {
    title: 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');
let elem

function addImage(div, title) {
  let image = document.createElement('span');
  let text = document.createElement('span');
  let imageText = document.createElement('p');
  text.textContent = title;
  image.classList.add('material-icons');
  div.appendChild(imageText);
  imageText.appendChild(image);
  imageText.appendChild(text);
  if (title.split('.').length > 1) {
    image.textContent = 'insert_drive_file';
  } else {
    image.textContent = 'folder';
    openFolder(imageText)

  }
}

function openFolder(imageText) {
  imageText.addEventListener('click', (event) => {
    if (event.target.tagName !== 'INPUT') {
      for (let i = 1; i < imageText.parentElement.children.length; i++) {
        imageText.parentElement.children[i].classList.toggle('displayBlock')
      }
      if (imageText.children[0].textContent === 'folder_open') {
        imageText.children[0].textContent = 'folder'
      } else {
        imageText.children[0].textContent = 'folder_open'
      }
      if (imageText.parentElement.children.length === 1) {
        imageText.parentElement.classList.toggle('empty')
      }
    }
  })
}

data.forEach((elem) => {
  const NEW_DIV = document.createElement('div');
  NEW_DIV.classList.add('firstLevel');
  rootNode.appendChild(NEW_DIV);
  addImage(NEW_DIV, elem.title);
  if (elem.children) {
    elem.children.forEach((minElem) => {
      const NEW_MINI_DIV = document.createElement('div');
      NEW_MINI_DIV.classList.add('secondLevel');
      NEW_DIV.appendChild(NEW_MINI_DIV);
      addImage(NEW_MINI_DIV, minElem.title);
      if (minElem.children) {
        minElem.children.forEach((minMinElem) => {
          const NEW_MINI_MINI_DIV = document.createElement('div');
          NEW_MINI_MINI_DIV.classList.add('thirdLevel');
          NEW_MINI_DIV.appendChild(NEW_MINI_MINI_DIV);
          addImage(NEW_MINI_MINI_DIV, minMinElem.title);
        });
      }
    });
  }
});


rootNode.addEventListener('contextmenu', (event) => {
  if (event.target.tagName === 'SPAN') {
    elem = event.target.parentElement
  } else {
    elem = event.target
  }
  deleteWrapper()
  event.preventDefault()
  let wrapper = document.createElement('p')
  wrapper.classList.add('wrapper')
  let buttonRename = document.createElement('button')
  buttonRename.textContent = 'Rename'
  let buttonDelete = document.createElement('button')
  buttonDelete.textContent = 'Delete Item'

  buttonDelete.addEventListener('click', () => {
    elem.parentElement.remove()
    let allP = document.getElementsByTagName('p')
    for (let i = 0; i < allP.length; i++) {
      if (allP[i].parentElement.children.length === 1 &&
        allP[i].children[1].textContent.split('.').length === 1 &&
        allP[i].children[0].textContent === 'folder_open') {
        allP[i].parentElement.classList.add('empty')
      }
    }
  })

  buttonRename.addEventListener('click', () => {
    let inputText = document.createElement('input')
    inputText.type = 'text'
    inputText.value = elem.children[1].textContent
    elem.children[1].style.display = 'none'
    elem.appendChild(inputText)
    inputText.focus()
    inputText.select()
    inputText.addEventListener('blur', () => {
      if (inputText.value === '') {
        inputText.value = 'newFolder'
      }
      elem.children[1].textContent = inputText.value
      elem.children[1].style.display = 'inline'
      inputText.remove()
    })
  })

  wrapper.appendChild(buttonRename)
  wrapper.appendChild(buttonDelete)
  document.body.appendChild(wrapper)
  wrapper.style.top = event.pageY + 'px'
  wrapper.style.left = event.pageX + 'px'
  if (event.target === rootNode) {
    buttonRename.disabled = true
    buttonDelete.disabled = true
  } else {
    buttonRename.disabled = false
    buttonDelete.disabled = false
  }
})


function deleteWrapper() {
  if (document.querySelector('.wrapper')) {
    document.querySelector('.wrapper').remove()
  }
}

document.body.addEventListener('click', () => {
  deleteWrapper()
})
