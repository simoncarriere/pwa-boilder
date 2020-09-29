var toggle = document.querySelector(".toggle");
var topNav = document.querySelector(".nav");

toggle.addEventListener(
  "click",
  function () {
    topNav.classList.toggle("active");
  },
  false
);
