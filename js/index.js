let attempts = 0;
let index = 0;
const startTime = new Date();
let timer;
const answerList = [
  "UNDER",
  "MOUSE",
  "TRAIN",
  "JEINY",
  "QUERY",
  "EARTH",
  "SOUTH",
  "NORTH",
  "WEIGH",
  "AUGHT",
  "NAVER",
  "ZEBRA",
  "INDEA",
  "YOUTH",
  "PATCH",
  "TIGER",
  "MINSU",
  "RANDO",
  "SANDO",
  "DONGO",
  "UNDER",
  "VESTI",
  "LIGER",
  "TRAND",
  "SOILD",
  "TABLE",
  "FIGHT",
  "NIGHT",
  "HOUSE",
  "HORSE",
  "PHONE",
  "WRITE",
  "PRINT",
  "FIRST",
  "THIRD",
  "WORLD",
  "HUMAN",
  "CANDY",
  "QUICK",
  "KNIFE",
  "GREAT",
  "STEAM",
  "ORIGN",
  "HAPPI",
  "SUPER",
  "MAKET",
  "COACH",
  "MAKIN",
  "KRAFT",
  "KITES",
  "BINGO",
  "BUNGI",
  "PAINT",
  "CHOSE",
  "SWORD",
  "MOUND",
];
const answer = answerList[Math.floor(Math.random() * answerList.length)];

function appStart() {
  // 게임 종료
  const gameEnd = (isAnswer) => {
    window.removeEventListener("keydown", handleKeydown);
    const div = document.createElement("div");

    if (isAnswer) {
      div.innerText = "GAME CLEAR🥳";
      div.classList.add("clear-answer");
    } else {
      div.innerText = "GAME OVER😵\n✅ " + answer + " ✅";
      div.classList.add("over-answer");
    }
    div.classList.add("game-end-message");
    const mainEl = document.getElementById("main");
    mainEl.appendChild(div);

    clearInterval(timer);
    div.classList.add("shake-finish");
  };

  // 백스페이스 눌렀을 떄의 동작
  const handleBackspaceKey = () => {
    if (index > 0) {
      const preBlock = document.querySelector(`.board-block[data-index='${attempts}${index - 1}']`);

      preBlock.innerText = "";
    }

    if (index !== 0) {
      index--;
    }
  };

  // 엔터키 눌렀을 때의 동작
  const handleEnterKey = () => {
    let answerCount = 0;

    // 비동기로 서버에서 정답 가져옴
    // const response = await fetch("/answer");
    // const answerObj = await response.json();
    // const answer = answerObj.answer;

    // 정답 확인
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(`.board-block[data-index='${attempts}${i}']`);
      const userText = block.innerText;
      const answerText = answer[i];

      if (userText === answerText) {
        answerCount++;
        block.style.backgroundColor = "#6AAA64";
      } else if (answer.includes(userText)) {
        block.style.backgroundColor = "#C9B458";
      } else {
        block.style.backgroundColor = "#787C7E";
      }
      block.style.color = "white";
    }

    // 게임 종료
    let isAnswer = false;

    if (answerCount === 5) {
      isAnswer = true;
      gameEnd(isAnswer);
    } else {
      attempts++;

      if (attempts === 6) {
        gameEnd(isAnswer);
        return;
      }
      index = 0;
    }
  };

  // 중복 알파벳 방지
  const dupliAlpa = (key) => {
    let isWrite = true;

    for (let i = 0; i < index; i++) {
      const lastBlock = document.querySelector(`.board-block[data-index='${attempts}${i}']`);

      if (key === lastBlock.innerText) {
        isWrite = false;
        break;
      }
    }
    return isWrite;
  };

  // 키 다운했을 때의 동작
  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    // console.log(key, keyCode);
    const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);

    if (e.key === "Backspace") {
      handleBackspaceKey();
    } else if (index === 5) {
      if (e.key === "Enter") {
        handleEnterKey();
      }
      return;
    } else if (65 <= keyCode && keyCode <= 90) {
      if (index > 0) {
        if (!dupliAlpa(key)) {
          return;
        }
      }
      thisBlock.innerText = key;
      thisBlock.classList.remove("shake");
      void thisBlock.offsetWidth; // 랜더링 갱신
      thisBlock.classList.add("shake");
      index++;
    }
  };

  // 키값 클릭했을 때의 동작
  const clickKeyboard = () => {
    const keyBlock = document.querySelectorAll(".keyboard-block");

    keyBlock.forEach((block) => {
      block.addEventListener("click", () => {
        const key = block.dataset.key;
        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);

        if (key == "BACKSPACE") {
          handleBackspaceKey();
        } else if (index === 5) {
          if (key === "ENTER") {
            handleEnterKey();
          }
          return;
        } else if (key !== "ENTER") {
          if (index > 0) {
            if (!dupliAlpa(key)) {
              return;
            }
          }
          thisBlock.innerText = key;
          thisBlock.classList.remove("shake");
          void thisBlock.offsetWidth; // 랜더링 갱신
          thisBlock.classList.add("shake");
          index++;
        }
      });
    });
  };

  // 타이머 기능
  const startTimer = () => {
    function setTime() {
      const nowTime = new Date();
      const progressTime = new Date(nowTime - startTime);
      const minutes = progressTime.getMinutes().toString().padStart(2, "0");
      const seconds = progressTime.getSeconds().toString().padStart(2, "0");
      const timerDiv = document.querySelector(".timer");
      timerDiv.innerText = `${minutes}:${seconds}`;
    }

    timer = setInterval(setTime, 1000); // 고유 id 반환: 타이머를 멈출 때 필요
  };

  startTimer();
  clickKeyboard();
  window.addEventListener("keydown", handleKeydown); //handleKeydown > 암묵적으로 이벤트 전달(e)
}

appStart();
