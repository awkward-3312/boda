// ============================
// ABRIR INVITACIÓN
// ============================

const openEnvelope = document.getElementById("openEnvelope");
const invitationSection = document.getElementById("invitacion");
let envelopeAnimationTimer;

function startWeddingAudio() {
    const weddingAudio = document.getElementById("weddingAudio");

    if (!weddingAudio || !weddingAudio.paused) {
        return;
    }

    weddingAudio.play().catch(() => {
        // Some browsers wait for a user gesture before playing audio.
    });
}

if (openEnvelope && invitationSection) {
    openEnvelope.addEventListener("click", () => {
        startWeddingAudio();

        invitationSection.scrollIntoView({
            behavior: "smooth"
        });

        openEnvelope.setAttribute("aria-expanded", "true");

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        window.clearTimeout(envelopeAnimationTimer);

        envelopeAnimationTimer = window.setTimeout(() => {
            invitationSection.classList.remove("is-opening");
            void invitationSection.offsetWidth;
            invitationSection.classList.add("is-opening");

            envelopeAnimationTimer = window.setTimeout(() => {
                invitationSection.classList.remove("is-opening");
            }, 1800);
        }, 420);
    });
}

// ============================
// CUENTA REGRESIVA
// ============================

const weddingDate = new Date("2026-06-20T11:00:00");

const daysText = document.getElementById("days");
const hoursText = document.getElementById("hours");
const minutesText = document.getElementById("minutes");
const secondsText = document.getElementById("seconds");

function updateCountdown() {
    if (!daysText || !hoursText || !minutesText || !secondsText) {
        return;
    }

    const now = new Date();
    const difference = weddingDate - now;

    if (difference <= 0) {

        daysText.textContent = "00";
        hoursText.textContent = "00";
        minutesText.textContent = "00";
        secondsText.textContent = "00";

        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (difference % (1000 * 60)) /
        1000
    );

    daysText.textContent = days.toString().padStart(2, "0");
    hoursText.textContent = hours.toString().padStart(2, "0");
    minutesText.textContent = minutes.toString().padStart(2, "0");
    secondsText.textContent = seconds.toString().padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ============================
// MÚSICA
// ============================

const musicBtn = document.getElementById("musicBtn");
const weddingAudio = document.getElementById("weddingAudio");

function updateMusicButton(isPlaying) {
    if (!musicBtn) {
        return;
    }

    musicBtn.innerHTML = isPlaying
        ? '<i class="fa-solid fa-pause"></i> Pausar música'
        : '<i class="fa-solid fa-play"></i> Escuchar música';

    musicBtn.setAttribute("aria-pressed", isPlaying ? "true" : "false");
}

if (weddingAudio) {
    window.addEventListener("load", startWeddingAudio);

    weddingAudio.addEventListener("play", () => {
        updateMusicButton(true);
    });

    weddingAudio.addEventListener("pause", () => {
        updateMusicButton(false);
    });
}

if (musicBtn && weddingAudio) {

    musicBtn.addEventListener("click", () => {

        if (weddingAudio.paused) {
            startWeddingAudio();
        } else {
            weddingAudio.pause();
        }
    });
}

// ============================
// ANIMACIÓN AL HACER SCROLL
// ============================

const sections = document.querySelectorAll(".section");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.animate(
                    [
                        {
                            opacity: 0,
                            transform: "translateY(40px)"
                        },
                        {
                            opacity: 1,
                            transform: "translateY(0)"
                        }
                    ],
                    {
                        duration: 900,
                        easing: "ease-out",
                        fill: "forwards"
                    }
                );

                observer.unobserve(entry.target);
            }
        });

    }, {
        threshold: 0.15
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}
