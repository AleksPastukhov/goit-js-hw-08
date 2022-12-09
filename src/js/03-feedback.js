const throttle = require("lodash.throttle");

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    input: document.querySelector('.feedback-form input'),
}

refs.form.addEventListener('submit', onFormSubmit)
refs.textarea.addEventListener('input', throttle(onTextareaDataEntry, 500))
refs.input.addEventListener('input', throttle(onInputDataEntry, 500))



const data = {
    message: '',
    email: '',
};

dataOutputAfterReboot();
checkOfEnteredData();

function onFormSubmit (e){
    e.preventDefault()
    console.log(dataOutputAfterReboot())
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

function checkOfEnteredData(){
if (refs.textarea.value){
    data.message = refs.textarea.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(data))
}
if (refs.input.value){
    data.email = refs.input.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(data))
}
}

function dataOutputAfterReboot(){
    const saveData = JSON.parse(localStorage.getItem("feedback-form-state"));
    if(saveData) {
            refs.textarea.value = saveData.message;
            refs.input.value = saveData.email;
            return saveData
    } 
}

