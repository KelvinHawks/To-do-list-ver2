const inputItem = document.querySelector('#grocery')
const form = document.querySelector('.list-form')
const submitBtn = document.querySelector('.submit-button')
const clearBtn = document.querySelector('.clr-btn')
const appendArticle = document.querySelector('.content')
const alert = document.querySelector('.alert')
const container = document.querySelector('.container')
//console.log(submitBtn);

let editElement 
let editID = ''
let editFlag = false

submitBtn.addEventListener('click', addItemsToList)

clearBtn.addEventListener('click', clearAllItems)
window.addEventListener('DOMContentLoaded', setupItems)


//console.log(id);

function addItemsToList(){

    const id = new Date().getTime().toString()
    const value = inputItem.value
    if(value && editFlag === false){
        createListItems(id, value)

        container.classList.add('show-container')

        setLocalStorage(id, value)

        setBackToDefault()

        displayAlert('Successfully added', 'green')
    }else if(editFlag && value){
        editElement.innerHTML = value
        setBackToDefault()
        displayAlert('Edited', 'green')
    }else{
        displayAlert('Input required', 'red')
    }
    }
   

function deleteItem(e){
    const target = e.currentTarget.parentElement.parentElement
    appendArticle.removeChild(target)
    displayAlert('Item removed', 'red')
}

function editItem(e){
    const editTarget = e.currentTarget.parentElement.parentElement
    editElement = e.currentTarget.parentElement.previousElementSibling
    editID = editTarget.dataset.id
    inputItem.value = editElement.innerHTML
    submitBtn.textContent = 'edit'
    editFlag = true
    
}

function setBackToDefault(){
    inputItem.value = ''
    editFlag = false
    editID = ''
    submitBtn.textContent = 'submit'
}

//clear all items

function clearAllItems(){
    const items = document.querySelector('.list-items')
    if(items.length > 0){
        items.forEach(function(item){
            appendArticle.removeChild(item)
        })
    }
    container.classList.remove('show-container')
    //appendArticle.classList.remove('show-container')
    displayAlert('Empty List', 'red')
    localStorage.removeItem('appendArticle')
    setBackToDefault()
}

function displayAlert(text, action){
    alert.textContent = text
    alert.classList.add(`alert-${action}`)

    setTimeout(function(){
        alert.textContent = ''
        alert.classList.remove(`alert-${action}`)
    }, 1000)
}

//add to local storage

function setLocalStorage(id, value){
    const grocery = {id, value}

    let items = getLocalStorage()
    items.push(grocery)
    localStorage.setItem('appendArticle', JSON.stringify([items]))
}

function getLocalStorage(){
    return localStorage.getItem('appendArticle')? JSON.parse(localStorage.getItem('appendArticle'))  :[]
}

function setupItems(){
    let items = getLocalStorage()
    if(items.length > 0){
        items.forEach(function(item){
            createListItems(item.id, item.value)
        })
        container.classList.add('show-container')
    }else{
        container.classList.remove('show-container')
    }
}

function createListItems(id, value){
    const element = document.createElement('article')
    element.classList.add('list-items')

    const attr = document.createAttribute('data-id')
    attr.value = id
    element.setAttributeNode(attr)
    //console.log(element);
    element.innerHTML = `
                <p class="title">${value}</p>
                <div class="btn-container">
                    <button class="edit-btn">
                        <i class="fa-sharp fa-solid fa-pen-to-square edit"></i>
                    </button>
                    <button class="delete-btn">
                        <i class="fa-solid fa-trash trash"></i>
                    </button>
                </div>
            `
            appendArticle.appendChild(element)

            const deleteBtn = document.querySelectorAll('.delete-btn')
            const editBtn = document.querySelectorAll('.edit-btn')

            
            //editBtn.addEventListener('click', editItem)
            deleteBtn.forEach((btns)=>{
                btns.addEventListener('click', deleteItem)
            })

            editBtn.forEach((editBtns)=>{
                editBtns.addEventListener('click', editItem)
            })
}