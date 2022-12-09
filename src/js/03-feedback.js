const throttle = require("lodash.throttle");

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    input: document.querySelector('.feedback-form input'),
}

refs.form.addEventListener('submit', onFormSubmit)
refs.textarea.addEventListener('input', throttle(onTextareaDataEntry, 500))
refs.input.addEventListener('input', throttle(onInputDataEntry, 500))


const data = {};

populateTextarea();


function onFormSubmit (e){
    e.preventDefault()
    console.log(populateTextarea())
    e.target.reset()
    localStorage.removeItem("feedback-form-state")
}

function onTextareaDataEntry (e){
    const message = e.target.value
    data.message = message;
    recordsData(data)
}

function onInputDataEntry (e){
        const email = e.target.value
        data.email = email;
        recordsData(data)
    }
    
function recordsData(data){
    localStorage.setItem("feedback-form-state", JSON.stringify(data))
}

function populateTextarea(){
    const saveData = JSON.parse(localStorage.getItem("feedback-form-state"));
    if(saveData) {
        if(saveData.message) {
            refs.textarea.value = saveData.message;
        } else {
            refs.textarea.value = '';
        }
        if(saveData.email) {
            refs.input.value = saveData.email;
        } else {
            refs.input.value = '';
        }
    }
    return saveData
}
