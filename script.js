const tcgdex = new TCGdex('en');

async function fetchCard(name) {
  try {
    const cards = await tcgdex.fetch('cards');
    const cardsFiltradas = cards.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));

    if (cardsFiltradas.length > 0) {
      const resultadoDiv = document.getElementById('resultado');
      resultadoDiv.innerHTML = '';

      cardsFiltradas.forEach(card => {
        if (card.image) {
          const imageUrl = card.image + '/high.webp'; 
          const imgElement = document.createElement('img'); 
          imgElement.src = imageUrl;  
          imgElement.alt = card.name;  
          imgElement.style.width = '250px';  
          imgElement.style.margin = '20px';
          imgElement.style.cursor = 'pointer';  
          
          // Adiciona o evento de clique para exibir a imagem maior
          imgElement.onclick = function() {
            mostrarImagemMaior(imageUrl); // Exibe a imagem maior quando clicada
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
