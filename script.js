// URL da API
const apiUrl = "https://run.mocky.io/v3/9f1920a6-5599-4b72-8a55-d7c9d3d8bb40";

// Elemento da tabela
const tabelaCachorros = document.getElementById("tabela-cachorros");

// Modal
const modal = document.getElementById("modal");
const formAdicionar = document.getElementById("form-adicionar");

// Carregar dados da API
async function carregarCachorros() {
    try {
        const response = await fetch(apiUrl);
        const dados = await response.json();
        
        // Limpar tabela
        tabelaCachorros.innerHTML = "";

        // Adicionar linhas na tabela
        dados.forEach((cachorro, index) => {
            adicionarLinha(cachorro, index);
        });
    } catch (error) {
        console.error("Erro ao carregar os cachorros:", error);
    }
}

// Adicionar linha à tabela
function adicionarLinha(cachorro, index) {
    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>
            <img src="${cachorro.imagem}" alt="${cachorro.cachorro}" 
                 onerror="this.src='https://via.placeholder.com/100?text=Imagem+Indisponível';">
        </td>
        <td>${cachorro.cachorro}</td>
        <td>${cachorro.dono}</td>
        <td>${cachorro.telefone}</td>
        <td>${cachorro.email}</td>
        <td>
            <button onclick="editarCachorro(${index})">Editar</button>
            <button onclick="excluirCachorro(${index})">Excluir</button>
        </td>
    `;

    linha.dataset.index = index; // Adicionar índice à linha
    tabelaCachorros.appendChild(linha);
}

// Abrir modal
function abrirModal() {
    modal.style.display = "block";
}

// Fechar modal
function fecharModal() {
    modal.style.display = "none";
}

// Adicionar um novo cachorro ao clicar em "Adicionar"
formAdicionar.addEventListener("submit", function(event) {
    event.preventDefault();  // Previne o comportamento padrão de envio do formulário

    const nomeCachorro = document.getElementById("nome-cachorro").value;
    const nomeDono = document.getElementById("nome-dono").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const imagem = document.getElementById("imagem").value;

    if (nomeCachorro && nomeDono && telefone && email && imagem) {
        const novoCachorro = { cachorro: nomeCachorro, dono: nomeDono, telefone, email, imagem };
        adicionarLinha(novoCachorro, tabelaCachorros.rows.length);
        fecharModal();  // Fechar modal após adicionar
    } else {
        alert("Por favor, preencha todos os campos.");
    }
});

// Função para editar um cachorro
function editarCachorro(index) {
    const linha = tabelaCachorros.querySelector(`[data-index='${index}']`);
    const colunas = linha.children;

    const cachorro = prompt("Editar nome do cachorro:", colunas[1].textContent);
    const dono = prompt("Editar nome do dono:", colunas[2].textContent);
    const telefone = prompt("Editar telefone:", colunas[3].textContent);
    const email = prompt("Editar email:", colunas[4].textContent);
    const imagem = prompt("Editar URL da imagem do cachorro:", colunas[0].children[0].src);

    if (cachorro && dono && telefone && email && imagem) {
        colunas[1].textContent = cachorro;
        colunas[2].textContent = dono;
        colunas[3].textContent = telefone;
        colunas[4].textContent = email;
        colunas[0].children[0].src = imagem;
    }
}

// Função para excluir um cachorro
function excluirCachorro(index) {
    const linha = tabelaCachorros.querySelector(`[data-index='${index}']`);
    tabelaCachorros.removeChild(linha);
}

// Carregar os cachorros ao abrir a página
carregarCachorros();
