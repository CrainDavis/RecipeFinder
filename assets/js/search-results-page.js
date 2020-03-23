$("#homeLinkBtn").on("click", function() {
  window.location = "index.html";
});

// Add Function to search for the recipe
// Add Function to search for the recipe
var appid = "f14b0153";
var appkey = "a9e1fba4d26e5911cb859859a0b102e5";

// Function to search for the food
function searchForRecipe(food) {
  var queryUrl =
    "https://api.edamam.com/search?q=" +
    food +
    "&app_id=" +
    appid +
    "&app_key=" +
    appkey;
  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var cleanlabel = response.hits[0].recipe.label.split("-")[0];

    var labelappid = encodeURIComponent(cleanlabel);

    var secondappKey = "b570c798b46047929f8bfc634db0cf67";

    var queryURLsecondApi =
      "https://api.spoonacular.com/recipes/search?query=" +
      labelappid +
      "&apiKey=" +
      secondappKey;

    // Basic information
    // Recipe Name
    var recipeName = response.hits[0].recipe.label;
    $("#recipeName").empty();
    $("#recipeName").append(recipeName);

    // Image from API
    var searchImage = response.hits[0].recipe.image;
    $(".search-image").attr("src", searchImage);

    // Calories
    var resultCalories = response.hits[0].recipe.calories;
    $(".result-calories").empty();
    var resultCaloriesFixed = resultCalories.toFixed(0);
    $(".result-calories").append(resultCaloriesFixed);

    // Serving Size
    var servingNumber1 = response.hits[0].recipe.yield;
    $(".result-servings").empty();
    $(".result-servings").append(servingNumber1);

    // Cooking Time
    var prepTime1 = response.hits[0].recipe.totalTime;
    $(".result-prep-time").empty();
    $(".result-prep-time").append(prepTime1);

    //Health & Diet
    // var diet = response.hits[0].recipe.dietLabels;

    var health = response.hits[0].recipe.healthLabels;
    $(".description-health-info").empty();
    $(".description-health-info").append(
      "<ul><li>" + health.join("</li><li>") + "</li></ul>"
    );

    //Ingredient List
    var ingredientList = response.hits[0].recipe.ingredientLines;
    // We need access to the array
    $(".description-main").empty();
    $(".description-main").append(
      "<ul><li>" + ingredientList.join("</li><li>") + "</li></ul>"
    );

    // Get Cooking Link

    $("#externalLinkButton").on("click", function(event) {
      event.preventDefault();
      var getCooking = response.hits[0].recipe.url;

      window.location = getCooking;
    });
    // recipe total price
    $.ajax({
      url: queryURLsecondApi,
      method: "GET"
    }).then(function(response) {
      console.log(response.results[0]);

      var priceId = response.results[0].id;

      var priceBreakDown =
        "https://api.spoonacular.com/recipes/" +
        priceId +
        "/priceBreakdownWidget.json?apiKey=" +
        secondappKey;

      $.ajax({
        url: priceBreakDown,
        method: "GET"
      }).then(function(priceResponse) {
        console.log(priceResponse, response);

        var dollarPrice = priceResponse.totalCost / 100;
        var dollarPricefixed = dollarPrice.toFixed(2);

        $("#starCost").empty();
        $("#starCost").append(dollarPricefixed);
      });
    });
  });
}

$("#searchButton").on("click", function(event) {
  event.preventDefault();

  var inputRecipe = $("#searchInput")
    .val()
    .trim();

  searchForRecipe(inputRecipe);
});
