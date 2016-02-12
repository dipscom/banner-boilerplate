var Animation = function(stage, date, dbug) {
  if(dbug) console.log("[ANIMATION] constructor")

  var main_tl = new TimelineLite({paused:true}),
      dur = 0.3,
      stage = stage,
      date = date;


  /* ***************** */
  /* External methods */
  /* *************** */
  this.build = function(w, h) {
    main_tl.add("Start")
      .add(zoomIn(here))
  }


  this.goToEnd = function() {
    if(main_tl.totalProgress() != 1){
      console.log(("[ANIMATION]: goToEnd"));
      main_tl.totalProgress(1, true);
    }
  }

  /* ************* */
  /* Local methods */
  /* ************* */
  function zoomIn(el) {
    var tl = new TimelineLite();

    tl.fromTo(el, dur, {scale:0}, {scale:0.9})
      .to(el, dur * 3, {scale:1})

    return tl;
  }
}
