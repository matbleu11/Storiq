const video = document.getElementById("camera-preview");
const captureBtn = document.getElementById("capture-btn");
const filterBtn = document.getElementById("filter-btn");
const filterMenu = document.getElementById("filter-menu");

let mediaStream = null;
let isRecording = false;
let recordTimeout = null;

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
  video.style.setProperty("--camera-filter", filter);
  filterMenu.classList.add("hidden");
}

// Bouton "Capture" (Photo ou Vidéo)
captureBtn.addEventListener("mousedown", () => {
  isRecording = false;
  recordTimeout = setTimeout(() => {
    isRecording = true;
    console.log("Enregistrement vidéo (simulation)");
    // Logique pour enregistrer une vidéo peut être ajoutée ici
  }, 1000);
});

captureBtn.addEventListener("mouseup", () => {
  clearTimeout(recordTimeout);
  if (isRecording) {
    console.log("Fin de l'enregistrement vidéo (simulation)");
  } else {
    console.log("Capture d'une photo");
    capturePhoto();
  }
});

// Fonction pour capturer une photo
function capturePhoto() {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL("image/png");
  console.log("Photo capturée :", dataUrl);
  alert("Photo capturée !");
}

// Bouton pour afficher/masquer le menu des filtres
filterBtn.addEventListener("click", () => {
  filterMenu.classList.toggle("hidden");
});

// Démarrer la caméra au chargement
startCamera();
