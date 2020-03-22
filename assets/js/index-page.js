// On click events
// search for recipe
$("#searchLinkBtn").on("click", function() {});

// Go button
$("#searchButton").on("click", function() {});

// APi variables

var appid = "f14b0153";
var appkey = "a9e1fba4d26e5911cb859859a0b102e5";
var food = "popular";
var queryURL =
  "https://api.edamam.com/search?q=" +
  food +
  "&app_id=" +
  appid +
  "&app_key=" +
  appkey;

// Pending: Create the ramdon coding for the suggestionsimages
// Suggestion  image 1
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
  var suggestionRecipe1image = response.hits[0].recipe.image;
  var cleanlabel = response.hits[0].recipe.label.split("-")[0];

  var labelappid = encodeURIComponent(cleanlabel);

  var secondappKey = "b570c798b46047929f8bfc634db0cf67";

  var queryURLsecondApi =
    "https://api.spoonacular.com/recipes/search?query=" +
    labelappid +
    "&apiKey=" +
    secondappKey;

  // Recipe Name
  var suggestionrecipe1Link = response.hits[0].recipe.url;
  console.log(suggestionrecipe1Link);
  var suggestionRecipe1 = response.hits[0].recipe.label;
  var suggestionRecipe1Url = $("<a>").attr("href", suggestionrecipe1Link);

  suggestionRecipe1Url.append(suggestionRecipe1);
  $("#suggestionRecipe1").append(suggestionRecipe1Url);

  // Image from API
  var suggestionImage1Id = $("#suggestionImage1");
  suggestionImage1Id.attr("src", suggestionRecipe1image);

  // Calories from API
  var calorieCount1 = response.hits[0].recipe.calories;
  var calorieCount1Fixed = calorieCount1.toFixed(2);
  $("#calorieCount1").append(calorieCount1Fixed);

  // Serving Size from API
  var servingNumber1 = response.hits[0].recipe.yield;
  $("#servingNumber1").append(servingNumber1);

  // Cooking time
  var prepTime1 = response.hits[0].recipe.totalTime;
  $("#prepTime1").append(prepTime1);

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

      $("#costNumber1").append(dollarPricefixed);
    });
  });
});
