// --- Welcome Page Logic ---

window.addEventListener('DOMContentLoaded', () => {
     const bgMusic = document.getElementById('bg-music');
  if (bgMusic) {
    bgMusic.volume = 0.35; // soft volume
    bgMusic.play().catch(() => {
      // Fallback: Play on welcome button click if autoplay blocked
      const welcomeBtn = document.getElementById('welcome-enter-btn');
      if (welcomeBtn) {
        welcomeBtn.addEventListener('click', () => {
          bgMusic.play();
        });
      }
    });
  }
    const welcomePage = document.getElementById('welcome-page');
    const welcomeBtn = document.getElementById('welcome-enter-btn');
    const welcomeFireworks = document.getElementById('welcome-fireworks');

    // Show animated fireworks on welcome page
    function welcomeFireworksShow(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        let colors = ['#ff69b4', '#ffd700', '#00ff00', '#ff0000', '#0000ff', '#f0f'];
        for (let i = 0; i < 7; i++) {
            let theta = Math.random() * 2 * Math.PI;
            let radius = Math.random() * 300 + 100;
            let x0 = canvas.width / 2;
            let y0 = canvas.height / 2;
            for (let j = 0; j < 30; j++) {
                let angle = theta + (j / 30) * 2 * Math.PI;
                let color = colors[Math.floor(Math.random() * colors.length)];
                particles.push({
                    x: x0, y: y0, vx: Math.cos(angle) * radius / 60, vy: Math.sin(angle) * radius / 60,
                    alpha: 1, color
                });
            }
        }
        let frame = 0;
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI);
                ctx.fillStyle = p.color;
                ctx.fill();
                p.x += p.vx; p.y += p.vy; p.alpha -= 0.015;
            });
            particles = particles.filter(p => p.alpha > 0.05);
            frame++;
            if (frame < 120) {
                requestAnimationFrame(animate);
            }
        }
        animate();
    }

    // On load run fireworks
    setTimeout(() => {
        welcomeFireworksShow(welcomeFireworks);
    }, 500);

    // When user clicks 'Yes, Start!'
    welcomeBtn.addEventListener('click', () => {
        // Hide welcome page
        welcomePage.style.display = 'none';
        // Show nickname prompt
        document.getElementById('nickname-prompt').style.display = 'flex';
    });

    // Hide main content initially
    document.getElementById('nickname-prompt').style.display = 'none';
    document.querySelectorAll(".hero,.storyline,.wishes,#letter-section").forEach(e => e.classList.add("hidden"));
});

// Original script.js content below (your provided code)... 

console.log("Script loaded");

// GIF URLs and animations
const gifUrls = [
    "https://i.pinimg.com/originals/c5/a9/c2/c5a9c2c7a9a4ab75c9895cfc2a139882.gif",
    null, null, null
];
const animations = ["slideUp", "zoomIn", "slideUp", "zoomIn"];

// Birthday Wishes with Emojis
const birthdayWishes = [
    { text: "May your day be filled with joy and laughter! 🎉", emoji: "🎉" },
    { text: "Wishing you endless happiness, Sugli! 😊", emoji: "😊" },
    { text: "May all your dreams come true this year! 🌟", emoji: "🌟" },
    { text: "Here's to a year full of love and fun! 💖", emoji: "💖" },
    { text: "You deserve the best birthday ever! 🥳", emoji: "🥳" },
    { text: "May your life shine brighter every day! ✨", emoji: "✨" },
    { text: "Cheers to our amazing friendship! 😍", emoji: "😍" },
    { text: "Wishing you health, wealth, and joy! 💕", emoji: "💕" },
    { text: "May this birthday bring you closer to your goals! 🚀", emoji: "🚀" },
    { text: "You're a star, and today is your day to shine! 🌈", emoji: "🌈" }
];

// Floating Hearts
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.width = Math.random() * 15 + 20 + "px";
    heart.style.height = heart.style.width;
    heart.style.animationDuration = Math.random() * 4 + 5 + "s";
    heart.style.animationDelay = Math.random() * 5 + "s";
    document.querySelector(".hearts").appendChild(heart);
    setTimeout(() => heart.remove(), 9000);
}
setInterval(createHeart, 800);

// Floating Clouds
function createCloud() {
    const cloud = document.createElement("div");
    cloud.classList.add("cloud");
    cloud.style.left = Math.random() * 100 + "vw";
    cloud.style.animationDuration = Math.random() * 8 + 12 + "s";
    cloud.style.animationDelay = Math.random() * 5 + "s";
    document.querySelector(".clouds").appendChild(cloud);
    setTimeout(() => cloud.remove(), 12000);
}
setInterval(createCloud, 1000);

// Floating Balloons
function createBalloon(isFinal = false) {
    const balloon = document.createElement("div");
    balloon.classList.add("balloon");
    const colors = ["red", "blue", "yellow", "pink", "green"];
    balloon.classList.add(colors[Math.floor(Math.random() * colors.length)]);
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.setProperty('--random-x', Math.random());
    balloon.style.transform = `scale(${Math.random() * 0.3 + (isFinal ? 0.9 : 0.8)})`;
    balloon.style.animationDuration = Math.random() * 2 + (isFinal ? 5 : 6) + "s";
    balloon.style.animationDelay = Math.random() * 2 + "s";
    balloon.onclick = () => {
        gsap.to(balloon, {
            duration: 0.3,
            scale: 0,
            opacity: 0,
            ease: "power2.in",
            onComplete: () => {
                const emoji = document.createElement("span");
                emoji.classList.add("pop-emoji");
                emoji.textContent = "🎉";
                emoji.style.left = balloon.style.left;
                emoji.style.top = balloon.style.top;
                document.querySelector(".balloons").appendChild(emoji);
                setTimeout(() => emoji.remove(), 1000);
                balloon.remove();
            }
        });
    };
    document.querySelector(".balloons").appendChild(balloon);
    setTimeout(() => {
        if (balloon.parentNode) balloon.remove();
    }, 8000);
}

// Confetti Animation
function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ffd700', '#00ff00', '#ff0000', '#0000ff']
    });
}

// Show Storyline
function showStoryline() {
    const hero = document.querySelector(".hero");
    const storyline = document.querySelector(".storyline");
    if (hero && storyline) {
        hero.classList.add("hidden");
        storyline.classList.remove("hidden");
        nextCard();
        addGifsToCards();
    }
}

// Show Wishes
function showWishes() {
    const storyline = document.querySelector(".storyline");
    const wishes = document.querySelector(".wishes");
    const wishesContainer = document.getElementById("wishes-container");
    const progress = document.querySelector(".progress");
    if (storyline && wishes && wishesContainer && progress) {
        storyline.classList.add("hidden");
        wishes.classList.remove("hidden");

        // Show "Show Letter" button and hide letter initially
        showLetterButton.classList.remove("hidden");
        letterSection.classList.add("hidden");

        const balloonInterval = setInterval(() => createBalloon(), 200);
        triggerConfetti();

        let wishIndex = 0;
        function showNextWish() {
            if (wishIndex < birthdayWishes.length) {
                wishesContainer.innerHTML = `
                    <h2 class="wish">
                        ${birthdayWishes[wishIndex].text}
                        <span class="wish-emoji">${birthdayWishes[wishIndex].emoji}</span>
                    </h2>
                `;
                progress.style.width = `${((wishIndex + 1) / birthdayWishes.length) * 100}%`;
                gsap.to(".wish", {
                    duration: 1.5,
                    opacity: 1,
                    y: 0,
                    ease: "power2.out",
                    onComplete: () => {
                        setTimeout(() => {
                            gsap.to(".wish", {
                                duration: 1,
                                opacity: 0,
                                y: -50,
                                ease: "power2.in",
                                onComplete: () => {
                                    wishIndex++;
                                    showNextWish();
                                }
                            });
                        }, 1500);
                    }
                });
            } else {
                clearInterval(balloonInterval);
                showFinalMessage();
            }
        }
        showNextWish();
    }
}

let currentCardIndex = -1;

function nextCard() {
    const cards = document.querySelectorAll(".reason-card");
    const nextButton = document.querySelector(".next-button");

    if (!cards || cards.length === 0) {
        return;
    }

    if (currentCardIndex < cards.length - 1) {
        currentCardIndex++;
        const currentCard = cards[currentCardIndex];
        currentCard.classList.add("visible");
        const animation = animations[currentCardIndex % animations.length];
        currentCard.style.animation = `${animation} 0.5s ease-out forwards`;
        currentCard.addEventListener("click", () => currentCard.classList.toggle("show-extra"));
        addGifsToCards();
        if (nextButton) {
            nextButton.textContent = "Next 💕";
            nextButton.style.display = "block";
            nextButton.onclick = nextCard;
        }
    } else {
        if (nextButton) {
            nextButton.textContent = "See Wishes 🎉";
            nextButton.style.display = "block";
            nextButton.onclick = showWishes;
        }
    }
}

function addGifsToCards() {
    const cards = document.querySelectorAll(".reason-card");
    cards.forEach((card, index) => {
        if (!card.querySelector("img")) {
            if (index === 0 && gifUrls[0]) {
                const gifImg = document.createElement("img");
                gifImg.src = gifUrls;
                gifImg.onerror = () => {
                    gifImg.src = "https://via.placeholder.com/60?text=Content+Not+Available";
                };
                card.appendChild(gifImg);
            } else if (index === 0 && !card.querySelector(".extra-detail")) {
                const extraDetail = document.createElement("div");
                extraDetail.classList.add("extra-detail");
                extraDetail.textContent = card.getAttribute("data-extra");
                card.appendChild(extraDetail);
            }
        }
    });
}

// Questions logic setup
const nicknamePrompt = document.getElementById("nickname-prompt");
const nicknameInput = document.getElementById("nickname-input");
const nicknameSubmit = document.getElementById("nickname-submit");
const nicknameError = document.getElementById("nickname-error");

const hero = document.querySelector(".hero");
const storyline = document.querySelector(".storyline");
const wishes = document.querySelector(".wishes");

let currentQuestion = 1;
let wishesCompleted = false; // Track completion of wishes

hero.classList.add("hidden");
storyline.classList.add("hidden");
wishes.classList.add("hidden");

nicknameInput.focus();

nicknameSubmit.addEventListener("click", () => {
    const value = nicknameInput.value.trim().toLowerCase();

    if (currentQuestion === 1) {
        if (value === "sugli") {
            nicknameInput.value = "";
            nicknameError.style.display = "none";
            nicknameInput.placeholder = "Answer the friendship date...";
            nicknamePrompt.querySelector("h2").textContent = "aacha sugli ye to bta diya ab iska answer de ki wo konsi date thi jab humari friendship ko ek sal ho jaye ga";
            currentQuestion = 2;
            nicknameInput.focus();
        } else {
            nicknameError.textContent = "Galat jawab! Phir se try karo.";
            nicknameError.style.display = "block";
            nicknameInput.value = "";
            nicknameInput.focus();
        }
    } else if (currentQuestion === 2) {
        const validAnswers = ["23july", "july23", "23 july", "july 23"];
        if (validAnswers.includes(value.replace(/\s+/g, ''))) {
            nicknamePrompt.style.display = "none";
            hero.classList.remove("hidden");
            nicknameError.style.display = "none";
        } else {
            nicknameError.textContent = "Galat jawab hai! Dobara soch ke batao.";
            nicknameError.style.display = "block";
            nicknameInput.value = "";
            nicknameInput.focus();
        }
    }
});

nicknameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        nicknameSubmit.click();
    }
});

// Show Letter button and letter section
const showLetterButton = document.getElementById("show-letter-button");
const letterSection = document.getElementById("letter-section");

letterSection.classList.add("hidden");
showLetterButton.classList.add("hidden");

function showFinalMessage() {
    const finalMessage = document.getElementById("final-message");
    if (finalMessage) {
        finalMessage.style.display = "block";
        gsap.to(finalMessage, {
            duration: 2,
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "bounce.out",
            onComplete: () => {
                triggerConfetti();
                showLetterButton.classList.remove("hidden");
                wishesCompleted = true;
            }
        });
        for (let i = 0; i < 30; i++) {
            setTimeout(() => createBalloon(true), i * 150);
        }
    }
}

showLetterButton.addEventListener("click", () => {
    if (!wishesCompleted) {
        alert("Suglo kthi ro : phle wishes to puri hon de 🙄😒! ❤️");
        return;
    }
    letterSection.classList.remove("hidden");
    showLetterButton.classList.add("hidden");
});

// Fireworks animation for letter
const fireworksCanvas = document.getElementById("fireworks-canvas");
document.getElementById("show-fireworks").addEventListener("click", () => {
    fireworksCanvas.style.display = "block";
    fireworks(fireworksCanvas);

    setTimeout(() => {
        fireworksCanvas.style.display = "none";
    }, 4000);
});

function fireworks(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    let colors = ['#ff69b4','#ffd700','#00ff00','#ff0000','#0000ff','#f0f'];
    for(let i=0; i<7; i++){
        let theta = Math.random()*2*Math.PI;
        let radius = Math.random()*300+100;
        let x0 = canvas.width/2;
        let y0 = canvas.height/2;
        for(let j=0;j<30;j++){
            let angle = theta+(j/30)*2*Math.PI;
            let color = colors[Math.floor(Math.random()*colors.length)];
            particles.push({
                x: x0, y: y0, vx: Math.cos(angle)*radius/60, vy: Math.sin(angle)*radius/60,
                alpha: 1, color
            });
        }
    }
    let frame=0;
    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p=>{
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x,p.y,4,0,2*Math.PI);
            ctx.fillStyle = p.color;
            ctx.fill();
            p.x+=p.vx; p.y+=p.vy; p.alpha-=0.015;
        });
        particles = particles.filter(p=>p.alpha>0.05);
        frame++;
        if(frame<120){
            requestAnimationFrame(animate);
        }
    }
    animate();
}
//-----------------------------------
// Add these NEW FEATURES below your original code:
//-----------------------------------

// Sound effect helper (add these sound effects to your index.html as <audio> tags)
function playSFX(id) {
    const sfx = document.getElementById(id);
    if(sfx) { sfx.currentTime = 0; sfx.play(); }
}

// Cake Celebration Section Elements
const cakeSection = document.getElementById("cake-section");
const cakeContainer = document.getElementById("cake-container");
const cakeTimer = document.getElementById("cake-timer");
const cutCakeBtn = document.getElementById("cut-cake-btn");
const knifeContainer = document.getElementById("knife-container");
const cakeKnife = document.getElementById("cake-knife");
const sliceOverlay = document.getElementById("slice-overlay");

// Show Celebrate Button after Letter (add to your showLetterButton logic)
showLetterButton.addEventListener("click", () => {
    if (!wishesCompleted) {
        alert("Suglo kthi ro : phle wishes to puri hon de 🙄😒! ❤️");
        return;
    }
    letterSection.classList.remove("hidden");
    showLetterButton.classList.add("hidden");
    setTimeout(() => {
        if (!document.getElementById("celebrate-btn")) {
            const celebrateBtn = document.createElement("button");
            celebrateBtn.id = "celebrate-btn";
            celebrateBtn.textContent = "Celebrate!";
            celebrateBtn.className = "next-button";
            celebrateBtn.style.marginTop = "36px";
            celebrateBtn.onclick = showCake;
            letterSection.appendChild(celebrateBtn);
        }
    }, 10000);
});

function showCake() {
    letterSection.classList.add("hidden");
    cakeSection.style.display = "flex";
    cakeSection.classList.remove("hidden");
    cakeContainer.innerHTML = cakeHTML();
    cakeTimer.textContent = "";
    playSFX("sfx-cake-appear");
    let timerVal = 3;
    cakeTimer.textContent = `Blow to extinguish the candles! (${timerVal})`;
    const tmr = setInterval(() => {
        timerVal--;
        if (timerVal > 0) cakeTimer.textContent = `Blow to extinguish the candles! (${timerVal})`;
        else {
            clearInterval(tmr);
            cakeTimer.textContent = "Candles extinguished!";
            extinguishCandles();
            setTimeout(() => { showCelebration(); }, 1200);
        }
    }, 1000);
}

function cakeHTML() {
    return `
    <div style="position:relative;display:inline-block;">
    <svg viewBox="0 0 360 270" width="320" height="240" style="display:block; margin:auto;">
        <ellipse cx="180" cy="200" rx="100" ry="40" fill="#f9c9e3" stroke="#da66ae" stroke-width="3"/>
        <ellipse cx="180" cy="140" rx="80" ry="35" fill="#fffbe6" stroke="#e3bda5" stroke-width="3"/>
        <rect x="100" y="140" width="160" height="60" fill="#fffbe6" stroke="#e3bda5" stroke-width="3"/>
        <text x="180" y="185" text-anchor="middle" font-size="2rem" font-family="'Dancing Script', cursive" fill="#d148b8" stroke="#fff" stroke-width="1">Nitya</text>
        <!-- Candles with animated flames-->
        <g>
            <rect id="candle1" x="145" y="120" width="10" height="32" rx="4" fill="#6ed3ff"/>
            <ellipse id="flame1" cx="150" cy="115" rx="7" ry="11" class="cake-flame" style="fill:gold; opacity:1;"/>
            <rect id="candle2" x="175" y="115" width="10" height="37" rx="4" fill="#f7e56c"/>
            <ellipse id="flame2" cx="180" cy="111" rx="7" ry="11" class="cake-flame" style="fill:orange; opacity:1;"/>
            <rect id="candle3" x="205" y="120" width="10" height="32" rx="4" fill="#f99393"/>
            <ellipse id="flame3" cx="210" cy="115" rx="7" ry="11" class="cake-flame" style="fill:gold; opacity:1;"/>
        </g>
        <circle cx="135" cy="170" r="8" fill="#da66ae"/>
        <circle cx="220" cy="170" r="8" fill="#da66ae"/>
        <circle cx="180" cy="155" r="6" fill="#ffd700"/>
    </svg>
    </div>
    `;
}
function extinguishCandles() {
    let cakeSVG = cakeContainer.querySelector('svg');
    if (cakeSVG) {
        ["flame1", "flame2", "flame3"].forEach(f => {
            let flame = cakeSVG.getElementById(f);
            if (flame) flame.style.opacity = '0';
        });
    }
    playSFX("sfx-blow-candle");
}
function showCelebration() {
    cakeTimer.textContent = "Happy Birthday Nitya 🎂✨";
    showConfetti(); showFireworks(cakeContainer.offsetLeft + cakeContainer.offsetWidth/2, cakeContainer.offsetTop+120);
    playSFX("sfx-celebrate");
    let popper = document.createElement("span");
    popper.textContent = "🎉🎊";
    popper.className = "popper";
    popper.style = "font-size:3rem;position:absolute;top:32px;right:32px;animation:popperBounce 1s infinite;";
    cakeContainer.appendChild(popper);

    // Show Cut button after 2s
    setTimeout(() => { cutCakeBtn.style.display = "inline-block"; }, 2000);
}

// Confetti drops
function showConfetti() {
    for (let i = 0; i < 90; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.left = Math.random()*100 + 'vw';
        confetti.style.background = `hsl(${Math.random()*360},80%,60%)`;
        confetti.style.top = Math.random()*20 + 'px';
        confetti.style.transform = `rotate(${Math.random()*360}deg)`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2650);
    }
}
// Firework burst
function showFireworks(x = window.innerWidth / 2, y = window.innerHeight / 2) {
    for (let i = 0; i < 14; i++) {
        let dot = document.createElement('div');
        dot.classList.add('firework-dot');
        const angle = (i / 14) * Math.PI * 2;
        const dist = 70 + Math.random() * 30;
        dot.style.left = (x + Math.cos(angle)*dist) + 'px';
        dot.style.top = (y + Math.sin(angle)*dist) + 'px';
        dot.style.width = dot.style.height = (12 + Math.random()*10)+'px';
        dot.style.background = `hsl(${Math.random()*360},75%,65%)`;
        dot.style.zIndex = 350;
        document.body.appendChild(dot);
        setTimeout(()=>dot.remove(),1100);
    }
}



