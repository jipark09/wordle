const correct = "WRATH";
let attempts = 0;
let index = 0;
const startTime = new Date();
let timer;

function appStart() {
  // 화면 단 게임 종료
  const displayGameEnd = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.classList.add("game-end-message");
    // document.body.appendChild(div);
    const mainEl = document.getElementById("main");
    mainEl.appendChild(div);
  };

  // 게임 종료
  const gameEnd = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameEnd();
    clearInterval(timer);
  };

  // 백스페이스 눌렀을 떄의 동작
  const handleBackspaceKey = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );

      preBlock.innerText = "";
    }

    if (index !== 0) {
      index--;
    }
  };

  // 엔터키 눌렀을 때의 동작
  const handleEnterKey = () => {
    let correctCount = 0;
    // 정답 확인
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const userText = block.innerText;
      const correctText = correct[i];

      if (userText === correctText) {
        correctCount++;
        block.style.backgroundColor = "#6AAA64";
      } else if (correct.includes(userText)) {
        block.style.backgroundColor = "#C9B458";
      } else {
        block.style.backgroundColor = "#787C7E";
      }
      block.style.color = "white";
    }

    // 게임 종료
    if (correctCount === 5) {
      gameEnd();
    } else {
      // 게임 종료 아니면, 다음 줄 넘김
      attempts++;
      // 다음 줄이 없으면 게임 종료
      if (attempts === 6) {
        gameEnd();
        return;
      }
      index = 0;
    }
  };

  // 중복 알파벳 방지
  const dupliAlpa = (key) => {
    let isWrite = true;

    for (let i = 0; i < index; i++) {
      const lastBlock = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

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
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (e.key === "Backspace") {
      handleBackspaceKey();
    } else if (index === 5) {
      if (e.key === "Enter") {
        handleEnterKey();
      }
      return;
    } else if (65 <= keyCode && keyCode <= 90) {
      if (index !== 0) {
        if (dupliAlpa(key)) {
          thisBlock.innerText = key;
          index++;
        }
      } else {
        thisBlock.innerText = key;
        index++;
      }
    }
  };

  // 키값 클릭했을 때의 동작
  const clickKeyboard = () => {
    const keyBlock = document.querySelectorAll(".keyboard-block");

    keyBlock.forEach((block) => {
      block.addEventListener("click", () => {
        const key = block.dataset.key;
        const thisBlock = document.querySelector(
          `.board-block[data-index='${attempts}${index}']`
        );

        if (key == "BACKSPACE") {
          handleBackspaceKey();
        } else if (index === 5) {
          if (key === "ENTER") {
            handleEnterKey();
          }
          return;
        } else {
          if (index !== 0) {
            if (dupliAlpa(key)) {
              thisBlock.innerText = key;
              index++;
            }
          } else {
            thisBlock.innerText = key;
            index++;
          }
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
