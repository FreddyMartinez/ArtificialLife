const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
game.drawBoard(game.generateEmptyBoard(40));
game.attachGridEventHandler();

startButton.onclick = () => {
  startButton.setAttribute("disabled", true);
  stopButton.removeAttribute("disabled");
  game.start();
};

stopButton.onclick = () => {
  startButton.removeAttribute("disabled");
  stopButton.setAttribute("disabled", true);
  game.stop();
};
