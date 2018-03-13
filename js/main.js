// Build a simple Blackjack game using HTML, CSS, JavaScript and jQuery. It’s a single page, that opens in the browser, and lets the user play. The rules for Blackjack are here, it’s a relatively simple game. Your implementation just needs to give the "hit" and "stand" options to the player (no betting), feel free to figure out what UI you prefer, as long as the user understands what is happening and can play multiple games.

const
    spread = ['1','2','3','4','5','6','7','8','9','10','Jack','Queen','King'],
    colour = ['heart', 'diamond', 'spade', 'club'];
let
    dealLimit = spread.length * colour.length,
    cards  = [],
    playerTotal,
    dealerTotal,
    dealButton = "",
    standButton = "",
    src = "img/";

function setOfCards() {
  function Card(spread,colour){
    this.spread = spread;
    this.colour = colour;
    this.png = `<img class="card animated fadeInRight" src="${src}${spread}_${colour}.png">`;
    this.value = (spread <= 10 ? spread*1 : 10*1);
    if (this.value == 1) {this.altValue = 11;}

    Object.defineProperty(this, "name", {
      get: function() {
        return `${this.spread} of ${this.colour}`;
      },
      set: function(newName) {
        name = newName;
      },
      configurable: false
    });
  }
  function fisherYates(array) {
    var rnd, temp;
    for (var i = array.length - 1; i; i--) {
      rnd = Math.random() * i | 0;
      temp = array[i];
      array[i] = array[rnd];
      array[rnd] = temp;
    }
  }
  for (let j = 0; j < colour.length; j++){
    for (let i = 0; i < spread.length; i++){
      cards.push( new Card(spread[i], colour[j]) );
    }
  }
  fisherYates(cards);
}

function dealHand(who){
  let
    turn = who,
    playerBoard = document.querySelector("div.player span.hand"),
    playerBoardTotal = document.querySelector("div.player span.total"),
    dealerBoard = document.querySelector("div.dealer span.hand"),
    dealerBoardTotal = document.querySelector("div.dealer span.total");

  if (dealLimit > 48) {
    playerHand = cards.splice(-2, 2);
    playerTotal = playerHand[0].value + playerHand[1].value;
    playerBoard.innerHTML = `${playerHand[0].png} ${playerHand[1].png}`;
    playerBoardTotal.innerHTML =`You have: ${playerTotal}`;

    dealerHand = cards.splice(-2, 2);
    dealerTotal = dealerHand[0].value + dealerHand[1].value;
    dealerBoard.innerHTML = `${dealerHand[0].png} ${dealerHand[1].png} `;
    dealerBoardTotal.innerHTML =`Dealer has: ${dealerTotal}`;

    dealLimit = cards.length;
    document.querySelector("a.deal").innerHTML = 'Hit';
    document.querySelector("a.get").style.visibility = 'visible';

  } else
  if (dealLimit <= 48 && playerTotal < 21 && turn == "player"){
    get = cards.splice(-1,1);
    dealLimit--;
    playerHand = get.concat(playerHand);
    playerTotal += playerHand[0].value;
    playerBoard.innerHTML += `${playerHand[0].png}`;
    playerBoardTotal.innerHTML =`You have: ${playerTotal}`;

  } else
  if (playerTotal <= 21 && turn == "dealer" && dealerTotal <= 17){
    playerPoints = playerTotal;
    get = cards.splice(-1,1);
    dealLimit--;
    dealerHand = get.concat(dealerHand);
    dealerTotal += dealerHand[0].value;
    dealerBoard.innerHTML += `${dealerHand[0].png}`;
    dealerBoardTotal.innerHTML =`Dealer has: ${dealerTotal}`;
  }
  else {
    calculateWin(playerTotal,dealerTotal);
  }

}

function exit(time){
  setTimeout(function(){
    location.reload(false);
  }, time);
}

function calculateWin(player, dealer) {
  if ( player > dealer && dealer >= 22 ) {
    standButton.innerHTML = "<span style=\"color:green;\">Player WINS</span>";
    exit(2500);
  } else
  if ( dealer > player && !(dealer >= 22) ) {
    dealButton.innerHTML = "<span style=\"color:red;\">Dealer WINS</span>";
    exit(2500);
  } else
  if ( dealer >= 22 ){
    standButton.innerHTML = "<span style=\"color:green;\">Player WINS</span>";
    exit(2500);
  } else
  if ( playerTotal > 21 ) {
    dealButton.innerHTML = `<span style=\"color:red;\">You bust at ${playerTotal}</span>`;
    exit(2500);
  } else {
    dealHand('dealer');
  }
}

function onButtonDeal(){
  dealButton = document.querySelector("a.deal");
  dealButtonClick = dealButton.addEventListener('click', function(){
    if (playerTotal > 21) {
      dealButton.innerHTML = `<span style=\"color:red;\">You bust at ${playerTotal}</span>`;
      exit(2500);
    } else
    if (dealLimit != 0) {
			dealHand('player');
    }
  });

  standButton = document.querySelector("a.stand");
  standButtonclick = standButton.addEventListener('click', function(){

    document.querySelector("a.deal").style.visibility = 'hidden';
    if (dealerTotal >= 17 && dealerTotal >= playerTotal && !(dealerTotal > 21)) {
      dealButton.innerHTML = "<span style=\"color:red;\">Dealer WINS</span>";
      exit(2500);
    } else
    if (dealerTotal >= 17 && playerTotal > dealerTotal && !(playerTotal > 21)){
      standButton.innerHTML = "<span style=\"color:green;\">Player WINS</span>";
      exit(2500);
    } else
    if (dealLimit != 0) {
      dealHand('dealer');
    }
  });

};
