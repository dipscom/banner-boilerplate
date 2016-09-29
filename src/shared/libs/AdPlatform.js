var AdPlatform = function(dbug) {
  // Expose whatever it is that the ad platform wants

  // Broadcast from here when the AdPlatform is ready
  function ready() {
    if(dbug) console.log("[AD PLATFORM] ready");

    // Create the event to dispatch the news
    var event = document.createEvent('Event');
    event.initEvent("PLATFORM_READY", true, false);
    window.dispatchEvent(event);
  }


  // Comment the bellow out after adding the logic for the AdPlatform
  ready();
}
