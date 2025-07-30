const pokemonRef = document.getElementById('pokemon');

function init() {
    getPokemonApi();
}

async function getPokemonApi() {
    for (let index = 1; index <= 20; index++) {
        let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`);
        let pokemonJson = await pokemon.json();
        console.log(pokemonJson);
        
        renderPokemon(pokemonJson, index);
    }
}

function renderPokemon(pokemonJson, i) {
    pokemonRef.innerHTML += showFirstTwentyPokemon(pokemonJson, i);
}