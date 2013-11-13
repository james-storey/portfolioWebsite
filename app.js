var camera, scene, renderer;
var sceneGeo;
var player;
var pallete = [0xede1c0, 0xfacf4d, 0xe8a048, 0x382d2c, 0x232f4f, 0xab97b0];

var playerInit = function ( my ) {
	var that, handleKey, velocity;
	my = my || {};
	// private

	handleKey = {
		hold: {},

		down: function(event) {
			handleKey.hold[event.keyCode] = true;
		},

		up: function(event) {
			handleKey.hold[event.keyCode] = false;
		},

		update: function() {

			if(handleKey.hold["W".charCodeAt(0)] === true)
			{
				// move forward
				camera.translateZ(-0.1);
			}
			if(handleKey.hold["S".charCodeAt(0)] === true)
			{
				// move backward
				camera.translateZ(0.1);
			}
			if(handleKey.hold["A".charCodeAt(0)] === true)
			{
				camera.translateX(-0.1);
			}
			if(handleKey.hold["D".charCodeAt(0)] === true)
			{
				camera.translateX(0.1);
			}
		}
	};

	document.onkeydown = handleKey.down;
	document.onkeyup = handleKey.up;
	velocity = 0;

	that = {};
	// public

	that.update = function (){
		var rc = new THREE.Raycaster(camera.position, -camera.up, 0, 4);
		handleKey.update();
		if(rc.intersectObject(sceneGeo, true)){
			velocity = 0;
		}
		else{
			if(velocity < 10){
				velocity += 0.1; 
			}
		}

		camera.translateY(velocity);
	}

	return that;
}

var sceneGeometry = function() {
	var cube = new THREE.Object3D();
	var mesh = new THREE.Mesh( new THREE.CubeGeometry(20,0.3,30),
			   				   new THREE.MeshLambertMaterial( { color: pallete[0] } ) );
	cube.add( mesh );
	cube.translateY(-2.5);
	scene.add( cube );

	var gate = new THREE.Object3D();
	var gatemesh = new THREE.Mesh( new THREE.CubeGeometry(4,10,1),
			   				       new THREE.MeshLambertMaterial( { color: pallete[3] } ));
	gate.add( gatemesh );
	gate.translateZ(-10);
	gate.translateY(5);
	cube.add(gate);
	return cube;
};

var sceneLights = function() {
	var hL = new THREE.HemisphereLight( 0xffffff, 0xf4e4c4, 0.5 );
	var dL = new THREE.DirectionalLight(0xffffff, 0.5);
	dL.position.set(0,1,1);
	scene.add(hL);
	scene.add(dL);
};




var init = function () {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.translateZ(20);
	scene.add( camera );

	sceneGeo = sceneGeometry();

	var lights = sceneLights();

	renderer = Detector.webgl? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight );

	document.body.appendChild(renderer.domElement);
	document.body.requestPointerLock = 	document.body.requestPointerLock ||
										document.body.mozRequestPointerLock ||
										document.body.webkitRequestPointerLock;
	document.body.requestPointerLock();
	player = playerInit();
}

var update = function() {
	requestAnimationFrame(update);
	player.update();
	render();
}

var render = function() {
	
	renderer.render(scene, camera);
}

init();
update();