const equals3 = (a, b, c) => {
  return (a == b && b == c && a != '');
}

const checkWinner = (model) => {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(model[i][0], model[i][1], model[i][2])) {
      winner = model[i][0];
    }
  }

  // vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(model[0][i], model[1][i], model[2][i])) {
      winner = model[0][i];
    }
  }

  // diagonal
  if (equals3(model[0][0], model[1][1], model[2][2])) {
    winner = model[0][0];
  }
  if (equals3(model[0][2], model[1][1], model[2][0])) {
    winner = model[0][2];
  }

  return winner;
}

const game = () => {
  const model = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  const playerX = 'X';
  const playerO = 'O';
  let currentPlayer = playerX;
  let step = 0;

  const $game = document.querySelector('#game');
  const $table = document.createElement('table');
  $table.id = "table";
  for (let i = 0; i < 3; i++) {
    const $tr = document.createElement('tr');
    $tr.dataset.index = i;

    for (let j = 0; j < 3; j++) {
      const $td = document.createElement('td');
      $td.dataset.index = j;
      $tr.appendChild($td);

    }

    $table.appendChild($tr);
  }

  $game.appendChild($table);

  $table.addEventListener('click', (e) => {
    step ++;
    const row = e.target.parentNode.dataset.index;
    const column = e.target.dataset.index;


    // console.log(row);
    // console.log(column);

    // 2. check if td assigned
    if (model[row][column] == '') {  //check cell is busy
      model[row][column] = currentPlayer;
      e.target.innerHTML = currentPlayer;
      currentPlayer = currentPlayer === playerX ? playerO : playerX;

    }else {
      alert('Ячейка уже занята!');
    }
    // model[row][column] = currentPlayer;
    // e.target.innerHTML = currentPlayer;
    const winner = checkWinner(model);
    // check tie
    if (step <= 9 && winner != null) {
      alert(`Winner: ${winner}`);
    }
    else if (step == 9 && winner == null) { // check tie
      alert(`Winner: Ничья`);
    }

    for (let i = 0; i < model.length; i++){
      for (let j = 0; j < model[i].length; j++){
        console.log(model[i][j]);
      }
    }
    console.log(step);
    // 1. tie
    // currentPlayer = currentPlayer === playerX ? playerO : playerX;

  });
}


window.onload = () => {
  game();
};
