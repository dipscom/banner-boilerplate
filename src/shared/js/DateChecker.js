var DateChecker = function(releaseDate, preReleasePeriod, dbug) {
	var date = new Date();
	var today = new Date(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
	var releaseDate = new Date(releaseDate);
	var dayBefore = new Date(releaseDate.getTime());
	dayBefore.setDate(releaseDate.getDate() - 1);
	var d = (releaseDate - today) - 86400000;

	if(preReleasePeriod) var preReleasePeriod = new Date(preReleasePeriod);

	if(dbug){
		console.log("Today: ", today, "\n", "Release date: ", releaseDate, "\n", "Release period ", preReleasePeriod || "Not set", "\n", "Day before release: ", dayBefore);
	}


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
			// Is today one day before the releaseDate
			if(d == 0) {
				// Today is the day before
				return "Day Before Release";
			} else {
				// Still in the release period
				return "During Release Period";
			}
		}
		// Is today the releaseDate
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
