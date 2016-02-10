var DateChecker = function(releaseDate, preReleasePeriod, dbug) {
  var today = new Date();
      today.getFullYear();

  var releaseDate = new Date(releaseDate);
  var preReleasePeriod = new Date(preReleasePeriod);

  if(dbug){ console.log("Today: ", today, "\n", "Release date: ", releaseDate, "\n", "Release period ", preReleasePeriod);}

  // Check if preReleasePeriod is defined
  if(preReleasePeriod) {
    // preReleasePeriod is defined
    // Check to see is releaseDate is before preReleasePeriod
    if(releaseDate < preReleasePeriod) {
      throw new Error("releaseDate is before preReleasePeriod. Reverse their order");
    }
    // is today before the preReleasePeriod date
    if(today < preReleasePeriod) {
      // Yes it is
      return "Before Release Period";
    }
    // Is today after preReleasePeriod but before releaseDate
    if(today < releaseDate) {
      // Yes it is
      return "During Release Period";
    }
  }
  // preReleasePeriod is not defined
  // is today before the releaseDate
  if( today < releaseDate ) {
    // Yes it is
    return "Before Release";
  }
  // Is today after the releasDate
  else {
    // Yes it is
    return "After Release";
  }
}
