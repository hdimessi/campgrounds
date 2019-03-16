var currentShownForm = null;

$("#overlay").on("click", function() {
  $("#overlay").fadeOut(500);
  $("#login").fadeOut(500);
  $("#register").fadeOut(500);
});

$("#login-btn").on("click", function() {
  currentShownForm = "login"
  toggleForm(currentShownForm);
});

$("#register-btn").on("click", function() {
  currentShownForm = "register";
  toggleForm(currentShownForm);
});

$(".register-btn").on("click", function() {
  $("#login").fadeToggle(500, function () {
    $("#register").fadeToggle(500);
  });
});

function toggleForm(event) {
  
  $("#overlay").fadeToggle(500);
  if (event === "login") {
    $(".alert").hide();
    $("#login").fadeToggle(500);
  } else if (event === "auto-login") {
    $("#login").fadeToggle(500);
  } else if (event === "auto-register") {
    $("#register").fadeToggle(500);
  } else {
    $(".alert").hide();
    $("#register").fadeToggle(500);
  }
}
