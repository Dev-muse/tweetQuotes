
//Selecting elements
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterbtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const Loader = document.querySelector("#loader");


function showLoadingAnimation(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingAnimation(){
   if (!loader.hidden){ quoteContainer.hidden=false
                        loader.hidden=true 
   };
}


//GET quote from API

async function getQuote(){
    
    showLoadingAnimation();

    const proxyUrl = 'https://evening-waters-93081.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        //check if quote is missing author,assign "uknown" if true:
        data.quoteAuthor === "" ? authorText.innerText = "Unknown" : authorText.innerText= data.quoteAuthor;
            
        // Reduce quote greater than 120 characters font size: 
        data.quoteText.length > 120 ? quoteText.classList.add('long-quote'): quoteText.classList.remove('long-quote');

        //Insert API quote text to website
        quoteText.innerText = data.quoteText;
    
        hideLoadingAnimation();

    } catch (error) {
        console.log("error");
        getQuote();
    }

};


//Tweet the quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(twitterUrl, '_blank');
}


//Event listeners:
newQuoteBtn.addEventListener("click", getQuote); //new quote button
twitterbtn.addEventListener("click", tweetQuote);//tweet the quote




//CALL FUNCTIONS
getQuote();
