// 獲取HTML元素的引用
const destinationContainer = document.getElementById("destination__container");
const originContainer = document.getElementById("origin__container");
const originalText = document.getElementById("original__text");
const words = document.getElementsByClassName("word");

// 存儲目的地容器的默認位置
let destinationPosDefault = destinationContainer.getBoundingClientRect();

// 用於存儲目的地和源容器的單詞對象的數組
let destinationArray = [];
const originArray = [];

// 從'exercises'數組中選擇一個隨機練習
let exercise = exercises[Math.floor(Math.random() * exercises.length)];
let chineseSentence = exercise.chinese.split(" ");
let listOfWords = exercise.list;

// 為中文句子創建span，並為單詞列表創建word divs
for (let i = 0; i < chineseSentence.length; i++) {
  const spanNode = document.createElement("span");
  spanNode.textContent = chineseSentence[i];
  originalText.appendChild(spanNode);
}

for (let i = 0; i < listOfWords.length; i++) {
  const wordNode = document.createElement("div");
  wordNode.textContent = listOfWords[i];
  wordNode.classList.add("word");
  originContainer.appendChild(wordNode);
}

// 用於計算目的地光標的默認x位置的函數
function calibrateDestinationCursorPos(destinationArray) {
  if (destinationArray.length === 0) {
    return destinationPosDefault.x;
  } else {
    let sum = destinationPosDefault.x;
    destinationArray.forEach((element) => {
      sum += element.width + 20; // 添加20像素的單詞之間的間距
    });
    return sum;
  }
}

// 用於為源容器創建單詞對象數組的函數
function createOriginArray(word) {
  let wordPosition = word.getBoundingClientRect();
  let newWordObject = Object.assign(wordPosition);
  newWordObject.word = word.textContent;
  newWordObject.location = "origin";
  originArray.push(newWordObject);
}

// 循環遍歷源容器中的每個單詞
for (let i = 0; i < words.length; i++) {
  createOriginArray(words[i]);

  // 為每個單詞添加單擊事件監聽器，以實現拖動功能
  words[i].addEventListener("click", () => {
    // 計算動畫的行進距離
    destinationStartPos = calibrateDestinationCursorPos(destinationArray);
    let yTravel =
      originArray[i].y -
      (destinationPosDefault.y +
        (destinationPosDefault.height - originArray[i].height) / 2);
    let xTravel = (originArray[i].x > destinationStartPos) ?
      -(originArray[i].x - destinationStartPos) :
      destinationStartPos - originArray[i].x;

    // 檢查單詞的位置並相應地更新數組
    if (originArray[i].location === "origin") {
      originArray[i].location = "destination";
      destinationArray.push(originArray[i]);
    } else if (originArray[i].location === "destination") {
      yTravel = 0;
      xTravel = 0;
      originArray[i].location = "origin";
      let test = destinationArray.filter(
        (wordObject) => wordObject.word !== originArray[i].word
      );
      destinationArray = test;
    }

    // 應用翻譯以模擬拖動
    words[i].style.transform = `translate(${xTravel}px,-${yTravel}px)`;
  });
}

// 獲取檢查和重置按鈕的引用，以及結果消息
const checkButton = document.getElementById("check__button");
const resultMessage = document.getElementById("result__message");
const resetButton = document.getElementById("reset__button");

// 添加事件監聽器以檢查按鈕進行結果檢查
checkButton.addEventListener("click", () => {
  let isCorrect = true;

  // 檢查目的地容器中單詞的順序是否與練習列表匹配
  for (let i = 0; i < destinationArray.length; i++) {
    console.log("Checking:", destinationArray[i].word, exercise.list[i]);
    if (destinationArray[i].word !== exercise.list[i]) {
      isCorrect = false;
      break;
    }
  }

  // 顯示結果消息
  console.log("Result:", isCorrect ? "Correct!" : "Incorrect!");
  resultMessage.textContent = isCorrect ? "Correct!" : "Incorrect!";
  resultMessage.style.color = isCorrect ? "green" : "red";
});

// 添加事件監聽器以重置按鈕進行練習重置
resetButton.addEventListener("click", () => {
  // 重置數組和單詞位置
  destinationArray = [];
  originArray.forEach((wordObject) => {
    wordObject.location = "origin";
    words.forEach((word) => (word.style.transform = "translate(0, 0)"));
  });

  // 選擇新的隨機練習
  exercise = exercises[Math.floor(Math.random() * exercises.length)];
  chineseSentence = exercise.chinese.split(" ");
  listOfWords = exercise.list;

  // 清除結果消息
  resultMessage.textContent = "";
});
