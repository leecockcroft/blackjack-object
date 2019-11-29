;
(function() {

  const Game = function(el) {
    this.el = document.getElementById(el);
    this.deck_info = document.createElement('div')
    this.deck_info.id = 'full_deck';
    this.deal = document.createElement('BUTTON');
    this.deal.textContent = 'deal';
    this.button = document.createElement('BUTTON');
    this.button.textContent = 'Hit'
    this.stand = document.createElement('BUTTON');
    this.stand.textContent = 'Stand';
    this.reset = document.createElement('BUTTON');
    this.reset.textContent = 'reset';


    this.dealCards = [];
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
    this.deck_info.appendChild(this.deal)
    this.deck_info.appendChild(this.button)
    this.deck_info.appendChild(this.stand)
    this.deck_info.appendChild(this.reset)
    this.el.appendChild(this.deck_info)


    let x = this.fullDeck.deal.bind(this)
    console.log(x())

    console.log(this.player.score, 'player')
    console.log(this.dealer.score, 'dealer')
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

           this.fullStack.push({
            id : 'card-' + cardNumbers[j],
            value : cardNumbers[j],
            suit : cardSuits[i],
            color : 'black',
            weight:parseInt(cardNumbers[j])
          })


      }






    }

    shuffle(this.fullStack)
    let deck = new Card();
    for(var i =0;i<this.fullStack.length;i++){




    deck.id = 'card-' + this.fullStack[i].id
    deck.value = this.fullStack[i].value
    deck.suit = this.fullStack[i].suit
    deck.color = 'black'
    deck.weight=this.fullStack[i].weight
    if(deck.suit.charAt(0)=='h' ||deck.suit.charAt(0)=='d'){
        deck.color='red'

}
    if(deck.value==='J' ||deck.value==='Q' ||deck.value==='K' ){

    this.fullStack[i].weight=10
    }
    if(deck.value=='A'){
        this.fullStack[i].weight=11
      }

  deck.all(deck_div)
      this.stack(deck_div)
      console.log(this.fullStack)
      console.log(deck_div,'deck')
        deck_div.appendChild(parentFrag)
}












  }
  Deck.prototype.deal = function() {

    let card1 = this.fullDeck.fullStack.pop()
    let card2 = this.fullDeck.fullStack.pop()

    let card3 = this.fullDeck.fullStack.pop()
    let card4 = this.fullDeck.fullStack.pop()
    this.player.score = parseInt(card1.weight) + parseInt(card3.weight);
    this.dealer.score = parseInt(card2.weight) + parseInt(card4.weight);


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
  const Card = function(id, value, suit, color,display) {

    this.id = id;
    this.value = value;
    this.suit = suit;

    this.weight = 0;
    this.color = color;
    this.display=display



    this.all = function(parentFrag) {
      let cardContainer = document.createElement('div');
      cardContainer.classList.add('card_container');
      cardContainer.id = this.id;
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

      backFace.appendChild(suitDisplay)
      backFace.appendChild(numberDisplay)

      flip.appendChild(frontFace)
      flip.appendChild(backFace)
      cardContainer.appendChild(flip)


      cardContainer.onclick = cardClick

      parentFrag.appendChild(cardContainer)

    }

  }
  var cardClick=(function(){
    var counter=0;
    return function cardClick(e) {
      e.currentTarget.classList.toggle('flip_card')
      e.currentTarget.classList.toggle('slide_over')
      e.currentTarget.style.zIndex=counter;
      counter++}

})()

  Deck.prototype.hit = function() {
    let card = this.fullDeck.fullStack.pop()
    this.player.score += card.weight
    console.log(this.player.score)
    if (this.player.score > 21) {
      console.log('bust' + this.player.score)
    }
    if (this.player.score === 21) {
      console.log(21)
    }

  }

  Deck.prototype.stand = function() {

    while (this.dealer.score < 17) {
      let card = this.fullDeck.fullStack.pop();
      this.dealer.score += card.weight;
      console.log(this.dealer.score)
    }
    if (this.dealer.score >= 17 && this.dealer.score <= 21) {

      compare(this.dealer.score, this.player.score)

    }
    if (this.dealer.score > 21) {
      console.log('dealer bust')
    }

  }

  function compare(a, b) {
    if (a > b) {
      console.log('dealer wins')
    }
    if (b > a) {
      console.log('player wins')

    }
    if (a == b) {

      console.log('push')
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
