const skinview3d = require("skinview3d");
const canvas = document.createElement("canvas");

const skinIcon = chrome.runtime.getURL("skin.png");
const skinViewer = new skinview3d.SkinViewer({
  canvas,
  width: 16,
  height: 16,
  skin: skinIcon,
  preserveDrawingBuffer: true,
});

const rotation = skinViewer.animations.add(skinview3d.RotatingAnimation);
rotation.speed = 2.75;

// render loop
const renderFavicon = () => {
  const iconUrl = skinViewer.canvas.toDataURL("image/png");

  // move the canvas rotation
  skinViewer.camera.rotation.x = -0.220;  

  // mvoe the camera position
  skinViewer.camera.position.x = 0;
  skinViewer.camera.position.y = 14; // up / down
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