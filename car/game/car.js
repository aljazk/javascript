function Car(){
	this.x = 0;
	this.y = 0;
	this.r = 0;
	this.speed = 0;
	this.fx = 0.0;
	this.fy = 0;
	this.width = 50;
	this.height = 75;
	this.color = "red";
	this.power = 0.2;
	this.rotation = 0.05;
	this.friction = 0.01;	
	
	var circleSd = new b2CircleDef();
	circleSd.density = 1.0;
	circleSd.radius = 20;
	circleSd.restitution = 1.0;
	circleSd.friction = 0.5;
	circleSd.linearDamping = 0.3;
	var circleBd = new b2BodyDef();
	circleBd.AddShape(circleSd);
	circleBd.position.Set(this.x, this.y);
	this.body = world.world.CreateBody(circleBd);
}

Car.prototype.resetBody = function (){
	this.body.m_position.x = this.x;
	this.body.m_position.y = this.y;
	this.body.m_rotation = this.r;
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
		this.speed += this.power * eclipsed;
	}
	if (kl.get("KeyS")){
		this.speed -= this.power * eclipsed;
	}
	var rotator_speed = 0.01 * eclipsed;
	if (this.speed/3 < 1){
		rotator_speed = this.speed/3;
	}
	if (kl.get("KeyA")){
		this.r -= this.rotation * rotator_speed;
		this.body.m_rotation -= this.rotation * rotator_speed;
	}
	if (kl.get("KeyD")){
		this.r += this.rotation * rotator_speed;
		this.body.m_rotation += this.rotation * rotator_speed;
	}
	this.speed *= this.friction * eclipsed;
	if (this.speed < 0.01 && this.speed > -0.01) this.speed = 0;
	this.x += Math.sin(this.r) * this.speed;
	this.y += Math.cos(this.r) * -this.speed;
	var f = new b2Vec2(Math.sin(this.y) * this.speed * 1000, Math.cos(this.r) * -this.speed * 1000);
	//var f = new b2Vec2(200, 20);
	ctx.font = "10px Arial";
	ctx.fillStyle = "black";
	ctx.fillText(f.x + " " + f.y, 20, 40);
	this.body.ApplyImpulse(f, this.body.m_position);
	this.x += this.fx;
	this.y += this.fy;
}