// Função para puxar os top filmes da API
function getTopMovies() {
  const options = {
      method: 'GET',
      url: 'https://moviesverse1.p.rapidapi.com/top-250-movies',
      headers: {
          'X-RapidAPI-Key': 'abeb689095mshb45693b7dec7773p1b006ajsn0145462d3b61',
          'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
      }
  };

  axios.request(options)
      .then(response => {
          if (response.data && response.data.movies) {
              const moviesList = document.querySelector('.tdsfilmes');

              response.data.movies.forEach(movie => {
                  const movieItem = document.createElement('div');
                  movieItem.classList.add('titles');
                  movieItem.textContent = movie.title;
                  movieItem.addEventListener('click', () => {
                      displayMovieDetails(movie);
                  });
                  moviesList.appendChild(movieItem);
              });
          } else {
              console.error("Dados de filmes ausentes na resposta.");
          }
      })
      .catch(error => {
          console.error("Erro ao recuperar dados da API:", error);
      });
}

function displayMovieDetails(movie) {
  const modal = document.getElementById('modal');
  const movieDetails = document.getElementById('movieDetails');

  // Limpar o conteúdo anterior
  movieDetails.innerHTML = '';

  // Adicionar detalhes do filme ao modal
  const title = document.createElement('p');
  title.textContent = `Title: ${movie.title || 'Não disponível'}`;
  movieDetails.appendChild(title);

  const timeLine = document.createElement('p');
  timeLine.textContent = `Timeline:  ${movie.timeline || 'Não disponível'}`;
  movieDetails.appendChild(timeLine);

  const rating = document.createElement('p');
  rating.textContent = `Rating:  ${movie.rating || 'Não disponível'}`;
  movieDetails.appendChild(rating);

  const releaseDate = document.createElement('p');
  releaseDate.textContent = `Release Date:  ${movie.year || 'Não disponível'}`;
  movieDetails.appendChild(releaseDate);


  if (movie.image) {
    const image = document.createElement('img');
    image.src = movie.image;
    image.alt = movie.name;
    image.style.width = '100%';
    movieDetails.appendChild(image);
} else {
    const noImage = document.createElement('p');
    noImage.textContent = 'Foto não disponível';
    movieDetails.appendChild(noImage);
}




  // Exibir o modal
  modal.style.display = 'block';

  // Fechar o modal quando clicar no botão de fechar (X)
  const closeButton = document.querySelector('.close');
  closeButton.onclick = function() {
      modal.style.display = 'none';
  }

  // Fechar o modal quando clicar fora do modal
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = 'none';
      }
  }
}

getTopMovies()
