function Car(){
	this.speed = 0;
	this.width = 50;
	this.height = 75;
	this.color = "red";
	this.power = 0.2;
	this.rotation = 0.05;
	this.friction = 0.01;	
	
	var circleSd = new b2CircleDef();
	circleSd.density = 1.0;
	circleSd.radius = 20;
	var circleBd = new b2BodyDef();
	circleBd.linearDamping = this.friction;
	circleBd.AddShape(circleSd);
	circleBd.position.Set(100, 200);
	this.body = world.world.CreateBody(circleBd);
}

Car.prototype.draw = function (){
	ctx.save();
	ctx.translate(this.body.m_position.x, this.body.m_position.y);
	ctx.rotate(this.body.m_rotation);
	ctx.fillStyle = this.color;
	ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
	ctx.restore();
}

Car.prototype.move = function (){
	var acceleration = 0;
	if (kl.get("KeyW")){
		acceleration = this.power * eclipsed;
	}
	if (kl.get("KeyS")){
		acceleration = -this.power * eclipsed;
	}
	//var rotator_speed = Math.sqrt(Math.pow(this.body.GetLinearVelocity().x, 2) + Math.pow(this.body.GetLinearVelocity().y, 2)) / 300;
	var rotator_speed = 50;
	this.body.m_angularVelocity = 0;
	if (kl.get("KeyA")){
		this.body.m_angularVelocity -= this.rotation * rotator_speed;
	}
	if (kl.get("KeyD")){
		this.body.m_angularVelocity += this.rotation * rotator_speed;
	}
	var f = new b2Vec2(Math.sin(this.body.m_rotation) * acceleration * 1000, Math.cos(this.body.m_rotation) * -acceleration * 1000);
	//var f = new b2Vec2(-200, -20);
	ctx.font = "10px Arial";
	ctx.fillStyle = "black";
	ctx.fillText(f.x + " " + f.y + " " + this.body.GetLinearVelocity().x, 20, 40);
	this.body.ApplyImpulse(f, this.body.m_position);
}