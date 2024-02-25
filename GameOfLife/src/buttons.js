const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");

startButton.onclick = () => {
  startButton.setAttribute("disabled", true);
  stopButton.removeAttribute("disabled");
};

stopButton.onclick = () => {
  startButton.removeAttribute("disabled");
  stopButton.setAttribute("disabled", true);
};
