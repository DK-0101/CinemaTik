// Função para puxar as top celebrities da API
function getTopCelebrities() {
    const options = {
        method: 'GET',
        url: 'https://moviesverse1.p.rapidapi.com/get-most-popular-celebrities',
        headers: {
            'X-RapidAPI-Key': 'abeb689095mshb45693b7dec7773p1b006ajsn0145462d3b61',
            'X-RapidAPI-Host': 'moviesverse1.p.rapidapi.com'
        }
    };

    axios.request(options)
        .then(response => {
            if (response.data && response.data.celebrities) {
                const celebritiesList = document.getElementById('celebritiesList');
                celebritiesList.innerHTML = '';

                response.data.celebrities.forEach(celebrity => {
                    const celebrityItem = document.createElement('div');
                    celebrityItem.classList.add('celebrity');
                    celebrityItem.textContent = celebrity.name;
                    celebrityItem.addEventListener('click', () => {
                        displayCelebrityDetails(celebrity);
                    });
                    celebritiesList.appendChild(celebrityItem);
                });
            } else {
                console.error("Dados de celebridades ausentes na resposta.");
            }
        })
        .catch(error => {
            console.error("Erro ao recuperar dados da API:", error);
        });
}

function displayCelebrityDetails(celebrity) {
    const modal = document.getElementById('modal');
    const celebrityDetails = document.getElementById('celebrityDetails');

    // Limpar o conteúdo anterior
    celebrityDetails.innerHTML = '';

    // Adicionar detalhes da celebridade ao modal
    const name = document.createElement('p');
    name.textContent = `Nome: ${celebrity.name || 'Não disponível'}`;
    celebrityDetails.appendChild(name);


    
    const profession = document.createElement('p');
    profession.textContent = `Profissão: ${celebrity.professions || 'Não disponível'}`;
    celebrityDetails.appendChild(profession);
    

    if (celebrity.image) {
        const image = document.createElement('img');
        image.src = celebrity.image;
        image.alt = celebrity.name;
        image.style.width = '100%';
        celebrityDetails.appendChild(image);
    } else {
        const noImage = document.createElement('p');
        noImage.textContent = 'Foto não disponível';
        celebrityDetails.appendChild(noImage);
    }

    // Exibir o modal
    modal.style.display = 'block';

    // Fechar o modal quando clicar no botão de fechar (X)
    const closeButton = document.getElementsByClassName('close')[0];
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


getTopCelebrities()
