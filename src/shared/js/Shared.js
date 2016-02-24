/* Base.js */
var Ad = function() {
  'use strict';

  // Get the ad's size for future use
  var stage = {
    w:document.querySelector("ad-banner").offsetWidth,
    h:document.querySelector("ad-banner").offsetHeight
  };

  // Instantiate the necessary constructors
  var ldr = new ImageLoader(null, true);
  var btns = new Buttons();

  // Define the date variable
  var date = DateChecker("2016-02-19", "2016-02-14");
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

  // Prepare the animation
  var anim = new Animation(stage, date);

  // You can target the first element tag
  // TO DO: make a bg image to use
  // ldr.load("ad-banner", ["bg"], ".jpg");
  // Or you can target specific id names
  ldr.load("svgText", ["here, is, a, bunch, of, text"], ".svg");


  // add the buttons
  btns.enable(["clicktag"]);


  /* ************** */
  /* Local methods */
  /* ************** */
  function addListeners() {

    // Other events
    window.addEventListener("IMAGES_LOADED", onImagesLoaded);

  }

  function onImagesLoaded() {
    // Add the button
    btns.enable(["clicktag", "cta"]);

    anim.build(stage.w, stage.h);
  }
};
/* End Ad(); */


/* End of Base.js */
