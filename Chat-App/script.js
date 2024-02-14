function createUserListItem({ avatar, name, time }, index) {
    const newUserItem = document.createElement("div");
    if (index === 0) {
        newUserItem.classList.add("user-item");
        newUserItem.classList.add("active");
    }
    else {
        newUserItem.classList.add("user-item");
    }
    newUserItem.innerHTML = `
        <div class="user-item-sub" onclick="handleUserSelection(this,${index})">
            <div class="avatar">
                <img src="${avatar}" alt="${name}" loading="lazy"/>
            </div>
            <div class="profile-details">
                <div class="user-name">
                    <p class="title">${name}</p>
                    <p class="time">${time}</p>
                </div>
                <p class="highlights">Hey how are you?.....</p>
            </div>
        </div>`;
    document.querySelector(".user-list").appendChild(newUserItem);
}

function setUserList(users) {
    users.map((item, index) => createUserListItem(item, index));
}

// Set the initial user list
setUserList(usersData);

//  Function to handle user selection and update chat
function handleUserSelection(element, index) {
    if (window.innerWidth <= 750) {
        document.querySelector(".left-side").style.display = "none";
        document.querySelector(".right-side").style.display = "block";
        document.querySelector(".right-side").style.width = "100%";
    }
    updateUserChat(element, index);
}

// Function to update chat Based on user selection
function updateUserChat(element, index) {
    const userListItems = document.querySelectorAll(".user-item");
    userListItems.forEach((item) => item.classList.remove("active"));
    element.parentElement.classList.add("active");
    const name = element.children[1].children[0].children[0].innerHTML;
    const selectedUser = usersData.filter((user) => user.name === name);
    let selectedChat = undefined;
    Object.keys(chatData).forEach((element, i) => {
        if (+element.charAt(element.length - 1) == index + 1) {
            selectedChat = Object.values(chatData)[i];
        }
    });
    updateChat(selectedUser, selectedChat);
}

// Function to update the chat UI
function updateChat([{ avatar, name, status }], chat) {
    const currentUserSection = document.createElement("div");
    currentUserSection.classList.add("current-user");
    currentUserSection.innerHTML = `
        <div class="current-user-sub">
            <div class="current_avatar">
              <span>
                <img src="${avatar}" alt="${name}">
                <div class="online"></div>
              </span>
            </div>
            <div class="current_status">
                <p class="current-title">${name}</p>
                <p class="current-highlights">${status}</p>
            </div>
        </div>`;
        document.querySelector(".chat-box").innerHTML = "";
        document.querySelector(".chat-box").appendChild(current_user);
    AddChat(chat);
}
function AddChat(chat) {
    if (chat !== undefined) {
        const chatDataContainer = document.createElement("div");
        chatDataContainer.classList.add("chat");
        chat.forEach((element) => {
            const user_container = document.createElement("div");
            const chatMessage = document.createElement("p");
            chatMessage.innerHTML = element.msg.message;
            user_container.appendChild(chatMessage);
            if (element.from.type === "user1") {
                user_container.classList.add("user1-container");
                chatMessage.classList.add("user1-msg");
            }
            else {
                user_container.classList.add("user2-container");
                chatMessage.classList.add("user2-msg");
            }
            // chatMessage.classList.add(from.type === "user1" ? "user1-message" : "user2-message");
            chatDataContainer.appendChild(user_container);
        });
        // chatBox.appendChild(chatDataContainer);
        document.querySelector(".chat-box").appendChild(chatDataContainer);
    } else {
        const noChatDataMessage = document.createElement("div");
        noChatDataMessage.classList.add("chat");
        document.querySelector(".chat-box").appendChild(noChatDataMessage);
        // const noChatDataMessage = document.createElement("div");
        // noChatDataMessage.innerText = "No messages yet...";
        // chatBox.appendChild(noChatDataMessage);
    }
}

// Function to handle back navigation for small screens
function goBack() {
    document.querySelector(".right-side").style.display = "none";
    document.querySelector(".left-side").style.display = "block";
    document.querySelector(".left-side").style.width = "100%";
}

// Event listner to auto-adjust layout based on screen size
window.addEventListener("resize", function () {
    const leftPanel = document.querySelector("left-side");
    const rightPanel = document.querySelector("right-side");
    if (window.innerWidth <= 750) {
        leftPanel.style.display = "block";
        leftPanel.style.width = "100%";
        rightPanel.style.display = "none";
    }
    else if (window.innerWidth > 750) {
        leftPanel.style.width = "35%";
        leftPanel.style.display = "block";
        rightPanel.style.width = "65%";
        rightPanel.style.display = "block";
    }
});

// Function to search for users
function searchUser(event) {
    const userInput = event.target.value.toLowerCase();
    const userList = document.querySelector(".user-list");
    userList.innerHTML = "";
    if (userInput === "") {
        setUserList(usersData);
    }
    else {
        const filteredUsers = usersData.filter((user) => user.name.toLowerCase().includes(userInput));
        if (filteredUsers.length === 0) {
            userList.innerHTML = "No Data Found";
            userList.style.fontWeight = "bolder";
        }
        else {
            setUserList(filteredUsers);
        }
    }
}

// Function to change Themes
function selectTheme(event) {
    let r = document.querySelector(":root");
    let color = event.target.value;
    if (color === "Change theme") {
        r.style.setProperty("--my-mssg", "#00A0AE");
    }
    else {
        r.style.setProperty("--my-mssg", color); // --message-color", color === "Change theme" ? "#00A0AE" : color);
    }
}

// Function to change Background image
function changeBackground(event) {
    let r = document.querySelector("");
    let bg = event.target.value;
    switch (bg) {
        case "Normal":
            r.style.setProperty("--background-image", 'url("https://i.pinimg.com/originals/f5/05/24/f50524ee5f161f437400aaf215c9e12f.jpg")')
            break;
        case "Theme-1":
            r.style.setProperty("--background-image", 'url("https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg")');
            break;
        case "Theme-2":
            r.style.setProperty("--background-image", 'url("https://wallpaperaccess.com/full/1288076.jpg")');
            break;
        case "Theme-3":
            r.style.setProperty("--background-image", 'url("https://i.pinimg.com/736x/78/1e/21/781e212cb0a891c6d8a3738c525e235d.jpg")');
            break;
    }
}

// Function to calculate character and word count
function calculateCounts(event) {
    const inputText = event.value;
    if (inputText === "") {
        document.querySelector('.count-char').innerText = `Current Characters:${0} and Current Words:${0}`
    }
    else {
        const charCount = inputText.length;
        const wordCount = inputText.split(" ").length;
        document.querySelector('.count-char').innerText = `Current Characters: ${charCount} and Current Words: ${wordCount}`;
    }
}
// Function to send message
function sendMessage() {
    const messageInput = document.querySelector(".message-input");
    // const inputValue = messageInput.value.trim();
    if (messageInput.value === "") {
        alert("Please enter a message :)");
    }
    else {
        const activeUserIndex = document.querySelector(".user-item");
        let index = 0;
        for (let i = 0; i < activeUserIndex.length; i++) {
            if (activeUserIndex[i].className === "user-item active") {
                index = i + 1;
                break;
            }
        }
        let chatKey = `chat${index}`;
        const newMessage = [{
            from: {
                type: "user2",
            },
            msg: {
                message: messageInput.value,
            },
        }];
        if (chatData[chatKey]) {
            chatData[chatKey] = [...chatData[chatKey],...newMessage];
        }
        else {
            chatData[chatKey] = newMessage;
        }
        document.querySelector('.chat').remove();
        AddChat(chatData[chatKey]);
        messageInput.value = "";
        calculateCounts(document.querySelector('.messageInput'));
    }
}