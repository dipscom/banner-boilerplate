var Animation = function(unit, date, dbug) {
  var dbug = dbug;

  if(dbug) console.log("[ANIMATION] constructor");

  this.unit = unit;
  this.date = date;

  var main_tl = new TimelineLite({onComplete:loop, paused:true}),
      dur = 0.3,
      hold = 1,
      plays = 0,
      loops = unit.loops || 2;

  // window.addEventListener("CLICKED", goToEnd);


  /* ***************** */
  /* Public methods */
  /* *************** */
  this.build = function() {
    addListeners();


    // Write the animation code here.
    main_tl.to("banner-ad", dur, {autoAlpha:1})
    .add("Start")

    .staggerFrom("#frame1 p", dur, {autoAlpha:0}, dur*0.25 )




    main_tl.play();

  }




  /* *************** */
  /* Private methods */
  /* *************** */
  function addListeners() {

    // Mouse Events
    window.addEventListener("CLICKED", goToEnd);

  }




  function pauseTL() {
    main_tl.pause();
  }



  function playTL() {
    main_tl.play();
  }




  function goToEnd() {
    if(main_tl.totalProgress() !== 1){
      if(dbug) console.log(("[ANIMATION]: goToEnd"));
      main_tl.totalProgress(1, true);
    }
  }




  function loop() {
    if(dbug) console.log("[ANIMATION], Animation complete. Loop", plays);

    // The ad has played once
    plays++;

    // Should it loop?
    if(plays <= loops) {
      // Wait 3 seconds, then fade out the whole ad before looping
      TweenMax.to("banner-ad", 0.5, {
        delay: 3,
        autoAlpha: 0,
        onComplete:function () {
          main_tl.play(0);
        }
      });
    }
  }




  function broadcast(e) {

    // You'll want other parts of the ad to know when there has been a mouse over
    var event = document.createEvent('Event');
    event.initEvent("ANIMATION", true, false);
    event.param = e;
    // The event dispatched carries the id name of the dispatecher
    window.dispatchEvent(event);

  }


}
