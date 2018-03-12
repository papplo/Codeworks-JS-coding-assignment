// Build a simple Blackjack game using HTML, CSS, JavaScript and jQuery. It’s a single page, that opens in the browser, and lets the user play. The rules for Blackjack are here, it’s a relatively simple game. Your implementation just needs to give the "hit" and "stand" options to the player (no betting), feel free to figure out what UI you prefer, as long as the user understands what is happening and can play multiple games.

  // 00: How do you store a deck of cards?
  let spread = ['1','2','3','4','5','6','7','8','9','10','J','Q','K'];
  let colour = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
  let dealLimit = spread.length * colour.length;
  let cards  = [], playerTotal, dealerTotal;
  /* I would like to get the following data structure: (Array with Objects), arrays can make use of the .push() and .pop()-methods which operate rather fast. Arrays store an order in keys, which also can be randomized (or shuffled)...
  cards [
      {colour: Hearts, value: 1}, {colour: Hearts, value: 2}...
    ]
  */

function setOfCards() {
  //01: lets make use of an object constructor function: (https://javascript.info/constructor-new)
  function Card(spread,colour){
    // first assign the primitive values to the object, make sure value is coersed to number
    this.spread = spread;
    this.colour = colour;
    this.value = (spread <= 10 ? spread*1 : 10*1);
      if (this.value == 1) {this.value = 11;}
    // then lets have some sort of function to display my unique name
    // According to css-tricks this could do the job: https://css-tricks.com/understanding-javascript-constructors/
    Object.defineProperty(this, "name", {
      get: function() {
        return `${this.spread} of ${this.colour} has value of ${this.value}`;
      },
      set: function(newName) {
        name = newName;
      },
      configurable: false
    });
  }
  //02: lets create a new array cards[] where we store all our cards as indivudual objects
  //03: loop throgh the whole sprad of cards per colour
  for (let j = 0; j < colour.length; j++){
    for (let i = 0; i < spread.length; i++){
      cards.push( new Card(spread[i], colour[j]) );
    }
  }
  //Use a github function for shuffle, lets exchange it later...
  function fisherYates(array) {
    var rnd, temp;
    for (var i = array.length - 1; i; i--) {
      // rnd uses bitwise or: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#.7c_%28Bitwise_OR%29
      rnd = Math.random() * i | 0;
      temp = array[i];
      array[i] = array[rnd];
      array[rnd] = temp;
    }
  }
  fisherYates(cards);
  console.log(cards);
}

//04: lets deal a hand for player and a hand for dealer
function dealHand(){

  if (dealLimit > 48) {
    // first deal: two cards each
    playerHand = cards.splice(-2, 2);
    playerTotal = playerHand[0].value + playerHand[1].value;
    dealerHand = cards.splice(-2, 2);
    dealerTotal = dealerHand[0].value + dealerHand[1].value;
    console.log(playerHand);
      // display cards in DOM
      document.querySelector("div.player span.hand").innerHTML = `
      Your hand: ${playerHand[0].name}, <br /> ${playerHand[1].name}<br />`;
      document.querySelector("div.player span.total").innerHTML =`
      You have: ${playerTotal}`;

      document.querySelector("div.dealer span.hand").innerHTML = `Dealers hand: ${dealerHand[0].name},  <br /> ${dealerHand[1].name} <br />`;
      document.querySelector("div.dealer span.total").innerHTML =`
      Dealer has: ${dealerTotal}`;

    // reset limit
    dealLimit = cards.length;
    console.log(dealLimit + "left");

    document.querySelector("a.get").style.visibility = 'visible';

  } else if (dealLimit <= 48 && playerTotal < 21){

    // players turn: hit or stand:
    get = cards.splice(-1,1);
    dealLimit--;
    playerHand = get.concat(playerHand);
    console.log(playerHand);
    playerTotal += playerHand[0].value;

      // display hit in DOM
      document.querySelector("div.player span.hand").innerHTML += `
      ${playerHand[0].name}<br />`;
      document.querySelector("div.player span.total").innerHTML =`
      You have: ${playerTotal}`;


    //console.log("Removed" + cards.splice(-1,1));
    console.log(cards.length + "left");
  }




}

function stand(){
  // now player stands and has not busted
}

let dealButton = "";
//05: lets track our game by adding an eventlistener that acts on our ui according to game rules
function onButtonDeal(){
  dealButton = document.querySelector("a.deal");
  dealButtonClick = dealButton.addEventListener('click', function(){
    if (dealerTotal >= 21) {
      console.log("Dealer has natural, you LOSE!");
    } else if (playerTotal > 21) {
      dealButton.innerHTML = "<span style=\"color:red;\">you busted biatch!</span>";
      setTimeout(function(){location.reload(false);}, 1500);
    } else if (dealLimit != 0) {
			dealHand();
		}
  });
};
