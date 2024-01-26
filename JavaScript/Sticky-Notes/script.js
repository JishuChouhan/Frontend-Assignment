let textarea = document.querySelector('.textarea-container').children;

let button = document.querySelector('.add');

let color_input = textarea[1].children[0]; 

color_input.value = "#00ff00";

button.addEventListener('click' , ()=>{
    if(textarea[0].value == ""){
        alert("Enter Some Text")
        return;
    }
    addNotes(textarea[0].value, color_input.value);

    textarea[0].value = "";

    removeNotes();
});

let right_notes = document.querySelector('.right-notes');

const addNotes = (note , color) => {
    divOfNotes = document.createElement('div');

    divOfNotes.innerHTML = `<p>${note}</p> <button class="buttons">Delete</button>`;

    divOfNotes.style.backgroundColor = `${color}`;

    right_notes.appendChild(divOfNotes);
}

const removeNotes = () => {
    let btn = document.querySelectorAll('.buttons');

    btn.forEach((value)=>{
        value.addEventListener('click', ()=>{
            value.parentElement.remove();
        })
    })
}