/*
  Original code is maintained in
  http://codepen.io/dipscom/pen/RPmrzo
*/
var Button = function(elements) {
  "use strict";
  for (var i = 0; i < elements.length; i++) {
    var el = document.getElementById(elements[i]);
    el.style.cursor = "pointer";
    el.addEventListener("click", clicked); // For all major browsers,  except IE 8 and earlier
    el.addEventListener("mouseover", onOver);
    el.addEventListener("mouseout", onOut);
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
