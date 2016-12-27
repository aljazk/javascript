function GUI(){
	this.objects = [];
	this.action = "";
}

GUI.prototype.draw = function (){
	for (i=0; i<this.objects.length; i++){
		try {
			this.objects[i].draw();
		} catch(err){}
	}
}

GUI.prototype.addMouseListener = function (){
	var a = this;
	canvas.addEventListener("mousemove", function (event) {for (i=0; i<a.objects.length; i++) a.objects[i].checkHover(event)}, true);
	canvas.addEventListener("mousedown", function (event) {for (i=0; i<a.objects.length; i++) a.objects[i].checkMouseDown(event)}, true);
	canvas.addEventListener("mouseup", function (event) {
		for (i=0; i<a.objects.length; i++){
			var act = a.objects[i].checkMouseUp(event);
			if (act != "none"){
				a.action = act;
			}
		}
	}, true);
}

GUI.prototype.getAction = function (){
	var raction = this.action;
	this.action = "";
	return raction;
}