console.log("welcome to the library record");

//construtor
function Book(name, author, type) {
  this.name = name;
  this.author = author;
  this.type = type;
}

function Display() {}
//Display the data
Display.prototype.add = function (book) {
  let tbody = document.getElementById("tbody");
  let data = `<tr>
                 <td>${book.name}</td>
                 <td>${book.author}</td>
                 <td>${book.type}</td>
             </tr>`;
  tbody.innerHTML += data;
};

//Implementing the clear function
Display.prototype.clear = function () {
  let libraryForm = document.getElementById("libraryForm");
  libraryForm.reset();
};

//Implementing the validate function
Display.prototype.validate = function (book) {
  if (book.name.length < 3 || book.author.length < 3) {
    return false;
  } else {
    return true;
  }
};

//function to show success or error
Display.prototype.show = function (type, displayMessage) {
  let message = document.getElementById("message");
  message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert" style="background-color:cornsilk">
                            <strong>Message : </strong> ${displayMessage}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                       </div>`

    setInterval(function()  {
        message.innerHTML = "";
    }, 5000);
};

//Add submit event listerner to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
  console.log("submit");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;
  let marvel = document.getElementById("marvel");
  let programming = document.getElementById("programming");
  let horror = document.getElementById("horror");

  if (marvel.checked) {
    type = marvel.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (horror.checked) {
    type = horror.value;
  }

  let book = new Book(name, author, type);
//   console.log(book);

  let display = new Display();

  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("Success", "Your book has been successfully added.");
  } else {
    display.show("Error", "Sorry,This book can not be added");
  }
  e.preventDefault();
}
