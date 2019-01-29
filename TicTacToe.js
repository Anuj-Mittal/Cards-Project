var turn = 0; //0 - X turn !! 1 - O turn
var clicked = document.querySelectorAll("td");
var arr=[[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1]];//1 for X 0 for O
var winner=-1;//-1 draw 1-X 0-O
var gameFinished=false;
var XscoreDisplay=document.querySelector("#Xscore");
var OscoreDisplay=document.querySelector("#Oscore");
var xscore=0;
var oscore=0;
var interval;
var clear=document.querySelector("#clear");
var whoseTurn=0;//0meansX
function blinkX()
{
	if(gameFinished==true)
	{
		for(var i=0;clicked.length>i;i++)
		{
			if(clicked[i].firstElementChild.classList.contains("glyphicon")&&clicked[i].firstElementChild.classList.contains("glyphicon-adjust")==false)
				clicked[i].firstElementChild.classList.toggle("glyphicon-remove");
		}
	}
	 
}
function blinkO(){
	if(gameFinished==true)
	{
			for(var i=0;clicked.length>i;i++)
			{
			if(clicked[i].firstElementChild.classList.contains("glyphicon")&&clicked[i].firstElementChild.classList.contains("glyphicon-remove")==false)
				clicked[i].firstElementChild.classList.toggle("glyphicon-adjust");
			}
	}
	
}
clear.addEventListener("click",reset);
function reset()
{
	if(whoseTurn%2==0)
	{
		turn=0;
	}
	else
	{
		turn=1;
	}
			clearInterval(interval);
			for(var j=0;clicked.length>j;j++)
			{
				clicked[j].firstElementChild.classList.remove("glyphicon","glyphicon-remove");
				clicked[j].firstElementChild.classList.remove("glyphicon","glyphicon-adjust");
			}
			arr[0][1]=-1;
			arr[1][1]=-1;
			arr[2][1]=-1;
			arr[3][1]=-1;
			arr[4][1]=-1;
			arr[5][1]=-1;
			arr[6][1]=-1;
			arr[7][1]=-1;
			arr[8][1]=-1;
			gameFinished=false;
}
for(var i = 0;clicked.length>i;i++)
{
	clicked[i].addEventListener("click",function(){
		console.log(this.id);
		var temp=this.id;
		if(this.firstElementChild.classList.contains("glyphicon-remove")==false && this.firstElementChild.classList.contains("glyphicon-adjust")==false && gameFinished==false)
		{
			if(turn%2==0)
			{
				this.firstElementChild.classList.add("glyphicon","glyphicon-remove");
				if(this.id=="td00")
				{
					arr[0][1]=1;
				}
				if(this.id=="td01")
				{
					arr[1][1]=1;
				}
				if(this.id=="td02")
				{
					arr[2][1]=1;
				}
				if(this.id=="td10")
				{
					arr[3][1]=1;
				}
				if(this.id=="td11")
				{
					arr[4][1]=1;
				}
				if(this.id=="td12")
				{
					arr[5][1]=1;
				}
				if(this.id=="td20")
				{
					arr[6][1]=1;
				}
				if(this.id=="td21")
				{
					arr[7][1]=1;
				}
				if(this.id=="td22")
				{
					arr[8][1]=1;
				}
				turn++;
			}
			else
			{
				this.firstElementChild.classList.add("glyphicon","glyphicon-adjust");
				if(this.id=="td00")
				{
					arr[0][1]=0;
				}
				if(this.id=="td01")
				{
					arr[1][1]=0;
				}
				if(this.id=="td02")
				{
					arr[2][1]=0;
				}
				if(this.id=="td10")
				{
					arr[3][1]=0;
				}
				if(this.id=="td11")
				{
					arr[4][1]=0;
				}
				if(this.id=="td12")
				{
					arr[5][1]=0;
				}
				if(this.id=="td20")
				{
					arr[6][1]=0;
				}
				if(this.id=="td21")
				{
					arr[7][1]=0;
				}
				if(this.id=="td22")
				{
					arr[8][1]=0;
				}
				turn++;
			}
			if(turn>=5)
			{
				if((arr[0][1]==1&&arr[1][1]==1&&arr[2][1]==1)
					||(arr[3][1]==1&&arr[4][1]==1&&arr[5][1]==1)
					||(arr[6][1]==1&&arr[7][1]==1&&arr[8][1]==1)
					||(arr[0][1]==1&&arr[3][1]==1&&arr[6][1]==1)
					||(arr[1][1]==1&&arr[4][1]==1&&arr[7][1]==1)
					||(arr[2][1]==1&&arr[5][1]==1&&arr[8][1]==1)
					||(arr[0][1]==1&&arr[4][1]==1&&arr[8][1]==1)
					||(arr[2][1]==1&&arr[4][1]==1&&arr[6][1]==1))
				{
					console.log("X wins !!!");
					interval = setInterval(blinkX,200);
					xscore++;
					XscoreDisplay.textContent=xscore;
					gameFinished=true;
					whoseTurn++;
				}
				else if((arr[0][1]==0&&arr[1][1]==0&&arr[2][1]==0)
					||(arr[3][1]==0&&arr[4][1]==0&&arr[5][1]==0)
					||(arr[6][1]==0&&arr[7][1]==0&&arr[8][1]==0)
					||(arr[0][1]==0&&arr[3][1]==0&&arr[6][1]==0)
					||(arr[1][1]==0&&arr[4][1]==0&&arr[7][1]==0)
					||(arr[2][1]==0&&arr[5][1]==0&&arr[8][1]==0)
					||(arr[0][1]==0&&arr[4][1]==0&&arr[8][1]==0)
					||(arr[2][1]==0&&arr[4][1]==0&&arr[6][1]==0))
				{
					console.log("O wins !!!");
					interval = setInterval(blinkO,200);
					oscore++;
					OscoreDisplay.textContent=oscore;
					gameFinished=true;
					whoseTurn++;
				}
				if(whoseTurn%2==1&&turn==10&&gameFinished==false)
				{
					gameFinished=true;
					whoseTurn++;
				}
				else if(whoseTurn%2==0&&turn==9&&gameFinished==false)
				{
					gameFinished=true;
					whoseTurn++;
				}
			}
		}
	});

}
