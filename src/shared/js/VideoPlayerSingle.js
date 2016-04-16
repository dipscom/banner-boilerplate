var VideoPlayer = function(dbug) {

  var dbug = dbug;

  if(dbug) console.log("[VIDEOPLAYER] constructor");


  var video = document.querySelector('video');
  var isPlaying = false;


  // We know the ad will be using greensock, so we set some defaults up
  TweenMax.set(pauseBt, {autoAlpha:0});


  addListeners();




  /* *************** */
  /* Private methods */
  /* *************** */
  function addListeners() {

    // Mouse Events
    window.addEventListener("CLICKED", checkVideoStatus);

    // Video Events
    video.addEventListener('ended', onVideoEnded, false);
    // playBt.addEventListener('play', onVideoPlay, false);
    // this.video.addEventListener('pause', onVideoPause, false);

    // Animation Events
    // Video Events
    window.addEventListener("ANIMATION", onAnimation);

  }




  function checkVideoStatus(e) {

    // Check if the video is playing and it was not the expand click
    if (isPlaying && e.param !== "expand") {

      pauseVideo();

    } else {

      switch (e.param) {
        case "playBt":
          playVideo();
          break;

        default:
          toggleVideo();

      }
    }

  }


  function toggleVideo() {

    if ( video.paused ) {

      playVideo();

    } else {

      pauseVideo();

    }

  }


  function pauseVideo() {

    if(dbug) console.log("[VIDEOPLAYER] Pause", video);

    video.pause();

    isPlaying = false;

    TweenMax.set(playBt, {autoAlpha:1});
    TweenMax.set(pauseBt, {autoAlpha:0});

  }




  function playVideo() {

    if(dbug) console.log("[VIDEOPLAYER] Play", video);

    video.play();

    isPlaying = true;

    TweenMax.set(playBt, {autoAlpha:0});
    TweenMax.set(pauseBt, {autoAlpha:1});

  }




  function onVideoEnded(e) {

    TweenMax.set(playBt, {autoAlpha:0});
    TweenMax.set(pauseBt, {autoAlpha:0});
    // TweenMax.set(replayBt, {autoAlpha:1});

    // You'll want other parts of the ad to know when there has been a mouse over
    var event = document.createEvent('Event');
    event.initEvent("VIDEO_ENDED", true, false);
    event.param = e.target.id;
    // The event dispatched carries the id name of the dispatecher
    window.dispatchEvent(event);

  }




  function onAnimation(e) {
    if(dbug) console.log("[VIDEOPLAYER] Animation:", e.param);

    switch (e.param) {
      case "start":
        playVideo()
        break;

      default:
        // Do nothing
    }
  }

}
