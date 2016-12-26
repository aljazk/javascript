function Button() {
	this.position_x = 20;
	this.position_y = 20;
	this.width = 80;
	this.height = 40;
	this.border = 1;
	this.text = "button"; //actual text displayed
	this.name = ""; //name of a button, action name
	this.font = "20px Arial";
	
	//color
	this.color = "rgb(200, 200, 200)";
	this.hover_color = "rgb(200, 200, 200)";
	this.pressed_color = "rgb(200, 200, 200)";
	
	//border color
	this.border_color = "rgb(150, 150, 150)";
	this.hover_border_color = "rgb(100, 100, 100)";
	this.pressed_border_color = "rgb(80, 180, 250)";
	
	//text color
	this.text_color = "rgb(100, 100, 100)";
	this.hover_text_color = "rgb(50, 50, 50)";
	this.pressed_text_color = "rgb(50, 50, 50)";
	
	//state of a button (hover, pressed, none)
	this.state = "none";
}

//resizes button so that text is on the middle with desired padding on all sides
Button.prototype.resizeForText = function (padding = 5){
	ctx.font = this.font;
	this.width = ctx.measureText(this.text).width + padding * 2;
	this.height = parseInt(this.font) + padding * 2;
}

Button.prototype.draw = function (){
	//set style colors
	var bcolor = "black";
	var color = "black";
	var tcolor = "black";
	if(this.state == "none"){
		bcolor = this.border_color;
		color = this.color;
		tcolor = this.text_color;
	} else if (this.state == "hover"){
		bcolor = this.hover_border_color;
		color = this.hover_color;
		tcolor = this.hover_text_color;
	} else if (this.state == "pressed"){
		bcolor = this.pressed_border_color;
		color = this.pressed_color;
		tcolor = this.pressed_text_color;
	}
	//draw border
	ctx.fillStyle = bcolor;
	ctx.fillRect(this.position_x, this.position_y, this.width, this.height);
	ctx.fillStyle = color;
	//draw fill
	var w = this.width - this.border * 2;
	var h = this.height - this.border * 2;
	ctx.fillRect(this.border + this.position_x, this.border + this.position_y, w, h);
	//draw text
	ctx.font = this.font;
	ctx.fillStyle = tcolor;
	var px = (this.width - ctx.measureText(this.text).width)/2;
	var py = (this.height - parseInt(this.font)) / 2 + parseInt(this.font) - parseInt(this.font) * 0.1;
	ctx.fillText(this.text, this.position_x + px, this.position_y + py);
}

Button.prototype.checkHover = function (event){
	//sets mouse position to 0, 0 at top left of the canvas
	mouse_x = event.clientX - canvas.offsetLeft;
	mouse_y = event.clientY - canvas.offsetTop;
	//check for hover
	if (mouse_x >= this.position_x && mouse_x <= this.position_x + this.width
		&& mouse_y >= this.position_y && mouse_y <= this.position_y + this.height){
		if (this.state == "none"){
			this.state = "hover";
		}
	} else {
		if (this.state == "hover"){
			this.state = "none";
		}
	}
}

Button.prototype.checkMouseDown = function (event){
	//sets mouse position to 0, 0 at top left of the canvas
	mouse_x = event.clientX - canvas.offsetLeft;
	mouse_y = event.clientY - canvas.offsetTop;
	//if mouse down while on button, draw presseded button
	if (mouse_x >= this.position_x && mouse_x <= this.position_x + this.width
		&& mouse_y >= this.position_y && mouse_y <= this.position_y + this.height){
		this.state = "pressed";
	}
}

Button.prototype.checkMouseUp = function (event){
	//sets mouse position to 0, 0 at top left of the canvas
	mouse_x = event.clientX - canvas.offsetLeft;
	mouse_y = event.clientY - canvas.offsetTop;
	//when mouse up restart the button
	this.state = "none";
	//if mouse up while on button, button was pressed
	if (mouse_x >= this.position_x && mouse_x <= this.position_x + this.width
		&& mouse_y >= this.position_y && mouse_y <= this.position_y + this.height){
		return this.name;
	}
	return "none";
}

Button.prototype.remove = function (){
	remove.this;
}