;
(function() {

  const Game = function(el) {
    this.el = document.getElementById(el);
    this.deck_info = document.createElement('div')
    this.deck_info.id = 'full_deck';
    this.button = document.createElement('BUTTON');
    this.button.textContent = 'Hit'
    this.stand = document.createElement('BUTTON');
    this.stand.textContent = 'Stand'
    this.dealCards = []
    this.player = {
      score: 0
    }
    this.dealer = {
      score: 0
    }

    this.player_div = document.createElement('div')
    this.player_div.id = 'player'
    this.player_div.innerHTML = 'test'
    this.dealer_div = document.createElement('div')
    this.dealer_div.id = 'dealer'


    this.fullDeck = new Deck(this.deck_info)


    this.deck_info.appendChild(this.player_div)
    this.deck_info.appendChild(this.dealer_div)
    this.deck_info.appendChild(this.button)
    this.deck_info.appendChild(this.stand)
    this.el.appendChild(this.deck_info)


    let x = this.fullDeck.deal.bind(this)
    console.log(x())
    console.log(this.player.score,'player')
    console.log(this.dealer.score,'dealer')
    this.button.onclick = this.fullDeck.hit.bind(this)
    this.stand.onclick = this.fullDeck.stand.bind(this)

  }

  let shuffle = (deck) => {
    // for 1000 turns
    // switch the values of two random cards
    for (let i = 0; i < 1000; i++) {
      let location1 = Math.floor((Math.random() * deck.length));
      let location2 = Math.floor((Math.random() * deck.length));
      let tmp = deck[location1];

      deck[location1] = deck[location2];
      deck[location2] = tmp;
    }

  }

  //deck
  const Deck = function(deck_div) {
    this.fullStack = []
    deck_div.innerHTML = ""
  let cardNumbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
    let cardSuits = ['hearts', 'clubs', 'spades', 'diam']
    let parentFrag = document.createDocumentFragment();
    //loop the suits, the amount of times per cardNumber
    //loops hearts 52 times
    for (var i = 0; i < cardSuits.length; i++) {
      for (var j = 0; j < cardNumbers.length; j++) {
        let deck = new Card();

        deck.id = 'card-' + cardNumbers[j];
        deck.value = cardNumbers[j];
        deck.suit = cardSuits[i]
        deck.color = 'black'

        if (deck.suit.charAt(0) === 'h' || deck.suit.charAt(0) === 'd') {
          deck.color = 'red'
        }

        deck.test = deck_div
        deck.weight = parseInt(cardNumbers[j])
        if (cardNumbers[j] === 'J' || cardNumbers[j] === 'Q' || cardNumbers[j] === 'K') {

          deck.weight = 10;
        }
        if (cardNumbers[j] === 'A') {
          deck.weight = 11;
        }
        this.fullStack.push(deck)
      }

      shuffle(this.fullStack)
      deck_div.appendChild(parentFrag)
      this.stack(deck_div)
    }
  }
  Deck.prototype.deal = function() {

    let card1 = this.fullDeck.fullStack.pop()
    let card2 = this.fullDeck.fullStack.pop()

    let card3 = this.fullDeck.fullStack.pop()
    let card4 = this.fullDeck.fullStack.pop()
    this.player.score = parseInt(card1.weight) + parseInt(card3.weight);
    this.dealer.score = parseInt(card2.weight) + parseInt(card4.weight);
    console.log(this.fullDeck.fullStack, 'test');

  }

  Deck.prototype.stack = function(deck_div) {
    let cards = deck_div.children;
    for (var i = cards.length - 1; i >= 0; i--) {
      cards[i].style.top = i + 'px';
      cards[i].style.left = i + 'px';
      cards[i].classList.add('stacked_card');
    }
  }
//cards
const Card = function(id, value, suit, test, color) {

    this.id = id;
    this.value = value;
    this.suit = suit;
    this.test = test
    this.weight = 0;
    this.allCards = [];
    this.color = color

    let cardContainer = document.createElement('div');
    cardContainer.classList.add('card_container');
    cardContainer.id = this.id;

    this.all = function(fragment) {
      let frontFace = document.createElement('div')
      let flip = document.createElement('div')
      flip.classList.add('flip')
      frontFace.classList.add('front')

      let suitDisplay = document.createElement('div');
      suitDisplay.classList.add('suit-display');
      suitDisplay.classList.add(`${this.color}`);
      suitDisplay.innerHTML = `&${this.suit};`;

      let numberDisplay = document.createElement('div');
      numberDisplay.classList.add('number-display');
      numberDisplay.classList.add(`${this.color}`);
      numberDisplay.innerHTML = this.value;

      let backFace = document.createElement('div');
      backFace.classList.add('back');
      backFace.innerHTML = 'TESTING';

      frontFace.appendChild(suitDisplay)
      frontFace.appendChild(numberDisplay)

      flip.appendChild(frontFace)
      flip.appendChild(backFace)
      cardContainer.appendChild(flip)

      this.test.appendChild(cardContainer)
      cardContainer.onclick = function(e) {
        e.currentTarget.classList.toggle('flip_card')
        e.currentTarget.classList.toggle('slide_over')
      }
    }
  }

  Deck.prototype.hit = function() {
    let card = this.fullDeck.fullStack.pop()
    this.player.score += card.weight
    if (this.player.score > 21) {
      console.log('bust')
    }
    if (this.player.score === 21) {
      console.log(21)
    }

  }

  Deck.prototype.stand=function(){

    while(this.dealer.score < 17){
      let card = this.fullDeck.fullStack.pop();
      this.dealer.score+=card.weight;
      console.log(this.dealer.score)

}

  }

  // player
  // dealer
  // bet
  // deal cards
  // add scores together
  // hit/stand
  // dealer score 16+
  // decide winner
  // deduct/add wager amount.



  window.Game = Game

})(window);


(function() {

  const x = new Game('test')




})()
