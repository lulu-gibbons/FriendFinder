var friends = require("../data/friends.js");

module.exports = function(app) {
  // HTML GET Requests
  //displays friends in json format
  // ---------------------------------------------------------------------------
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  //post request for when user enters in their info to get a best friend match back
  app.post("/api/friends", function(req, res) {

    var bestMatch = {
      name: "",
      photo: "",
      difference: 1000
    };

    console.log(req.body);

    //takes the user's string input and returns an integer
    var userData = req.body;
    var userScores = userData.scores;

    console.log(userScores);

    //creating a nested for loop to that will calculate the difference between the current user's score
    //and the scores of user in the database
    var totalDiff = 0;

    //loops through friends already in database
    for(i = 0; i < friends.length; i++){
      console.log(friends[i]);
      totalDiff = 0;

      //nested loop that loops through the scores inside of the friend objects
      for(j = 0; j < friends[i].scores[j]; j++){
        //setting totalDiff of each question's score minus the score of each possible friend
        //Math.abs takes neg num and makes positive, takes pos num and leave a pos num
        totalDiff = Math.abs(parseInt(userScores[j])-parseInt(friends[i].scores[j]));
        //if the sum of totalDiff is less than the current bestMatch difference...
        if(totalDiff <= bestMatch.difference){
          //then set bestMatch values to equal that user making that users the current best friend
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.difference = totalDiff;
        }
      }
    }
    //saves the user's answers and info to the database
    friends.push(userData);
    //returns the best match data in json form to be used by the html
    res.json(bestMatch);
  });
};
