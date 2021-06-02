import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const Three = () => {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );

  const renderer = new THREE.WebGLRenderer();

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  // directionalLight.position.set(200, 500, 300);
  // scene.add(directionalLight); 

  scene.background = new THREE.Color( 0x01374c );
  scene.fog = new THREE.Fog( scene.background, 10, 20 );

  const cubeGeo = new THREE.BoxGeometry();
  const sphereGeo = new THREE.SphereGeometry();
  const material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
  const cube = new THREE.Mesh( cubeGeo, material );
  const sphere = new THREE.Mesh( sphereGeo, material );
  scene.add( sphere );

  camera.position.z = 5;
  // camera.position.set( 0, -6, 3 );

  const controls = new OrbitControls( camera, renderer.domElement );

  const stars = {
    color: 0x333333,
    size: 0.4,
    pointCount: 40,
    rangeV: 2,
    rangeH: 1,
    speed: 0.0005
  };

  // THREE.Group.call( stars );

  const lightHelper = new THREE.PointLightHelper(ambientLight)
  scene.add(lightHelper);

  const animate = () => {
    requestAnimationFrame( animate );

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    controls.update();

    renderer.render( scene, camera );
  };

  
  animate();

  return (
    <div>
      <h1>Three.js</h1>
    </div>
  )
}

export default Three
