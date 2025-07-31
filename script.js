const pokemonRef = document.getElementById('pokemon');
const pokemonImg = document.getElementsByClassName('pokemon-img');
const pokemonTypeRef = document.getElementsByClassName('pokemon-type');
let pokemonArr = [];
let pokemonJson;
let pokemonTypeJson;

function init() {
    getPokemonApi();
}

async function getPokemonApi() {
    for (let index = 1; index <= 20; index++) {
        let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`);
        pokemonJson = await pokemon.json();
        pokemonArr.push(pokemonJson);
    }
    console.log(pokemonArr);
    renderPokemon();
}

async function renderPokemon() {
    for (let i = 0; i < pokemonArr.length; i++) {
        pokemonRef.innerHTML += showFirstTwentyPokemon(pokemonArr, i);
        showPokemonType(i);
    }
}

async function showPokemonType(index) {
    for (let i = 0; i < pokemonArr[index].types.length; i++) {
        let pokemonType = await fetch(`${pokemonArr[index].types[i].type.url}`);
        pokemonTypeJson = await pokemonType.json();
        let imgSrc = await pokemonTypeJson.sprites['generation-viii']['sword-shield'].name_icon;
        pokemonTypeRef[index].innerHTML += renderPokemonType(imgSrc);
    }
}