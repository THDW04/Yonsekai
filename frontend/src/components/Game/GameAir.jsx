import { useEffect, useRef } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { damagePlayer } from '../../js/gameState.js';

export const GameAir = () => {

  const mountRef = useRef(null);

  useEffect(() => {

    let animationId;
    let lastHitTime = 0;
    const HIT_COOLDOWN = 1000;

    const config = {
      nbVessels: 12,
      vesselSpeed: 2.5,
      vesselRadius: 0.5
    };

    const bgLength = 14;
    const nbBg = 3;
    const totalLength = bgLength * nbBg;
    const hideDistance = 10;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x9CBFF1);
    scene.fog = new THREE.Fog(0x9CBFF1, 0, 25);

    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 50);
    camera.position.set(0, 2, 15);
    camera.rotation.x = -0.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const cloudTexture = textureLoader.load('/assets/cloudsBackground.webp');

    const createBackground = (x, z) => {
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(bgLength, 10),
        new THREE.MeshBasicMaterial({
          map: cloudTexture,
          transparent: true,
          side: THREE.DoubleSide
        })
      );
      mesh.position.set(x, 2, z);
      mesh.rotation.y = x < 0 ? Math.PI / 2 : -Math.PI / 2;
      scene.add(mesh);
      return mesh;
    };

    const backgrounds = [
      createBackground(-3.5, bgLength),
      createBackground(-3.5, 0),
      createBackground(-3.5, -bgLength),
      createBackground(3.5, bgLength),
      createBackground(3.5, 0),
      createBackground(3.5, -bgLength)
    ];

    const road = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 25),
      new THREE.MeshBasicMaterial({ color: 0x94B6E7 })
    );
    road.rotation.x = -Math.PI * 0.5;
    scene.add(road);

    const loader = new GLTFLoader();
    let starship;

    loader.load('/assets/airplane.glb', (gltf) => {
      starship = gltf.scene;
      starship.rotation.x = -Math.PI * 0.5;
      starship.scale.set(0.1, 0.1, 0.1);
      starship.position.set(0, 1, 11.5);
      scene.add(starship);
    });

    const vessels = [];

    loader.load('/assets/devil_hawk.glb', (gltf) => {
      for (let j = 0; j < config.nbVessels; j++) {
        const vessel = gltf.scene.clone();
        vessel.scale.set(0.1, 0.1, 0.1);
        vessel.rotation.x = -Math.PI * 0.5;
        respawn(vessel);
        scene.add(vessel);
        vessels.push(vessel);
      }
    });

    let action = false;
    let acceleration = 0;
    let speed = 0;

    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') { acceleration = -1; action = true; }
      if (event.key === 'ArrowRight') { acceleration = 1; action = true; }
    };

    const handleKeyUp = () => { action = false; };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    const tick = () => {
      animationId = requestAnimationFrame(tick);
      config.vesselSpeed += 0.0001;

      if (!starship) {
        renderer.render(scene, camera);
        return;
      }

      starship.position.x += speed * 0.01;
      starship.rotation.y = speed * 0.01;

      if (action) speed += acceleration;
      speed *= 0.95;

      if (starship.position.x < -2) { starship.position.x = -2; speed *= -0.8; }
      if (starship.position.x > 2)  { starship.position.x = 2;  speed *= -0.8; }

      vessels.forEach(v => {
        v.position.z += config.vesselSpeed * 0.1;
        detectCollision(v);
        if (v.position.z > camera.position.z) respawn(v);
      });

      backgrounds.forEach(bg => {
        bg.position.z += config.vesselSpeed * 0.1;
        if (bg.position.z > camera.position.z + hideDistance) {
          bg.position.z -= totalLength;
        }
      });

      renderer.render(scene, camera);
    };

    tick();

    const ENEMY_OFFSET_X = 2; 

    function respawn(vessel) {
      vessel.position.set(
        Math.floor(Math.random() * 6) - 4 + ENEMY_OFFSET_X ,
        1.25,
        -20 - Math.random() * 40
      );
      vessel.scale.set(0.02, 0.02, 0.02);
      vessel.traverse(child => {
        if (child.isMesh) child.material.opacity = 1;
      });
    }

    function isPointInCircle(px, py, cx, cy, r) {
      const dx = px - cx;
      const dy = py - cy;
      return (dx * dx + dy * dy) <= (r * r);
    }

    function detectCollision(vessel) {
      if (!starship) return;

      const collide = isPointInCircle(
        starship.position.x, starship.position.z,
        vessel.position.x, vessel.position.z,
        config.vesselRadius
      );

      if (collide) {
        const now = performance.now();
        if (now - lastHitTime > HIT_COOLDOWN) {
          lastHitTime = now;
          damagePlayer(1);
        }

        vessel.traverse(child => {
          if (child.isMesh) child.material.color.set(0xff0000);
        });
        vessel.scale.set(0.3, 0.3, 0.3);

        setTimeout(() => {
          vessel.scale.set(0.1, 0.1, 0.1);
          respawn(vessel);
        }, 200);
      }
    }

    return () => {
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };

  }, []);

  return <div ref={mountRef}></div>;
};