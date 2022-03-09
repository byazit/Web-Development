document.addEventListener('DOMContentLoaded', () => {

    //card options
    const cardArry = [
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'fries',
            img: 'images/fries.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        },
        {
            name: 'pizza',
            img: 'images/pizza.png'
        }

    ]

    cardArry.sort(()=>0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    let cardsChosen = []
    let cardChosenId = []
    let cardsWon=[]

    //create your board
    function createBoard(){
        for (let i = 0; i < cardArry.length; i++) {
            let card = document.createElement('img')
            card.setAttribute('src', 'images/blank.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }

    // check for matches
    function checkForMatch(){
        let cards= document.querySelectorAll('img')
        const optionOneId= cardChosenId[0]
        const optionTwoId= cardChosenId[1]
        if(cardsChosen[0] === cardsChosen[1]){
            //alert('You found 1 match')
            cards[optionOneId].setAttribute('src', 'images/white.png')
            cards[optionTwoId].setAttribute('src', 'images/white.png')
            cardsWon.push(cardsChosen)
        }else{
            cards[optionOneId].setAttribute('style', 'pointer-events:auto')
            cards[optionTwoId].setAttribute('style', 'pointer-events:auto')
            cards[optionOneId].setAttribute('src', 'images/blank.png')
            cards[optionTwoId].setAttribute('src', 'images/blank.png')
            //alert('Sorry, try again')
        }
        cardsChosen=[]
        cardChosenId=[]
        resultDisplay.textContent = cardsWon.length
        if(cardsWon.length===cardArry.length/2){
            resultDisplay.textContent='Congratulations! You found them all!'
        }
    }

    //flip your card
    function flipCard(){
        var cardId= this.getAttribute('data-id')        
        cardsChosen.push(cardArry[cardId].name)
        cardChosenId.push(cardId)
        this.setAttribute('style', 'pointer-events:none')      
        this.setAttribute('src', cardArry[cardId].img)
        if(cardsChosen.length===2){
            setTimeout(checkForMatch, 500)
        }
    }
    createBoard()
})