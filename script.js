// Selecionando os elementos do DOM que vamos usar
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const profileContainer = document.getElementById('profile-container');

// URL base da API do GitHub
const API_URL = 'https://api.github.com/users/';

// Função principal para buscar o usuário
// Usamos async/await para lidar com a natureza assíncrona do fetch
async function getUser(username) {
try {
const response = await fetch(API_URL + username);

// Se a resposta não for OK (ex: erro 404), a gente joga um erro
if (!response.ok) {
throw new Error('Usuário não encontrado!');
}

const data = await response.json();
createProfileCard(data);

} catch (error) {
// Se der qualquer erro na requisição (rede, 404, etc.), mostramos um card de erro
createErrorCard(error.message);
}
}

// Função para criar o HTML do card de perfil
function createProfileCard(user) {
// Usando destructuring para pegar só o que precisamos do objeto 'user'
const { avatar_url, name, login, bio, public_repos, followers, following, html_url } = user;

// Usando Template Literals para montar o HTML. É mais limpo.
const cardHTML = `
<div class="profile-card">
<img src="${avatar_url}" alt="Avatar de ${name || login}" class="profile-avatar">
<div class="profile-info">
<h2>${name || login}</h2>
<a href="${html_url}" target="_blank">@${login}</a>
<p>${bio || 'Este usuário não possui uma bio.'}</p>

<div class="profile-stats">
<div class="stat">
<span>${public_repos}</span>
Repositórios
</div>
<div class="stat">
<span>${followers}</span>
Seguidores
</div>
<div class="stat">
<span>${following}</span>
Seguindo
</div>
</div>
</div>
</div>
`;

profileContainer.innerHTML = cardHTML;
profileContainer.style.display = 'block'; // Mostra o container
}

// Função para criar o card de erro
function createErrorCard(message) {
const cardHTML = `
<div class="error-card">
<h3>Oops! Algo deu errado.</h3>
<p>${message}</p>
</div>
`;
profileContainer.innerHTML = cardHTML;
profileContainer.style.display = 'block'; // Mostra o container com o erro
}

// Adicionando o evento de 'submit' ao formulário
searchForm.addEventListener('submit', (event) => {
event.preventDefault(); // Previne o recarregamento padrão da página

const userToSearch = searchInput.value.trim();

if (userToSearch) {
getUser(userToSearch);
searchInput.value = ''; // Limpa o input após a busca
}
});
