function Car(){
	this.x = 0;
	this.y = 0;
	this.r = 0;
	this.speed = 0;
	this.fx = 0.0;
	this.fy = 0;
	this.width = 100;
	this.height = 150;
	this.color = "red";
	this.power = 0.2;
	this.rotation = this.height/10000;
	this.friction = 0.98;
}

Car.prototype.draw = function (){
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.rotate(this.r);
	ctx.fillStyle = this.color;
	ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
	ctx.restore();
}

Car.prototype.move = function (){
	if (kl.get("KeyW")){
		this.speed += this.power;
	}
	if (kl.get("KeyS")){
		this.speed -= this.power;
	}
	var rotator_speed = 1;
	if (this.speed/3 < 1){
		rotator_speed = this.speed/3;
	}
	if (kl.get("KeyA")){
		this.r -= this.rotation * rotator_speed;
	}
	if (kl.get("KeyD")){
		this.r += this.rotation * rotator_speed;
	}
	this.speed *= this.friction;
	if (this.speed < 0.01 && this.speed > -0.01) this.speed = 0;
	this.fx *= 0.95;
	this.fy *= 0.95;
	this.x += Math.sin(this.r) * this.speed;
	this.y += Math.cos(this.r) * -this.speed;
	ctx.font = "20px Arial";
	ctx.fillStyle = "black";
	ctx.fillText(this.speed + " " + this.r, 20, 20);
	this.x += this.fx;
	this.y += this.fy;
}