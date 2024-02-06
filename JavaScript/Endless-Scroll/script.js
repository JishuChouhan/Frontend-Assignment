const apiUrl = "https://api.unsplash.com/photos/random/?client_id=qz3hKdWOQc2L4Is3IAvixOIZxAbx-hOj_bvWbxTnkDA&count=10";

let allPhotos = []; // To collect all images

let ready = false;
let imagesLoad = 0;
let totalImages = 10;

const getPhotos = async()=>{
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        allPhotos = data;
        display();
    }
    catch(err){
        console.log(err);
    }
}

const imgContainer = document.getElementById("image-container");

const display = ()=>{
    allPhotos.forEach((photo)=>{
        const img = document.createElement("img");// Dynamically created an Img ele
        img.setAttribute("src", photo.urls.regular); // Set the Attribute of element
        img.addEventListener("load", imaegsLoaded);
        imgContainer.appendChild(img); 
    })
}

const imaegsLoaded = () => {
    imagesLoad++;
    if(imagesLoad === totalImages){
        ready = true;
        imagesLoad = 0;
    }
}

window.addEventListener("scroll", ()=>{
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight && ready){
        ready = false;
        getPhotos();
        console.log("Loading Images");
    }
});

getPhotos();