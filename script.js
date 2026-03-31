const introText = "Привет, я WVCXX...";
const introElement = document.getElementById("intro");
let i = 0;

function typeWriter() {
  if (i < introText.length) {
    let glitchChar = Math.random()>0.85 ? String.fromCharCode(33 + Math.random()*94) : introText.charAt(i);
    introElement.innerHTML += glitchChar;
    i++;
    setTimeout(typeWriter,50);
  }
}
typeWriter();

const icons = document.querySelectorAll(".links img");
let index = 0;

function animateIcons() {
  icons.forEach(icon => icon.style.filter="drop-shadow(0 0 5px #00ffcc)");
  icons[index].style.filter="drop-shadow(0 0 25px #00ffcc)";
  index = (index+1)%icons.length;
}
setInterval(animateIcons,500);

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
const fontSize = 16;
const columns = Math.max(1, Math.floor(canvas.width / fontSize));
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#00ffcc";
  ctx.font = fontSize+"px monospace";

  for(let i=0;i<drops.length;i++){
    const text=letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(text,i*fontSize,drops[i]*fontSize);
    if(drops[i]*fontSize>canvas.height && Math.random()>0.975) drops[i]=0;
    drops[i]++;
  }
}
setInterval(drawMatrix,35);

const particleContainer=document.querySelector(".particles");
for(let i=0;i<100;i++){
  const particle=document.createElement("div");
  particle.classList.add("particle");
  particle.style.top=Math.random()*window.innerHeight+"px";
  particle.style.left=Math.random()*window.innerWidth+"px";
  particle.style.animationDuration=(2+Math.random()*3)+"s";
  particleContainer.appendChild(particle);
}
const loadingPhrases = [
  "Инициализация",
  "Подключение к системе",
  "Обход всех блокировок",
  "Доступ получен"
];

const loadingText = document.getElementById("loading-text");
const progress = document.querySelector(".progress");
const loader = document.getElementById("loader");

let progressValue = 0;
let phraseIndex = 0;

function updateLoader() {
  if (progressValue >= 100) {
    progressValue = 100;
    progress.style.width = "100%";
    loadingText.innerText = "Добро пожаловать.";

    setTimeout(() => {
      loader.classList.add("fade-out");
    }, 500);

    setTimeout(() => {
      loader.style.display = "none";
      startTerminal(); 
    }, 1500);

    return;
  }

  progressValue += Math.random() * 8;
  progress.style.width = progressValue + "%";

  if (Math.random() > 0.7 && phraseIndex < loadingPhrases.length) {
    loadingText.innerText = loadingPhrases[phraseIndex];
    phraseIndex++;
  }

  setTimeout(updateLoader, 200);
}

updateLoader();

const terminal = document.getElementById("terminal-content");

const lines = [
  "root@system:~$ booting...",
  "loading kernel modules...",
  "checking system integrity...",
  "bypassing security...",
  "access granted ✔",
  "",
  "welcome."
];

let lineIndex = 0;
let charIndex = 0;

function typeTerminal() {
  if (lineIndex >= lines.length) {
    // через 1 сек закрываем терминал
    setTimeout(() => {
      document.getElementById("terminal").style.display = "none";
    }, 1000);
    return;
  }

  const currentLine = lines[lineIndex];

  if (charIndex < currentLine.length) {
    terminal.innerHTML += currentLine.charAt(charIndex);
    charIndex++;
    setTimeout(typeTerminal, 30);
  } else {
    terminal.innerHTML += "\n";
    lineIndex++;
    charIndex = 0;
    setTimeout(typeTerminal, 300);
  }
}

// запуск при загрузке страницы
window.onload = () => {
  typeTerminal();
};