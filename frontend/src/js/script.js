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
          backgroundColor: "#fff"
        }
      },
      x: {
        title: {
          display: true,
          text: "Horas",
        },
        ticks: {
          color: "#fff",
          backgroundColor: "#fff"
        }
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
