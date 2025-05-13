const emojis = ["🐶", "🐱", "🐭", "🦁", "🐯", "🐷", "🐵", "🐰"];

let cards = [...emojis, ...emojis];

let firstCard = null;    
let secondCard = null;   
let lock = true;         
let attempts = 0;        

const board = document.getElementById("gameBoard");
const attemptsDisplay = document.getElementById("attempts");
const restartBtn = document.getElementById("restart");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));  
    [array[i], array[j]] = [array[j], array[i]];    
  }
  return array;
}

function createBoard() {
  board.innerHTML = "";        
  shuffle(cards);              
  cards.forEach(emoji => {
    const card = document.createElement("div"); 
    card.classList.add("card");                 
    card.textContent = emoji;                    
    card.dataset.emoji = emoji;                  
    board.appendChild(card);                     
  });

  setTimeout(() => {
    document.querySelectorAll(".card").forEach(card => {
      card.classList.add("hidden");              
      card.addEventListener("click", flipCard);  
    });
    lock = false;                               
  }, 3000);
}

function flipCard() {
  if (lock || this.classList.contains("matched") || !this.classList.contains("hidden")) return;

  this.classList.remove("hidden");  

  if (!firstCard) {
    firstCard = this;              
    return;
  }

  secondCard = this;
  lock = true;
  attempts++;                      
  attemptsDisplay.textContent = `Tentatives : ${attempts}`;

  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add("matched");    
    secondCard.classList.add("matched");
    resetTurn();                           
  } else {

    setTimeout(() => {
      firstCard.classList.add("hidden");
      secondCard.classList.add("hidden");
      resetTurn();                        
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lock = false;  
}

restartBtn.addEventListener("click", () => {
  attempts = 0;  
  attemptsDisplay.textContent = "Tentatives : 0";
  firstCard = secondCard = null;
  lock = true;  
  createBoard(); 
});

createBoard();
