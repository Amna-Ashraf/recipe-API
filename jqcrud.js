$(document).ready(function() {
  loadRecipes();
  $("#recipes").on("click", ".btn-danger", handleDelete);
  $("#recipes").on("click", ".btn-warning", handleUpdate);
  $("#addBtn").click(addRecipe);
  $("#updateSave").click(updateRecipe);
});

function handleUpdate() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  $.get("https://usman-recipes.herokuapp.com/api/recipes/" + id, function(response) {
    $("#updateId").val(response._id);
    $("#updateTitle").val(response.title);
    $("#updateBody").val(response.body);
    $("#updateModal").modal("show");
  });
}

function addRecipe() {
  var title = $("#title").val();
  var body = $("#body").val();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "POST",
    data: { title: title, body: body },
    success: function(response) {
      console.log(response);
      $("#title").val("");
      $("#body").val("");
      loadRecipes();
      $("#addModal").modal("hide");
    }
  });
}

function updateRecipe() {
  var id = $("#updateId").val();
  var title = $("#updateTitle").val();
  var body = $("#updateBody").val();
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    data: { title: title, body: body },
    method: "PUT",
    success: function(response) {
      console.log(response);
      loadRecipes();
      $("#updateModal").modal("hide");
    }
  });
}

function handleDelete() {
  var btn = $(this);
  var parentDiv = btn.closest(".recipe");
  let id = parentDiv.attr("data-id");
  console.log(id);
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
    method: "DELETE",
    success: function() {
      loadRecipes();
    }
  });
}

function loadRecipes() {
  $.ajax({
    url: "https://usman-recipes.herokuapp.com/api/recipes",
    method: "GET",
    error: function(response) {
      var recipes = $("#recipes");
      recipes.html("An Error has occurred");
    },
    success: function(response) {
      console.log(response);
      var recipes = $("#recipes");
      recipes.empty();
      for (var i = 0; i < response.length; i++) {
        var rec = response[i];
        recipes.append(
          `<div class="recipe" data-id="${rec._id}"><h3>${rec.title}</h3><p><button class="btn btn-danger btn-sm float-right">delete</button><button class="btn btn-warning btn-sm float-right">Edit</button> ${rec.body}</p></div>`
        );
      }
    }
  });
}