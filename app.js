
document.addEventListener('DOMContentLoaded', () => {

  const localStore = {}  
  let keys = []
  let id = 0

  const list = document.querySelector('.students-list')
  list.addEventListener('click', onListItemClick)

  const addButton = document.querySelector('.add-button')
  addButton.addEventListener('click', onAdd)

  initListFromStore()

  function initListFromStore () {

      if(localStorage.getItem('student_ids')){

      const string = localStorage.getItem('student_ids') 
      keys = JSON.parse(string)
      
      keys.forEach(key => {
        initListItem(key)
      });

      lastId = keys[keys.length - 1]
      id = lastId + 1

    }

  }

  function onListItemClick (event) {
    if(event.target.className === 'delete'){
      onDelete(event)
    } else if(event.target.className === 'name'){
      onEdit(event)
    }
  }

  function onAdd (event) {

    event.preventDefault()
      
    const li = document.createElement('li')
    
    const name = document.createElement('span')
    const button = document.createElement('span')
    
    const value = document.querySelector('input[type="text"]').value
    name.textContent = value
    button.textContent = 'Delete'

    keys.push(id)
    updateStoreIDs()
    localStorage.setItem(id + '', value)
    
    li.classList.add('student-item')
    name.classList.add('name')
    button.classList.add('delete')
    
    li.appendChild(name)
    li.appendChild(button)
  
    list.appendChild(li)
    document.querySelector('input[type="text"]').value = ''
    addDom(li, id)
    id++
  
  }

  function getID(dom) {
    return localStore[dom]
  }

  function updateStoreIDs () {
    localStorage.setItem('student_ids', JSON.stringify(keys))
  }

  function removeID(dom) {
    const key = getID(dom)
    localStorage.removeItem(key + '')
    keys.splice(key, 1)
    delete localStore[dom]
  }

  function initListItem(key) {

    if(localStorage.getItem(key)){
      const name = document.createElement('span')
      name.textContent = localStorage.getItem(key)
      name.classList.add('name')
      
      const button = document.createElement('span')
      button.textContent = 'Delete'
      button.classList.add('delete')
      
      
      const li = document.createElement('li')
      li.classList.add('student-item')
      li.appendChild(name)
      li.appendChild(button)
    
      list.appendChild(li)
      addDom(li, key)
    }
    
  }

  function addDom(dom, id) {
    localStore[dom] = id
  }

  function onDelete (event) {
    const li = event.target.parentElement;
    li.parentNode.removeChild(li)
    removeID(li)
    updateStoreIDs()
  }

  function onEdit (event) {
    const name = event.target.textContent
      document.querySelector('input[type="text"]').value = name
      addButton.textContent = 'Save'

      addButton.removeEventListener('click', onAdd)
      addButton.addEventListener('click', onSave)

      function onSave(onSaveEvent) {
        onSaveEvent.preventDefault()
        event.target.textContent = document.querySelector('input[type="text"]').value
        addButton.removeEventListener('click', onSave)
        addButton.addEventListener('click', onAdd)
        addButton.textContent = 'Add'
        document.querySelector('input[type="text"]').value = ''

        const id = getID(event.target.parentNode)
        localStorage.setItem(id, event.target.textContent)
        
      }
  }

})











// document.querySelector('.grand-parent').addEventListener('click', e => {
//   console.log('grand parent')
//   e.stopPropagation()
// }, { capture: false })
// document.querySelector('.parent').addEventListener('click', e => {
//   console.log('parent')
//   e.stopPropagation()
// }, { capture: false })
// document.querySelector('.child').addEventListener('click', e => {
//   console.log('child')
//   alert('Hi! zulfa')
//   e.stopPropagation()
// })

// var students = [
//   {
//     name: "jahir",
//     age: 14,
//     attendance: 20,
//     black_points: 3
//   },
//   {
//     name: "Ibraaheem",
//     age: 15,
//     attendance: 10,
//     black_points: 30
//   }
// ]

// function getAttendance (id, students){
//   const student = students[id]
//   const attendance = student.attendance
//   console.log(`${student.name}'s attendance is ${attendance}`)
// }


//promise
// function fetchStart() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('start')
//     }, 1000)
//   })
// }

// fetchStart()
// .then((message) => {
//   console.log(message)
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('middle1')
//     }, 1000)
//   })
// })
// .then((message) => {
//   console.log(message)
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('middle2')
//     }, 1000)
//   })
// })
// .then((message) => {
//   console.log(message)
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('middle3')
//     }, 1000)
//   })
// })
// .then((message) => {
//   console.log(message)
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('end')
//     }, 1000)
//   })
// })
// .then((message) => console.log(message))


// var data = {name: "usama"}
// setTimeout(() => {
//   console.log(data)
//   data.name = "zulfa"
// }, 1000)
// // data = {name: "zeenath"}
// setTimeout(() => {
//   console.log(data)
// }, 2000)