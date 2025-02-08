import { useEffect, useRef } from "react";
import * as THREE from "three";

const Emotion = ({
  red,
  green,
  blue,
}: {
  red: number;
  green: number;
  blue: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let animationId: number;

    function init() {
      if (!containerRef.current) return;

      const container = containerRef.current;

      // 카메라 설정
      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        1,
        10
      );
      //   camera.position.z = 2;

      camera.position.set(0, 0, 2);

      // 씬 설정
      scene = new THREE.Scene();
      //   scene.background = new THREE.Color(0xfffffff);

      // 지오메트리 설정 (조각을 촘촘하게 만들기 위해 vertexCount 증가)
      const vertexCount = 10 * 3; // 조각을 더 촘촘하게
      const geometry = new THREE.BufferGeometry();
      const positions = [];
      const colors = [];

      for (let i = 0; i < vertexCount; i++) {
        // x, y, z 좌표
        positions.push(Math.random() - 0.5);
        positions.push(Math.random() - 0.5);
        positions.push(Math.random() - 0.5);

        // r, g, b, a 색상
        // colors.push(Math.random() * 255);
        // colors.push(Math.random() * 255);
        // colors.push(Math.random() * 255);
        // colors.push(Math.random() * 255);
        colors.push(red);
        colors.push(green);
        colors.push(blue);
        colors.push(255);
      }

      const positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
      const colorAttribute = new THREE.Uint8BufferAttribute(colors, 4);
      colorAttribute.normalized = true;

      geometry.setAttribute("position", positionAttribute);
      geometry.setAttribute("color", colorAttribute);

      // 셰이더 설정
      const vertexShader = `
        precision mediump float;
        precision mediump int;

        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;

        attribute vec3 position;
        attribute vec4 color;

        varying vec3 vPosition;
        varying vec4 vColor;

        void main() {
          vPosition = position;
          vColor = color;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
      precision mediump float;
  precision mediump int;

  uniform float time;

  varying vec3 vPosition;
  varying vec4 vColor;

  void main() {
    vec4 baseColor = vec4(vColor.rgb, vColor.a); 
    float brightness = sin(vPosition.x * 10.0 + time) * 0.2;
    vec4 finalColor = baseColor + vec4(brightness, brightness, brightness, 0.0); 
    gl_FragColor = finalColor;
  }
        `;

      // 머티리얼 설정
      const material = new THREE.RawShaderMaterial({
        uniforms: {
          time: { value: 1.0 },
        },
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // 렌더러 설정
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(300, 300); // 3D 모델 렌더 사이즈
      container.appendChild(renderer.domElement);
    }

    function animate() {
      const time = performance.now();

      const mesh = scene.children[0] as THREE.Mesh;
      mesh.rotation.y = time * 0.0005;
      mesh.rotation.x = time * 0.0005;
      (mesh.material as THREE.RawShaderMaterial).uniforms.time.value =
        time * 0.005;

      renderer.render(scene, camera);

      animationId = requestAnimationFrame(animate);
    }

    // 초기화 및 애니메이션 시작
    init();
    animate();

    // 컴포넌트가 언마운트될 때 정리
    return () => {
      cancelAnimationFrame(animationId);
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [red, green, blue]);

  return (
    <div ref={containerRef} style={{ width: "300px", height: "300px" }}></div> // 3D모델 렌더 Div 사이즈
  );
};

export default Emotion;
