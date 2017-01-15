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
	circleSd.restitution = 1.0;
	circleSd.friction = 0.5;
	var circleBd = new b2BodyDef();
	circleBd.linearDamping = this.friction;
	var position_x = 100, position_y = 200;
	circleBd.AddShape(circleSd);
	
	var r = 10;
	circleSd = new b2CircleDef();
	circleSd.radius = r;
	circleSd.localPosition = new b2Vec2(-this.width/2 + r, -this.height/2 + r);
	circleBd.AddShape(circleSd);
	
	circleSd = new b2CircleDef();
	circleSd.radius = r;
	circleSd.localPosition = new b2Vec2(this.width/2 - r, -this.height/2 + r);
	circleBd.AddShape(circleSd);
	
	circleSd = new b2CircleDef();
	circleSd.radius = r;
	circleSd.localPosition = new b2Vec2(this.width/2 - r, this.height/2 - r);
	circleBd.AddShape(circleSd);
	
	circleSd = new b2CircleDef();
	circleSd.radius = r;
	circleSd.localPosition = new b2Vec2(-this.width/2 + r, this.height/2 - r);
	circleBd.AddShape(circleSd);
	
	circleBd.position.Set(position_x, position_y);
	circleBd.allowSleep = false;
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

/* KILL SIDE VELOCITY
b2Vec2 getLateralVelocity() {
	b2Vec2 currentRightNormal = m_body->GetWorldVector( b2Vec2(1,0) );
	return b2Dot( currentRightNormal, m_body->GetLinearVelocity() ) * currentRightNormal;
}
void updateFriction() {
	b2Vec2 impulse = m_body->GetMass() * -getLateralVelocity();
	m_body->ApplyLinearImpulse( impulse, m_body->GetWorldCenter() );
}
*/

/* KILL ROTATION VELOCITY
m_body->ApplyAngularImpulse( 0.1f * m_body->GetInertia() * -m_body->GetAngularVelocity() );
*/

/* ADD DRAG
b2Vec2 currentForwardNormal = getForwardVelocity();
  float currentForwardSpeed = currentForwardNormal.Normalize();
  float dragForceMagnitude = -2 * currentForwardSpeed;
  m_body->ApplyForce( dragForceMagnitude * currentForwardNormal, m_body->GetWorldCenter() );
*/

Car.prototype.move = function (){
	var acceleration = 0;
	if (kl.get("KeyW")){
		acceleration = this.power * eclipsed;
	}
	if (kl.get("KeyS")){
		acceleration = -this.power * eclipsed;
	}
	//var rotator_speed = Math.sqrt(Math.pow(this.body.GetLinearVelocity().x, 2) + Math.pow(this.body.GetLinearVelocity().y, 2)) / 300;
	var rotator_speed = Math.sqrt(Math.pow(this.body.GetLinearVelocity().x, 2) + Math.pow(this.body.GetLinearVelocity().y, 2)) / 10;
	if (rotator_speed > 50) rotator_speed = 50;
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
	
	
	var currentRightNormal = this.body.GetWorldVector(new b2Vec2(1,0));
	var dotProduct = this.body.GetLinearVelocity().x * currentRightNormal.x + this.body.GetLinearVelocity().y * currentRightNormal.y;
	var leteralVelocity = new b2Vec2(dotProduct * currentRightNormal.x, dotProduct * currentRightNormal.y);
	
	var impulse = new b2Vec2(this.body.GetMass() * -leteralVelocity.x, this.body.GetMass() * -leteralVelocity.y);
	this.body.ApplyImpulse(impulse, this.body.m_position );
}