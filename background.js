const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(18, 1, 1, 1000);

const renderer = new THREE.WebGLRenderer({
  preserveDrawingBuffer: true,
  alpha: true
});
renderer.setSize(16, 16);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x7ff4ff,
  wireframe: true
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const canvas = document.createElement("canvas");
canvas.width = 16;
canvas.height = 16;
const ctx = canvas.getContext("2d");

camera.position.z = 5;
cube.rotation.x = 0.5;

setInterval(() => {
  cube.rotation.y -= 0.02;
  renderer.render(scene, camera);

  const icon = renderFavicon();

  chrome.browserAction.setIcon({
    path: {
      "16": icon
    }
  });

}, 1000 / 60); // 60 fps maybe lmao

// render loop
const renderFavicon = () => {
  ctx.clearRect(0, 0, 16, 16);
  ctx.drawImage(renderer.domElement, 0, 0);

  return canvas.toDataURL("image/png");
};
