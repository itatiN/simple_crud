const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sName = document.querySelector('#m-name')
const sFunction = document.querySelector('#m-function')
const sSalary = document.querySelector('#m-salary')
const btnSave = document.querySelector('#btnSave')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sName.value = itens[index].name
    sFunction.value = itens[index].function
    sSalary.value = itens[index].salary
    id = index
  } else {
    sName.value = ''
    sFunction.value = ''
    sSalary.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.function}</td>
    <td>R$ ${item.salary}</td>
    <td class="action">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="action">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSave.onclick = e => {
  
  if (sName.value == '' || sFunction.value == '' || sSalary.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].name = sName.value
    itens[id].function = sFunction.value
    itens[id].salary = sSalary.value
  } else {
    itens.push({'name': sName.value, 'function': sFunction.value, 'salary': sSalary.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()