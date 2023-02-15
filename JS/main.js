//! ========================================Start=============================================
let name = document.querySelector(".name");
let email = document.querySelector(".email");
let imageUrl = document.querySelector(".imageUrl");
let phone = document.querySelector(".phone");
let btn = document.querySelector(".btn");
let list = document.querySelector(".list");

btn.addEventListener("click", () => {
  if (
    !name.value.trim() &&
    !email.value.trim() &&
    !imageUrl.value.trim() &&
    !phone.value.trim()
  ) {
    alert("заполните поле");
    return;
  }

  let obj = {
    nameObj: name.value,
    emailObj: email.value,
    imageUrlObj: imageUrl.value,
    phoneObj: phone.value,
  };

  setItemToStorage(obj);
  createElement();
  name.value = "";
  email.value = "";
  imageUrl.value = "";
  phone.value = "";
});

function setItemToStorage(name) {
  if (!localStorage.getItem("new-data")) {
    localStorage.setItem("new-data", "[]");
  }

  let data = JSON.parse(localStorage.getItem("new-data"));
  data.push(name);

  localStorage.setItem("new-data", JSON.stringify(data));
}

createElement();

function createElement() {
  let newData = JSON.parse(localStorage.getItem("new-data"));
  if (!newData) {
    localStorage.setItem("new-data", "[]");
  }

  list.innerHTML = "";
  if (newData !== null) {
    newData.forEach((item, index) => {
      let li = document.createElement("li");
      li.innerHTML = `<div class = 'card'><p class="p1">${item.nameObj}</p>
      <p class="p2">${item.emailObj}</p>
      <p class="p3">${item.phoneObj}</p>
          <img width='200px' src=${item.imageUrlObj}/></div>`;
      list.append(li);

      let btnDelete = document.createElement("button");
      let btnEdit = document.createElement("button");
      btnDelete.innerText = "Delete";
      btnEdit.innerText = "Edit";
      btnDelete.style.cssText = `
      width: 15%;
      height: 27px;
      border: none;
      border-radius: 5px;
      background-color: crimson;
  }`;
      btnEdit.style.cssText = ` 
      width: 15%;
      height: 27px;
      border: none;
      border-radius: 5px;
      background-color: #3ba2c2;`;
      li.append(btnDelete);
      li.append(btnEdit);
      btnDelete.addEventListener("click", () => {
        deleteElement(index);
      });
      btnEdit.addEventListener("click", () => {
        editElement(index);
      });
      console.log(btnDelete, btnEdit);
    });
  }
}

// ==============================================================Кнопки

let mainModal = document.querySelector(".main-modal");
let inpEdit1 = document.querySelector(".inp-edit1");
let inpEdit2 = document.querySelector(".inp-edit2");
let inpEdit3 = document.querySelector(".inp-edit3");
let inpEdit4 = document.querySelector(".inp-edit4");
let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");

function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("new-data"));
  data.splice(index, 1);
  localStorage.setItem("new-data", JSON.stringify(data));
  createElement();
}

// =============================================================edit

function editElement(index) {
  mainModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("new-data"));

  data.forEach((item) => {
    inpEdit1.value = item.nameObj;
    inpEdit2.value = item.emailObj;
    inpEdit3.value = item.imageUrlObj;
    inpEdit4.value = item.phoneObj;
  });

  inpEdit1.setAttribute("id", index);
  inpEdit2.setAttribute("id", index);
  inpEdit3.setAttribute("id", index);
  inpEdit4.setAttribute("id", index);
}
btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});

btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("new-data"));
  let index1 = inpEdit1.id;
  if (
    !inpEdit1.value.trim() &&
    !inpEdit2.value.trim() &&
    !inpEdit3.value.trim() &&
    !inpEdit4.value.trim()
  ) {
    alert("заполните поле!");
    return;
  }
  let edited = {
    nameObj: inpEdit1.value,
    emailObj: inpEdit2.value,
    imageUrlObj: inpEdit3.value,
    phoneObj: inpEdit4.value,
  };
  data.splice(index1, 1, edited);
  localStorage.setItem("new-data", JSON.stringify(data));
  mainModal.style.display = "none";
  createElement();
});

// ==============================bootstrap
