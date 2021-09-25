const canvas = document.createElement("canvas");

const skinIcon = chrome.runtime.getURL("hacksore.png");
const skinViewer = new skinview3d.SkinViewer({
  canvas,
  width: 16,
  height: 16,
  skin: skinIcon,
  preserveDrawingBuffer: true,
});

skinViewer.animations.add(skinview3d.RotatingAnimation);
skinViewer.animations.add(skinview3d.WalkingAnimation);

// render loop
const renderFavicon = () => {
  const iconUrl = skinViewer.canvas.toDataURL("image/png");

  // move the canvas rotation
  skinViewer.camera.rotation.x = -0.620;
  skinViewer.camera.rotation.y = 0.534;
  skinViewer.camera.rotation.z = 0.348;

  // mvoe the camera position
  skinViewer.camera.position.x = 6.5;
  skinViewer.camera.position.y = 10;
  skinViewer.camera.position.z = 12;

  // draw
  skinViewer.draw();

  chrome.browserAction.setIcon({
    path: {
      "16": iconUrl
    }
  });

};

setInterval(() => renderFavicon(), 1000 / 60);