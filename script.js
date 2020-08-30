const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('Author')
const twitter = document.getElementById('twitter')
const newQuote = document.getElementById('new-quote')
const loader = document.getElementById('loader')
let counter = 0 // A counter to check that our function does'nt go into infinite loop if it errors out

function displayLoader(val) {
    if(val) {//if true show the loader and hide the quote container
        loader.hidden = false
        quoteContainer.hidden = true
    } else {
        loader.hidden = true
        quoteContainer.hidden = false
        if(counter > 0 && quoteText.innerText) counter = 0 //setting the counter to 0 once the quote loads after erroring out initially
    }
}

async function getQuote() {
    displayLoader(true)// show the loader initially while the quote loads
    const proxyUrl = "https://gentle-shelf-44309.herokuapp.com/"
    const fetchUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en"
    quoteText.innerText = "" //setting it as empty initially for clearing out the field
    quoteAuthor.innerText = "" //setting it as empty initially for clearing out the field

    try {   
        const response = await fetch(proxyUrl+fetchUrl)
        const data = await response.json()

        //To decrease the quote font if the length is greater
        if(data.quoteText && data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        }
        else quoteText.classList.remove('long-quote')
        quoteText.innerText = data.quoteText

        quoteAuthor.innerText = data.quoteAuthor ? data.quoteAuthor : 'Unknown' //If the author is '' setting it to unknown
        displayLoader(false)// hide the loader once the quote is loaded
    } catch(error) {
        console.log(error)
        if(count < 10) getQuote()
        else alert("Oopsie Woopsie the quotes cannot be shown, please refresh the page or try again later")
        count++
    }     
}

//Calling Tweet functionality
function sendTweet() {
    const quote = quoteText.innerText ? quoteText.innerText : ''
    const author = quoteAuthor.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl,'_blank')
}

newQuote.addEventListener('click', getQuote)// Fetching new quotes
twitter.addEventListener('click',sendTweet)

//Fetching the quote by default
getQuote()