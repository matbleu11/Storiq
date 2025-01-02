const fileInput = document.getElementById("file-input");
const cameraBtn = document.getElementById("camera-btn");
const shareBtn = document.getElementById("share-btn");
const canvas = document.getElementById("story-canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1080; // Dimensions pour les stories Instagram
canvas.height = 1920;

let selectedImage = null;

// Charger une image sélectionnée
fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        selectedImage = img;
        drawImageOnCanvas();
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }
});

// Prendre une photo avec la caméra
cameraBtn.addEventListener("click", async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const video = document.createElement("video");
  video.srcObject = stream;
  video.autoplay = true;

  // Capture une image après quelques secondes
  setTimeout(() => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    video.srcObject.getTracks().forEach((track) => track.stop());
    selectedImage = canvas.toDataURL("image/png");
  }, 2000);
});

// Partager l'image sur Instagram
shareBtn.addEventListener("click", () => {
  if (!selectedImage) {
    alert("Veuillez sélectionner ou capturer une image !");
    return;
  }

  // Rediriger vers Instagram
  const instagramStoryURL = "instagram://story-camera";
  window.location.href = instagramStoryURL;
});

// Dessiner l'image sur le canvas
function drawImageOnCanvas() {
  if (selectedImage) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(selectedImage, 0, 0, canvas.width, canvas.height);
  }
}
