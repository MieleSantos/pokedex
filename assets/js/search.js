document.getElementById("searchBtn").addEventListener("click", function() {
    const pokemonName = document.getElementById("pokemonSearch").value.toLowerCase();
    
    // Faz a requisição para a API
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon não encontrado");
            }
            return response.json();
        })
        .then(data => {
            const pokemonResultDiv = document.getElementById("pokemonResult");
            pokemonResultDiv.innerHTML = `
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <h2>${data.name}</h2>
            `;
            pokemonResultDiv.style.display = "block";  // Exibe o resultado
        })
        .catch(error => {
            alert(error.message);
            document.getElementById("pokemonResult").style.display = "none";
        });
});
