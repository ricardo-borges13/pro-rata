let dias = 0;
let result;
let diaInicial;
let mesInicial;
let anoInicial;
let diaFinal;
let mesFinal;
let anoFinal;
let inputRad = document.getElementsByName("cobranca");

function buscarCamposDate() {
  const dataInputInicial = document.getElementById("InpDataI").value;
  const dataInputFinal = document.getElementById("InpDataF").value;
  const [anoI, mesI, diaI] = dataInputInicial.split("-");
  const [anoF, mesF, diaF] = dataInputFinal.split("-");
  diaInicial = diaI;
  mesInicial = mesI;
  anoInicial = anoI;
  diaFinal = diaF;
  mesFinal = mesF;
  anoFinal = anoF;  
}

function calcularDiferenca() {
  const resultRad = document.getElementsByName("cobranca");
  const dataInicial = new Date(document.getElementById("InpDataI").value);
  const dataFinal = new Date(document.getElementById("InpDataF").value);
  buscarCamposDate();

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
  ).innerText = `Período de Locação: ${dias} dias`;
}

function calculoProRata() {
  const valorTotal = document.getElementById("inputValor").value;
  result = (valorTotal / 30) * dias;
  if (result === 0) {
    document.getElementById("butLimpar").style.display = "block";
    document.getElementById("calculo").innerHTML = "➩ Recalcular";
    document.getElementById("resultPreco").style.display = "none";
    return;
  }
  document.getElementById("resultPreco").style.display = "block";
  document.getElementById("resultPreco").innerText = `R$ ${result
    .toFixed(2)
    .replace(".", ",")}`;
  document.getElementById("butLimpar").style.display = "block";
  document.getElementById("calculo").innerHTML = "➩ Recalcular";
  document.getElementById("btnCopiar").style.display = "block";
  document.getElementById("btnCopiar").innerHTML = "📋 Copiar";
}

const limparTela = () => {
  document.getElementById("resultPreco").innerText = ``;
  document.getElementById("resultDias").innerText = "";
  document.getElementById("inputValor").value = "";
  document.getElementById("InpDataI").value = "";
  document.getElementById("InpDataF").value = "";
  document.getElementById("butLimpar").style.display = "none";
  document.getElementById("calculo").innerHTML = "➩ Calcular";
  document.getElementById("btnCopiar").style.display = "none";
  document.getElementById("btnCopiar").innerHTML = "📋 Copiar";

  //Sempre que o usuário mudar de "devolução" para "Aditivo" o "SIM" ficar marcado.
  if (inputRad[1].checked) {
    inputRad[1].checked = false;
    inputRad[0].checked = true;
  }
};

function formatarDecimal() {
  var input = document.getElementById("inputValor");
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

const botaoCopiar = document.getElementById("btnCopiar");

botaoCopiar.addEventListener("click", function () {
  const textoDias = document.getElementById("resultDias").innerText;
  const textoPreco = document.getElementById("resultPreco").innerText;
  const textoCompleto = `Valor proporcional correspondente a ${dias} dias de locação de "X" equipamentos de radiocomunicação, de ${diaInicial}/${mesInicial}/${anoInicial} a ${diaFinal}/${mesFinal}/${anoFinal} - Valor: R$ ${result
    .toFixed(2)
    .replace(".", ",")}`;

  navigator.clipboard
    .writeText(textoCompleto)
    .then(() => {
      document.getElementById("btnCopiar").innerHTML = "✔️ Copiado";
    })
    .catch((err) => {
      console.error("Erro ao copiar: ", err);
    });
});
