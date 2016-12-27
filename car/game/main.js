function makeGui(a){
	var button = new Button();
	button.name = "hi";
	a.objects.push(button);
	var button = new Button();
	button.name = "1";
	button.position_x = 300;
	a.objects.push(button);
	a.addMouseListener();
}
/*
ctx.font = "20px Arial";
ctx.fillStyle = "black";
ctx.fillText("error", 20, 20);
*/
var canvas = document.getElementById("window");
var ctx = canvas.getContext("2d");
var gui = new GUI();
makeGui(gui);

var kl = new KeyboardListener1();
kl.createListener();

var world = new World();

var car = new Car();
car.x = 100;
car.y = 200;
car.resetBody();


//start loop
var eclipsed = 0;
var time = new Date;
setInterval(run, 1000/30);
function run(){
	//clear canvas
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,1280,720);
	
	//get gui action
	if(gui.getAction() == "hi"){
		gui.objects.splice(0, 1);
	}
	//draw gui
	gui.draw();
	
	car.move(eclipsed);
	car.draw();
	
	world.draw();
	world.step(eclipsed / 1000);
	
	eclipsed = new Date - time;
	if (eclipsed == 0) eclipsed = 1;
	time = new Date;
	ctx.font = "10px Arial";
	ctx.fillStyle = "black";
	ctx.fillText(eclipsed, 20, 20);
	
}