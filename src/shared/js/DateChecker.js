var DateChecker = function() {
  var today = new Date();
  today.getFullYear();
 
  this.checkDate = function(releaseDate, preReleasePeriod) {
    // Check if preReleasePeriod is defined
    if(preReleasePeriod) {
      // preReleasePeriod is defined
      // Check to see is releaseDate is before preReleasePeriod
      if(releaseDate < preReleasePeriod) {
        return "releaseDate is before preReleasePeriod";
      }
      // is today before the preReleasePeriod date
      if(today < preReleasePeriod) {
        // Yes it is
        return "Before Release Period";
      }
      // Is today after preReleasePeriod but before releaseDate
      if(today < releaseDate) {
        // Yes it is
        return "During Release Pedriod";
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
}
