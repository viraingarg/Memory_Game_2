//global variables used 
var gametime;
var totalsecscount;
var game_secs;
var game_mins;
var tstring;
var movecount;
var starcount;
var front_img='<img src="img/question2.ico" alt="???" height="100px" width="100px">';
var star_img_tag='<img src="img/star.ico" height="25px" width="25px">';
var cards_storage = ['#','#','@','@','&','&','$','$','?','?','%','%','(',')','(',')'];
var cards_pushed = [];
var cardids = [];
var cardsFlippedc = 0;

//to call main function on window load
window.onload= main;

// main function which calls all the other required functions
function main(){
	gameConstruct();
	util_fun();
}

//function to shuffle array data so that every time cards will be place randomly
Array.prototype.shuffleUtil = function(){
    var l = this.length, m, t;
    while(--l > 0){
        m = Math.floor(Math.random() * (l+1));
        t = this[m];
        this[m] = this[l];
        this[l] = t;
    }
};

//sets time and rating and checks again after every 1 sec
function setInfoTandR()
{
	//logic to check star rating 
	if(movecount < 31){
		starcount = 3;
	}
	else if(movecount > 30 && movecount < 51){
		starcount = 2;
	}
	else{
		starcount = 1;
	}
	ge = document.getElementById("stars");
	ge.innerHTML="";
	
	//for loop to add stars on the html element
	for (var j = 0; j < this.starcount; j++){
		var a = document.createElement('span');
		a.innerHTML=star_img_tag;
		ge.appendChild(a);
	}
	++totalsecscount;
			
	//calculating seconds and minutes
    game_secs = format_time(totalsecscount%60);
    game_mins = format_time(parseInt(totalsecscount/60));
	gametime.innerHTML= game_mins+":"+game_secs;
}

function format_time(val)
{
    tstring = val + "";
    if(tstring.length == 2)
    {
		return tstring;       
    }
    else if(tstring.length < 2)
    {
        return "0" + tstring;
    }
}


//A utility function to display timer and star rating
function util_fun(){
	
        gametime = document.getElementById("timer");
		gametime.innerHTML="0";
		game_secs=0;
		game_mins=0;
        totalsecscount = 0;
        setInterval(setInfoTandR, 1000);
}
		
//function used to create game canvas and tiles to be flipped
function gameConstruct(){
	document.getElementById('board').innerHTML = "";
	cardsFlippedc = 0;
	movecount=0;
	var output = '';
	//shuffling array
    cards_storage.shuffleUtil();
	
	//for loop to create tiles and append them into the canvas
	for(var k = 0; k < cards_storage.length; k++){
		output += '<div id="tile_'+k+'" onclick="flipCardCheck(this,\''+cards_storage[k]+'\')">'+front_img+'</div>';
	}
	document.getElementById('board').innerHTML = output;
	document.getElementById('points').innerHTML = '0';
	document.getElementById('stars').innerHTML = '0';
	document.getElementById('timer').innerHTML = '0';
}

//function is called whenever a tile is flipped to do the various functioning
function flipCardCheck(cardr,data){
	//logic to check whether the tile is already flipped or not
	if(cardr.innerHTML == front_img && cards_pushed.length < 2){
		
		//putting data onto the other side of tile on flpping
		cardr.innerHTML = data;
		
		//incrementing move value by 1
		++movecount;
		
		//displaying moves in the information board of html
		document.getElementById('moves').innerHTML = movecount;
		
		//check whether it is the first card or the second card to be paired
		if(cards_pushed.length == 0){
			cards_pushed.push(data);
			cardids.push(cardr.id);
		} 
		//if the card is the second card which is to be paired
		else if(cards_pushed.length == 1){
			cards_pushed.push(data);
			cardids.push(cardr.id);
			
			//checks if both the card are same or not
			if(cards_pushed[0] == cards_pushed[1]){
				cardsFlippedc += 2;
				document.getElementById('points').innerHTML = cardsFlippedc;
				// Clear both arrays
				cards_pushed = [];
            	cardids = [];
				
				// Check to see if the whole board is cleared
				if(cardsFlippedc == cards_storage.length){
					//message to display on completing the game
					var v = confirm("Cogratulations!! , Game completed successfuly. Time elapsed " +game_mins+" min "+ game_secs+" sec, "+
					        "Rating given by the game "+starcount+" stars. Do you want to play it again ?");
					if (v == true) {
						 //reoading window to restart the game
						 window.location.reload();
					}
				}
				//if both the cards are different
			} 
			else{
				//unflip the cards again
				function cardflip(){
				    var tile_1 = document.getElementById(cardids[0]);
				    var tile_2 = document.getElementById(cardids[1]);
            	    tile_1.innerHTML = front_img;
            	    tile_2.innerHTML = front_img;
				    // Clear both arrays
				    cards_pushed = [];
            	    cardids = [];
				}
				setTimeout(cardflip, 400);
			}
		}
	}
}