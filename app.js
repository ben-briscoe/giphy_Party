document.addEventListener('submit', function(e){
    e.preventDefault()
})


//event listener that runs search function or remove function
document.addEventListener('click', function(e) {
    e.preventDefault()
    if(e.target.id==='searchButton'){
        searchFunc()
    }
    else if(e.target.id==='removeButton'){
        cleargifs()
    }
})

//If search button is pressed this function manages the giphyy request and calls necessary function to add it to the dom.
async function searchFunc() {
console.log('search function entry')
    //get info from form, define query, must return query string
    const query = readform()

    //make request to giphy api, must return imageUrl string
    const imageUrl = await getGif(query)

    //puts gif on page
    addGif(imageUrl)

}

function readform() {
    //clears the form and returns search term
    const searchTerm = document.querySelector('#searchTerm')
    const query = searchTerm.value
    searchTerm.value = ""
    return query
}


async function getGif(query) {
    //try for errors
    try {
        //collects json response for get request. Parameters to retrieve 1 gif only rated G and in english. also set to retrieve random one each time same search term is passed.
        const response = await axios.get('https://api.giphy.com/v1/gifs/search', 
                                    {params: {
                                        q:query,
                                        api_key: '07U5ZVm85VhLsFvQSarJkzzTAoVDAHsc', 
                                        limit:1, 
                                        offset:Math.floor(Math.random()*5000), 
                                        rating:'g',
                                        lang: 'en'
                                    }})

        //gets the data array out of the response
        const dataArray = response.data.data
        //project required log
        //console.log(response)
        //return imageUrl
        return dataArray[0].images.downsized.url
    } catch(e) {
        alert("Oops, something went wrong. Let's try again. Make sure that you enter a search term... Preferably one thats a real word.")
    }

}

function addGif(imageUrl) {
        const gifDiv = document.querySelector('#gifDiv')
        let gif = document.createElement('img')
        gif.src = imageUrl
        gifDiv.appendChild(gif)
}

function cleargifs() {
    const gifDiv = document.querySelector("#gifDiv")
    while(gifDiv.firstChild) {
        gifDiv.removeChild(gifDiv.firstChild)
    }
}