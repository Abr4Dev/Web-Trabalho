// URL da API
const apiUrl = "https://run.mocky.io/v3/9f1920a6-5599-4b72-8a55-d7c9d3d8bb40";

// Elemento da tabela
const tabelaCachorros = document.getElementById("tabela-cachorros");

// Modal
const modalAdicionar = document.getElementById("modal-adicionar");
const modalEditar = document.getElementById("modal-editar");
const formAdicionar = document.getElementById("form-adicionar");
const formEditar = document.getElementById("form-editar");

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
            <button onclick="abrirModalEditar(${index})">Editar</button>
            <button onclick="excluirCachorro(${index})">Excluir</button>
        </td>
    `;

    linha.dataset.index = index; // Adicionar índice à linha
    tabelaCachorros.appendChild(linha);
}

// Abrir modal de adicionar cachorro
function abrirModalAdicionar() {
    modalAdicionar.style.display = "block";
}

// Fechar modal de adicionar cachorro
function fecharModalAdicionar() {
    modalAdicionar.style.display = "none";
}

// Abrir modal de editar cachorro
function abrirModalEditar(index) {
    const cachorro = tabelaCachorros.rows[index].cells;
    
    document.getElementById("index-editar").value = index;
    document.getElementById("nome-cachorro-editar").value = cachorro[1].textContent;
    document.getElementById("nome-dono-editar").value = cachorro[2].textContent;
    document.getElementById("telefone-editar").value = cachorro[3].textContent;
    document.getElementById("email-editar").value = cachorro[4].textContent;
    document.getElementById("imagem-editar").value = cachorro[0].children[0].src;

    modalEditar.style.display = "block";
}

// Fechar modal de editar cachorro
function fecharModalEditar() {
    modalEditar.style.display = "none";
}

// Adicionar um novo cachorro ao clicar em "Adicionar"
formAdicionar.addEventListener("submit", function(event) {
    event.preventDefault();

    const nomeCachorro = document.getElementById("nome-cachorro").value;
    const nomeDono = document.getElementById("nome-dono").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const imagem = document.getElementById("imagem").value;

    if (nomeCachorro && nomeDono && telefone && email && imagem) {
        const novoCachorro = { cachorro: nomeCachorro, dono: nomeDono, telefone: telefone, email: email, imagem: imagem };

        // Adicionar o cachorro à tabela (simular API)
        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(novoCachorro)
        }).then(() => {
            carregarCachorros();
            fecharModalAdicionar();
        });
    }
});

// Editar cachorro
formEditar.addEventListener("submit", function(event) {
    event.preventDefault();

    const index = document.getElementById("index-editar").value;
    const nomeCachorro = document.getElementById("nome-cachorro-editar").value;
    const nomeDono = document.getElementById("nome-dono-editar").value;
    const telefone = document.getElementById("telefone-editar").value;
    const email = document.getElementById("email-editar").value;
    const imagem = document.getElementById("imagem-editar").value;

    // Atualizar o cachorro na tabela (simular API)
    tabelaCachorros.rows[index].cells[1].textContent = nomeCachorro;
    tabelaCachorros.rows[index].cells[2].textContent = nomeDono;
    tabelaCachorros.rows[index].cells[3].textContent = telefone;
    tabelaCachorros.rows[index].cells[4].textContent = email;
    tabelaCachorros.rows[index].cells[0].children[0].src = imagem;

    fecharModalEditar();
});

// Excluir cachorro
function excluirCachorro(index) {
    // Simular exclusão do cachorro da tabela
    tabelaCachorros.deleteRow(index);
}

// Inicializar a tabela
carregarCachorros();
