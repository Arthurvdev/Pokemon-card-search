const tcgdex = new TCGdex('en');
const divRsultado = document.querySelector('.resultado-conteiner');

async function fetchCard(name) {
  try {
    const cards = await tcgdex.fetch('cards');
    const cardsFiltradas = cards.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));

    if (cardsFiltradas.length > 0) {
      const resultadoDiv = document.getElementById('resultado');
      divRsultado.style.height = 'auto';
      resultadoDiv.innerHTML = '';  // Limpa o conteúdo anterior

      cardsFiltradas.forEach(card => {
        if (card.image) {
          const imageUrl = card.image + '/low.webp'; 
          const imgElement = document.createElement('img'); 
          imgElement.src = imageUrl;  
          imgElement.alt = card.name;  
          imgElement.style.width = '240px';  
          imgElement.style.margin = '20px';
          imgElement.style.cursor = 'pointer';  
          
          
          imgElement.onclick = function() {
            mostrarImagemMaior(card.image + '/high.webp'); // Exibe a imagem maior e com uma qualidade melhor quando clicada
          };

          resultadoDiv.appendChild(imgElement);
        } else {
          console.log(`Imagem não encontrada para a carta: ${card.name}`);
        }
      });
    } else {
      console.log('Nenhuma carta encontrada com esse nome');
      document.getElementById('resultado').innerHTML = 'Nenhuma carta encontrada com esse nome';
    }
  } catch (error) {
    console.error('Erro ao buscar as cartas:', error);
  }
}

function pesquisa() {
  const pokemon = document.getElementById("pesquisa").value;
  fetchCard(pokemon);  
}

function mostrarImagemMaior(url) {
  const overlay = document.getElementById('overlay');
  const imagemGrande = document.getElementById('imagemGrande');
  imagemGrande.src = url;  // Define a imagem grande no overlay
  overlay.style.display = 'flex';  // Exibe o overlay
}

function fecharImagem() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';  // Fecha o overlay quando clicado
}

document.getElementById('pesquisa').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {  
    event.preventDefault(); 
    pesquisa();  
  }
});
