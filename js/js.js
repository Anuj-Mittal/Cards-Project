var allCardsArr = [];//initially 6 cards for testing
var bet=100;
var potValue=0;
var betDisplay=document.querySelector("#betDisplay");
var balanceDisplay=document.querySelector("#balanceDisplay");
var balance=2000;
balanceDisplay.textContent=balance;
var potValueDisplay=document.querySelector("#potValueDisplay");
var turn=0;//even - user's turn
var compTurnText=document.querySelector("#compTurnText");
for(var i=0;9>i;i++)
{
	var cardName="assets/cards/card_b_d"+(i+2)+"_large.png";//diamond
	allCardsArr[i]={
		name: cardName,
		value: i+2
	}
	cardName="assets/cards/card_b_s"+(i+2)+"_large.png"//spade
	allCardsArr[i+9]={
		name : cardName,
		value : i+2
	}
	cardName="assets/cards/card_b_c"+(i+2)+"_large.png"//clubs
	allCardsArr[i+18]={
		name : cardName,
		value : i+2
	}
	cardName="assets/cards/card_b_h"+(i+2)+"_large.png"//heart
	allCardsArr[i+27]={
		name : cardName,
		value : i+2
	}
}
for(var i=36;40>i;i++)
{
	var temp;
	switch (i%4) {
		case 0:
			temp="j";
			break;
		case 1:
			temp="q";
			break;
		case 2:
			temp="k";
			break;
		case 3:
			temp="a";
			break;
	}
	var cardName="assets/cards/card_b_d"+temp+"_large.png";//diamond JQKA
	var val=11+i-36;
	if(val==14)//ace case
	{
		val=1;
	}
	allCardsArr[i]={
		name : cardName,
		value : val
	}
	cardName="assets/cards/card_b_s"+temp+"_large.png";//spade
	allCardsArr[i+4]={
		name : cardName,
		value : val
	}
	cardName="assets/cards/card_b_c"+temp+"_large.png";//club
	allCardsArr[i+8]={
		name : cardName,
		value : val
	}
	cardName="assets/cards/card_b_h"+temp+"_large.png";//heart
	allCardsArr[i+12]={
		name : cardName,
		value : val
	}

}

var userValueSum=0;
var compValueSum=0;
$(".userCardsDisplay").on("click",function(){
	if($(this).hasClass("flipped")==false)
	{
		console.log("clicked");
		var i=Math.floor(Math.random()*52);
		userValueSum+=allCardsArr[i].value;
		var temp="url('"+allCardsArr[i].name+"')";
		console.log(temp);
		$(this).css("background-image",temp);
		$(this).toggleClass("flipped");
	}
	
});

var compCards = [];
function resetCompCards()
{
	for(var i=0;3>i;i++)
	{
		var j=Math.floor(Math.random()*52);
		compValueSum+=allCardsArr[j].value;
		compCards[i]=allCardsArr[j].name;
	}
}
resetCompCards();
var compCardsDisplay = document.querySelectorAll(".compCardsDisplay");
$("#showButton").on("click",function(){
	for(var i=0;3>i;i++)
	{
		var temp="url('"+compCards[i]+"')";
		console.log(temp);
		compCardsDisplay[i].style.backgroundImage = temp;
	}
	
});
function betButtonClicked()
{
	potValue+=bet;
	balance-=bet;
	balanceDisplay.textContent=balance;
	potValueDisplay.textContent=potValue;
	turn++;
	document.querySelector("#userTurnDisplay").classList.toggle("turnDisplay");
	document.querySelector("#compTurnDisplay").classList.toggle("turnDisplay");

	setTimeout(function()
	{
			//to do edit
		if(compValueSum>=25)
		{
			var prob=Math.random();
			if(prob<1/3)
			{
				bet+=100;
				betDisplay.textContent=bet;
				compTurnText.textContent="RAISE !!!";
			}
			else
			{
				compTurnText.textContent="BET !!!";
			}
		}
		else if(compValueSum>=15)
		{
			compTurnText.textContent="BET !!!";
		}
		else
		{
			var prob=Math.random();
			if(prob<1/4)
			{
				compTurnText.textContent="BET !!!";
			}
			else
			{
				compTurnText.textContent="I PACK !!";
				balance+=potValue;
				balanceDisplay.textContent=balance;
				setTimeout(function(){
				compTurnText.textContent="YOU WIN... " ;
				},1000);
				setTimeout(replay,2000);
			}
			
		}
		
		potValue+=bet;//bruteComp
		potValueDisplay.textContent=potValue;
		document.querySelector("#userTurnDisplay").classList.toggle("turnDisplay");
		document.querySelector("#compTurnDisplay").classList.toggle("turnDisplay");
		//to do edit
	}, 800);
	
	

}
function showButtonClicked()
{
	balance-=bet;
	potValue+=bet;
	potValueDisplay.textContent=potValue;
	if(userValueSum>compValueSum)
	{
		balance+=potValue;
		compTurnText.textContent="YOU WIN... " ;
	}
	else
		compTurnText.textContent="I WIN ! "
	potValue=0;
	potValueDisplay.textContent=0;
	bet=100;
	betDisplay.textContent=100;
	balanceDisplay.textContent=balance;
}
function replay()
{
	compTurnText.textContent="YOUR TURN !!"
	potValue=0;
	userValueSum=0;
	compValueSum=0;
	potValueDisplay.textContent=0;
	bet=100;
	betDisplay.textContent=100;
	balanceDisplay.textContent=balance;
	var temp=document.querySelectorAll(".userCardsDisplay");
	for(var i=0;temp.length>i;i++)
	{
		compCardsDisplay[i].style.backgroundImage = "url('assets/cards/deck_6_large.png')";
		temp[i].classList.remove("flipped");
		// temp[i].classList.toggle("flipped");
		temp[i].style.backgroundImage = "url('assets/cards/deck_6_large.png')";
	}
	resetCompCards();
}
$("#dealButton").on("click",replay);
$("#packButton").on("click",replay);
$("#showButton").on("click",showButtonClicked);
$("#betButton").on("click",betButtonClicked);
function raiseButtonClicked()
{
	bet+=100;
	betDisplay.textContent=bet;
}
$("#raiseButton").on("click",raiseButtonClicked);