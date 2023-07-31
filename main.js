//// get Total

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmpI; // Global variable used for update

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#1363DF";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#0F3460";
  }
}

//// create product

let dataPro = [];

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  let dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (
    title.value != "" &&
    price.value != "" &&
    taxes.value != "" &&
    ads.value != "" &&
    category.value != "" &&
    count.value < 100
  ) {
    if (mood === "create") {
      /// Count
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmpI] = newPro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
  }

  //// save localStorage

  localStorage.setItem("product", JSON.stringify(dataPro));

  clearData();
  ShowData();
};

//// Clear inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

////Read

function ShowData() {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += ` <tr>
              <td>${i + 1}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
             <td><button onclick ="updateData(${i})" id="update">Update</button></td>
            <td><button  onclick ="deleteData(${i})"id="delete">Delete</button></td>
            </tr>`;

    dataPro[i];
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteall");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `<button onclick = " deleteAll()" > Delete All (${dataPro.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
  getTotal();
}
ShowData();

////Delete

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  ShowData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  ShowData();
}

////Update

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  category.value = dataPro[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";

  mood = "update";
  tmpI = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

////Search

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search by title";
  } else {
    searchMood = "category";
    search.placeholder = "Search by category";
  }

  search.focus();
  search.value = "";
  ShowData();
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += ` <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}2000</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
             <td><button onclick ="updateData(${i})" id="update">Update</button></td>
            <td><button  onclick ="deleteData(${i})"id="delete">Delete</button></td>
            </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += ` <tr>
              <td>${i}</td>
              <td>${dataPro[i].title}</td>
              <td>${dataPro[i].price}2000</td>
              <td>${dataPro[i].taxes}</td>
              <td>${dataPro[i].ads}</td>
              <td>${dataPro[i].discount}</td>
              <td>${dataPro[i].total}</td>
              <td>${dataPro[i].category}</td>
             <td><button onclick ="updateData(${i})" id="update">Update</button></td>
            <td><button  onclick ="deleteData(${i})"id="delete">Delete</button></td>
            </tr>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}


