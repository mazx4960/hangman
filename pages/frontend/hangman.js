function generateKeyboard() {
    let buttons = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
        `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        style="background-color:#B6C48E; border-color:#B6C48E; color:#301008"
      >
        ` + letter + `
      </button>
    `).join('');

    document.getElementById('keyboard').innerHTML = buttons;
}
generateKeyboard();