const textarea = document.getElementById("textArea");

function saveToLocal(){
    localStorage.setItem("savedText", textarea.value);
}

if(localStorage.getItem("savedText")){
    textarea.value = localStorage.getItem("savedText");
}

textarea.addEventListener("input", saveToLocal);