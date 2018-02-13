/* Section 14 Lecture 156, 157
   Score Keeper */

//*****  Variables  *****

//Player Scores
let p1Score: number = 0;
let p2Score: number = 0;

//Display for scores
let p1Span: HTMLElement = document.querySelector("#p1-score");
let p2Span: HTMLElement = document.querySelector("#p2-score");

//Player Buttons
let p1Btn: HTMLElement = document.querySelector("#p1-btn");
let p2Btn: HTMLElement = document.querySelector("#p2-btn");

//Reset Button
let resetBtn: HTMLElement = document.querySelector("#reset-btn");

//Number Input
let numInput: HTMLInputElement = document.querySelector("input[type='number']");

//Display for winning Number
let winSpan: HTMLElement = document.querySelector("#win-num");

//Game over state
let gameOver: boolean = false;

//Winning number
let winScore: number = 7;

//*****  Functions Definitions *****

//Updates the player score display
function UpdatePlayerScore(playerSpan: HTMLElement, playerScore: number): void{
    playerSpan.innerHTML = playerScore.toString();
}

//Gets the new winning score from the input box
function GetNewWinScore(): number{
  return Number(numInput.value);
}

//Updates the playing to score
function ChangeWinScore(winScoreSpan: HTMLElement, winScore: number): void{
  winScoreSpan.innerHTML = winScore.toString();
}

//Toggles the css class to signify winner
function HightlightWinner(playerSpan: HTMLElement): void{
  playerSpan.classList.toggle("winner");
}

//Checks if the player score is equal to the winning score
function CheckScore(playerSpan: HTMLElement, playerScore: number): boolean{
  if(playerScore === winScore){
    HightlightWinner(playerSpan)
    return true;
  }
  return false;
}

//Checks if the game is over
function CheckIfGameOver(playerSpan: HTMLElement, playerScore: number, isGameOver: boolean): any[]{
  let gameState: any[] = [];
  if(isGameOver === false ){
    playerScore++;
    isGameOver = CheckScore(playerSpan, playerScore);
    UpdatePlayerScore(playerSpan, playerScore);
  }
  
  gameState.push(playerScore);
  gameState.push(isGameOver);
  
  return gameState;
}

//Resets the gamestate back to false
function ResetGameOver(): boolean{
  return false;
}

//Resets the score back to 0
function ResetScore(): number{
  return 0;
}

//Resets the winning number back to 7
function ResetWinningNumber(): number{
  return 7;
}

//Removes the class added to the winner
function ResetSpanHighlight(playerSpan: HTMLElement): void{
  playerSpan.classList.remove("winner");
}

//Resets the display to show 0's
function ResetSpanDisplay(playerSpan: HTMLElement, playerScore: number): void{
  UpdatePlayerScore(playerSpan, playerScore);
}

//Resets the number playing to.
function ResetWinningNumberDisplay(winningNumberSpan: HTMLElement, winningNumber: number): void{
  winningNumberSpan.innerHTML = winningNumber.toString();
}

//Resets the textbox to empty
function ResetWinningNumberTextBox(numberInput: HTMLInputElement): void{
  numberInput.value = "";
}

//Resets the page 
function ResetPage(): void{
  gameOver = ResetGameOver();
  p1Score = ResetScore();
  p2Score = ResetScore();
  winScore = ResetWinningNumber();
  ResetSpanHighlight(p1Span);
  ResetSpanHighlight(p2Span);  
  ResetSpanDisplay(p1Span, p1Score);  
  ResetSpanDisplay(p2Span, p2Score);  
  ResetWinningNumberDisplay(winSpan, winScore);
  ResetWinningNumberTextBox(numInput);
}

//*****  Event Listeners with anonymous functions  *****
//Player One Button
p1Btn.addEventListener("click", () => {
  let gameState: any[] = CheckIfGameOver(p1Span, p1Score, gameOver);
  p1Score = gameState[0];
  gameOver= gameState[1];
});

//Player Two Button
p2Btn.addEventListener("click", () => {
  let gameState: any[] = CheckIfGameOver(p2Span, p2Score, gameOver);
  p2Score = gameState[0];
  gameOver= gameState[1];
});

//Reset Button
resetBtn.addEventListener("click", () => {
  ResetPage();
});

//Number Box
numInput.addEventListener("change", () => {  
  winScore = GetNewWinScore();
  ChangeWinScore(winSpan, winScore);
});

//*****  Function calls for after the page loads  *****
ResetPage();