// GET ------------------------------
function apiWeather() {
  const method = { method: "GET" };

  // API Requirements
  const apiKey = "e751f9a145c71d84d72fe26d64f76e35";
  const city = document.querySelector("#city").value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&appid=${apiKey}`;

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
      throw new Error("Erro ao buscar dados. Verifique a cidade digitada.");
    }
  }

  function handleData(data) {
    const textCloud = document.querySelector("#textCloud");
    if (Number(data.cloud) <= 40) {
      textCloud.textContent = `${data.cloud}% - Ideal para a placa solar`;
    } else if (Number(data.cloud) > 40 && Number(data.cloud) <= 70) {
      textCloud.textContent = `${data.cloud}% - Razoável para a placa solar`;
    } else {
      textCloud.textContent = `${data.cloud}% - Ruim para a placa solar`;
    }

    const textWeather = document.querySelector("#textWeather");
    if (data.climate === "Clear") {
      textWeather.textContent = `Céu limpo`;
    } else {
      textWeather.textContent = `Céu não está totalmente limpo`;
    }

    const textWindSpeed = document.querySelector("#textWindSpeed");
    if (Number(data.windSpeed) >= 7) {
      textWindSpeed.textContent = `${data.windSpeed}m/s - Ideal para a turbina eólica`;
    } else {
      textWindSpeed.textContent = `${data.windSpeed}m/s - Menos do que necessário para a turbina eólica`;
    }

    document.querySelector(
      "#textWindMaxSpeed"
    ).textContent = `${data.maxWindSpeed}m/s`;

    const textWindDirection = document.querySelector("#textWindDirection");
    if (data.windDeg == undefined) {
      textWindDirection.textContent = `Dado não encontrado`;
    } else {
      textWindDirection.textContent = `${data.windDeg}°`;
    }

    const textRain = document.querySelector("#textRain");
    if (data.climate == "Rain") {
      textRain.textContent = "Está chuvendo, isso é bom para a hidrelétrica";
    } else {
      textRain.textContent = "Sem chuva, talvez a hidrelétrica seja afetada";
    }

    document.querySelector(
      "#textAmountRain"
    ).textContent = `${data.amountRain}mm`;

    // Take out the error
    document.querySelector("#weatherError").textContent = "";
  }

  function handleError(error) {
    document.querySelector("#weatherError").textContent = error;
  }

  function runWeather() {
    fetch(url, method).then(handleResponse).then(handleData).catch(handleError);
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

  return runWeather();
}

// POST - Flask -----------------------------
function apiFromFlask() {
  const method = "POST";
  const url = "https://kaayo.pythonanywhere.com";
  const resource = "/calcular";
  const headers = { "Content-Type": "application/json" };
  const body = JSON.stringify({ question: titles, answer: values });

  async function handleRes(res) {
    if (!res.ok) {
      throw new Error("Alguma coisa deu errado!");
    }

    return res.json();
  }

  function handleData(data) {
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

    const divider = '<div class="w-full h-1 my-2 bg-yellow rounded-lg"></div>';

    tips.forEach(
      (tip) =>
        (document.querySelector("#listResult").innerHTML += `
              <li class="text-balance">${tip}</li>
              ${divider}
            `)
    );

    // Take out the error
    document.querySelector("#testError").textContent = "";
  }

  function handleError(error) {
    document.querySelector(
      "#testError"
    ).textContent = `${error} - Reinicie a página e tente novamente`;
  }

  function flaskRun() {
    fetch(url + resource, { method: method, headers: headers, body: body })
      .then(handleRes)
      .then(handleData)
      .catch(handleError);
  }

  return flaskRun();
}
