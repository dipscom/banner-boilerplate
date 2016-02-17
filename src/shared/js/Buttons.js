var Buttons = function() {
  "use strict";
  this.enable = function(elements) {
    enableButtons(elements);
  }

  this.disable = function(elements) {
    disableButtons(elements);
  }

  function enableButtons(elements) {
    for (var i = 0; i < elements.length; i++) {
      var el = document.getElementById(elements[i]);
      el.style.cursor = "pointer";
      el.addEventListener("click", clicked); // For all major browsers,  except IE 8 and earlier
      el.addEventListener("mouseenter", onOver, false);
      el.addEventListener("mouseleave", onOut, false);
    }
  }

  function disableButtons(elements) {
    for (var i = 0; i < elements.length; i++) {
      var el = document.getElementById(elements[i]);
      el.removeEventListener("click", clicked); // For all major browsers,  except IE 8 and earlier
      el.removeEventListener("mouseenter", onOver, false);
      el.removeEventListener("mouseleave", onOut, false);
    }
  }

  function clicked(e) {
    console.log("You have clicked on:", e.target.id);

  }

  function onOver(e) {
    console.log("Over on:", e.target.id);
    // You'll want other parts of the ad to know when there has been a mouse over
    var event = document.createEvent('Event');
    event.initEvent("MOUSE_OVER", true, false);
    event.param = e.target.id;
    // The event dispatched carries the id name of the dispatecher
    window.dispatchEvent(event);
  }

  function onOut(e) {
    console.log("Out of:", e.target.id);
    // You'll want other parts of the ad to know when there has been a mouse out
    var event = document.createEvent('Event');
    event.initEvent("MOUSE_OUT", true, false);
    event.param = e.target.id;
    // The event dispatched carries the id name of the dispatecher
    window.dispatchEvent(event);
  }
};
/* End of Button.js */
