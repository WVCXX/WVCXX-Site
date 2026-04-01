const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
const fontSize = 16;
let columns = Math.max(1, Math.floor(canvas.width / fontSize));
let drops = Array(columns).fill(1);
let matrixInterval = null;

function drawMatrix() {
  if (!canvas.classList.contains('visible')) return;
  
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#00ffcc";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const newColumns = Math.max(1, Math.floor(canvas.width / fontSize));
  drops.length = newColumns;
  for (let i = 0; i < newColumns; i++) {
    drops[i] = drops[i] || 1;
  }
});

const terminal = document.getElementById("terminal-content");
const terminalDiv = document.getElementById("terminal");

const lines = [
  "root@wvcxx:~$ systemctl start boot",
  "> Загрузка ядра...",
  "> Инициализация модулей...",
  "> Проверка целостности системы...",
  "> Обход защитных протоколов...",
  "",
  "root@wvcxx:~$ bypass_security()",
  "> Обнаружены блокировки...",
  "> Применение эксплойтов...",
  "> Деактивация фаервола...",
  "> Получение root доступа...",
  "",
  "root@wvcxx:~$ access_granted",
  "",
  "Доступ получен",
  "",
  "> Инициализация пользовательского интерфейса"
];

let lineIndex = 0;
let charIndex = 0;
let isTyping = true;

function typeTerminal() {
  if (!isTyping) return;

  if (lineIndex >= lines.length) {
    if (terminal.innerHTML.includes("Доступ получен") && !terminal.innerHTML.includes("welcome")) {
      showDotsAnimation();
    } else {
      finishTerminal();
    }
    return;
  }

  const currentLine = lines[lineIndex];

  if (charIndex < currentLine.length) {
    terminal.innerHTML += currentLine.charAt(charIndex);
    charIndex++;
    setTimeout(typeTerminal, 20);
  } else {
    terminal.innerHTML += "\n";
    lineIndex++;
    charIndex = 0;
    
    const delay = currentLine.includes("...") ? 200 : 80;
    setTimeout(typeTerminal, delay);
  }
}

function showDotsAnimation() {
  isTyping = false;
  let dotCount = 0;
  const dotsInterval = setInterval(() => {
    const linesArr = terminal.innerHTML.split('\n');
    if (linesArr[linesArr.length - 1].includes('.')) {
      linesArr.pop();
      terminal.innerHTML = linesArr.join('\n') + '\n';
    }
    
    dotCount = (dotCount % 3) + 1;
    const dots = '.'.repeat(dotCount);
    terminal.innerHTML += `Загрузка интерфейса${dots}`;
    
  }, 300);
  
  setTimeout(() => {
    clearInterval(dotsInterval);
    terminal.innerHTML += '\nwelcome.\n';
    setTimeout(finishTerminal, 500);
  }, 1500);
}

function finishTerminal() {
  terminal.innerHTML += "\n> Система готова к работе";
  terminal.innerHTML += "\n> Запуск графического интерфейса...\n";
  
  setTimeout(() => {
    terminalDiv.style.opacity = "0";
    setTimeout(() => {
      terminalDiv.style.display = "none";
      showAllContent();
    }, 800);
  }, 800);
}

function showAllContent() {
  const mainContent = document.getElementById("main-content");
  mainContent.classList.add("show");
  startIntroAnimation();
  
  const matrixCanvas = document.getElementById("matrix");
  matrixCanvas.classList.add('visible');
  
  if (window.matrixInterval) clearInterval(window.matrixInterval);
  window.matrixInterval = setInterval(() => {
    drawMatrix();
  }, 35);
  
  const particles = document.querySelector('.particles');
  if (particles) particles.classList.add('visible');
  
  if (window.iconInterval) clearInterval(window.iconInterval);
  window.iconInterval = setInterval(animateIcons, 800);
  
  const buttons = document.querySelectorAll('.terminal-trigger, .theme-switcher, .eye-container, .ascii-art');
  buttons.forEach(btn => {
    btn.classList.add('show-buttons');
  });
  
  const asciiArt = document.querySelector('.ascii-art');
  if (asciiArt) {
    asciiArt.style.opacity = '1';
    asciiArt.style.visibility = 'visible';
  }
}

function startIntroAnimation() {
  const introText = "Привет, я WVCXX...";
  const introElement = document.getElementById("intro");
  let i = 0;

  function typeWriter() {
    if (i < introText.length) {
      let glitchChar = Math.random() > 0.85 
        ? String.fromCharCode(33 + Math.random() * 94) 
        : introText.charAt(i);
      introElement.innerHTML += glitchChar;
      i++;
      setTimeout(typeWriter, 80);
    } else {
      introElement.style.borderRight = "2px solid #00ffcc";
      setTimeout(() => {
        introElement.style.borderRight = "none";
      }, 1000);
    }
  }
  
  typeWriter();
}

function startTerminal() {
  terminalDiv.style.display = "flex";
  terminalDiv.style.opacity = "1";
  setTimeout(() => {
    typeTerminal();
  }, 100);
}

startTerminal();

const particleContainer = document.querySelector(".particles");
function createParticles() {
  for (let i = 0; i < 150; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.top = Math.random() * window.innerHeight + "px";
    particle.style.left = Math.random() * window.innerWidth + "px";
    particle.style.animationDuration = 2 + Math.random() * 4 + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";
    particleContainer.appendChild(particle);
  }
}
createParticles();

const icons = document.querySelectorAll(".links img");
let iconIndex = 0;

function animateIcons() {
  if (icons.length === 0) return;
  if (!document.getElementById("main-content").classList.contains("show")) return;
  
  icons.forEach(icon => {
    icon.style.filter = "drop-shadow(0 0 5px #00ffcc)";
    icon.style.transition = "all 0.3s ease";
  });
  
  icons[iconIndex].style.filter = "drop-shadow(0 0 20px #00ffcc) drop-shadow(0 0 30px #00ffcc)";
  icons[iconIndex].style.transform = "scale(1.1)";
  
  setTimeout(() => {
    if (icons[iconIndex]) {
      icons[iconIndex].style.transform = "scale(1)";
    }
  }, 300);
  
  iconIndex = (iconIndex + 1) % icons.length;
}

const openTerminalBtn = document.getElementById('openTerminal');
const terminalCommands = document.getElementById('terminalCommands');
const terminalClose = document.querySelector('.terminal-close');
const commandInput = document.getElementById('commandInput');
const terminalOutput = document.getElementById('terminalOutput');

const commands = {
  help: () => 'Доступные команды:\n- help - показать справку\n- about - информация обо мне\n- skills - мои навыки\n- projects - проекты\n- clear - очистить терминал\n- contact - контакты\n- matrix - управление матрицей\n- secret - секретная страница\n- exit - закрыть терминал',
  
  about: () => 'WVCXX - разработчик, пентестер. Специализируюсь на Python, JavaScript.',
  
  skills: () => 'Навыки:\n› Python, JavaScript\n› Веб-разработка (HTML/CSS/React)\n› Базы данных (SQL, MongoDB)\n› Кибербезопасность (основы)\n› UI/UX дизайн\n› Linux системное администрирование',
  
  projects: () => 'Проекты:\n› Сайт-портфолио (HTML/CSS/JS)\n› Telegram боты\n›',
  
  contact: () => 'Связь со мной:\n› Telegram: @WVCXX\n› GitHub: github.com/WVCXX\n› VK: vk.com/wfzxcqqq666\n› Steam: steamcommunity.com/profiles/76561198837106190',
  
  matrix: () => {
    const matrixCanvas = document.getElementById('matrix');
    if (matrixCanvas) {
      const currentOpacity = matrixCanvas.style.opacity;
      matrixCanvas.style.opacity = currentOpacity === '0.3' ? '0.8' : '0.3';
      return `Матрица ${matrixCanvas.style.opacity === '0.8' ? 'активирована' : 'деактивирована'}`;
    }
    return 'Ошибка: матрица не найдена';
  },
  
  secret: () => {
    const secretPage = document.getElementById('secret404');
    if (secretPage) {
      secretPage.classList.add('show');
      return 'Секретная страница открыта...';
    }
    return 'Ошибка: секретная страница не найдена';
  },
  
  clear: () => {
    if (terminalOutput) {
      terminalOutput.innerHTML = '<div>Введите \'help\' для списка команд</div>';
    }
    return '';
  },
  
  exit: () => {
    if (terminalCommands) {
      terminalCommands.style.display = 'none';
    }
    return '';
  }
};

if (openTerminalBtn) {
  openTerminalBtn.addEventListener('click', () => {
    if (terminalCommands) {
      terminalCommands.style.display = 'block';
      if (commandInput) commandInput.focus();
    }
  });
}

if (terminalClose) {
  terminalClose.addEventListener('click', () => {
    if (terminalCommands) {
      terminalCommands.style.display = 'none';
    }
  });
}

if (commandInput) {
  commandInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const cmd = commandInput.value.toLowerCase().trim();
      const output = document.createElement('div');
      output.innerHTML = `<span style="color: #00ffcc;">$></span> ${commandInput.value}`;
      if (terminalOutput) terminalOutput.appendChild(output);
      
      if (cmd in commands) {
        const result = commands[cmd]();
        if (result) {
          const resultDiv = document.createElement('div');
          resultDiv.style.whiteSpace = 'pre-wrap';
          resultDiv.style.marginLeft = '20px';
          resultDiv.innerHTML = result;
          if (terminalOutput) terminalOutput.appendChild(resultDiv);
        }
      } else if (cmd) {
        const errorDiv = document.createElement('div');
        errorDiv.style.color = '#ff3366';
        errorDiv.style.marginLeft = '20px';
        errorDiv.innerHTML = `Команда не найдена: ${cmd}. Введите 'help' для списка команд.`;
        if (terminalOutput) terminalOutput.appendChild(errorDiv);
      }
      
      commandInput.value = '';
      if (terminalOutput) terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });
}

const asciiFrames = [
  "  (◣_◢)  ",
  "  (◣_◢)  ",
  "  (◣_◢)  ",
  "  (◣_◢)  ",
  "  (>_<)  ",
  "  (◣_◢)  "
];

let asciiIndex = 0;
const asciiDisplay = document.getElementById('asciiDisplay');

setInterval(() => {
  asciiIndex = (asciiIndex + 1) % asciiFrames.length;
  if (asciiDisplay) {
    asciiDisplay.textContent = asciiFrames[asciiIndex];
  }
}, 200);

const closeSecretBtn = document.getElementById('closeSecret');
if (closeSecretBtn) {
  closeSecretBtn.addEventListener('click', () => {
    const secretPage = document.getElementById('secret404');
    if (secretPage) {
      secretPage.classList.remove('show');
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const secretPage = document.getElementById('secret404');
    if (secretPage && secretPage.classList.contains('show')) {
      secretPage.classList.remove('show');
    }
  }
});

document.addEventListener('mousemove', (e) => {
  const pupils = document.querySelectorAll('.pupil');
  const eyes = document.querySelectorAll('.eye');
  
  pupils.forEach((pupil, index) => {
    if (eyes[index]) {
      const eye = eyes[index];
      const rect = eye.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;
      
      const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
      const distance = Math.min(8, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 25);
      
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      pupil.style.transform = `translate(${x}px, ${y}px)`;
    }
  });
});

const themeBtns = document.querySelectorAll('.theme-btn');
if (themeBtns.length) {
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme');
      document.body.setAttribute('data-theme', theme);
      
      let primaryColor;
      if (theme === 'matrix') {
        primaryColor = '#00ff00';
      } else if (theme === 'neon') {
        primaryColor = '#ff00ff';
      } else {
        primaryColor = '#00ffcc';
      }
      
      document.documentElement.style.setProperty('--primary-color', primaryColor);
      document.body.style.color = primaryColor;
      
      const elements = document.querySelectorAll('.links a, .terminal-trigger, .theme-btn, .terminal-close, .prompt');
      elements.forEach(el => {
        el.style.borderColor = primaryColor;
        el.style.color = primaryColor;
      });
      
      const iconsToUpdate = document.querySelectorAll('.links img, .terminal-icon-img, .theme-icon-img');
      iconsToUpdate.forEach(icon => {
        icon.style.filter = `drop-shadow(0 0 5px ${primaryColor})`;
      });
    });
  });
}