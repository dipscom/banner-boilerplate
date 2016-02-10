/* Shared.js */
var Ad = function() {
  'use strict';
  // add the buttons
  var btns = new Buttons();
  btns.enable(["clicktag"]);
};

// wait until DOM is ready
document.addEventListener("DOMContentLoaded", function(event) {

  // wait until window, stylesheets, images, links, and other media assets are loaded
  window.onload = function() {

    // All ready, start!
    Ad();

  };
});
/* End of Shared.js */
