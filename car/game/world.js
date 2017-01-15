function World(){
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(0, 0);
	worldAABB.maxVertex.Set(1280, 720);
	var gravity = new b2Vec2(0, 0);
	var doSleep = true;
	this.world = new b2World(worldAABB, gravity, doSleep);
	
	var circleSd = new b2CircleDef();
	circleSd.density = 1.0;
	circleSd.radius = 20;
	circleSd.restitution = 1.0;
	circleSd.friction = 0.5;
	var circleBd = new b2BodyDef();
	circleBd.AddShape(circleSd);
	circleBd.position.Set(50, 50);
	this.world.CreateBody(circleBd);
}

function drawShape(shape){
	ctx.strokeStyle = 'green';
	ctx.beginPath();
	switch (shape.m_type) {
		case b2Shape.e_circleShape:
			var circle = shape;
			var pos = circle.m_position;
			var r = circle.m_radius;
			var segments = 16.0;
			var theta = 0.0;
			var dtheta = 2.0 * Math.PI / segments;
			// draw circle
			ctx.moveTo(pos.x + r, pos.y);
			for (var i = 0; i < segments; i++) {
				var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
				var v = b2Math.AddVV(pos, d);
				ctx.lineTo(v.x, v.y);
				theta += dtheta;
			}
			ctx.lineTo(pos.x + r, pos.y);

			// draw radius
			ctx.moveTo(pos.x, pos.y);
			var ax = circle.m_R.col1;
			var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
			ctx.lineTo(pos2.x, pos2.y);
			break;
		case b2Shape.e_polyShape:
			var poly = shape;
			var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
			ctx.moveTo(tV.x, tV.y);
			for (var i = 0; i < poly.m_vertexCount; i++) {
				var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
				ctx.lineTo(v.x, v.y);
			}
			ctx.lineTo(tV.x, tV.y);
			break;
	}
	ctx.stroke();
}

World.prototype.step = function (time = 1){
	//time is the time that passed from last step (in seconds)
	this.world.Step(time, 1);
}

World.prototype.draw = function (){
	var num = 0;
	for (var b = this.world.m_bodyList; b; b = b.m_next) {
		for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
			drawShape(s);
			num ++;
		}
	}
	ctx.font = "10px Arial";
	ctx.fillStyle = "black";
	ctx.fillText("Bodies: " + num, 20, 30);
}