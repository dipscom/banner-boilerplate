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


  // The adPlatform that you may or may not need
  var adPlatform = new AdPlatform(dbug);



  /* ************** */
  /* Local methods */
  /* ************** */
  function addListeners() {

    if(dbug) console.log("[AD] addListeners");

    // AdPlatform events
    window.addEventListener("PLATFORM_READY", init);

  }



  function init() {
    if(dbug) console.log("[AD] init");

    // Instantiate the the buttons constructor
    var btns = new Buttons(dbug);
    // Enable the buttons
    btns.enable(["clicktag"]);


    // Prepare the animation
    var anim = new Animation(unit, dbug);
    // We have all the assets loaded, let's build the animation
    anim.build();


    // Other variables relevant to this particular ad

  }
};
/* End Ad(); */

// The constructor for the main Ad() is in "ads>adSize>js>Custom.js" each size has its own custom details that need to be fed into the main Ad() object

/* End of Ad.js */
