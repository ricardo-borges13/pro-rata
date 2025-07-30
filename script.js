const versao = 5.6;
let dias = 0;
let result;
let diaInicial;
let mesInicial;
let anoInicial;
let diaFinal;
let mesFinal;
let anoFinal;
let inputRad = document.getElementsByName("cobranca");
document.getElementById("ano").textContent = new Date().getFullYear();

const cssLink = document.getElementById("css-link");
cssLink.href = `style.css?v=${versao}`;

const jsScript = document.getElementById("js-script");
jsScript.src = `script.js?v=${versao}`;

document.getElementById("markVersao").innerHTML = `Versão ${versao}`;

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
    Swal.fire({
    title: '⚠️ Atenção!',
    html: 'Preencha os campos <b>Data Inicial</b> e <b>Data Final</b>.',
    // icon: 'warning',
    confirmButtonText: 'Entendi',
    confirmButtonColor: '#d33', 
    timer: 7000,
    });
    return;
  }
  
  if (dataFinal < dataInicial) {
       Swal.fire({
    title: '⚠️ Atenção!',
    html: 'A <b>Data Final</b> não pode ser <u>anterior</u> à <b>Data Inicial</b>.',
    // icon: 'warning',
    confirmButtonText: 'Entendi',
    confirmButtonColor: '#d33', 
    timer: 7000,
    });
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
  const result = document.getElementById("resultDias");
  dias === 1
    ? (result.innerHTML = `Período de Locação: <span id='spanDias'>  ${dias} dia </span>`)
    : (result.innerHTML = `Período de Locação: <span id='spanDias'>  ${dias} dias </span>`);
}

function calculoProRata() {
  const valorTotal = document.getElementById("inputValor").value;
  result = (valorTotal / 30) * dias;
  if (result === 0) {
    document.querySelector(".divLimpar").style.display = "block";
    document.querySelector(".divLimpar").classList.add("show");
    document.getElementById("butLimpar").style.display = "block";

    document.getElementById("calculo").innerHTML = `➩ Recalcular`;
    document.getElementById("resultPreco").style.display = "none";
    document.querySelector(".divResult").style.display = "block";
    return;
  }
  document.querySelector(".divLimpar").style.display = "block";
  document.querySelector(".divLimpar").classList.add("show");
  document.querySelector(".divResult").style.display = "block";
  document.getElementById("resultPreco").style.display = "block";
  document.getElementById("resultPreco").innerText = `R$ ${result
    .toFixed(2)
    .replace(".", ",")}`;
  document.getElementById("butLimpar").style.display = "block";
  document.getElementById("calculo").innerHTML = "➩ Recalcular";
  document.querySelector(".btnCopiar").style.display = "block";
  document.querySelector(".btnCopiar").innerHTML = "📋 Copiar";
  document.querySelector(".help").style.display = "block";
}

const limparTela = () => {
  document.getElementById("resultPreco").innerText = ``;
  document.getElementById("resultDias").innerText = "";
  document.getElementById("inputValor").value = "";
  document.getElementById("InpDataI").value = "";
  document.getElementById("InpDataF").value = "";
  document.getElementById("butLimpar").style.display = "none";
  document.getElementById("calculo").innerHTML = "➩ Calcular";
  document.querySelector(".btnCopiar").style.display = "none";
  document.querySelector(".btnCopiar").innerHTML = "📋 Copiar";
  document.querySelector(".help").style.display = "none";
  document.querySelector(".divResult").style.display = "none";
  document.querySelector(".divLimpar").classList.remove("show");

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

const botaoCopiar = document.querySelector(".btnCopiar");

botaoCopiar.addEventListener("click", function () {
  const textoDias = document.getElementById("resultDias").innerText;
  const textoPreco = document.getElementById("resultPreco").innerText;
  const textoCompleto = `Valor proporcional correspondente a ${dias} dias de locação de "X" equipamentos de radiocomunicação, de ${diaInicial}/${mesInicial}/${anoInicial} a ${diaFinal}/${mesFinal}/${anoFinal} - Valor: R$ ${result
    .toFixed(2)
    .replace(".", ",")}`;

   // Copia para a área de transferência
  navigator.clipboard
    .writeText(textoCompleto)
    .then(() => {
      // Altera o texto do botão temporariamente
      botaoCopiar.innerHTML = "✔️ Copiado!";
      
      // Retorna ao texto original após 2 segundos (2000ms)
      setTimeout(() => {
        botaoCopiar.innerHTML = "📋 Copiar";
      }, 2000);
    })
    .catch((err) => {
      console.error("Erro ao copiar: ", err);
      botaoCopiar.innerHTML = "❌ Erro";
      setTimeout(() => {
        botaoCopiar.innerHTML = "📋 Copiar";
      }, 2000);
    });
});

const tooltip = document.getElementById("tooltip");
function toggleTooltip() {
  tooltip.style.display = tooltip.style.display === "block" ? "none" : "block";
}

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("help")) {
    tooltip.style.display = "none";
  }
});
