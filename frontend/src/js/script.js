// Grafic
new Chart(document.getElementById("myChart"), {
  type: "line",
  data: {
    labels: ["1", "12", "24"],
    datasets: [
      {
        label: "Gás natural",
        data: [1.9, 22.8, 45.6],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        fill: false,
      },
      {
        label: "Carvão",
        data: [2.4, 28.8, 57.6],
        borderColor: "#FFD700",
        tension: 0.1,
        fill: false,
      },
      {
        label: "Energia Solar",
        data: [0, 0, 0],
        borderColor: "#fff",
        tension: 0.1,
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Quantidade de carbono produzido",
        color: "#fff",
      },
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Carbono (Kg/CO₂)",
          color: "#fff",
        },
        ticks: {
          color: "#fff",
          backgroundColor: "#fff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          borderColor: "#fff",
        },
      },
      x: {
        title: {
          display: true,
          text: "Horas",
          color: "#fff",
        },
        ticks: {
          color: "#fff",
          backgroundColor: "#fff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Cor das linhas do grid
          borderColor: "white", // Cor da borda do eixo
        },
      },
    },
  },
});

// Inicialize AOS
AOS.init();

// Navbar
const navItem = document.querySelectorAll("nav ul li a");

navItem.forEach((item) => {
  item.addEventListener("click", () => {
    navItem.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
  });
});

// Open and Close Menu
const menuButton = document.querySelector("#menu-button i");
const navLinks = document.querySelector("#nav-links");

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("hidden");
  if (menuButton.classList.contains("bi-justify-right")) {
    menuButton.classList.remove("bi-justify-right");
    menuButton.classList.add("bi-x");
  } else {
    menuButton.classList.remove("bi-x");
    menuButton.classList.add("bi-justify-right");
  }
});

// Form
let i = 0;

const titles = [
  "Você desliga aparelhos e luzes quando não está usando?",
  "Você usa transporte público ou bicicleta com frequência?",
  "Você costuma comer carne todos os dias?",
  "Você utiliza sempre o gás de cozinha para preparar suas refeições?",
  "Você normalmente recicla seu lixo?",
  "Você consome muitos produtos embalados ou descartáveis?",
];

const values = [];

const btnBack = document.querySelector("#modalBack");
btnBack.addEventListener("click", () => {
  if (i > 0) {
    i -= 1;
    document.querySelector("#modalTitle").textContent = titles[i];
    values.pop();
  } else {
    document.querySelector("#modal").close();
  }
});

document.querySelector("#formAnswer").addEventListener("submit", (e) => {
  e.preventDefault();

  const selectedRadio = document.querySelector('input[name="answer"]:checked');
  if (selectedRadio) {
    values.push(selectedRadio.value);
  }

  i += 1;
  if (i < titles.length) {
    document.querySelector("#modalTitle").textContent = titles[i];
  } else {
    document.querySelector("#modal").close();
  }

  // Reset the selected input
  document.querySelectorAll('input[name="answer"]').forEach((input) => {
    input.checked = false;
  });

  if (values.length === 6) {
    apiFromFlask();

    // Take out the button when the form is submit
    document.querySelector("#btnOpenForm").classList.add("hidden");
  }
});

// 3D Shadow
(() => {
  const modelViewer = document.querySelector(".shadow3D");
  const time = performance.now();

  const oscillate = (min, max, period, time) => {
    const middle = min + (max - min) / 2;
    const amplitude = (max - min) / 2;
    return middle + amplitude * Math.sin((time * 2 * Math.PI) / period);
  };

  const animate = (now) => {
    modelViewer.shadowIntensity = oscillate(0, 2, 4000, now - time);
    requestAnimationFrame(animate);
  };

  animate();
})();

// Carousel
let index = 0;
const slides = document.querySelectorAll("#carousel > div");
const totalSlides = slides.length;

function updateCarousel() {
  const offset = -index * 100;
  document.querySelector(
    "#carousel"
  ).style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  index = (index + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  index = (index - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

// Toggle Icon
document.querySelectorAll(".chevronToX").forEach((button) => {
  button.addEventListener("click", () => {
    // Close the other card
    document.querySelectorAll(".growCard").forEach((card) => {
      if (card !== button.closest(".growCard")) {
        const texto = card.querySelector(".benefit-text");
        texto.classList.remove("max-h-96", "opacity-100", "mt-4");
        texto.classList.add("max-h-0", "opacity-0");

        const outroIcon = card.querySelector("i");
        outroIcon.classList.remove("rotate-180");
        outroIcon.classList.remove("fa-xmark");
        outroIcon.classList.add("fa-chevron-down");
      }
    });

    const icon = button.querySelector("i");
    if (icon.classList.contains("fa-chevron-down")) {
      icon.classList.remove("fa-chevron-down");
      icon.classList.add("fa-xmark", "rotate-180");
    } else {
      icon.classList.remove("fa-xmark", "rotate-180");
      icon.classList.add("fa-chevron-down");
    }

    const textCard = button.closest(".flex-col").querySelector(".benefit-text");
    if (textCard.classList.contains("max-h-0")) {
      textCard.classList.remove("max-h-0", "opacity-0");
      textCard.classList.add("max-h-96", "opacity-100", "mt-4");
    } else {
      textCard.classList.remove("max-h-96", "opacity-100", "mt-4");
      textCard.classList.add("max-h-0", "opacity-0");
    }
  });
});

// Open Weather
document.querySelector("#weatherApiBtn").addEventListener("click", () => {
  apiWeather();
});

// Contact Form
document.querySelector("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
});
