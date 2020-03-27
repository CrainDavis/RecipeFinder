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

    for (var i = 0; i < response.hits.length; i++) {
      // article id recipeResult
      var articleRecipeResult = $("<article>");
      articleRecipeResult.addClass(
        "recipe-results-card tile is-child notification"
      );

      //appending it into div container seach-results
      $("#test").append(articleRecipeResult);
      //==============================================================
      // p recipeName first child of article id recipeResult
      var pRecipeName = $("<p>");
      pRecipeName.addClass("recipe-name title");
      pRecipeName.html(response.hits[i].recipe.label);
      //appending it into article id RecipeResult
      articleRecipeResult.append(pRecipeName);
      //==============================================================
      // div class content second child of article id
      var divContent = $("<div>");
      divContent.addClass("content");
      //appending it into article id RecipeResult
      articleRecipeResult.append(divContent);

      // article class recipe-item first child of divContent
      var articleRecipeItem = $("<article>");
      articleRecipeItem.addClass("recipe-item tile is-chld notification");
      // appending it into divContent
      divContent.append(articleRecipeItem);

      // div class content only child of articleRecipeItem
      var divContentArticle = $("<div>");
      divContentArticle.addClass("content");
      //appending it into articleRecipeItem
      articleRecipeItem.append(divContentArticle);

      // div class columns only child of divContentArticle
      // recipe cost, nutrition info, servings and time
      var divColumns = $("<div>");
      divColumns.addClass("columns");
      divContentArticle.append(divColumns);

      // div class columns recipeStats only child of divColumns
      var divColumnRecipeStats = $("<div>");
      divColumnRecipeStats.addClass("column");
      divColumnRecipeStats.attr("style", "text-align:center");
      // appending it to divColumns
      divColumns.append(divColumnRecipeStats);

      // div resultRecipeInfo Class result-recipe only child of divColumnRecipeStats
      var divResultRecipe = $("<div>");
      divResultRecipe.addClass("result-recipe-info columns");
      //appending it into divColumnRecipeStats
      divColumnRecipeStats.append(divResultRecipe);

      // div class result-calories second child of divResultRecipe
      var divResultCalories = $("<div>");
      divResultCalories.addClass("column is-one-third");
      //appending it into divResultRecipe
      divResultRecipe.append(divResultCalories);

      //  i calories and span calories children of divResultCalories
      var iCaloriesTag = $("<i>");
      var spanCaloriesTag = $("<span>");
      spanCaloriesTag.addClass("result-calories");
      iCaloriesTag.addClass("fas fa-fire");
      spanCaloriesTag.html(response.hits[i].recipe.calories.toFixed(0) + "cal");
      //appending it into divResultCalories
      divResultCalories.append(iCaloriesTag, spanCaloriesTag);

      // div class result-servings third child of divResultRecipe
      var divResultServings = $("<div>");
      divResultServings.addClass("column is-one-third");
      //appending it into divResultRecipe
      divResultRecipe.append(divResultServings);

      // i Serving Size and span servingsize children of divResultServing
      var iServSizeTag = $("<i>");
      var spanServSizeTag = $("<span>");
      spanServSizeTag.addClass("result-servings");
      iServSizeTag.addClass("fas fa-user");
      spanServSizeTag.html(response.hits[i].recipe.yield);
      // appending them into divResultServing
      divResultServings.append(iServSizeTag, spanServSizeTag);

      // div class result-prepTime fourth child of divResultRecipe
      var divResultPrepTime = $("<div>");
      divResultPrepTime.addClass("column is-one-third");
      //appending it into divResultRecipe
      divResultRecipe.append(divResultPrepTime);

      // i cookingtime and span cookingtime children of divResultPrepTime
      var iCookingTime = $("<i>");
      var spanCookingTag = $("<span>");
      spanCookingTag.addClass("result-prep-time");
      iCookingTime.addClass("fas fa-clock");
      spanCookingTag.html(response.hits[i].recipe.totalTime + "min");
      // appending them into divResultPrepTime
      divResultPrepTime.append(iCookingTime, spanCookingTag);

      //======================================================================
      // div class tile is-ancenstor second child of divContent
      var divIsAncestor = $("<div>");
      divIsAncestor.addClass("tile is-ancestor");
      // appending it into divContent
      divContent.append(divIsAncestor);

      // div tile is vertical is-12 only child of divIsAncestor
      var divIsVertical = $("<div>");
      divIsVertical.addClass("tile is-vertical is-12");
      // appending it into divIsAncenstor
      divIsAncestor.append(divIsVertical);

      // div class tile only child of divIsVertical
      var divTile = $("<div>");
      divTile.addClass("tile");
      //appending it into divIsVertical
      divIsVertical.append(divTile);

      // div class tile is-parent is-vertical child of divTile
      var divTileIsParentVertical = $("<div>");
      divTileIsParentVertical.addClass("tile is-parent is-vertical");
      //appending it into divTile
      divTile.append(divTileIsParentVertical);

      // article class health indo tile first child of divTileisParentVertical
      // health info and ingredients
      var articleHealthInfo = $("<article>");
      articleHealthInfo.addClass("health-info-tile tile is-child notification");
      //appending it into divTileIsParentVertical
      divTileIsParentVertical.append(articleHealthInfo);

      // div first child of articleHealthInfo
      var divfirstChild = $("<div>");
      //appending it into articleHealthInfo
      articleHealthInfo.append(divfirstChild);

      // p class recipe-health-info only child of divFirstChild
      var pRecipeHealth = $("<p>");
      pRecipeHealth.addClass("subtitle recipe-health-info");
      pRecipeHealth.attr("style", "font-weight:bold; color:#ef8499");
      pRecipeHealth.html("Health Info");
      var healthInfo = response.hits[i].recipe.healthLabels;

      //appending it into divFirstChild
      divfirstChild.append(pRecipeHealth);

      // span description health info only child of pRecipeHealth
      var spanDescriptionHealth = $("<span>");
      spanDescriptionHealth.addClass("description-health-info");
      spanDescriptionHealth.attr("style", "font-weight: normal; color:white;");
      spanDescriptionHealth.append(
        "<ul><li>" + healthInfo.join("</li><li>") + "</li></ul>"
      );
      // appending it into pRecipeHealth
      pRecipeHealth.append(spanDescriptionHealth);

      // div second child of articleHealthIndfo
      var divSecondChild = $("<div>");
      articleHealthInfo.append(divSecondChild);

      // p class recipe-description-info only child of divSecondChild
      var pRecipeDescription = $("<p>");
      pRecipeDescription.addClass("subtitle recipe-health-info");
      pRecipeDescription.attr(
        "style",
        "font-weight:bold; color:#ef8499; margin-top: 25px;"
      );
      pRecipeDescription.html("Ingredients:");
      var recipeDescriptionInfo = response.hits[i].recipe.ingredientLines;

      // appending it into the divSecondChild
      divSecondChild.append(pRecipeDescription);

      // span description main only child of pRecipeDescription
      var spanRecipeDescription = $("<span>");
      spanRecipeDescription.addClass("description-main");
      spanRecipeDescription.attr("style", "font-weight: normal; color:white;");
      spanRecipeDescription.append(
        "<ul><li>" + recipeDescriptionInfo.join("</li><li>") + "</li></ul>"
      );
      // appending it into pRecipeDescription
      pRecipeDescription.append(spanRecipeDescription);

      // article buttonsTile second child of divTileIsParentVertical
      // buttons
      var articleButtons = $("<article>");
      articleButtons.addClass("buttons-tile tile is-child notification");
      divTileIsParentVertical.append(articleButtons);

      // button element favorite-button first child of articleButtons
      var favoriteButton = $("<button>");
      favoriteButton.addClass("favorite-button is-large is danger");
      favoriteButton.attr("style", "margin-right:50px");
      favoriteButton.html("Favorite ");
      favoriteButton.attr("data-label", response.hits[i].recipe.label);
      favoriteButton.attr("data-link", response.hits[i].recipe.url);

      articleButtons.append(favoriteButton);

      // i class fas fa-heart
      var heartIcon = $("<i>");
      heartIcon.addClass("fas fa-heart");

      // appending heartIcon into favoriteButton
      favoriteButton.append(heartIcon);

      // getCooking Button
      var getCookingButton = $("<button>");
      getCookingButton.addClass("external-link-button is-large is-danger");
      var getCookingHere = response.hits[i].recipe.url;
      var getCookingHereUrl = $("<a>")
        .attr("href", getCookingHere)
        .attr("target", "_blank");

      getCookingButton.html("Get Cooking");
      //appending url to getCookinghereUrl
      getCookingHereUrl.append(getCookingButton);
      articleButtons.append(getCookingHereUrl);

      //===============================================================
      // div class tile is parent second child of divTile
      var divTileisParent = $("<div>");
      divTileisParent.addClass("tile-is-parent");
      //Appending it into divTile
      divTile.append(divTileisParent);

      //article class image-tile only child of divTileisParent
      var articleImageTile = $("<article>");
      articleImageTile.addClass("image-tile tile is-child notification");
      // appending it to divTileisParent
      divTileisParent.append(articleImageTile);

      //image class search-image child of articleImageTile
      var imageSearch = $("<img>");
      imageSearch.addClass("search-image");
      imageSearch.attr("style", "margin-left:20px");
      imageSearch.attr("src", response.hits[i].recipe.image);
      articleImageTile.append(imageSearch);
    }

    var favoriteLocalStorage = $(".favorite-button");
    var favoriteFromLocalStorage = JSON.parse(localStorage.getItem("favorite"));

    var recipeSelectedArray = [];

    // favorite on click event
    favoriteLocalStorage.on("click", function(event) {
      event.preventDefault();
      var favoriteRecipeSelected = {};

      var favoriteOneLink = $(this).attr("data-link");

      favoriteRecipeSelected.link = favoriteOneLink;
      favoriteRecipeSelected.label = $(this).attr("data-label");
      recipeSelectedArray.push(favoriteRecipeSelected);

      var myFavoriteRecipe = localStorage.setItem(
        "favorite",
        JSON.stringify(recipeSelectedArray)
      );
    });
  });
}

var recipeLabelLocalStorage = localStorage.getItem("label");
var recipeLabelSelected = [];

var favorites = JSON.parse(localStorage.getItem("favorite"));
if (favorites == null) {
  console.log("Nothing found");
} else {
  for (var i = 0; i < favorites.length; i++) {
    var favoriteOne = $("<button>");
    favoriteOne.addClass("favorite-button is-danger is-large is-fullwidth");
    var favoritesRecipe = favorites[i].link;
    var favoritesRecipeURL = $("<a>")
      .attr("href", favoritesRecipe)
      .attr("target", "_blank");

    favoriteOne.html(favorites[i].label);
    favoritesRecipeURL.append(favoriteOne);
    $("#favoriteButtonsTileIndex").append(favoritesRecipeURL);
  }
}

// Local Storage Testing

$("#searchButton").on("click", function(event) {
  event.preventDefault();

  var inputRecipe = $("#searchInput")
    .val()
    .trim();
  $("#test").empty();
  searchForRecipe(inputRecipe);
});
