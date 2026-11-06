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
