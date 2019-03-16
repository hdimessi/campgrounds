var currentShownForm = null;

$("#overlay").on("click", function() {
  toggleForm(currentShownForm);
});

$("#login-btn").on("click", function() {
  currentShownForm = "login"
  toggleForm(currentShownForm);
});

$("#register-btn").on("click", function() {
  currentShownForm = "register";
  toggleForm(currentShownForm);
});

function toggleForm(event) {
  
  $("#overlay").fadeToggle(500);
  if (event === "login") {
    $("#login").fadeToggle(500);
  } else {
    $("#register").fadeToggle(500);
  }
}
