// Grafic
const ctx = document.getElementById("myChart");

new Chart(ctx, {
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
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Carbono (Kg/CO₂)",
        },
        ticks: {
          color: "#fff",
          backgroundColor: "#fff",
        },
      },
      x: {
        title: {
          display: true,
          text: "Horas",
        },
        ticks: {
          color: "#fff",
          backgroundColor: "#fff",
        },
      },
    },
  },
});

// Form
let i = 0;

const titles = [
  "Você desliga aparelhos e luzes quando não está usando?",
  "Você usa transporte público ou bicicleta com frequência?",
  "Você costuma comer carne todos os dias?",
  "Você utiliza sempre o gás de cozinha para preparar suas refeições?",
  "Você normalmente recicla seu lixo?",
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
  console.log(values);
});

document.querySelector("#firstAnswer").addEventListener("submit", (e) => {
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
  console.log(values);

  if (values.length === 5) {
    fetch("http://localhost:5000/calcular", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: titles, answer: values }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Alguma coisa deu errado!");
        }
        return res.json();
      })
      .then((data) => {
        console.log(`Deu certo: ${data}`);
      })
      .catch((error) => {
        console.error(`Erro: ${error}`);
      });
  }
});

// Carousel
let index = 0;
const slides = document.querySelectorAll("#carousel > div");
const totalSlides = slides.length;

function updateCarousel() {
  const offset = -index * 100;
  document.getElementById(
    "carousel"
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
document.querySelectorAll(".chevronToX").forEach(button => {
  button.addEventListener("click", () => {
    // Fecha todos os outros cards primeiro
    document.querySelectorAll(".growCard").forEach(card => {
      if (card !== button.closest(".growCard")) {
        // Reseta o texto
        const texto = card.querySelector(".benefit-text");
        texto.classList.remove("max-h-96", "opacity-100", "mt-4");
        texto.classList.add("max-h-0", "opacity-0");
        
        // Reseta o ícone
        const outroIcon = card.querySelector("i");
        outroIcon.classList.remove("rotate-180");
        outroIcon.classList.remove("fa-xmark");
        outroIcon.classList.add("fa-chevron-down");
      }
    });

    // Trata o card atual
    const icon = button.querySelector('i');
    if (icon.classList.contains('fa-chevron-down')) {
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-xmark', 'rotate-180');
    } else {
      icon.classList.remove('fa-xmark', 'rotate-180');
      icon.classList.add('fa-chevron-down');
    }
    
    const textCard = button.closest('.flex-col').querySelector('.benefit-text');
    if (textCard.classList.contains('max-h-0')) {
      textCard.classList.remove('max-h-0', 'opacity-0');
      textCard.classList.add('max-h-96', 'opacity-100', 'mt-4');
    } else {
      textCard.classList.remove('max-h-96', 'opacity-100', 'mt-4');
      textCard.classList.add('max-h-0', 'opacity-0');
    }
  });
});

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
const navLinks = document.getElementById("nav-links");

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
