/* Shared.js */
var Ad = function() {
  'use strict';

  // For debugging
  var dbug = true;


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

  // Animation constructor
  var anim = new Animation(stage, date);

  addListeners();


  // You can target the first element tag
  // TO DO: make a bg image to use
  // ldr.load("ad-banner", ["bg"], ".jpg");
  // Or you can target specific id names
  // ldr.load("svgText", ["here, is, a, bunch, of, text"], ".svg");


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
    if(dbug) console.log("[AD] Images loaded");

    // Add the button
    btns.enable(["clicktag", "cta"]);

    anim.build(stage.w, stage.h);
  }


  // Mouse methods
  function checkClick(e) {
    var trg = e.param;

    console.log("checkClick:", trg);

    switch (trg) {
      case "clicktag":
      case "cta":
        anim.goToEnd();

      break;

      default:
        // clickout by default

    }
  }


  function checkOver(e) {
    var trg = e.param;

    console.log("checkClick:", trg);

    switch (trg) {
      case "cta":
        TweenMax.to(cta, 0.3, {scale:1.1, ease:Back.easeInOut});
        break;

      default:
        // Do nothing by default

    }
  }


  function checkOut(e) {
    var trg = e.param;

    console.log("checkClick:", trg);

    switch (trg) {
      case "cta":
        TweenMax.to(cta, 0.3, {scale:1, ease:Back.easeInOut});
        break;

      default:
      // Do nothing by default

    }
  }

};
/* End Ad(); */




// wait until DOM is ready
document.addEventListener("DOMContentLoaded", function(event) {

  // wait until window, stylesheets, images, links, and other media assets are loaded
  window.onload = function() {

    // All ready, start!
    Ad();

  };
});
/* End of Shared.js */
