import React, { useRef, useEffect } from 'react';

import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import {
  useColorModeValue,
  useTheme,
} from '@chakra-ui/react';

import { gsap, Power4 } from 'gsap';

export default function Background({ color }) {
  const canvasRef = useRef();

  const theme = useTheme();
  const accentColorHex = theme.colors[color][400];
  const backgroundColor = useColorModeValue('#ffffff', '#282c34');
  const boxColor = parseInt(useColorModeValue('#282c34', '#ffffff').substring(1), 16);



  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 1, 500);
    const maxSize = 0.04; // Change this value to adjust the maximum size
    const canvasElem = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasElem });
    renderer.setPixelRatio(window.devicePixelRatio);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = false;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.needsUpdate = true;

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }


    const scene = new THREE.Scene();
    const cameraRange = 3;

    scene.background = new THREE.Color(backgroundColor);
    scene.fog = new THREE.Fog(backgroundColor, 2.5, 3.5);

    function mathRandom(num = 1) {
      var setNumber = -Math.random() * num + Math.random() * num;
      return setNumber;
    }

    // ------------------------------------------------------------- SCENE
    const sceneGroup = new THREE.Object3D();
    const modularGroup = new THREE.Object3D();

    // ------------------------------------------------------------- INIT
    function init() {
      for (let i = 0; i < 35; i++) {
        const geometry = new THREE.BoxGeometry(1);
        const material = new THREE.MeshStandardMaterial({
          flatShading: false,
          color: boxColor,
          transparent: true,
          opacity: 0.14,
          wireframe: true
        });
        let icosahedron;
        icosahedron = new THREE.Mesh(geometry, material);
        icosahedron.speedRotation = Math.random() * 0.1;
        icosahedron.positionX = mathRandom();
        icosahedron.positionY = mathRandom();
        icosahedron.positionZ = mathRandom();
        icosahedron.castShadow = true;
        icosahedron.receiveShadow = true;

        const newScaleValue = Math.max(mathRandom(maxSize), 0.03);

        icosahedron.scale.set(newScaleValue, newScaleValue, newScaleValue);
        //---
        icosahedron.rotation.x = mathRandom(180 * Math.PI / 180);
        icosahedron.rotation.y = mathRandom(180 * Math.PI / 180);
        icosahedron.rotation.z = mathRandom(180 * Math.PI / 180);
        //
        icosahedron.position.set(icosahedron.positionX, icosahedron.positionY, icosahedron.positionZ);
        modularGroup.add(icosahedron);
      }
      sceneGroup.add(modularGroup);
    }

    //------------------------------------------------------------- CAMERA
    camera.position.set(0, 0, cameraRange);
    let cameraValue = false;

    function cameraSet() {
      if (!cameraValue) {
        gsap.to(camera.position, 1, { z: cameraRange, ease: Power4.easeInOut });
        cameraValue = true;
      } else {
        gsap.to(camera.position, 1, { z: cameraRange, x: 0, y: 0, ease: Power4.easeInOut });
        cameraValue = false;
      }
    }

    function onKeyPress(event) {
      if (event.code === 'Space') {
        cameraSet();
      }
    }

    window.addEventListener('keydown', onKeyPress, false);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1);
    scene.add(ambientLight);

    var light = new THREE.SpotLight(0xFFFFFF, 3);
    light.position.set(5, 5, 2);
    light.castShadow = true;
    light.shadow.mapSize.width = 10000;
    light.shadow.mapSize.height = light.shadow.mapSize.width;
    light.penumbra = 0.5;

    const lightBack = new THREE.PointLight(accentColorHex, 10);
    lightBack.position.set(0, -3, -1);

    scene.add(sceneGroup);
    scene.add(light);
    scene.add(lightBack);

    const rectSize = 2;
    const intensity = 100;
    const rectLight = new THREE.RectAreaLight(0xFFFFFF, intensity, rectSize, rectSize);
    rectLight.position.set(0, 0, 1);
    rectLight.lookAt(0, 0, 0);

    let rectLightHelper;
    rectLightHelper = new RectAreaLightHelper(rectLight);
    scene.add(rectLightHelper);

    //------------------------------------------------------------- RAYCASTER
    let mouse = new THREE.Vector2();


    //------------------------------------------------------------- RENDER
    const uSpeed = 0.1;

    function animate() {
      let i;
      let l;
      const time = performance.now() * 0.0003;
      requestAnimationFrame(animate);
      i = 0;
      l = modularGroup.children.length;
      for (; i < l; i++) {
        const newCubes = modularGroup.children[i];
        newCubes.rotation.x += 0.008;
        newCubes.rotation.y += 0.005;
        newCubes.rotation.z += 0.003;
        //---
        newCubes.position.x = Math.sin(time * newCubes.positionZ) * newCubes.positionY;
        newCubes.position.y = Math.cos(time * newCubes.positionX) * newCubes.positionZ;
        newCubes.position.z = Math.sin(time * newCubes.positionY) * newCubes.positionX;
      }
      //---
      modularGroup.rotation.y -= ((mouse.x * 4) + modularGroup.rotation.y) * uSpeed;
      modularGroup.rotation.x -= ((-mouse.y * 4) + modularGroup.rotation.x) * uSpeed;

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    }

    animate();
    init();
  }, [accentColorHex, backgroundColor, boxColor]);


  return <canvas ref={canvasRef} style={{ position: 'fixed', zIndex: -1 }} />;
}