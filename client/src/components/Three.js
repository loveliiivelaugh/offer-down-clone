import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const Three = () => {

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );

  // const renderer = new THREE.WebGLRenderer({ antialias: true });
  const renderer = new THREE.WebGLRenderer();

  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);

  const ambientLight = new THREE.AmbientLight(0xffffff, 6);
  scene.add(pointLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(200, 500, 300);
  scene.add(ambientLight, directionalLight); 

  // Helpers

  const lightHelper = new THREE.PointLightHelper(pointLight);
  const gridHelper = new THREE.GridHelper(200, 50);
  // scene.add(lightHelper, gridHelper);

  function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
  
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));
  
    star.position.set(x, y, z);
    scene.add(star);
  }
  
  Array(200).fill().forEach(addStar);
  
  // Background
  
  const spaceTexture = new THREE.TextureLoader().load('space.jpg');
  scene.background = spaceTexture;

  const scene2 = scene;
  

  // scene.background = new THREE.Color( 0x01374c );
  // scene.fog = new THREE.Fog( scene.background, 10, 20 );

  const earthTexture = new THREE.TextureLoader().load('earthUv.jpg');

  const cubeGeo = new THREE.BoxGeometry();
  const sphereGeo = new THREE.SphereGeometry(5, 50, 50);
  const material = new THREE.MeshBasicMaterial({ 
    // map: earthTexture,
    color: 0x00ffff 
  });
  const cube = new THREE.Mesh( cubeGeo, material );
  const sphere = new THREE.Mesh( sphereGeo, material );
  scene.add( sphere );


  camera.position.z = 15;
  // camera.position.set( 0, -6, 3 );

  // const controls = new OrbitControls( camera, renderer.domElement );

  // Scroll Animation

  function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
  }

  document.body.onscroll = moveCamera;
  moveCamera();


  const animate = () => {
    requestAnimationFrame( animate );

    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;

    // controls.update();

    renderer.render( scene, camera );
  };

  
  animate();

  return (
    <>
    </>
  )
}

export default Three
