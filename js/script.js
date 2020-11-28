if (
  localStorage.getItem("userFoodChoice") == null ||
  localStorage.getItem("userFoodChoice") == undefined
) {
  localStorage.setItem("userFoodChoice", "pizza");
}
var header, paragraph;
var breakfastList = [
  "pancakes",
  "breakfast potatoes",
  "Full English Breakfast",
  "French Omelette",
];
var lunchList = [
  "big mac",
  "vegetarian chilli",
  "thai green curry",
  "Lasagna Sandwiches",
  "Chicken Ham and Leek Pie",
];
var dinnerList = ["beef lo mein", "chicken handi", "Salmon Prawn Risotto"];
var userChoice = localStorage.getItem("userFoodChoice");
var userChoicePhoto = localStorage.getItem("userFoodChoice");
// userChoicePhoto.toLowerCase();
// userChoicePhoto.replace(" ", "|");
console.log(userChoicePhoto);
var cocktailUrl =
"https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + userChoice;
var recipeURL =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userChoice;

//search function for random meals
$(".random-meal").click(function () {
  console.log($(this).attr("value"));
  if ($(this).attr("value") === "Breakfast") {
    userChoice = getRandomMeal(breakfastList);
    localStorage.setItem("userFoodChoice", userChoice);
    window.open("index.html", "_self");
  } else if ($(this).attr("value") === "Lunch") {
    userChoice = getRandomMeal(lunchList);
    localStorage.setItem("userFoodChoice", userChoice);
    window.open("index.html", "_self");
  } else {
    userChoice = getRandomMeal(dinnerList);
    localStorage.setItem("userFoodChoice", userChoice);
    window.open("index.html", "_self");
  }
});

//search functions for user choices
$("#search").click(function () {
  localStorage.setItem("userFoodChoice", $("#inputSearch").val());
  window.open("index.html", "_self");
});

$("#search").click(function () {
  userChoice = $("#inputSearch").val();
  console.log(userChoice);
});
//image for food item searched by user
function displayImage(URL, alt) {
  $("#foodPic").attr("src", URL);
  $("#foodPic").attr("alt", alt);
}
//info on the food item searched
function displayText(header, paragraph) {
  $("#title").append(header);
  $("#recipeText").append(paragraph);
}
//food items recipe in a list
function displayList(list) {
  for (let i = 0; i < list.length; i++) {
    let recipeItem = $("<li>" + list[i] + "</li>");
    $("#foodItemRecipe").append(recipeItem);
  }
}

// <<<<<<< HEAD
// {
//   var listItem = $("<li>" + "</li>")
//   $("#foodItemCalories").append(listItem)
// }

// =======
// >>>>>>> 953730e2ea693d113f3f59572aa75ee468bb5ac3
function getRandomMeal(mealList) {
  var random = Math.floor(Math.random() * mealList.length);
  return mealList[random];
}


// Grabbing cocktail from cocktailDB
$.ajax({
  url: cocktailUrl,
  method:"GET",
}).then(function(response){
  console.log(response);
  if (response.drinks != null) {
    console.log(response);
    var imageURL = response.drinks[0].strDrinkThumb;
    let ingredientPath = response.drinks[0];

    let list = [];

    for (let i = 1; i < 20; i++) {
      var ingredient = "strIngredient" + i;
      var measurement = "strMeasure" + i;

      if (ingredientPath[ingredient] === ""|| ingredientPath[ingredient] == null) {
        break;
      }
      if(ingredientPath[measurement] == null){
        ingredientPath[measurement] = "To taste";
      }
      list.push(
        ingredientPath[ingredient] + ": " + ingredientPath[measurement]
      );
      
    }
    console.log(list);
    console.log(response);
    header = response.drinks[0].strDrink;
    paragraph = response.drinks[0].strInstructions;
    displayImage(imageURL, header);
    displayText(header, paragraph);
    displayList(list);

    
   
  } else {
    //we need to add here what will be displayed on the screen
    // when we will not get an positive response from Api
    console.log(
      "This alert happens when user introduces a word that MealDB API cannot find."
    );
  }
})


// grabbing response from mealdb api
$.ajax({
  url: recipeURL,
  method: "GET",
}).then(function (response) {
  //condition bellow checks if the return object is equal with null or not
  if (response.meals != null) {
    console.log(response);
    var imageURL = response.meals[0].strMealThumb;
    let ingredientPath = response.meals[0];

    let list = [];

    for (let i = 1; i < 15; i++) {
      var ingredient = "strIngredient" + i;
      var measurement = "strMeasure" + i;

      if (ingredientPath[ingredient] === "" ) {
        break;
      } else{
        list.push(
          ingredientPath[ingredient] + ": " + ingredientPath[measurement]
        );
      }
      // list.push(
      //   ingredientPath[ingredient] + ": " + ingredientPath[measurement]
      // );
    }
    console.log(list);
    console.log(response);
    header = response.meals[0].strMeal;
    paragraph = response.meals[0].strInstructions;
    displayImage(imageURL, header);
    displayText(header, paragraph);
    displayList(list);

    
   
  } else {
    //we need to add here what will be displayed on the screen
    // when we will not get an positive response from Api
    console.log(
      "This alert happens when user introduces a word that MealDB API cannot find."
    );
  }
  
});

function getFoodOrDrinkInfo(response){
  if (response.meals != null) {
    console.log(response);
    var imageURL = response.meals[0].strMealThumb;
    let ingredientPath = response.meals[0];

    let list = [];

    for (let i = 1; i < 20; i++) {
      var ingredient = "strIngredient" + i;
      var measurement = "strMeasure" + i;

      if (ingredientPath[ingredient] === "") {
        break;
      }
      list.push(
        ingredientPath[ingredient] + ": " + ingredientPath[measurement]
      );
    }
    console.log(list);
    console.log(response);
    header = response.meals[0].strMeal;
    paragraph = response.meals[0].strInstructions;
    displayImage(imageURL, header);
    displayText(header, paragraph);
    displayList(list);

    
   
  } else {
    //we need to add here what will be displayed on the screen
    // when we will not get an positive response from Api
    console.log(
      "This alert happens when user introduces a word that MealDB API cannot find."
    );
  }
}
function setFoodOrDrinkInfo(){
  
}
