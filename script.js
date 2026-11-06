const btnTema = document.querySelector("#btn-tema");
const inputHoras = document.querySelector("#horas");
const selectTipo = document.querySelector("#tipo");
const btnCalcular = document.querySelector("#btn-calcular");
const resultado = document.querySelector("#resultado");
const inputNome = document.querySelector("#nome");
const btnAdicionar = document.querySelector("#btn-adicionar");
const listaReservas = document.querySelector("#lista-reservas");
const contador = document.querySelector("#contador");

function calcularValor(horas, tipo) {
  let valor;
  if (tipo === "urbana") {
    valor = 12;
  } else if (tipo === "eletrica") {
    valor = 20;
  } else {
    valor = 25;
  }

  if (horas > 5) {
    valor = valor * 0.9;
  }
  return valor * horas;
}

function formatarMoeda(valor) {
  return valor
    .toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      useGrouping: false,
    })
    .replace(/\u00A0/g, " ");
}

function mostrarResultado() {
  const horas = Number(inputHoras.value);
  const tipo = selectTipo.value;

  if (!inputHoras.value || isNaN(horas) || horas <= 0) {
    resultado.textContent = "Informe um número de horas válido";
    return;
  }

  const total = calcularValor(horas, tipo);
  resultado.textContent = formatarMoeda(total);
}

function atualizarContador() {
  contador.textContent = listaReservas.children.length;
}

function salvarReservas() {
  const nomes = [];
  for (const li of listaReservas.children) {
    nomes.push(li.dataset.nome);
  }
  localStorage.setItem("reservasEcoBike", JSON.stringify(nomes));
}

function criarReserva(nome) {
  const li = document.createElement("li");
  li.textContent = nome;
  li.dataset.nome = nome;

  const remover = document.createElement("button");
  remover.textContent = "Remover";
  remover.style.backgroundColor = "#c93636";

  remover.addEventListener("click", function () {
    li.remove();
    atualizarContador();
    salvarReservas();
  });

  li.appendChild(remover);
  listaReservas.appendChild(li);
}

function adicionarReserva() {
  const nome = inputNome.value.trim();
  if (nome === "") return;

  criarReserva(nome);

  inputNome.value = "";
  atualizarContador();
  salvarReservas();
}

function carregarReservas() {
  let nomes = [];
  try {
    nomes = JSON.parse(localStorage.getItem("reservasEcoBike")) || [];
  } catch (erro) {
    nomes = [];
  }

  for (const nome of nomes) {
    criarReserva(nome);
  }
  atualizarContador();
}

function alternarTema() {
  document.body.classList.toggle("dark");
  const escuro = document.body.classList.contains("dark");
  localStorage.setItem("temaEcoBike", escuro ? "escuro" : "claro");
}

function carregarTema() {
  if (localStorage.getItem("temaEcoBike") === "escuro") {
    document.body.classList.add("dark");
  }
}

btnCalcular.addEventListener("click", mostrarResultado);
btnAdicionar.addEventListener("click", adicionarReserva);
btnTema.addEventListener("click", alternarTema);

carregarReservas();
carregarTema();
