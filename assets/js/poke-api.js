
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


function getPokemonsDetail() {
    var inputValue = document.getElementById("searchInput").value;
   
    const url = `https://pokeapi.co/api/v2/pokemon/${inputValue}`
    
    fetch(url)
        .then((response) =>{
            return response.json()
        })
        .then(data => {
            console.log(data.name, data.number, data.type)
            const newHtml = `
                <div class="pokemon">
                    <span class="names">${data.name}</span>

                    <div  class="details">
                        <img class="imgs" src="${data.sprites.other.dream_world.front_default}"
                            alt="${data.name}">
                    </div>
                </div>
            `   
            pokemonList.innerHTML = newHtml
           
            
        }).catch((erro) => {
            console.log("Erro:", erro); // Exibe o erro no console
            alert("Erro: " + erro); // Mostra o erro em um alerta
        });
    
}

