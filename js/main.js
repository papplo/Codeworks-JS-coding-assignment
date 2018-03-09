// Build a simple Blackjack game using HTML, CSS, JavaScript and jQuery. It’s a single page, that opens in the browser, and lets the user play. The rules for Blackjack are here, it’s a relatively simple game. Your implementation just needs to give the "hit" and "stand" options to the player (no betting), feel free to figure out what UI you prefer, as long as the user understands what is happening and can play multiple games.

function setOfCards() {

  // 00: How do you store a deck of cards?
  let spread = ['1','2','3','4','5','6','7','8','9','10','J','Q','K'];
  let colour = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
  let cards = [];

  /* I would like to get the following data structure: (Array with Objects), arrays can make use of the .push() and .pop()-methods which operate rather fast. Arrays store an order in keys, which also can be randomized (or shuffled)...
  cards [
      {colour: Hearts, value: 1}, {colour: Hearts, value: 2}...
    ]
  */

  //01: lets make use of an object constructor function: (https://javascript.info/constructor-new)
  function Card(spread,colour){
    // first assign the primitive values to the object, make sure value is coersed to number
    this.spread = spread;
    this.colour = colour;
    this.value = (spread <= 10 ? spread*1 : 11*1);

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
  //var firstCards = new Card(spread[0], colour[0]);
  //console.log(firstCards.spread, firstCards.colour);

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
    rnd = Math.random() * i | 0;
    temp = array[i];
    array[i] = array[rnd];
    array[rnd] = temp;
  }

  return array;
}


  //04: now lets examine functionality below:
  
    // simple imaginary first hand deal:
    console.log(fisherYates(cards));
    console.log("Dealers hand: \n" + cards[0].name + "\n" + cards[1].name);
    console.log("Your hand: \n" + cards[2].name + "\n" + cards[3].name +"\n");

  // calculate risks and chances for first hand of 52 shuffled cards:
  var riskGeneral = (1 / cards.length) *100;
  console.log(riskGeneral.toFixed(2) + "% per " + cards.length +" card");




  //return cards;
}
