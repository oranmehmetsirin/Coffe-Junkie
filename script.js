eventListeners();
function eventListeners() {
  const ui = new UI();
  window.addEventListener("load", function () {
    ui.hidePreLoader();
  });
  document.querySelector(".navBtn").addEventListener("click", function () {
    ui.showNav();
  });
  document
    .querySelector(".video_switch")
    .addEventListener("click", function () {
      ui.videoControls();
    });

  document
    .querySelector(".drink-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.querySelector(".input-name").value;
      const lastName = document.querySelector(".input-lastname").value;
      const email = document.querySelector(".input-email").value;

      let value = ui.checkEmpty(name, lastName, email);

      if (value) {
        let customer = new Customer(name, lastName, email);
        console.log(customer);
        ui.addCustomer(customer);
        ui.showFeedback("Customer Added To The List", "success");
        ui.clearFields();
      } else {
        ui.showFeedback("Some Form Values Empty", "error");
      }
    });

  const links = document.querySelectorAll(".work-item_icon");

  links.forEach(function (item) {
    item.addEventListener("click", function (event) {
      ui.showModal(event);
    });
  });
  document
    .querySelector(".work-modal_close")
    .addEventListener("click", function () {
      ui.closeModal();
    });
}

function UI() {}

UI.prototype.hidePreLoader = function () {
  document.querySelector(".preloader").style.display = "none";
};
UI.prototype.showNav = function () {
  document.querySelector(".nav").classList.toggle("nav-show");
};
UI.prototype.videoControls = function () {
  let btn = document.querySelector(".video_switch-btn");
  if (!btn.classList.contains("btnSlide")) {
    btn.classList.add("btnSlide");
    document.querySelector(".video_item").pause();
  } else {
    btn.classList.remove("btnSlide");
    document.querySelector(".video_item").play();
  }
};

UI.prototype.checkEmpty = function (name, lastname, email) {
  let result;
  if (name === "" || lastname === "" || email === "") {
    result = false;
  } else {
    result = true;
  }
  return result;
};

UI.prototype.showFeedback = function (text, type) {
  const feedBack = document.querySelector(".drink-form_feedback");

  if (type === "success") {
  } else if (type === "error") {
    feedBack.classList.add("error");
    feedBack.innerText = text;
    this.removeAlert("error");
  }
};
UI.prototype.removeAlert = function (type) {
  setTimeout(function () {
    document.querySelector(".drink-form_feedback").classList.remove;
  }, 3750);
};

UI.prototype.addCustomer = function (customer) {
  const images = [1, 2, 3, 4, 5];
  let random = Math.random() * images.length;
  const div = document.createElement("div");
  div.classList.add("person");
  div.innerHTML = `<img src="${random}" 
    class="person_thumbnail">
    <h4 class="person_name">${customer.name}</h4>
    <h4 class="person_last-name">${customer.lastName}</h4>`;
  document.querySelector(".drink-card_list").appendChild(div);
};
UI.prototype.clearFields = function () {
  document.querySelector(".input-name").value = "";
  document.querySelector(".input-lastname").value = "";
  document.querySelector(".input-email").value = "";
};

UI.prototype.showModal = function (event) {
  event.preventDefault();
  if (event.target.parentElement.classList.contains("work-item_icon"));
  let id = event.target.parentElement.dataset.id;

  const modal = document.querySelector(".work-modal");
  const modalItem = document.querySelector("work-modal_item");

  modal.classList.add("work-modal-whow");
  modalItem.style.backroundImage = `url(https://github.com/john-smilga/grid-coffee-project-final/blob/master/img/work-${id}.jpeg?raw=true)`;
};

UI.prototype.closeModal = function () {
  document.querySelector(".work-modal").classList.remove("work-modal-whow");
};

function Customer(name, lastname, email) {
  (this.name = name), (this.lastname = lastname), (this.email = email);
}
