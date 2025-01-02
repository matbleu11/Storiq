const video = document.getElementById("camera-preview");
const captureBtn = document.getElementById("capture-btn");
const filterBtn = document.getElementById("filter-btn");
const filterMenu = document.getElementById("filter-menu");
const editorScreen = document.getElementById("editor-screen");
const editorCanvas = document.getElementById("editor-canvas");
const textOverlay = document.getElementById("text-overlay");
const addMusicBtn = document.getElementById("add-music-btn");
const shareBtn = document.getElementById("share-btn");

let mediaStream = null;
let capturedData = null;

// Fonction pour activer la caméra
async function startCamera() {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = mediaStream;
  } catch (error) {
    alert("Erreur lors de l'accès à la caméra.");
    console.error(error);
  }
}

// Appliquer un filtre
function applyFilter(filter) {
  video.style.filter = filter;
  filterMenu.classList.add("hidden");
}

// Bouton "Capture" (Photo)
captureBtn.addEventListener("click", () => {
  capturePhoto();
});

// Fonction pour capturer une photo
function capturePhoto() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  capturedData = canvas.toDataURL("image/png");
  openEditor(capturedData);
}

// Afficher l'écran d'édition
function openEditor(dataUrl) {
  editorScreen.classList.remove("hidden");
  const context = editorCanvas.getContext("2d");
  const image = new Image();
  image.onload = () => {
    editorCanvas.width = image.width;
    editorCanvas.height = image.height;
    context.drawImage(image, 0, 0);
  };
  image.src = dataUrl;
}

// Ajouter de la musique (redirection vers Instagram)
addMusicBtn.addEventListener("click", () => {
  window.location.href = "instagram://story-camera";
});

// Partager sur Instagram
shareBtn.addEventListener("click", () => {
  const context = editorCanvas.getContext("2d");
  if (textOverlay.value.trim()) {
    context.font = "30px Arial";
    context.fillStyle = "white";
    context.fillText(textOverlay.value.trim(), 20, editorCanvas.height - 50);
  }
  const finalDataUrl = editorCanvas.toDataURL("image/png");
  console.log("Prêt à être partagé :", finalDataUrl);
  alert("Votre contenu est prêt à être partagé !");
});

// Démarrer la caméra au chargement
startCamera();
