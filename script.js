const pokemonRef = document.getElementById('pokemon');
let pokemonCards = document.getElementsByClassName('pokemon-card');
const pokemonImg = document.getElementsByClassName('pokemon-img');
const pokemonTypeRef = document.getElementsByClassName('pokemon-type');
const loadingScreenRef = document.getElementById('loading-screen');
let input = document.getElementById('search-input');
let pokemonArr = [];
let pokemonNames = [];
let pokemonJson;
let pokemonTypeJson;
let pokemonStartAmount = 1;
let pokemonAmount = 20;
let pokemonIndex = 0;

function init() {
    getPokemonApi();
}

async function getPokemonApi() {
    showLoadingScreen();
    for (pokemonStartAmount; pokemonStartAmount <= pokemonAmount; pokemonStartAmount++) {
        let pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonStartAmount}/`);
        pokemonJson = await pokemon.json();
        pokemonArr.push(pokemonJson);
        pokemonNames.push(pokemonJson.name);
    }
    console.log(pokemonNames);
    hideLoadingScreen();
    renderPokemon();
}

async function renderPokemon() {
    for (pokemonIndex; pokemonIndex < pokemonArr.length; pokemonIndex++) {
        pokemonRef.innerHTML += showPokemon(pokemonArr, pokemonIndex);
        showPokemonType(pokemonIndex);
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

async function showMorePokemon() {
    pokemonAmount = pokemonAmount + 20;
    getPokemonApi();
}

function showLoadingScreen() {
    loadingScreenRef.classList.remove('d_none');
}

function hideLoadingScreen() {
    loadingScreenRef.classList.add('d_none');
}

function filterPokemon() {
    if (input.value.length >= 3) {
        let filter, a, txtValue;
        filter = input.value.toUpperCase();
        for (let i = 0; i < pokemonNames.length; i++) {
            a = pokemonCards[i].getElementsByTagName("h3")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                pokemonCards[i].style.display = "";
            } else {
                pokemonCards[i].style.display = "none";
            }
        }
    }
}