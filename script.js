const pokemonRef = document.getElementById('pokemon');
const pokemonImg = document.getElementsByClassName('pokemon-img');

function init() {
    getPokemonApi();
}

async function getPokemonApi() {
    for (let index = 1; index <= 20; index++) {
        let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`);
        let pokemonJson = await pokemon.json();
        console.log(pokemonJson);
        renderPokemon(pokemonJson);
    }
}

function renderPokemon(pokemonJson) {
    pokemonRef.innerHTML += showFirstTwentyPokemon(pokemonJson);
}

async function showPokemonType(pokemonJson) {
    for (let i = 0; i < pokemonJson.types.length; i++) {
        let pokemonType = await fetch(`${pokemonJson.types[i].type.url}`);
        let pokemonTypeJson = await pokemonType.json();
        let imgSrc = pokemonTypeJson.sprites['generation-viii']['sword-shield'].name_icon;
        renderPokemonType(imgSrc);
    }
}