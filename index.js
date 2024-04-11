window.onload = function () {
  const questions = [
    {
      question: "Thủ đô của Phap la gi?",
      options: ["London", "Madrid", "Paris", "Berlin"],
      correctAnswer: 2,
    },
    {
      question: "1 + 1 = ?",
      options: ["2", "1", "3", "5"],
      correctAnswer: 0,
    },
    {
      question: "5 + 5 = ?",
      options: ["3", "2", "1", "10"],
      correctAnswer: 3,
    },
    {
      question: "Món ăn nào được đưa vào di sản thế giới của Việt Nam?",
      options: ["Phở", "Bánh xèo", "nước mía", "mì tôm"],
      correctAnswer: 0,
    },
    {
      question: "Đâu là một loại hình chợ tạm tự phát thường xuất hiện trong các khu dân cư?",
      options: [" Ếch", "Cóc", "thằn lằn", "nhái"],
      correctAnswer: 1,
    },
    {
      question: "Đâu là tên một bãi biển ở Quảng Bình?",
      options: ["Đá Lăn", "Đá Nhảy", " Đá Chạy", "Đá bò"],
      correctAnswer: 2,
    },
    {
      question: "Haiku là thể thơ truyền thống của nước nào?",
      options: ["Hàn Quốc", "Trung Quốc", "Mông Cổ", "Nhật Bản"],
      correctAnswer: 3,
    },
    {
      question:
        "Chiến trường Đắk Tô - Tân Cảnh, nơi diễn ra chiến thắng vang đội năm 1972, nay thuộc địa bàn tỉnh nào ở Tây Nguyên?",
      options: ["Đắk Lắk", "Gia Lai", "Kon Tum", "Đắk Nông"],
      correctAnswer: 2,
    },
    {
      question: "Đâu là tên một loại bánh Huế?",
      options: ["Khoái", "Sướng", "Thích", "Vui"],
      correctAnswer: 0,
    },
    {
      question: "Tượng đài Chiến thắng Điện Biên Phủ được dựng trên ngọn đồi nào?",
      options: ["E1", "A1", "C1", "D1"],
      correctAnswer: 3,
    },
  ];

  let currentQuestion = 0;
  let playerName = "";
  let helpOptions = 2;

  document.getElementById("startGame").addEventListener("click", () => {
    playerName = document.getElementById("playerName").value;
    if (playerName.length >= 5 && playerName.length <= 10 && /^[a-zA-Z]*$/.test(playerName)) {
      document.getElementById("playerName").disabled = true;
      document.getElementById("startGame").disabled = true;
      startNewQuestion();
    } else {
      alert("Invalid name. Please enter a name with 5-10 alphabetic characters.");
    }
  });

  document.getElementById("checkAnswer").addEventListener("click", () => {
    checkAnswer();
    if (currentQuestion === questions.length) {
      resetGame();
    }
  });
  document.getElementById("skipQuestion").addEventListener("click", skipQuestion);
  document.getElementById("hideAnswers").addEventListener("click", hideAnswers);

  function startNewQuestion() {
    if (currentQuestion < questions.length) {
      document.getElementById("question").textContent = questions[currentQuestion].question;
      const options = document.getElementById("options").getElementsByTagName("li");
      for (let i = 0; i < 4; i++) {
        options[i].textContent = questions[currentQuestion].options[i];
        options[i].classList.remove("hidden");
      }
      document.getElementById("checkAnswer").classList.remove("hidden");
      if (currentQuestion === questions.length - 1) {
        document.getElementById("skipQuestion").classList.add("hidden");
      }
      if (helpOptions === 0) {
        document.getElementById("hideAnswers").classList.add("hidden");
      }
    } else {
      alert("You win!");
      document.getElementById("checkAnswer").disabled = true;
    }
  }

  function checkAnswer() {
    const selectedOption = document.querySelector("li.active");
    if (selectedOption) {
      const selectedAnswerIndex = Array.from(selectedOption.parentNode.children).indexOf(
        selectedOption
      );
      if (selectedAnswerIndex === questions[currentQuestion].correctAnswer) {
        currentQuestion++;
        clearOptions();
        startNewQuestion();
      } else {
        alert("Game over");
        clearOptions();
      }
    }
  }

  function skipQuestion() {
    currentQuestion++;
    clearOptions();
    startNewQuestion();
  }

  function resetGame() {
    currentQuestion = 0;
    clearOptions();
    startNewQuestion();
  }

  function gameOver() {
    alert("Game over");
    resetGame();
  }

  function checkAnswer() {
    const selectedOption = document.querySelector("li.active");
    if (selectedOption) {
      const selectedAnswerIndex = Array.from(selectedOption.parentNode.children).indexOf(
        selectedOption
      );
      if (selectedAnswerIndex === questions[currentQuestion].correctAnswer) {
        currentQuestion++;
        clearOptions();
        startNewQuestion();
      } else {
        gameOver();
      }
    }
  }

  function hideAnswers() {
    if (helpOptions > 0) {
      const options = document.getElementById("options").getElementsByTagName("li");
      const correctAnswerIndex = questions[currentQuestion].correctAnswer;
      const wrongAnswers = [...Array(4).keys()].filter((i) => i !== correctAnswerIndex);
      let hiddenAnswers = 0;
      while (hiddenAnswers < 2) {
        const randomWrongAnswer = wrongAnswers[Math.floor(Math.random() * 3)];
        if (!options[randomWrongAnswer].classList.contains("hidden")) {
          options[randomWrongAnswer].classList.add("hidden");
          hiddenAnswers++;
        }
      }
      helpOptions--;
    }
    document.getElementById("hideAnswers").disabled = true;
  }

  function clearOptions() {
    const options = document.getElementById("options").getElementsByTagName("li");
    for (let i = 0; i < 4; i++) {
      options[i].classList.remove("active");
    }
  }

  const options = document.getElementById("options").getElementsByTagName("li");
  for (let i = 0; i < 4; i++) {
    options[i].addEventListener("click", () => {
      for (let j = 0; j < 4; j++) {
        options[j].classList.remove("active");
      }
      options[i].classList.add("active");
    });
  }
};
