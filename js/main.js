// Build a simple Blackjack game...

const
    spread = ['1','2','3','4','5','6','7','8','9','10','jack','queen','king'],
    colour = ['heart', 'diamond', 'spade', 'club'];
let
    dealLimit = spread.length * colour.length,
    cards  = [],
    playerTotal,
    dealerTotal,
    dealButton = "",
    standButton = "",
    winlose = "",
    src = "img/",
    turn = "";

function setOfCards() {
  function Card(spread,colour){
    this.spread = spread;
    this.colour = colour;
    this.png = `<img class="card animated fadeInRight" src="${src}${spread}_${colour}.png">`;
    this.value = (spread <= 10 ? spread*1 : 10*1);
    if (this.value == 1) {this.value = 11; this.altValue = 1;}

    Object.defineProperty(this, "name", {
      get: function() {
        return `${this.spread} of ${this.colour} `;
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
    board = document.querySelector("img.startimage"),
    playerBoard = document.querySelector("div.player span.hand"),
    playerBoardTotal = document.querySelector("div.player span.total"),
    dealerBoard = document.querySelector("div.dealer span.hand"),
    dealerBoardTotal = document.querySelector("div.dealer span.total");

    winlose = document.querySelector("div#eval");
    turn = who;
    board.style.display = 'none';

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

    catchAce('dealer');
    catchAce('player');

  } else
  if (dealLimit <= 48 && playerTotal != 21 && turn == "player"){
    get = cards.splice(-1,1);
    dealLimit--;
    playerHand = get.concat(playerHand);
    playerTotal += playerHand[0].value;
    playerBoard.innerHTML += `${playerHand[0].png}`;
    playerBoardTotal.innerHTML =`You have: ${playerTotal}`;
    catchAce('player');

  } else
  if (playerTotal <= 21 && turn == "dealer" && dealerTotal <= 17){
    document.querySelector("a.stand").style.visibility = 'hidden';
    playerPoints = playerTotal;
    get = cards.splice(-1,1);
    dealLimit--;
    dealerHand = get.concat(dealerHand);
    dealerTotal += dealerHand[0].value;
    dealerBoard.innerHTML += `${dealerHand[0].png}`;
    dealerBoardTotal.innerHTML =`Dealer has: ${dealerTotal}`;
    catchAce('dealer');

    setTimeout(function(){
      dealHand('dealer');
    }, 800);

  }
  else {
    catchAce('dealer');
    catchAce('player');
    calculateWin(playerTotal,dealerTotal);
  }

}

function catchAce(who) {
  if (who == "player") {
    if (playerHand[0].altValue || playerHand[1].altValue) {
      console.log("Player has ACE");
      if (playerTotal === 21 && dealerTotal != 21 && playerHand.length == 2) {
        winlose.innerHTML = "<a class=\"winlose fadeInRight animated\" style=\"color:green;\">Player WINS With BlackJack</a>";
        exit(3500);
      } else
      if (playerTotal > 21) {
        console.log("You bust, dont worry you have an ACE");
        playerTotal -= 10;
        console.log(playerTotal + " -10 ")
        document.querySelector("div.player span.total").innerHTML =`You have: ${playerTotal}`;
        return;
      } else
      if (playerTotal === dealerTotal && dealerTotal >= 17){
        console.log("Player pauses");

      }
    }
  } else {
    if (dealerHand[0].altValue || dealerHand[1].altValue) {
      console.log("Dealer has ACE");
      if (dealerTotal === 21) {
        winlose.innerHTML = "<a class=\"winlose fadeInRight animated\" style=\"color:red;\">Dealer WINS With BlackJack</a>";
        exit(3500);
      } else
      if (dealerTotal > 21){
        console.log("Dealer bust, dont worry you have an ACE");
        dealerTotal -= 10;
        console.log(dealerTotal + " -10 ")
        document.querySelector("div.dealer span.total").innerHTML =`Dealer has: ${dealerTotal}`;
        return;
      }
    }
  }

}

function exit(time){
  setTimeout(function(){
    location.reload(false);
  }, time);
}

function calculateWin(player, dealer) {
  document.querySelector("a.stand").style.visibility = 'hidden';
  if ( player > dealer && dealer >= 17 && !(player >= 22) ) {
    winlose.innerHTML = "<span style=\"color:green;\">Player WINS</span>";
    exit(2500);
  } else
  if ( dealer >= player && !(dealer >= 22) ) {
    winlose.innerHTML = "<a class=\"winlose fadeInRight animated\" style=\"color:red;\">Dealer WINS</a>";
    exit(2500);
  } else
  if ( dealer >= 22 ){
    winlose.innerHTML = "<a class=\"winlose fadeInRight animated\" style=\"color:green;\">Player WINS</a>";
    exit(2500);
  } else
  if ( playerTotal > 21 ) {
    catchAce('player');
    winlose.innerHTML = `<a class=\"winlose fadeInRight animated\" style=\"color:red;\">You bust at ${playerTotal}</a>`;
    exit(2500);
  } else {
    dealHand('dealer');
  }
}

function onButtonDeal(){
  dealButton = document.querySelector("a.deal");
  dealButtonClick = dealButton.addEventListener('click', function(){
    if (playerTotal > 21) {
      catchAce('player');
      winlose.innerHTML = `<a class=\"winlose fadeInRight animated\" style=\"color:red;\">You bust at ${playerTotal}</a>`;
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
      winlose.innerHTML = "<a class=\"winlose fadeInRight animated\" style=\"color:red;\">Dealer WINS</a>";
      exit(2500);
    } else
    if (dealerTotal >= 17 && playerTotal > dealerTotal && !(playerTotal > 21)){
      winlose.innerHTML = "<a class=\"winlose fadeInRight animated\" style=\"color:green;\">Player WINS</a>";
      exit(2500);
    } else
    if (dealLimit != 0) {
      dealHand('dealer');
    }
  });

};
