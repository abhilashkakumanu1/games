const wordEl = document.getElementById("word")
const wrongLettersEl = document.getElementById("wrong-letters")
const playAgainBtn = document.getElementById("play-button")
const popup = document.getElementById("popup-container")
const notification = document.getElementById("notification-container")
const finalMessage = document.getElementById("final-message")

const figureParts = document.querySelectorAll(".figure-part")

const words = ["programming", "react", "javascript", "grid", "hamburger"]
let selectedWord = words[Math.floor(Math.random() * words.length)]


const correctLetters = []
const wrongLetters = []

// ----------------------------------------------------------------------------
                    //  Functions
// ----------------------------------------------------------------------------

// Show the hidden word
function displayWord(){
    wordEl.innerHTML=`
        ${selectedWord
            .split("")
            .map(letter => `
                <span class="letter">
                 ${correctLetters.includes(letter)? letter: ""}
                </span>
            `)
            .join("")
        }
    `;
    // For every span, in the innerText new line is getting added! So, we have to remove it
    const innerWord = wordEl.innerText.replace(/\n/g, "")

    if(innerWord === selectedWord){
        finalMessage.innerText = "Congrats! You won"
        popup.style.display = "flex"
    }
}

// Update wrong letters
function updateWrongLetters(){
    wrongLettersEl.innerHTML=`
        ${wrongLetters.length>0 ? "<p>Wrong</p>" : ""}
        ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `;   // leaving it as array is resulting in comma - Woah!!


    // Display parts
    figureParts.forEach((part, index)=>{
        const errors = wrongLetters.length

        if(index<errors){
            part.style.display = "block";
        } else{
            part.style.display = "none";
        }
    })

    //Check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = "Unfortunately, you lost!"
        popup.style.display = "flex"
    }
}

// Show Notification  
function showNotification(){
    notification.classList.add("show")

    setTimeout(()=>{
        notification.classList.remove("show")
    }, 2000)
}


// ----------------------------------------------------------------------------
                    //  Event listeners
// ----------------------------------------------------------------------------

// Letter press
window.addEventListener("keydown", e => {
            //a-65, z-90
    if(e.keyCode>=65 && e.keyCode<=90){
        const letter = e.key

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord()
            } else{
                showNotification()
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)

                updateWrongLetters()
            } else{
                showNotification()
            }
        }
    }

})

// Restart game to play again
playAgainBtn.addEventListener("click", ()=>{
    //Empty arrays
    correctLetters.splice(0)
    wrongLetters.splice(0)

    selectedWord = words[Math.floor(Math.random() * words.length)]

    displayWord()

    updateWrongLetters()

    popup.style.display = "none"
})

displayWord()
