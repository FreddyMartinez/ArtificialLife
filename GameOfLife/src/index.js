const isAlive = (cell, neighbours) => {
  if (neighbours < 2 || neighbours > 3) {
    return 0;
  }
  if (neighbours === 3) {
    return 1;
  }
  return cell;
}

window.game = {
  isAlive,
}
