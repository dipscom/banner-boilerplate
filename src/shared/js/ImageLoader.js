var ImageLoader = function(dbug) {
  "use strict";
  var dbug = dbug;
  if(dbug) console.log("[IMAGE_LOADER] Init");
  // Total count of images to load
  var count = 0;

  this.loadImage = function(parent, names, extension) {
    // Grab the html tag based on the string provided
    var container = document.getElementById(parent);
    // Loop thru the array provided
    for( var i = 0, ttl = names.length; i < ttl; i++ ) {
      // And append the image created into the html tag given
      container.appendChild(createImage(names[i], extension));
    }
  };

  function createImage(name, extension) {
    if(dbug) console.log("[IMAGE_LOADER] Image " + name);
    // Add one to the count of images loading
    count++;
    // Create the element tag
    var image = document.createElement("img");
    image.src = name + extension;
    image.id = name;
    image.onload = countReady;
    return image;
  }

  function countReady() {
    // Once loaded
    // Subtract one from the count of images loading
    count--;
    // When the count reaches zero
    if( count === 0 ) {
      // All images have loaded
      // Create the event to dispatch the news
      var event = document.createEvent('Event');
      event.initEvent("IMAGES_LOADED", true, false);
      window.dispatchEvent(event);
    }
  }
};
/* End of ImageLoader.js */
