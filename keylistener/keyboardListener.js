function KeyboardListener1(){
	this.key = [];
	this.key_state = [];
}

KeyboardListener1.prototype.createListener = function(){
	var a = this;
	document.addEventListener("keydown", function (event) {a.keyDown(event)}, true);
	document.addEventListener("keyup", function (event) {a.keyUp(event)}, true);
}

KeyboardListener1.prototype.keyDown = function(event){
	for(i = 0; i < this.key.length; i++){
		if (this.key[i] == event.code){
			this.key_state[i] = true;
			return;
		}
	}
	this.key.push(event.code);
	this.key_state.push(true);
}

KeyboardListener1.prototype.keyUp = function(event){
	for(i = 0; i < this.key.length; i++){
		if (this.key[i] == event.code){
			this.key_state[i] = false;
		}
	}
}

KeyboardListener1.prototype.get = function (key_name){
	for(i = 0; i < this.key.length; i++){
		if (this.key[i] == key_name){
			return this.key_state[i];
		}
	}
	return false;
}