var camera, scene, renderer;
var sceneGeo;

var pallete = [0xede1c0, 0xfacf4d, 0xe8a048, 0x382d2c, 0x232f4f, 0xab97b0];


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


var handleKey = {
	hold: {},

	down: function(event) {
		hold[event.keyCode] = true;
	},

	up: function(event) {
		hold[event.keyCode] = false;
	},

	update: function() {
		if(hold["w"] === true)
		{
			// move forward
		}
		if(hold["s"] === true)
		{
			// move backward
		}
		if(hold["a"] === true)
		{
			// move left
		}
		if(hold["d"] === true)
		{
			// move right
		}
	}
};

var updatePlayer = {
	
}


var init = function () {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 20;
	scene.add( camera );

	sceneGeo = sceneGeometry();

	var lights = sceneLights();

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight );

	document.body.appendChild(renderer.domElement);
	document.onkeydown = handleKey.down;
	document.onkeyup = handleKey.up;
}

var update = function() {
	requestAnimationFrame(update);
	sceneGeo.rotateY(-0.01);
	handleKey.update();
	render();
}

var render = function() {
	
	renderer.render(scene, camera);
}

init();
update();