let saturate = document.getElementById('saturate');
let contrast = document.getElementById('contrast');
let brightness = document.getElementById('brightness');
let sepia = document.getElementById('sepia');
let grayscale = document.getElementById('grayscale');
let blur = document.getElementById('blur');
let hueRotate = document.getElementById('hue-rotate');

let upload = document.getElementById('upload');
let download = document.getElementById('download');
let img = document.getElementById('img');

let reset = document.querySelector('span');
let imgbox = document.querySelector('.img-box');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// je crée une fonction pour reset les parametres par défaut.
function resetValues() {
    img.style.filter = 'none';
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0';
}

reset.onclick = function () {
    resetValues();
}

// je cache le bouton download et le bouton reset quand l'image n'est pas chargée
window.onload = function () {
    download.style.display = 'none';
    reset.style.display = 'none';
    imgbox.style.display = 'none';
    upload.style.display = 'none';
   
};
// j'affiche limage et les boutons quand l'image est chargée.
upload.onchange = function () {
    download.style.display = 'block';
    reset.style.display = 'block';
    imgbox.style.display = 'block';
    upload.style.display = 'none';
    resetValues();
// je récupère l'image et crée une fontion pour l'afficher
    let file = new FileReader();
    file.readAsDataURL(this.files[0]);
    file.onload = function () {
        img.src = file.result;
    }
    img.onload = function () {
        canvas.width= img.width;
        canvas.height= img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.style.display='none';
    }
};
// je crée ma variable filters qui contiendra tous les filtres à appliquer à l'image.
let filters = document.querySelectorAll('ul li input'); 
filters.forEach(filters => {
    filters.addEventListener('input', function () {
        // je redirige l'image dans le canvas
        ctx.filter = `saturate(${saturate.value}%) contrast(${contrast.value}%) brightness(${brightness.value}%) sepia(${sepia.value}%) grayscale(${grayscale.value}) blur(${blur.value}px) hue-rotate(${hueRotate.value}deg)`;
 
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    })
    download.onclick = function () {
        download.href = canvas.toDataURL('image/png');
    }
});


