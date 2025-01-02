const video = document.getElementById("camera-preview");
const captureBtn = document.getElementById("capture-btn");
const filterBtn = document.getElementById("filter-btn");
const filterMenu = document.getElementById("filter-menu");
const editorScreen = document.getElementById("editor-screen");
const editorCanvas = document.getElementById("editor-canvas");
const textOverlay = document.getElementById("text-overlay");
const addMusicBtn = document.getElementById("add-music-btn");
const shareBtn = document.getElementById("share-btn");
const introScreen = document.getElementById("intro-screen");
const app = document.getElementById("app");

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

// Afficher l'écran principal après l'introduction
function showApp() {
  introScreen.classList.add("hidden");
  app.classList.remove("hidden");
  startCamera();
}

// Appliquer un filtre
function applyFilter(filter) {
  video.style.filter = filter;
  filterMenu.classList.add("hidden");
}

// Capture d'une photo
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

// Afficher l'écran d'édition avec la photo capturée
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

  // Rester sur l'écran d'édition pendant 2 secondes
  setTimeout(() => {
    // Réinitialiser la caméra et revenir à l'écran principal
    editorScreen.classList.add("hidden");
    app.classList.remove("hidden");
    startCamera();
  }, 2000); // 2000 ms = 2 secondes
}

// Ajouter de la musique (rediriger vers Instagram)
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
  alert("Votre contenu est prêt à être partagé !");
});

// Démarrer l'écran d'introduction
setTimeout(showApp, 3000);  // Affiche l'écran principal après 3 secondes
