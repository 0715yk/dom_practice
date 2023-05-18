const bookEnrollmentInput = document.querySelector("#book-enroll-input");
const bookEnrollmentBtn = document.querySelector("#book-enroll-btn");
const bookedSelect = document.querySelector("#booked-select");

let bookInputValue = "";
let bookList = [];
var idx = 0;

bookEnrollmentInput.addEventListener("change", (e) => {
  bookInputValue = e.target.value;
});

{
  /* <tr>
<td>The table body</td>
<td>with two columns</td>
<td>with two columns</td>
</tr> */
}
bookEnrollmentBtn.addEventListener("click", () => {
  const tbodyElement = document.getElementsByTagName("tbody")[0];
  const trElement = document.createElement("tr");
  trElement.id = `${idx}-tr-ele`;
  const tdElement1 = document.createElement("td");
  tdElement1.textContent = bookInputValue;

  const tdElement2 = document.createElement("td");
  const inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.className = idx;
  inputElement.addEventListener("change", (e) => {
    const nowIdx = parseInt(e.target.className);
    bookList[nowIdx].booked = !bookList[nowIdx].booked;
    const flag = bookedSelect.value === "booked";
    const nowElement = bookList[nowIdx].element;
    if (flag) {
      if (bookList[nowIdx].booked) {
        nowElement.style.display = "block";
      } else {
        nowElement.style.display = "none";
      }
    } else {
      if (bookList[nowIdx].booked) {
        nowElement.style.display = "none";
      } else {
        nowElement.style.display = "block";
      }
    }
  });
  tdElement2.appendChild(inputElement);

  const tdElement3 = document.createElement("td");
  const btnElement = document.createElement("button");
  btnElement.textContent = "제거";
  btnElement.className = idx;
  btnElement.addEventListener("click", (e) => {
    const nowIdx = parseInt(e.target.className);
    const deletedElement = bookList.find((el) => el.idx === nowIdx);
    deletedElement.element.remove();
    bookList = bookList.filter((el) => {
      if (el.idx === nowIdx) {
        return false;
      } else {
        return true;
      }
    });
    console.log(bookList);
  });
  tdElement3.appendChild(btnElement);
  trElement.appendChild(tdElement1);
  trElement.appendChild(tdElement2);
  trElement.appendChild(tdElement3);
  tbodyElement.appendChild(trElement);

  const newData = {
    idx: idx,
    name: bookInputValue,
    booked: false,
    element: trElement,
  };

  bookList.push(newData);
  idx += 1;
});

bookedSelect.addEventListener("change", (e) => {
  const flag = e.target.value === "booked";

  bookList.forEach((el) => {
    if (el.booked) {
      el.element.style.display = flag ? "block" : "none";
    } else {
      el.element.style.display = flag ? "none" : "block";
    }
  });
});
