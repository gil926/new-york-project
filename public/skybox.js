import * as THREE from 'three';
import { Camera, Loader, Mesh, Path } from 'three';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js'




let scene , camera , renderer;
let xCamP = -750;
let yCamP = 190;
let zCamP = 0;
let xCamL = 540;
let yCamL = 135;
let zCamL = 0;
let spaceCounter = 0;
let isInside = true;
let loader = new GLTFLoader();



function init()
{
	// initializing scene, camera, renderer and light - start //
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(55 , window.innerWidth/window.innerHeight , 45 , 30000);
	camera.position.set(xCamP , yCamP , zCamP);
	camera.lookAt(xCamL , yCamL , zCamL);

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth , window.innerHeight);
	document.body.appendChild(renderer.domElement);

	const controls = new OrbitControls(camera, renderer.domElement)
	controls.addEventListener('change' , renderer);

	// const light = new THREE.AmbientLight(0xffffff);
	// light.position.set(-100 , 100 , 200);
	// scene.add(light);

	// initializing scene, camera, renderer and light - end //


	createRoom(1); /* the back door is 450 x 1240 */ /* the front board is 1288 x 1588 */
	createObjects(1);
	camera.lookAt(540 , 135 , 0);
	animate();
	press();
}
function animate()
{
	requestAnimationFrame(animate);
	renderer.render(scene , camera);
}
function setBorders()
{
	if(isInside == false)
	{
		document.getElementById('teleporterIn').style.display = 'none';
		if(xCamP == -570)
		{
			xCamP = -570;
			document.getElementById('teleporter').style.display = 'block';
			document.onkeydown = function(event)
			{
				const key2 = event.key;
				if(key2 == 'Escape')
				{
					document.getElementById('teleporter').style.display = 'none';
					press();
				}
				else if(key2 == 'Enter')
				{
					yCamP = 190;
					yCamL = 170;
					camera.position.set(xCamP , yCamP , zCamP)
					document.getElementById('teleporter').style.display = 'none';
					document.getElementById('teleporterIn').style.display = 'block';
					isInside = true;
					press();
				}
			}
		}
		if(xCamP >= 200)
		{
			xCamP = 200;
			chooseOptions();
		}
	}
	else if(isInside == true)
	{
		if(xCamP <= -750)
		{
			xCamP = -750;
			xCamL = 520;
			yCamL = 180;
			if(spaceCounter % 2 != 0)
				spaceCounter++;
			camera.lookAt(xCamL , yCamL , zCamL);
			getOut();
		}
		if(xCamP == -570)
		{
			isInside = false;
			yCamP = 155;
			camera.position.set(xCamP , yCamP , zCamP);
			document.getElementById('teleporterOut').style.display = 'block';
			document.onkeydown = function(event)
			{
				const key3 = event.key;
				if(key3 == 'Escape')
				{
					document.getElementById('teleporterOut').style.display = 'none';
					xCamP = -565;
					press();
				}
			}
		}
	}
}
function createRoom(classNum)
{
	let texturesClass1 = ['frontC1.png' , 'backC1.png' , 'topC1.png' , 'bottomC1.png' , 'leftC1.png' , 'rightC1.png'];
	let texturesClass2 = ['frontC2.png' , 'backC2.png' , 'topC2.png' , 'bottomC2.png' , 'leftC2.png' , 'rightC2.png'];
	let texturesClass3 = [];
	let textureUsing = [];
	for(let i = 0 ; i < texturesClass1.length ; i++)
	{
		if(classNum == 1)
			textureUsing[i] = texturesClass1[i];
		else if(classNum == 2)
			textureUsing[i] = texturesClass2[i];
		else if(classNum == 3)
			textureUsing[i] = texturesClass3[i];
	}

	scene.background = new THREE.CubeTextureLoader()
	.setPath( 'textures/' )
	.load( [
		textureUsing[0],
		textureUsing[1],
		textureUsing[2],
		textureUsing[3],
		textureUsing[4],
		textureUsing[5]
	] );
		// floor plane - start //
	
		const floorPlaneGeometry = new THREE.PlaneGeometry(1080 , 810 , 1 , 1);
		let adressdown = './textures/floor_spaceship.jpg';
		const floorPlaneTexture = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load(adressdown) , side: THREE.DoubleSide } )
		const floorPlane = new THREE.Mesh(floorPlaneGeometry , floorPlaneTexture);
		floorPlane.position.set(0 , 0 , 0);
		floorPlane.rotation.x = Math.PI / 2;
		scene.add(floorPlane);
		const board = new THREE.Object3D()
		
		// floor plane - end //
		// floor plane - start //
	
		const boardPlaneGeometry = new THREE.PlaneGeometry(810 , 270 , 1 , 1);
		let adressboard = './textures/board.png';
		const boardPlaneTexture = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load(adressboard) , side: THREE.DoubleSide } )
		boardPlaneTexture.transparent = true;
		const boardPlane = new THREE.Mesh(boardPlaneGeometry , boardPlaneTexture);
		boardPlane.position.set(540 , 130 , 0);
		boardPlane.rotation.y = Math.PI / 2;
		scene.add(boardPlane); 
		
		// floor plane - end //
}
function createObjects(classNum)
{
	let class1 = ['beanbag.glb' , 'laptop.glb' , 'teleporter.glb'];
	let class2 = ['beanbagC2.glb' , 'laptop.glb' , 'teleporter.glb'];
	let class3 = ['beanbag.glb' , 'laptop.glb' , 'teleporter.glb'];
	let usingObj = [];
	for(let i = 0 ; i < class1.length ; i++)
	{
		if(classNum == 1)
			usingObj[i] = class1[i];
		if(classNum == 2)
			usingObj[i] = class2[i];
		if(classNum == 3)
			usingObj[i] = class3[i];
	}


	for(let i = -410 ; i < 200 ; i+=160)
	{
		loader = new GLTFLoader();
		loader.load('objects/' + usingObj[1],
			function (laptop) {
				laptop.scene.position.set(i , 60 , -190);
				scene.add(laptop.scene);
				laptop.animations;
				laptop.scene;
				laptop.scenes;
				laptop.cameras;
				laptop.asset;
			},
			function ( xhr ) {
				console.log(( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			},
			function (error) {
				console.log('An error happened');
			}
		);
	}

	for(let i = -400 ; i < 200 ; i+=160)
	{
		loader = new GLTFLoader();
		loader.load('objects/' + usingObj[0],
			function (beanbag) {
				beanbag.scene.position.set(i , 0 , -250);
				scene.add(beanbag.scene);
				beanbag.animations;
				beanbag.scene;
				beanbag.scenes;
				beanbag.cameras;
				beanbag.asset;
			},
			function ( xhr ) {
				console.log(( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			},
			function (error) {
				console.log('An error happened');
			}
		);
	}

	for(let i = -410 ; i < 200 ; i+=160)
	{
		loader = new GLTFLoader();
		loader.load('objects/' + usingObj[1],
			function (laptop) {
				laptop.scene.position.set(i , 60 , 200);
				scene.add(laptop.scene);
				laptop.animations;
				laptop.scene;
				laptop.scenes;
				laptop.cameras;
				laptop.asset;
			},
			function ( xhr ) {
				console.log(( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			},
			function (error) {
				console.log('An error happened');
			}
		);
	}

	for(let i = -400 ; i < 200 ; i+=160)
	{
		loader = new GLTFLoader();
		loader.load('objects/' + usingObj[0],
			function (beanbag) {
				beanbag.scene.position.set(i , 0 , 135);
				scene.add(beanbag.scene);
				beanbag.animations;
				beanbag.scene;
				beanbag.scenes;
				beanbag.cameras;
				beanbag.asset;
			},
			function ( xhr ) {
				console.log(( xhr.loaded / xhr.total * 100 ) + '% loaded' );
			},
			function (error) {
				console.log('An error happened');
			}
		);
	}
	loader = new GLTFLoader();
	loader.load('objects/' + usingObj[2],
		function (teleporter) {
			teleporter.scene.position.set(-740 , 0 , 13);
			teleporter.scene.rotation.y = Math.PI / 2;
			scene.add(teleporter.scene);
			teleporter.animations;
			teleporter.scene;
			teleporter.scenes;
			teleporter.cameras;
			teleporter.asset;
		},
		function ( xhr ) {
			console.log(( xhr.loaded / xhr.total * 100 ) + '% loaded' );
		},
		function (error) {
			console.log('An error happened');
		}
	);
	const spotlight3 = new THREE.SpotLight(0xffffff);
	spotlight3.position.set(-840,400,13);
	spotlight3.shadowCameraVisible = true;
	spotlight3.shadowDarkness = 0.95;
	spotlight3.intensity = 0.5;
	spotlight3.castShadow = true;
	scene.add(spotlight3);
	// const spotlight = new THREE.SpotLight(0x00ff00);
	// spotlight.position.set(-550,10,13);
	// spotlight.intensity = 0.5;
	// scene.add(spotlight);

}
function getOut()
{
	const popUp = document.getElementById('getOut').style.display = 'block';
	document.onkeydown = function(event)
	{
		const key = event.key;
		if(key == '1')
		{
			scene.clear();
			document.getElementById('getOut').style.display = 'none';
			createRoom(1);
			createObjects(1);
			camera.lookAt(540 , 135 , 0);
			animate();
			press();
		}
		else if(key == '2')
		{
			scene.clear();
			document.getElementById('getOut').style.display = 'none';
			createRoom(2);
			createObjects(2);
			camera.lookAt(540 , 135 , 0);
			animate();
			press();
		}
		else if(key == '3')
		{
			scene.clear();
			document.getElementById('getOut').style.display = 'none';
			createRoom(3);
			createObjects(3);
			camera.lookAt(540 , 135 , 0);
			animate();
			press();
		}
	}
}
function escape()
{
	document.onkeydown = function(event)
	{
		const key = event.key;
		if(key == ' ')
		{
			document.getElementById('firstYear').style.display = 'none';
			document.getElementById('secondYear').style.display = 'none';
			document.getElementById('popUpIns').style.display = 'none';
			zCamP = 0;
			camera.position.set(xCamP , yCamP , zCamP);
			chooseOptions();
		}
	}
}
function chooseOptions()
{
	const class1popUp1 = document.getElementById('class1popUp1');
	class1popUp1.style.display = 'block';
	document.onkeydown = function(event) {
		const key = event.key;
		if(key == 'a')
		{
			zCamP -= 250;
			class1popUp1.style.display = 'none';
			document.getElementById('firstYear').style.display = 'block';
			document.getElementById('popUpIns').style.display = 'block';
			escape();
		}
		else if(key == 'd')
		{
			zCamP += 250;
			class1popUp1.style.display = 'none';
			document.getElementById('secondYear').style.display = 'block';
			document.getElementById('popUpIns').style.display = 'block';
			escape();
		}
		else if(key == ' ')
		{
			class1popUp1.style.display = 'none';
			press();
		}
		camera.position.set(xCamP , yCamP , zCamP);
		console.log(camera.position);

	}
}
function press()
{
	document.onkeydown = function(event) {
		const key = event.key;
		if (key == 's')
		{
			if(spaceCounter % 2 == 0)
			{
				xCamP -= 5;
				xCamL -=5;
			}
			else
			{
				xCamP +=5;
				xCamL +=5;
			}
			setBorders();
		}
		else if (key == 'w')
		{
			if(spaceCounter % 2 == 0)
			{
				xCamP += 5;
				xCamL +=5;
			}
			else
			{
				xCamP -=5;
				xCamL -=5;
			}
			setBorders();
		}
		if (key == 'ArrowRight')
		{
			if(spaceCounter % 2 == 0)
				zCamL += 20;
			else
				zCamL -= 20;
		}
		else if (key == 'ArrowLeft')
		{
			if(spaceCounter % 2 == 0)
				zCamL -= 20;
			else
				zCamL += 20;
		}
		else if (key == 'ArrowDown')
		{
			yCamL -= 20;
		}
		else if (key == 'ArrowUp')
		{
			yCamL += 20;
		}
		else if(key == ' ')
		{
			spaceCounter++;
			xCamL *= -1;
			zCamL *= -1;
		}
		console.log('(' + xCamP + ',' + yCamP + ',' + zCamP + ')' + ' ' + isInside);
		camera.position.set(xCamP , yCamP , zCamP);
		camera.lookAt(xCamL , yCamL , zCamL);
	}
}
init();