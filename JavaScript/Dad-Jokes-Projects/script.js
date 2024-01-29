const btn = document.querySelector('#btn')
const jokes_para = document.querySelector('#joke')

const optObj = {
    headers: { 'X-Api-Key': 'du6l6w7rCxIaHD1vCH12bw==J4NqAxBFaffFH1Jz'}
}

const apiCallToGetJokes = (url, options) => {

    jokes_para.innerText = 'Updating...';
    btn.innerText = 'Loading...';

    fetch(url, options).then((response)=>{
        const getApi = response.json()
        return getApi;
    })
    .then((getApi) => {
        let jokeToRender = '';

        if(getApi.length > 0){
            jokeToRender = getApi[0]['joke']
        }
        else{
            jokeToRender = 'No Joke Available'
        }

        jokes_para.innerText = jokeToRender;
        btn.innerText = 'TELL ME A JOKE';

        console.log(jokeToRender);
    })
    .catch((err) => {
        alert(err);
    })
}

btn.addEventListener('click', () => {
     apiCallToGetJokes('https://api.api-ninjas.com/v1/dadjokes', optObj);
})

