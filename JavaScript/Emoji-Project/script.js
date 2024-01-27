const form = document.querySelector(".search-bar");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = document.getElementById('search').value;
    console.log(value);

    displaySearchResults(value); 
});

const displaySearchResults = (value = "")=>{
    const filteredEmoji = emojiList.filter((e) => {

        if(e.description.indexOf(value) != -1){
            return true;
        }

        // Filtered By Aliases
        if(e.aliases.some((elem) => elem.startsWith(value))){
            return true;
        }

        //Filtered By Tags
        if(e.tags.some((elem) => elem.startsWith(value))){
            return true;
        }
    });

    const parent = document.getElementById("search_result_container");
    parent.innerHTML = "";

    filteredEmoji.forEach((e) => {

    // Dynamic Creation:-
    const new_row = document.createElement("tr");
    const new_emoji = document.createElement("td");
    const new_alises = document.createElement("td");
    const new_desc = document.createElement("td");
    
    // Insert Data Dynamically:-
    new_emoji.innerText = e.emoji;
    new_alises.innerText = e.aliases.join(",");
    new_desc.innerText = e.description;

    // Append elements in Row:-
    new_row.appendChild(new_emoji);
    new_row.appendChild(new_alises);
    new_row.appendChild(new_desc);

    parent.appendChild(new_row);
    
    });
}

window.onload = () => displaySearchResults();