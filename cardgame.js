//Variables and loops

const cards = document.querySelectorAll(".card");
cards.forEach((card) => card.addEventListener("click", flipCard));

// Variables

let flipped = false;
let lock = false;
let firstCard, secCard;
let counter = 0;
let checkFlipped = 0;
let timer;

// Functions

function flipCard() {
  // check if the card has been flipped

  if (lock) return;

  // prevent double click on the same card

  if (this == firstCard) return;

  this.classList.toggle("flip");
  if (!flipped) {
    // first click
    flipped = true;
    firstCard = this;
    return;
  }
  //secound click

  flipped = false;
  secCard = this;

  // increment the moves
  counter++;
  document.querySelector(".moves").innerText = `${counter} Move(s)`;

  //start timer

  if (counter == 1) {
    startTimer();
  }
  starRating();
  checkMatch();
  if (checkFlipped == 12) {
    endGame();
  }
}

function checkMatch() {
  const namesMatch = firstCard.dataset.type == secCard.dataset.type;

  namesMatch ? disableCards() : blockCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secCard.removeEventListener("click", flipCard);
  checkFlipped += 2;
}

function blockCards() {
  //Not Matched= remove the class
  lock = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secCard.classList.remove("flip");
    resetBoard();
  }, 1200);
}

function resetBoard() {
  [flipped, lock] = [false, false];
  [firstCard, secCard] = [null, null];
}

(function suffleCards() {
  cards.forEach((card) => {
    let rand = Math.floor(Math.random() * 15);
    card.style.order = rand;
  });
})();

function startTimer() {
  let mins = 0;
  let secs = 0;

  timer = setInterval(() => {
    document.querySelector(".timer").innerHTML = `${mins} Min(s): ${secs} Secs`;
    secs++;
    if (secs == 60) {
      mins++;
      secs = 0;
    }
  }, 1000);
}

function starRating() {
  const [, star2, star3] = [...document.querySelector(".stars").children];

  if (counter == 10) {
    star3.remove();
  } else if (counter == 13) {
    star2.remove();
  }
}

function endGame() {
  // Select all the clases with the time,rating and moves

  document.querySelector(".win-moves").innerText +=
    document.querySelector(".moves").innerText;
  document.querySelector(".win-time").innerText +=
    document.querySelector(".timer").innerText;
  document
    .querySelector(".win-rating")
    .appendChild(document.querySelector(".stars"));

  // Stop timer
  clearInterval(timer);

  // Add the pop-up and remove it

  const popUp = document.querySelector(".pop-up");
  popUp.style.display = "flex";
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", () => (popUp.style.display = "none"));
}
