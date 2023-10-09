const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const mul = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (a, ope, b) => {
  let res;
  if (ope == "+") {
    res = add(+a, +b);
  } else if (ope == "-") res = subtract(a, b);
  else if (ope == "x") res = mul(a, b);
  else if (ope == "÷") {
    if (b == 0) res = alert("You can't divide by 0!");
    res = divide(a, b);
  }
  return (Math.round(res * 1000) / 1000).toString();
};

let list = document.querySelectorAll("div");
let secondLineDiv = document.querySelector(".secondLine");
let firstLineDiv = document.querySelector(".firstLine");

let firstVar, secondVar, op;
let ops = ["+", "-", "x", "÷"];

list.forEach((item) => {
  if (item.textContent >= "1" && item.textContent <= "9") {
    item.addEventListener("click", (event) => {
      secondLineDiv.textContent = secondLineDiv.textContent.concat(
        event.target.textContent
      );
      if (!op) firstVar = secondLineDiv.textContent;
      else secondVar = secondLineDiv.textContent;
    });
  }

  if (item.textContent == "0") {
    item.addEventListener("click", (event) => {
      if (!op) {
        if (!firstVar) {
          secondLineDiv.textContent = "0";
          firstVar = "0";
        } else if (firstVar.includes(".") || !firstVar.startsWith("0")) {
          secondLineDiv.textContent = secondLineDiv.textContent.concat("0");
          firstVar = secondLineDiv.textContent;
        }
      } else {
        if (!secondVar) {
          secondLineDiv.textContent = "0";
          secondVar = "0";
        } else if (secondVar.includes(".") || !secondVar.startsWith("0")) {
          secondLineDiv.textContent = secondLineDiv.textContent.concat("0");
          secondVar = secondLineDiv.textContent;
        }
      }
    });
  }

  if (item.textContent == ".") {
    item.addEventListener("click", (event) => {
      if (!op) {
        if (!firstVar) {
          secondLineDiv.textContent = "0.";
          firstVar = "0.";
        } else if (!firstVar.includes(".")) {
          secondLineDiv.textContent = secondLineDiv.textContent.concat(".");
          firstVar = secondLineDiv.textContent;
        }
      } else {
        if (!secondVar) {
          secondLineDiv.textContent = "0.";
          secondVar = "0.";
        } else if (!secondVar.includes(".")) {
          secondLineDiv.textContent = secondLineDiv.textContent.concat(".");
          secondVar = secondLineDiv.textContent;
        }
      }
    });
  }

  if (item.textContent === "CLEAR") {
    item.addEventListener("click", () => {
      firstLineDiv.textContent = "";
      secondLineDiv.textContent = "";
      firstVar = null;
      secondVar = null;
      op = null;
    });
  }

  if (item.textContent === "DELETE") {
    item.addEventListener("click", () => {
      if (secondLineDiv.textContent) {
        secondLineDiv.textContent = secondLineDiv.textContent.slice(
          0,
          secondLineDiv.textContent.length - 1
        );
        if (!op) firstVar = secondLineDiv.textContent;
        else secondVar = secondLineDiv.textContent;
      }
    });
  }

  if (ops.includes(item.textContent)) {
    item.addEventListener("click", (event) => {
      if (item.textContent == "-" && !firstVar) {
        secondLineDiv.textContent = "-";
        firstVar = "-";
        return;
      }
      if (firstVar == "-") return;
      if (!firstVar) return;
      if (secondVar) {
        const val = operate(firstVar, op, secondVar);
        if (!isFinite(val)) return;
        firstVar = val;
        secondVar = null;
        op = event.target.textContent;
        firstLineDiv.textContent = `${firstVar} ${op}`;
        secondLineDiv.textContent = "";
        return;
      }
      op = event.target.textContent;
      firstLineDiv.textContent = `${firstVar} ${op}`;
      secondLineDiv.textContent = "";
    });
  }

  if (item.textContent == "=") {
    item.addEventListener("click", (event) => {
      if (!firstVar) return;
      if (secondVar) {
        const val = operate(firstVar, op, secondVar);
        if (!isFinite(val)) return;
        firstLineDiv.textContent = `${firstVar} ${op} ${secondVar} =`;
        secondLineDiv.textContent = val;
        firstVar = val;
        secondVar = null;
        op = null;
      }
    });
  }
});
