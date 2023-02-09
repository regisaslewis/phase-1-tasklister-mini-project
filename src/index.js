let ul = document.getElementById("tasks");
let input = document.getElementById("new-task-description");

document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (input.value !== "") {
      buildList(input.value);
    }
    form.reset();
  })
});

function deleteLi(e) {
  e.target.parentNode.remove();
}

function buildList(todo) {
  let li = document.createElement("li");
  let doneBtn = document.createElement("button");
  let editBtn = document.createElement("button");
  let select = document.createElement("select");
  let optionPlaceholder = document.createElement("option");
  let optionHigh = document.createElement("option");
  let optionMedium = document.createElement("option");
  let optionLow = document.createElement("option");
  let dueDate = document.createElement("input");
  let p = document.createElement("p");
  let editInput = document.createElement("input");
  let sendBtn = document.createElement("button");

  li.textContent = todo + "  ";
  doneBtn.textContent = "done";
  editBtn.textContent = "edit";
  sendBtn.textContent = "change";
  optionHigh.value = "red";
  optionPlaceholder.textContent = "Select Priority"
  optionHigh.textContent = "High";
  optionHigh.style.backgroundColor = "red";
  optionMedium.value = "yellow";
  optionMedium.textContent = "Medium";
  optionMedium.style.backgroundColor = "yellow";
  optionLow.value = "green";
  optionLow.textContent = "Low";
  optionLow.style.backgroundColor = "green";
  dueDate.type = "date";
  editInput.type = "text";
  editInput.placeholder = "New list item name";


  ul.appendChild(li);
  li.appendChild(select);
  select.appendChild(optionPlaceholder);
  select.appendChild(optionHigh);
  select.appendChild(optionMedium);
  select.appendChild(optionLow);
  li.appendChild(dueDate);
  li.appendChild(editBtn);
  li.appendChild(doneBtn);

  doneBtn.addEventListener("click", deleteLi);

  function backgroundChange(e)  {
    li.style.backgroundColor = e.target.value;
    if (e.target.value === "red" || e.target.value === "green") {
      li.style.color = "white";
    } else {
      li.style.color = "black";
    };
    select.remove();
  };

  function edit() {
    li.appendChild(editInput);
    li.appendChild(sendBtn);
    sendBtn.addEventListener("click", () => {
      if (editInput.value !== "") {
        buildList(editInput.value + "  ");
  
        select.addEventListener("change", backgroundChange);    
        dueDate.addEventListener("change", addDueDate);
        sendBtn.remove();
        editInput.remove();
        li.remove();}
    })
  };

  function addDueDate() {
    li.appendChild(p);
    p.textContent = `[[Due: ${dueDate.value}]]`;
    li.insertBefore(p, editBtn)
    dueDate.remove();
  }

  select.addEventListener("change", backgroundChange);
  dueDate.addEventListener("change", addDueDate);
  editBtn.addEventListener("click", edit);
};

