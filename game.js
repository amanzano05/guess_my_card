var counter= 0; //keep track of the number of times to guess the card
var playing= false;//keep track if the game in on or off
//array used for store the cards for each column
var leftDeck=[];
var middleDeck=[];
var rightDeck=[];

//array used for bulding the path to the card image
let list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

//when the page loads
//hide the div containing the Guess
//shuffle the deck
//split the deck into 3 parts for the columns
//display the cards
// and give the intructions
$(document).ready(function(){
  $(".guess").hide();
  shuffle()
  splitDeck(list);
  putDeck();
  $(".msgs").text("Please choose a card and the press play.");
});


//when the mouse hover the columns give animation.
$(".col-4").hover(
  //hover in fucntion
  //get the id of the current column
  //if playing add the class with the animation.
  function(){
    var col = $(this).attr("id");
    if (playing===true){
      $("."+col).addClass("pressed");
    }
  },
  //hover out function
  //get the id of the current columns
  //remove the class for the animation
  function(){
    var col = $(this).attr("id");
    $("."+col).removeClass("pressed");
  });


//function when a column is clicked
$(".col-4").click(function(){
  if (playing===true){
    //get the id of the column
    var col = $(this).attr("id");
    // var list = $(this).attr("class").split(/\s+/);//convert classes into array
    //call animation function passing the id as class
    pressed("." + col);
    //add one to counter
    counter++;
    //build the new deck
    //the middle part is always the current column
    if (col==="col1"){
      makeDeck(middleDeck, leftDeck, rightDeck);
    }
    if (col==="col2"){
      makeDeck(leftDeck, middleDeck, rightDeck);
    }
    if (col==="col3"){
      makeDeck(leftDeck, rightDeck, middleDeck);
    }
    //split the deck into 3 for the new coumns
    splitDeck(list);
    //display the columns with the new deck
    putDeck();
    //if counter is equal to three inspect is
    //time to make the guess
    if (counter===3){
      //change the text of the instructions paragraph
      $(".msgs").text("Your card is: ");
      //show the div containing the guess
      displayGuess()
      //hide all the cards so we can only show
      //the Guess
      $(".col-4").hide();
      //display the play button
      //and change its text to 'play again'
      $(".btn").show();
      $(".btn").text("Play Again");
      //reset values
      playing = false;
      counter=0;
      leftDeck=[];
      middleDeck=[];
      rightDeck=[];
      list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    }
  }
});

//function for handling click on the play button
$(".btn").click(function(){
  //display effect
  pressed(this);
  //show instructions
  $(".msgs").text("Please click the column with your card...");
  //hide the button for playing again
  $(".btn").hide();
  //show the columns for the cards
  $(".col-4").show();
  //hide the div for the guess
  $(".guess").hide();
  //change playing to true
  playing = true;
  //shuffle the deck
  //split the deck into 3 parts for the columns
  //display the cards
  splitDeck(list);
  makeDeck(leftDeck,middleDeck, rightDeck);
  putDeck();
});

//split the array into 3 decks for the columns
function splitDeck(deck){
  //empty arrays
  leftDeck=[];
  middleDeck=[];
  rightDeck=[];
  //split the deck into each column
  //first goes to leftDeck
  //second goes to middleDeck
  //third goes to rightDeck
  //fourth goes to leftDeck
  // and so on
  var col=0;
  for(var i=0 ; i<deck.length;i++){
    if(col==0){
      leftDeck.push(deck[i])
    }
    if(col==1){
      middleDeck.push(deck[i])
    }
    if(col==2){
      rightDeck.push(deck[i])
    }
    col++;
    if (col==3){
      col=0;
    }
  }
}

//make one deck out of the three columns
function makeDeck(up, middle, down){
  //concatenate the arrays
  list=down.concat(middle.concat(up))
}


//place the cards on the corresponding column
function putDeck(){
  for (var i =1 ; i<8; i++){
    //left column
    //get the class corresponding to card in the column left
    var leftColClass=".l"+i;//class used for identify the position of the card in the corresponding column
    var path= "url('images/"+leftDeck[i-1]+".png')";//path for the image using the corresponding array
    $(leftColClass).css("background-image", path);//display the corresponding image.
    //middle column
    var middleColClass=".m"+i;
    var path= "url('images/"+middleDeck[i-1]+".png')";
    $(middleColClass).css("background-image", path);
    //right column
    var rightColClass=".r"+i;
    var path= "url('images/"+rightDeck[i-1]+".png')";
    $(rightColClass).css("background-image", path);
  }
}

//animation used when the button or the columns is clicked.
function pressed(e){
  //query the paased value to add the class for the efect
  $(e).addClass("pressed");
  //after 50ms remove the class for creating the efect
  setTimeout(function(){
    $(e).removeClass("pressed");
  }, 50);
}

//shuffle the list array
function shuffle(){
  list = list.sort(() => Math.random() - 0.5);
}

//function for displaying the div with the guess
function displayGuess(){
  //display the div
  $(".guess").show();
  //build the path to the guessed image corresponding to the 10th
  //element in the list after the 3 round
  var path = "url('images/"+list[10]+".png')";
  //display the guessed card
  $(".guess").css("background-image", path);
}
