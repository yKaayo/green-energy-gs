// API
document.getElementById("firstAnswer").addEventListener("submit", (e) => {
  e.preventDefault();

  const selectedRadio = document.querySelector('input[name="answer1"]:checked');

  if (!selectedRadio) {
    alert("Por favor, selecione uma opção");
    return;
  }

  const dados = {
    answer1: selectedRadio.value,
  };

  fetch("http://localhost:5000/calcular", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
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
});

function showModal(modalId) {
  // Fecha todos os modais
  document
    .querySelectorAll(".modal")
    .forEach((modal) => modal.classList.remove("modal-open"));

  // Abre o modal específico
  document.getElementById(modalId).classList.add("modal-open");
}
