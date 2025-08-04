const pokemonRef = document.getElementById('pokemon');
let pokemonCards = document.getElementsByClassName('pokemon-card');
const pokemonImg = document.getElementsByClassName('pokemon-img');
const pokemonTypeRef = document.getElementsByClassName('pokemon-type');
const pokemonTypeDialogRef = document.getElementsByClassName('pokemon-type-dialog');
const pokemonAbilitiesRef = document.getElementsByClassName('abilities');
const loadingScreenRef = document.getElementById('loading-screen');
const btn = document.getElementById('btn');
const dialog = document.getElementById('dialog');
const overlay = document.getElementById('overlay');
let input = document.getElementById('search-input');
let pokemonArr = [];
let pokemonNames = [];
let pokemonJson;
let pokemonTypeJson;
let pokemonTypeJsonDialog;
let weight;
let pokemonAbilities;
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
    console.log(pokemonArr);
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
        filterAndShowPokemon();
    } else if (input.value == "") {
        showAllPokemon();
    }
}

function filterAndShowPokemon() {
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
    btn.classList.add('d_none');
}

function showAllPokemon() {
    btn.classList.remove('d_none');
    pokemonIndex = 0;
    pokemonAmount = pokemonArr.length;
    pokemonRef.innerHTML = "";
    renderPokemon();
}

function openPokemonDialog(i) {
    dialog.show();
    getWeightOfPokemon(i);
    dialog.innerHTML = showClickedPokemon(i, weight);
    overlay.classList.toggle('d_none');
    getPokemonTypeForDialog(i);
    getAbilityofPokemon(i);
}

function getWeightOfPokemon(i) {
    let number = pokemonArr[i].weight.toString();
    weight = `${number[0]},${number.slice(1)} kg`;
}

function getAbilityofPokemon(i) {
    for (let index = 0; index < pokemonArr[i].abilities.length; index++) {
        pokemonAbilities = pokemonArr[i].abilities[index].ability.name;
        if (index < pokemonArr[i].abilities.length - 1) {
            pokemonAbilitiesRef[0].innerHTML += `${pokemonAbilities},` + ' ';
        } else {
            pokemonAbilitiesRef[0].innerHTML += `${pokemonAbilities}`;
        }
    }
}

function toggleOverlay() {
    overlay.classList.toggle('d_none');
    dialog.close();
}

async function getPokemonTypeForDialog(index) {
    for (let i = 0; i < pokemonArr[index].types.length; i++) {
        let pokemonTypeDialog = await fetch(`${pokemonArr[index].types[i].type.url}`);
        pokemonTypeJsonDialog = await pokemonTypeDialog.json();
        let imgSrcDialog = await pokemonTypeJsonDialog.sprites['generation-viii']['sword-shield'].name_icon;
        pokemonTypeDialogRef[0].innerHTML += showPokemonTypeDialog(imgSrcDialog);
    }
}