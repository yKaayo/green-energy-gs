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
  console.log(values);
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
    fetch("https://kaayo.pythonanywhere.com/calcular", {
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
        console.log("Dados recebidos:", data);

        document.querySelector(
          "#resultTitle"
        ).innerHTML = `Seu perfil é <span class="text-yellow">${data.rating}</span>`;

        document.querySelector(
          "#resultSubtitle"
        ).innerHTML = `Com base nas suas respostas, você gera aproximadamente <span class="font-semibold">${Number(
          data.media_emissoes
        ).toFixed(2)}Kg</span> de carbono por dia`;

        if (data.rating === "Desperdiçador") {
          document.querySelector("#resultContent").innerHTML = `<p></p>`;
        } else if (data.rating === "Equilibrado") {
          document.querySelector("#resultContent").innerHTML = `<p></p>`;
        } else if (data.rating === "Sustentável") {
          document.querySelector("#resultContent").innerHTML = `<p></p>`;
        }

        document.querySelector(
          "#textTips"
        ).textContent = `Algumas dicas para você!`;

        const tips = [
          "Verifique se seus eletrônicos possuem modo de espera de baixo consumo e utilize extensões com interruptor para desligar vários aparelhos de uma vez.",
          "Planeje suas rotas para o uso transporte coletivos e incentive seus amigos e familiares a fazerem o mesmo",
          "Aumente o consumo de legumes e frutas",
          "Se utilizar o gás, procure ajustar a chama para o tamanho adequado da panela e desligar o fogo alguns minutos antes do término do cozimento",
          "Separe corretamente os materiais recicláveis (papel, plástico, vidro, metal) e procure pontos de coleta próximos à sua casa",
          "Leve suas próprias sacolas para as compras e evite produtos descartáveis",
        ];

        const divider =
          '<div class="w-full h-1 my-2 bg-yellow rounded-lg"></div>';

        tips.forEach(
          (tip) =>
            (document.querySelector("#listResult").innerHTML += `
              <li class="text-balance">${tip}</li>
              ${divider}
            `)
        );
      })
      .catch((error) => {
        console.error(`Erro: ${error}`);
      });

    // Take out the button when the form is submit
    document.querySelector("#btnOpenForm").classList.add("hidden");
  }
});

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
    // Fecha todos os outros cards primeiro
    document.querySelectorAll(".growCard").forEach((card) => {
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

// Contact Form
document.querySelector("#contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
});

// Open Weather
document.querySelector("#weatherApiBtn").addEventListener("click", () => {
  const city = document.querySelector("#city").value;
  console.log(city);

  async function handleResponse(res) {
    if (res.ok) {
      const json = await res.json();

      // If doesn't exist accumulated rain
      let amountRainData = 0;

      if (json.rain && json.rain["1h"]) {
        amountRainData = json.rain["1h"];
      }

      return new Weather(
        json.clouds.all,
        json.weather[0].main,
        json.wind.speed,
        json.wind.deg,
        json.wind.gust,
        amountRainData
      );
    } else {
      throw new Error(
        "Erro ao buscar dados da API. Verifique a cidade digitada."
      );
    }
  }
  class Weather {
    constructor(cloud, climate, windSpeed, maxWindSpeed, windDeg, amountRain) {
      (this.cloud = cloud),
        (this.climate = climate),
        (this.windSpeed = windSpeed),
        (this.maxWindSpeed = maxWindSpeed),
        (this.windDeg = windDeg);
      this.amountRain = amountRain;
    }
  }

  function handleData(data) {
    console.log("Dados do Clima:", data);

    if (Number(data.cloud) <= 40) {
      document.querySelector(
        "#textCloud"
      ).textContent = `${data.cloud}% - Ideal para a placa solar`;
    } else if (Number(data.cloud) > 40 && Number(data.cloud) <= 70) {
      document.querySelector(
        "#textCloud"
      ).textContent = `${data.cloud}% - Razoável para a placa solar`;
    } else {
      document.querySelector(
        "#textCloud"
      ).textContent = `${data.cloud}% - Ruim para a placa solar`;
    }

    if (data.climate === "Clear") {
      document.querySelector("#textWeather").textContent = `Céu limpo`;
    } else {
      document.querySelector(
        "#textWeather"
      ).textContent = `Céu não está totalmente limpo`;
    }

    if (Number(data.windSpeed) >= 7) {
      document.querySelector(
        "#textWindSpeed"
      ).textContent = `${data.windSpeed}m/s - Ideal para a turbina eólica`;
    } else {
      document.querySelector(
        "#textWindSpeed"
      ).textContent = `${data.windSpeed}m/s - Menos do que necessário para a turbina eólica`;
    }

    document.querySelector(
      "#textWindMaxSpeed"
    ).textContent = `${data.maxWindSpeed}m/s`;

    if (data.windDeg == undefined) {
      document.querySelector(
        "#textWindDirection"
      ).textContent = `Dado não encontrado`;
    } else {
      document.querySelector(
        "#textWindDirection"
      ).textContent = `${data.windDeg}°`;
    }

    if (data.climate == "Rain") {
      document.querySelector("#textRain").textContent =
        "Está chuvendo, isso é bom para a hidrelétrica";
    } else {
      document.querySelector("#textRain").textContent =
        "Sem chuva, talvez a hidrelétrica seja afetada";
    }

    document.querySelector(
      "#textAmountRain"
    ).textContent = `${data.amountRain}mm`;
  }

  function handleError(error) {
    console.error("Erro:", error.message);
    // document.querySelector("#result").innerHTML = `
    //   <p style="color: red;">${error.message}</p>
    // `;
  }

  function run() {
    const apiKey = "e751f9a145c71d84d72fe26d64f76e35";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&appid=${apiKey}`;

    fetch(url).then(handleResponse).then(handleData).catch(handleError);
  }

  run();
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
