/* Base.js */
var Ad = function(adName) {
  'use strict';

  // For testing
  var dbug = true;

  // Get the ad's size for future use
  var stage = {
    w:document.querySelector("banner-ad").offsetWidth,
    h:document.querySelector("banner-ad").offsetHeight,
    name: adName || "noName"
  };

  // Instantiate the necessary constructors
  var ldr = new ImageLoader(null, dbug);
  var btns = new Buttons();

  // Define the date variable
  var date = DateChecker("2016-02-19", "2016-02-14", dbug);
  var releaseDate;

  switch (date) {
    case "Before Release Period":
      releaseDate = "releaseDate_date"
      break;

    case "During Release Period":
      releaseDate = "releaseDate_date"
      break;

    case "Before Release":
      releaseDate = "releaseDate_date"
      break;

    case "After Release":
      releaseDate = "releaseDate_now"
      break;

    default:
      // Do nothing

  }

  // Setup the listeners
  addListeners();

  // Prepare the animation
  var anim = new Animation(stage, date);

  // You can target the first element tag
  // TO DO: make a bg image to use
  // ldr.load("banner-ad", ["bg"], ".jpg");
  // Or you can target specific id names
  ldr.load("svgText", ["here", "is", "a", "bunch", "of", "text"], ".svg", "svgText");

  // Here's a way to load a semi transparent reference image
  // ldr.load("banner-ad", ["Endframe"], ".jpg", "guide")


  /* ************** */
  /* Local methods */
  /* ************** */
  function addListeners() {

    // Other events
    window.addEventListener("IMAGES_LOADED", onImagesLoaded);

  }

  function onImagesLoaded() {
    // Enable the buttons
    btns.enable(["clicktag", "cta"]);

    anim.build();
  }
};
/* End Ad(); */

// The constructor for the main Ad() is "ads>adSize>js>Custom.js" each size has its own custom details that need to be fed into the main Ad() object

/* End of Base.js */
