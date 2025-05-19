let dias = 0;
let inputRad = document.getElementsByName("cobranca");

function calcularDiferenca() {
  const resultRad = document.getElementsByName("cobranca");
  const dataInicial = new Date(document.getElementById("InpDataI").value);
  const dataFinal = new Date(document.getElementById("InpDataF").value);

  // Verifica se as datas são válidas
  if (isNaN(dataInicial) || isNaN(dataFinal)) {
    alert("Preencha os campos Data Inicial e Data Final.");
    return;
  }

  if (dataFinal < dataInicial) {
    alert("Erro: A data final não pode ser anterior à data inicial.");
    return;
  }
  // Calcula a diferença em milissegundos
  const diferenca = Math.abs(dataFinal - dataInicial);

  // Converte a diferença para dias
  dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));

  if (resultRad[0].checked) {
    dias += 1;
  }
  if (resultRad[1].checked) {
    if (dias === 0) {
      dias = 1;
    } else dias;
  }

  calculoProRata();
  // Exibe o resultado
  if (dias === 1) {
    document.getElementById(
      "resultDias"
    ).innerText = `Período de Locação:  ${dias} dia`;
    return;
  }
  document.getElementById(
    "resultDias"
  ).innerText = `Período de Locação:  ${dias} dias`;
}

function calculoProRata() {
  const valorTotal = document.getElementById("valor").value;
  let result = (valorTotal / 30) * dias;
  if (result === 0) {
    document.getElementById("butLimpar").style.display = "block";
    document.getElementById("calculo").innerHTML = "Recalcular";
    document.getElementById("resultPreco").style.display = "none";
    return;
  }
  document.getElementById("resultPreco").style.display = "block";
  document.getElementById("resultPreco").innerText = `R$ ${result
    .toFixed(2)
    .replace(".", ",")}`;
  document.getElementById("butLimpar").style.display = "block";
  document.getElementById("calculo").innerHTML = "Recalcular";
}

const limparTela = () => {
  document.getElementById("resultPreco").innerText = ``;
  document.getElementById("resultDias").innerText = "";
  document.getElementById("valor").value = "";
  document.getElementById("InpDataI").value = "";
  document.getElementById("InpDataF").value = "";
  document.getElementById("butLimpar").style.display = "none";
  document.getElementById("calculo").innerHTML = "Calcular";

  //Sempre que o usuário mudar de "devolução" para "Aditivo" o "SIM" ficar marcado.
  if (inputRad[1].checked) {
    inputRad[1].checked = false;
    inputRad[0].checked = true;
  }
};

function formatarDecimal() {
  var input = document.getElementById("valor");
  if (input.value) {
    // Formata o valor para sempre ter 2 casas decimais
    input.value = parseFloat(input.value).toFixed(2);
  }
}

function escolhaTipoProRata() {
  let resultDiv = document.getElementById("cobrado");
  let radio = document.querySelector('input[name="tipoPR"]:checked').value;
  if (radio === "aditivo") {
    resultDiv.style.display = "none";
  } else {
    resultDiv.style.display = "block";
  }
  //Sempre que o usuário mudar de "devolução" para "Aditivo" o "SIM" ficar marcado.
  if (inputRad[1].checked) {
    inputRad[1].checked = false;
    inputRad[0].checked = true;
  }
}
