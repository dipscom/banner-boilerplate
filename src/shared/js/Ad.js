/* Ad.js */
var Ad = function(obj) {
  'use strict';

  // For testing
  var dbug = true;

  // Get the ad's size for future use
  var unit = {
    w:document.querySelector("banner-ad").offsetWidth,
    h:document.querySelector("banner-ad").offsetHeight,
    name: obj.name || null
  };


  // Setup the listeners
  addListeners();


  // Instantiate the the buttons constructor
  var btns = new Buttons(dbug);
  // Enable the buttons
  btns.enable(["clicktag"]);


  // Prepare the animation
  var anim = new Animation(unit, dbug);
  // We have all the assets loaded, let's build the animation
  anim.build();



  /* ************** */
  /* Local methods */
  /* ************** */
  function addListeners() {

    // Other events
    // window.addEventListener("IMAGES_LOADED", onImagesLoaded);

  }

  function onImagesLoaded() {
    // Once all dynamic images have loaded

  }
};
/* End Ad(); */

// The constructor for the main Ad() is in "ads>adSize>js>Custom.js" each size has its own custom details that need to be fed into the main Ad() object

/* End of Ad.js */
