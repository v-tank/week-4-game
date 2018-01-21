//global variables to increment the wins and losses
var winsCounter = 0;
var lossesCounter = 0;

function game() {

  // calls a function to populate the page with images and random values for each crystal
  imgAndRandIntGenerator();

  // generates a random integer between 19 and 120 and sets that as the target value
  var targetNumber = getRandomInt(19,120);
  $("#number-to-guess").text(targetNumber);

  // declare and initialize variable that holds the sum of crystal values
  var playerValue = 0;

  // define the click function

  $(".crystal-image").on('click', function() {

    // grabs the data-attribute from each image and saves it as an int in a variable
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);

    // adds the clicked crystal's value to the player's total
    playerValue += crystalValue;

    // updates the result with the new playerValue
    $("#result").text(playerValue);

    // checks whether the player's value exceeds the target.
    if (playerValue > targetNumber) {
      alert("uh-oh! You lost!");

      // increment the losses counter and set the playerValue to 0
      lossesCounter++;
      playerValue = 0;

      // updates the labels
      $("#losses-label").text(lossesCounter);
      $("#result").text(playerValue);

      // empties the crystals div to get rid of the images
      $( "#crystals" ).empty();

      // reset the game
      game();
    }

    // checks whether the player's value equals the target.
    else if (playerValue === targetNumber) {
      alert("You won!");

      // increment the wins counter and set the playerValue to 0
      winsCounter++;
      playerValue = 0;

      // updates the labels
      $("#wins-label").text(winsCounter);
      $("#result").text(playerValue);

      // empties the crystals div to get rid of the images
      $( "#crystals" ).empty();

      // reset the game
      game();
    }

  });
}

// function to generate an image and a random int and assign the crystal values using data-attributes
function imgAndRandIntGenerator() {

  // creates an array to hold crystal values and images
  var crystalValues = [];
  var crystalImages = ["assets/images/blue-crystal.png",
  "assets/images/orange-crystal.png", 
  "assets/images/yellow-crystal.png",
  "assets/images/green-crystal.png"]

  // runs through a 'for-loop' to generate 4 images and assigns 4 random numbers for each crystal
  for (var i = 0; i < crystalImages.length; i++) {

    // calls a function generate values between 1 and 12 (inclusive)
    var tempRandomNumber = getRandomInt(1,12);
    console.log(tempRandomNumber);

    // This if/else/while section checks whether the value has already been created before (to prevent multiple crystals from having the same value)
    if (crystalValues.indexOf(tempRandomNumber) < 0 ) {
      crystalValues[i] = tempRandomNumber;
    }
    else {
      while (crystalValues.indexOf(tempRandomNumber) >= 0) {
        console.log("Had to come in here to generate another value");
        tempRandomNumber = getRandomInt(1,12);
        console.log("Here's the new value I generated that didn't match an existing one: " + tempRandomNumber);
      }
      crystalValues[i] = tempRandomNumber;
    }

    // For each iteration, this will create a new image
    var imageCrystal = $("<img>");

    // Each crystal will be given the class ".crystal-image" that sets the width and height of the images
    imageCrystal.addClass("crystal-image");

    // Each imageCrystal will be given a src link to a crystal image from the crystalImage array using the 'i' counter
    imageCrystal.attr("src", crystalImages[i]);

    // Each imageCrystal will be given a data attribute called data-crystalValue pulling from the randomly generated array
    imageCrystal.attr("data-crystalvalue", crystalValues[i]);

    // Lastly, each crystal image (with all it classes and attributes) will get added to the page on the empty div.
    $("#crystals").append(imageCrystal);
  }
}

// Function to generate a random number in a range with boundaries inclusive
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

game(); //calls the main game function to run everything