//Configurações do menu
var btn = document.querySelector('#menu-btn')
var menu = document.querySelector('#menu-list')

btn.addEventListener('click', function () {
  menu.classList.toggle('expandir')
})

//Configurações do modal
// Seleciona o botão e o modal
var btnModal = document.getElementById("btn-add");
var modal = document.getElementById("modal");

// Seleciona o elemento que fecha o modal
var closeBtn = document.getElementsByClassName("close")[0];

// Quando o usuário clicar no botão, o modal é exibido
btnModal.onclick = function () {
  modal.style.display = "block";
}

// Quando o usuário clicar no elemento de fechar, o modal é ocultado
closeBtn.onclick = function () {
  modal.style.display = "none";
}

// Quando o usuário clicar fora do modal, ele é ocultado
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//Configurações da tabela

// Botão de adicionar do modal
var addBtn = document.getElementById("btn-adc");

//Seleciona a tabela e o corpo dela
var table = document.getElementById("table");
var tbody = table.getElementsByTagName("tbody")[0];

// Botão para excluir dados selecionados
var deleteBtn = document.getElementById("btn-delete");

// Botão para gerar o relatório
var relatorioBtn = document.getElementById("btn-relatorio");

// Função para excluir dados selecionados
deleteBtn.onclick = function () {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

  checkboxes.forEach(function (checkbox) {
    var row = checkbox.closest('tr'); // encontra a linha pai do checkbox
    row.parentNode.removeChild(row); // remove a linha da tabela
  });
}

// Gera o relatório
relatorioBtn.onclick = function () {
  var relatorio = "Relatório:\n\n";

  // Itera sobre as linhas da tabela
  var rows = tbody.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    var cells = rows[i].getElementsByTagName("td");
    for (var j = 1; j < cells.length; j++) { // Começa de 1 para ignorar a primeira célula do checkbox
      relatorio += cells[j].textContent + "\t"; // Adiciona o conteúdo da célula ao relatório
    }
    relatorio += "\n";
  }

  // Exibe o relatório com alert
  alert(relatorio);
}

// Função para mudar a cor da linha selecionada
tbody.addEventListener("click", function (event) {
  var targetRow = event.target.closest("tr"); // Obtém a linha clicada

  // Remove a classe de seleção de todas as linhas
  var rows = tbody.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    rows[i].classList.remove("selected");
  }

  // Adiciona a classe de seleção à linha clicada
  targetRow.classList.add("selected");
});

//get alimentos
let alimentos = []
let qtdUnidade = new Array(alimentos.length).fill(0)
fetch('http://localhost:5555/getAllAlimentos')
  .then((res) => {
    return res.json();
  })
  .then((data) => {

    for (let i = 0; i < data.length; i++) {

      if (alimentos.includes(data[i].nome)) {
        let d = 0;
      } else {
        alimentos.push(data[i].nome)
      }

    }

    //verificando qtd de cada alimento 

    let h = new Array(alimentos.length).fill(0)
    for (let i = 0; i < data.length; i++) {
      let alimentoMinusculo = data[i].nome.toLowerCase()

      let alimentoFormatado = alimentoMinusculo
        .replace(/[áàãâä]/g, 'a')
        .replace(/[éèêë]/g, 'e')
        .replace(/[íìîï]/g, 'i')
        .replace(/[óòõôö]/g, 'o')
        .replace(/[úùûü]/g, 'u')
        .replace(/[ç]/g, 'c');

      console.log(alimentoFormatado)
      for (let j = 0; j < h.length; j++) {
        if (alimentoFormatado === alimentos[j]) {
          h[j] = h[j] + 1;
        }
      }
    }

    for (let i = 0; i < alimentos.length; i++) {
      const nomeAlimento = `
      <p>${alimentos[i]}</p>
      <hr>
      `

      const Quantidade = `
      <p>${h[i]}</p>
      <hr>
      `
      document.querySelector("#nomeAlimento").insertAdjacentHTML("beforeend", nomeAlimento)
      document.querySelector("#Quantia").insertAdjacentHTML("beforeend", Quantidade)
    }

    //adicionando grafico
    criarGrafico(h);
  })

//grafico
function criarGrafico(data_qtd) {

  var tagGrafico = document.getElementById('myChart').getContext('2d');

  var myChart = new Chart(tagGrafico, {
    type: 'bar',
    data: {
      labels: alimentos,
      datasets: [{
        label: '# of Votes',
        data: data_qtd,
        backgroundColor: [
          "#FFA500CC", "#800080CC", "#00FFFFCC", "#FFD700CC", "#FF0000CC",
          "#00FF7FCC", "#FF8C00CC", "#FF6347CC", "#800080CC", "#FFA500CC",
          "#FF6347CC", "#FF6347CC", "#FF6347CC", "#FF6347CC", "#800080CC",
          "#800080CC", "#4682B4CC", "#FF6347CC", "#FF6347CC", "#FF6347CC",
          "#FF6347CC", "#4682B4CC", "#FFD700CC", "#800080CC", "#FF6347CC",
          "#FF0000CC", "#FF0000CC", "#800080CC", "#FF6347CC", "#FFA500CC",
          "#FF0000CC", "#FF6347CC", "#FF6347CC", "#FF0000CC", "#FFA500CC",
          "#FF0000CC", "#00FF7FCC", "#FFA500CC", "#800080CC", "#FF0000CC",
          "#800080CC", "#FFA500CC", "#800080CC", "#FF6347CC", "#FFA500CC",
          "#00FFFFCC", "#00FF7FCC", "#800080CC", "#FF6347CC", "#FFA500CC",
          "#FFA500CC", "#800080CC", "#FF6347CC", "#800080CC", "#FFD700CC",
          "#FFA500CC", "#800080CC", "#FF6347CC", "#FFA500CC", "#800080CC",
          "#00FFFFCC", "#FFA500CC", "#FFA500CC", "#FF0000CC", "#FFD700CC",
          "#FF6347CC", "#FF6347CC", "#FFD700CC", "#FF6347CC", "#FF0000CC",
          "#FF0000CC", "#FFD700CC", "#800080CC", "#FF6347CC", "#FFA500CC",
          "#00FF7FCC", "#FF0000CC", "#FFA500CC", "#800080CC", "#FF6347CC",
          "#800080CC", "#FF0000CC", "#FF0000CC", "#800080CC", "#FFA500CC",
          "#FF6347CC", "#FFA500CC", "#FF6347CC", "#800080CC", "#00FFFFCC",
          "#FF0000CC", "#FFA500CC", "#FFD700CC", "#FF6347CC", "#FF6347CC",
          "#FFA500CC", "#FFA500CC", "#FF0000CC", "#FFA500CC", "#FFA500CC",
          "#FF0000CC", "#800080CC", "#FF6347CC", "#FFA500CC", "#FF6347CC"
        ],
        borderColor: [
          "#FFA500", "#800080", "#00FFFF", "#FFD700", "#FF0000",
          "#00FF7F", "#FF8C00", "#FF6347", "#800080", "#FFA500",
          "#FF6347", "#FF6347", "#FF6347", "#FF6347", "#800080",
          "#800080", "#4682B4", "#FF6347", "#FF6347", "#FF6347",
          "#FF6347", "#4682B4", "#FFD700", "#800080", "#FF6347",
          "#FF0000", "#FF0000", "#800080", "#FF6347", "#FFA500",
          "#FF0000", "#FF6347", "#FF6347", "#FF0000", "#FFA500",
          "#FF0000", "#00FF7F", "#FFA500", "#800080", "#FF0000",
          "#800080", "#FFA500", "#800080", "#FF6347", "#FFA500",
          "#00FFFF", "#00FF7F", "#800080", "#FF6347", "#FFA500",
          "#FFA500", "#800080", "#FF6347", "#800080", "#FFD700",
          "#FFA500", "#800080", "#FF6347", "#FFA500", "#800080",
          "#00FFFF", "#FFA500", "#FFA500", "#FF0000", "#FFD700",
          "#FF6347", "#FF6347", "#FFD700", "#FF6347", "#FF0000",
          "#FF0000", "#FFD700", "#800080", "#FF6347", "#FFA500",
          "#00FF7F", "#FF0000", "#FFA500", "#800080", "#FF6347",
          "#800080", "#FF0000", "#FF0000", "#800080", "#FFA500",
          "#FF6347", "#FFA500", "#FF6347", "#800080", "#00FFFF",
          "#FF0000", "#FFA500", "#FFD700", "#FF6347", "#FF6347",
          "#FFA500", "#FFA500", "#FF0000", "#FFA500", "#FFA500",
          "#FF0000", "#800080", "#FF6347", "#FFA500", "#FF6347"
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function QueroDoar() {
  window.location.href = '../Ponto_coleta/ponto_coleta.html'
}

//adc alimento
addBtn.onclick = function () {
  let input01 = document.getElementById("input01").value.trim();
  let input02 = document.getElementById("input02").value.trim();
  let input03 = document.getElementById("input03").value.trim();
  let input04 = document.getElementById("input04").value.trim();

  if (input01 === "" || input02 === "" || input03 === "" || input04 === "") {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  let nomeMinusculo = input01.toLowerCase();
  let nomeFormatado = nomeMinusculo
    .replace(/[áàãâä]/g, 'a')
    .replace(/[éèêë]/g, 'e')
    .replace(/[íìîï]/g, 'i')
    .replace(/[óòõôö]/g, 'o')
    .replace(/[úùûü]/g, 'u')
    .replace(/[ç]/g, 'c');

  for (let i = 0; i < input03; i++) {
    fetch('http://localhost:5555/saveAlimento', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({

        "nome": `${nomeFormatado}`,
        "peso": `${input02}`,
        "validade": `${input04}`,
        "idDoador": "5",
        "emailDoador": "doador@email.com"

      })
    })
  }
  modal.style.display = "none";
}