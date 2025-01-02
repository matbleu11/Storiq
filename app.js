// Afficher un aperçu des fichiers téléchargés
const fileInput = document.getElementById("file-input");
const preview = document.getElementById("preview");

fileInput.addEventListener("change", () => {
  preview.innerHTML = "";
  const files = fileInput.files;

  Array.from(files).forEach(file => {
    const fileURL = URL.createObjectURL(file);
    if (file.type.startsWith("image")) {
      const img = document.createElement("img");
      img.src = fileURL;
      preview.appendChild(img);
    } else if (file.type.startsWith("video")) {
      const video = document.createElement("video");
      video.src = fileURL;
      video.controls = true;
      preview.appendChild(video);
    }
  });
});

// Application de filtres basiques
function applyFilter(filter) {
  const imgs = preview.querySelectorAll("img, video");
  imgs.forEach(img => {
    img.style.filter = filter;
  });
}

// Télécharger le résultat (en version simplifiée)
const downloadBtn = document.getElementById("download-btn");
downloadBtn.addEventListener("click", () => {
  alert("Téléchargement ou partage à venir !");
});
