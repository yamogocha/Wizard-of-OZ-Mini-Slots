

var mNectarGame = {};
	mNectarGame.credit = 1500000;
	mNectarGame.currentLVL = 0;
	mNectarGame.nextLVL = 300000;
	mNectarGame.currentBet = 30000;

var spin1 = [
				[2,5,6,2,3,7,2,8,10,11,9,3,5,8,2,5,4,4], //reel1
				[2,3,3,2,3,7,2,8,10,11,9,3,5,9,4,6,2,2],  //reel2
				[8,7,4,2,3,7,2,8,10,11,9,3,5,10,2,6,9,10], //reel3
				[11,6,5,3,3,7,2,8,10,11,9,3,5,9,11,6,5,3], //reel4
				[7,2,4,7,3,7,2,8,10,11,9,3,5,9,6,3,9,10] //reel5
			];

var spin2 = [
				[1,1,5,2,3,7,2,8,10,11,9,3,5,3,2,5,6,2],
				[2,9,6,2,3,7,2,8,10,11,9,3,5,9,2,3,3,2],
				[6,6,4,5,3,7,2,8,10,11,9,3,5,10,8,7,4,2],
				[5,10,1,8,3,7,2,8,10,11,9,3,5,9,11,6,5,3],
				[7,5,7,2,3,7,2,8,10,11,9,3,5,9,7,2,4,7]
			];

var spin3 = [
				[1,2,10,1,3,7,2,8,10,11,9,3,5,8,1,1,5,2],
				[1,1,9,1,3,7,2,8,10,11,9,3,5,9,2,9,6,2],
				[3,5,9,11,3,7,2,8,10,11,9,3,5,10,6,6,4,5],
				[3,7,1,8,3,7,2,8,10,11,9,3,5,9,5,10,1,8],
				[4,2,3,1,3,7,2,8,10,11,9,3,5,9,7,5,7,2]
			];


var totalSpin = 0;
var spinClickable = true;



// set images
var replaceImages = function (reelInfo){
	for (var r = 1; r <= 5; r++) {
		var currentReel = reelInfo[r-1];
		for (var e = 1 ; e <=18 ; e++) {
			var element = "reel" + r + "-" + e;  
			document.getElementById(element).className = "image" + currentReel[e-1];
		};
	};
}

replaceImages(spin1);

var updateNum = function(){
	//rhud txt
	var localCredit = mNectarGame.credit.toLocaleString();
	document.getElementById("credits-txt").innerHTML = localCredit;
	var localBet = mNectarGame.currentBet.toLocaleString();
	document.getElementById("bet-txt").innerHTML = localBet;
	// lhud txt
	var localCurrentLvl = mNectarGame.currentLVL.toLocaleString();
	document.getElementById("lvl-top-num").innerHTML = localCurrentLvl;
	var localNextLvl = mNectarGame.nextLVL.toLocaleString();
	document.getElementById("lvl-bottom-num").innerHTML = localNextLvl;

	var gradientScaling = mNectarGame.currentLVL/300000;
	document.getElementById("lvl-gradient").style.transform = "scale(" + gradientScaling + ",1)";
}

updateNum();

//set top px
for (var r = 1; r <= 5; r++) {
	for (var e = 1 ; e <=18 ; e++) {
		var element = "reel" + r + "-" + e;  
		var currentReel
		document.getElementById(element).style.top =(e-1)*74 + "px" ;
	};
};

//hiding all lines
var hideAllLines = function(){
	for (var i = 1; i <= 7; i++) {
		var theID = "line" + i;
		document.getElementById(theID).style.visibility = "hidden";

	};
}
hideAllLines();

var spin = function (){
	totalSpin++;

	mNectarGame.currentLVL += mNectarGame.currentBet;
	mNectarGame.nextLVL -= mNectarGame.currentBet;
	document.getElementById("win-txt").innerHTML = "";
	mNectarGame.credit -= mNectarGame.currentBet;
	updateNum();

	if (totalSpin===2){hideAllLines(); document.getElementById("dim").style.visibility = "hidden";}

	document.getElementById("spin-btn").className = "spin-pressed";
	document.getElementById("p1").innerHTML = "Playing All 30 Lines - Good Luck!";
	document.getElementById("gem1").className = "gem1";
	document.getElementById("gem2").className = "gem2";
	document.getElementById("green-sp1").className = "green-sp1";
	document.getElementById("green-sp2").className = "green-sp2";
	document.getElementById("reel1").className = "reel-spin";

	setTimeout(function(){
		document.getElementById("reel2").className = "reel-spin";
	 }, 200);

	setTimeout(function(){
		document.getElementById("reel3").className = "reel-spin";
		document.getElementById("spin-btn").className = "spin-btn";
	 }, 400);


	setTimeout(function(){
		document.getElementById("reel4").className = "reel-spin";
	 }, 600);

	setTimeout(function(){
		document.getElementById("reel5").className = "reel-spin";
	 }, 800);

	setTimeout(function(){
		 if(totalSpin===1){
		 	slightOfHand(spin2);
		 	for (var l = 1; l <=3; l++) {
		 		var whichLine = "line" + l;
		 		var theDelay = l * 100;
		 		setVisibilityWithDelay(whichLine, "visible", theDelay);
		 	};

	 		setTimeout(function(){
	 			for (var l = 2; l <=3; l++) {
	 				document.getElementById("dim").style.visibility = "visible";
	 				document.getElementById("line" + l).style.visibility = "hidden";
	 				document.getElementById("reel1-18").style.zIndex = "25";
	 				document.getElementById("reel1-18").className += " glow";
	 				document.getElementById("reel2-18").style.zIndex = "25";
	 				document.getElementById("reel2-18").className += " glow";
	 				document.getElementById("reel3-18").style.zIndex = "25";
	 				document.getElementById("reel3-18").className += " glow";

	 				var winAmount = mNectarGame.currentBet*1.5;
					document.getElementById("win-txt").innerHTML = winAmount.toLocaleString();
	 				mNectarGame.credit += winAmount;
	 				updateNum();

	 				//spin doesnt become clickable after 1000 ms
	 				setTimeout(function(){spinClickable=true;}, 1000);
	 			};
	 		}, 1000);
		 	
		 }
		 if(totalSpin===2){
		 	slightOfHand(spin3);
		 	//spin doesnt become clickable after 1000 ms
			setTimeout(function(){spinClickable=true;}, 1000);
		 }
		 if (totalSpin===3){
		 	for (var l = 4; l <=7; l++) {
		 		var whichLine = "line" + l;
		 		var theDelay = (l-3) * 100;
		 		setVisibilityWithDelay(whichLine, "visible", theDelay);	
		 	};
		 	setTimeout(function(){
	 			for (var l = 5; l <=7; l++) {
	 				document.getElementById("dim").style.visibility = "visible";
	 				document.getElementById("line" + l).style.visibility = "hidden";
	 				document.getElementById("reel1-3").style.zIndex = "25";
	 				document.getElementById("reel1-3").className += " glow";
	 				document.getElementById("reel2-3").style.zIndex = "25";
	 				document.getElementById("reel2-3").className += " glow";
	 				document.getElementById("reel3-3").style.zIndex = "25";
	 				document.getElementById("reel3-3").className += " glow";

	 				document.getElementById("dt-bg").className = "dt-bg";
	 				document.getElementById("wild-frame").className = "wild-frame";

					document.getElementById("dt-bg2").className = "dt-bg2";
	 				document.getElementById("wild-frame2").className = "wild-frame2";

	 				document.getElementById("dt-txt").className = "dt-txt";
	 				document.getElementById("wild-txt").className = "wild-txt";
	 				document.getElementById("dt-txt2").className = "dt-txt2";
	 				document.getElementById("wild-txt2").className = "wild-txt2";

	 				document.getElementById("wild-shine").className = "wild-shine";
	 				document.getElementById("wild-shine2").className = "wild-shine2";

	 				var winAmount = mNectarGame.currentBet*5;
					document.getElementById("win-txt").innerHTML = winAmount.toLocaleString();
					mNectarGame.credit += winAmount;
					updateNum();
	 			};
 			}, 1000);
		 }

	 }, 2800);

	setTimeout(function(){
		document.getElementById("p1").innerHTML = "Tap Spin To Play All Lines";
		document.getElementById("gem1").className = "hidden-ob";
		document.getElementById("gem2").className = "hidden-ob";
		document.getElementById("green-sp1").className = "hidden-ob";
		document.getElementById("green-sp2").className = "hidden-ob";
	 }, 4000);

}

var setVisibilityWithDelay = function (id, style, delay){
 	setTimeout(function(){
		document.getElementById(id).style.visibility = style; 
 	}, delay);
}


var slightOfHand = function(reelInfo){

	document.getElementById("reel1").className = "reel-top";
	document.getElementById("reel2").className = "reel-top";
	document.getElementById("reel3").className = "reel-top";
	document.getElementById("reel4").className = "reel-top";
	document.getElementById("reel5").className = "reel-top";
	replaceImages(reelInfo);

}

var clickSpin = function(){
	
	if(spinClickable===true){
		spin();
		spinClickable=false;
	}

}



