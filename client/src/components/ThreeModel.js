// "Ftm" (https://skfb.ly/ZHRr) by luyssport is licensed under CC Attribution-NonCommercial-ShareAlike (http://creativecommons.org/licenses/by-nc-sa/4.0/).
import React from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import model from ;

const ModelScene = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  const renderer = new THREE.WebGLRenderer();

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const ambientLight = new THREE.AmbientLight(0xffffff, 3);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
  directionalLight.position.set(200, 500, 300);
  scene.add(directionalLight);

  const loader = new GLTFLoader();

  loader.load( '../components/assets/models/ftm/scene.gltf', function ( gltf ) {

    scene.add( gltf.scene );

    requestAnimationFrame( animate );

    renderer.render( scene, camera );

  }, undefined, function ( error ) {

    console.error( error );

  } );

  const animate = () => {
    requestAnimationFrame( animate );

    renderer.render( scene, camera );
  };

  
  animate();

  return (
    <div>
      
    </div>
  )
}

export default ModelScene
