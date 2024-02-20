const options = {
    method: 'GET',
    url: 'https://moviesverse1.p.rapidapi.com/get-movie-news',
    headers: {
      'X-RapidAPI-Key': 'abeb689095mshb45693b7dec7773p1b006ajsn0145462d3b61',
      'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
    }
};



async function fetchMovieNews() {
    
    try {
        const response = await axios.request(options);
        const newsContainer = document.getElementById('newsContainer');
        
        if (response.data && response.data.news) {
            response.data.news.forEach(newsItem => {
                const newsElement = document.createElement('div');
                newsElement.classList.add('movie-news');
                newsElement.innerHTML = `
                    <img src="${newsItem.image}" alt="Descrição da imagem">
                    <h2>${newsItem.title}</h2>
                    <p>${newsItem.writer}</p>
                    <a class="btn btn-success" href="${newsItem.link} target="_blank" ">see more...</a>
                    <p>${newsItem.date}</p>
                `;
                newsContainer.appendChild(newsElement);
            });
        } else {
            console.error("Dados de notícias ausentes na resposta.");
        }
    } catch (error) {
        console.error(error);
    }
}




fetchMovieNews();
