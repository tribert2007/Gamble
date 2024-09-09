const usersInfo = JSON.parse(localStorage.getItem("usersInfo")) || [];
document.addEventListener("DOMContentLoaded", function () {
  const id = new URLSearchParams(window.location.search).get("id");
  const user = usersInfo.find((user) => user.id === +id);
  if (user) {
    const { cash } = user;
    document.getElementById("cash").textContent = +cash;
  }
});

document.getElementById("btn").addEventListener("click", function () {
  gamble("EVEN");
});
document.getElementById("btn2").addEventListener("click", function () {
  gamble("ODD");
});

function gamble(betType) {
  document.getElementById("input").style.display = "flex";
  document.getElementById("button").addEventListener("click", (event) => {
    event.preventDefault();
    const myCash = +document.getElementById("money").value;
    console.log(myCash);
    document.getElementById("input").style.display = "none";
    const cashElement = document.getElementById("cash");
    let currentCash = parseInt(cashElement.textContent);
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const isEven = randomNumber % 2 === 0;
    let resultText = `The number is ${randomNumber}. `;
    if (myCash > currentCash) {
      alert("Insufficient cash");
    }
    if ((betType === "EVEN" && isEven) || (betType === "ODD" && !isEven)) {
      resultText += "You won!";

      currentCash += myCash;
    } else {
      resultText += "You lost!";

      currentCash -= myCash;
    }
    const empty = "";
    cashElement.textContent = currentCash;
    document.querySelector(".feedback p").textContent = resultText;
    setTimeout(() => {
      document.querySelector(".feedback p").textContent = empty;
    }, 2000);
    const id = new URLSearchParams(window.location.search).get("id");
    const user = usersInfo.find((user) => user.id === +id);
    if (user) {
      user.cash = currentCash;
      localStorage.setItem("usersInfo", JSON.stringify(usersInfo));
    }
    document.getElementById("money").value = empty;
  });
}
