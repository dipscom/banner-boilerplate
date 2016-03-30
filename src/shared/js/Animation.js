var Animation = function(stage, date, dbug) {
  var dbug = dbug;

  if(dbug) console.log("[ANIMATION] constructor");

  this.stage = stage || {w:300, h:250};
  this.date = date;
  this.name = stage.name;

  var main_tl = new TimelineLite({onComplete:loop, paused:true}),
    dur = 0.3,
    hold = 1,
    plays = 0,
    loops = 2;

  window.addEventListener("CLICKED", goToEnd);


  /* ***************** */
  /* Public methods */
  /* *************** */
  this.build = function() {
    // Write the animation code here.
  }




  /* ************* */
  /* Local methods */
  /* ************* */
  function pauseTL() {
    main_tl.pause();
  }

  function goToEnd() {
    if(main_tl.totalProgress() != 1){
      if(dbug) console.log(("[ANIMATION]: goToEnd"));
      main_tl.totalProgress(1, true);
    }
  }

  function loop() {
   if(plays <= loops) {
    main_tl.play(0);
    plays++;
   }
  }
}
