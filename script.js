// ゲーム状態
let answer = 0;
let tries = 0;
let bestRecord = localStorage.getItem('bestRecord') 
  ? parseInt(localStorage.getItem('bestRecord')) 
  : null;

// DOM要素
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const resetBtn = document.getElementById('resetBtn');
const resultText = document.getElementById('result');
const triesText = document.getElementById('tries');
const recordText = document.getElementById('record');

// 初期化
function initGame() {
  answer = Math.floor(Math.random() * 100);
  tries = 0;
  resultText.textContent = '結果がここに表示されます';
  resultText.classList.remove('correct', 'incorrect');
  triesText.textContent = '試行回数: 0 回';
  guessInput.value = '';
  guessInput.focus();
}

// 判定
const BORDER = 30;
function judge() {
  const guess = parseInt(guessInput.value);

  // バリデーション
  if (isNaN(guess)) {
    resultText.textContent = '数字を入力してください';
    resultText.classList.add('incorrect');
    return;
  }

  if (guess < 0 || guess > 99) {
    resultText.textContent = '0～99の数字を入力してください';
    resultText.classList.add('incorrect');
    return;
  }

  tries++;
  triesText.textContent = `試行回数: ${tries} 回`;

  if (guess === answer) {
    resultText.textContent = `🎉 正解！${tries}回で当てました！`;
    resultText.classList.remove('incorrect');
    resultText.classList.add('correct');
    guessBtn.disabled = true;
    guessInput.disabled = true;

    // 記録更新
    if (bestRecord === null || tries < bestRecord) {
      bestRecord = tries;
      localStorage.setItem('bestRecord', bestRecord);
      updateRecord();
    }
  } else if (guess > answer) {
    if (guess - answer >= BORDER) {
        resultText.textContent = '📉 大きすぎます';
    }else {
        resultText.textContent = '📉 大きいです';
    }
    resultText.classList.remove('correct');
    resultText.classList.add('incorrect');
  } else {
    if (answer - guess >= BORDER) {
        resultText.textContent = '📈 小さすぎます';
    }else {
        resultText.textContent = '📈 小さいです';
    }
    resultText.classList.remove('correct');
    resultText.classList.add('incorrect');
  }

  guessInput.value = '';
  guessInput.focus();
}

// 記録表示更新
function updateRecord() {
  if (bestRecord === null) {
    recordText.textContent = '最高記録: なし';
  } else {
    recordText.textContent = `最高記録: ${bestRecord} 回`;
  }
}

// イベントリスナー
guessBtn.addEventListener('click', judge);
resetBtn.addEventListener('click', () => {
  guessBtn.disabled = false;
  guessInput.disabled = false;
  initGame();
});

guessInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    judge();
  }
});

// ページロード時
window.addEventListener('load', () => {
  updateRecord();
  initGame();
});
