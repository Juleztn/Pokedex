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
let mainInfos = document.getElementsByClassName('main');
let stats = document.getElementsByClassName('stats');
let evoChain = document.getElementsByClassName('evo-chain');
let pokemonDetails = document.getElementsByClassName('pokemon-details');
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
    btn.classList.add('d_none');
}

function hideLoadingScreen() {
    loadingScreenRef.classList.add('d_none');
    btn.classList.remove('d_none');
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
            pokemonAbilitiesRef[0].innerHTML += `${pokemonAbilities},` + '\xa0\xa0\xa0\xa0';
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

function showMainInfos(i) {
    mainInfos[0].classList.add('underline');
    stats[0].classList.remove('underline');
    evoChain[0].classList.remove('underline');
    pokemonDetails[0].innerHTML = showMainInfosHtml(i);
    getAbilityofPokemon(i);
}

function showStats(i) {
    stats[0].classList.add('underline');
    mainInfos[0].classList.remove('underline');
    evoChain[0].classList.remove('underline');
    pokemonDetails[0].innerHTML = showStatsHtml(i);
}

function showEvoChain(i) {
    evoChain[0].classList.add('underline');
    stats[0].classList.remove('underline');
    mainInfos[0].classList.remove('underline');
    getFirstPokemonOfEvolutionChain(i);
}

async function getFirstPokemonOfEvolutionChain(i) {
    let pokemonSpecies = await fetch(pokemonArr[i].species.url);
    let pokemonSpeciesJson = await pokemonSpecies.json();
    let pokemonEvo = await fetch(pokemonSpeciesJson.evolution_chain.url);
    let pokemonEvoJson = await pokemonEvo.json();
    let pokemonEvoName = pokemonEvoJson.chain.species.name;
    let firstPokemonOfEvo = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonEvoName}/`);
    let firstPokemonOfEvoJson = await firstPokemonOfEvo.json();
    getSecondPokemonOfEvolutionChain(pokemonEvoJson, firstPokemonOfEvoJson);
}

async function getSecondPokemonOfEvolutionChain(pokemonEvoJson, firstPokemonOfEvoJson) {
    let pathToSecondPokemon = pokemonEvoJson.chain.evolves_to;
    if (pathToSecondPokemon.length > 0) {
        let secondPokemonEvoName = pokemonEvoJson.chain.evolves_to[0].species.name;
        let secondPokemonOfEvo = await fetch(`https://pokeapi.co/api/v2/pokemon/${secondPokemonEvoName}/`);
        let secondPokemonOfEvoJson = await secondPokemonOfEvo.json();
        getThirdPokemonOfEvolutionChain(pokemonEvoJson, firstPokemonOfEvoJson, secondPokemonOfEvoJson);
    } else {
        pokemonDetails[0].innerHTML = showEvoChainWithOnePokemon(firstPokemonOfEvoJson);
    }
}

async function getThirdPokemonOfEvolutionChain(pokemonEvoJson, firstPokemonOfEvoJson, secondPokemonOfEvoJson) {
    let pathToThirdPokemon = pokemonEvoJson.chain.evolves_to[0].evolves_to;
    if (pathToThirdPokemon.length > 0) {
        let thridPokemonEvoName = pokemonEvoJson.chain.evolves_to[0].evolves_to[0].species.name;
        let thirdPokemonOfEvo = await fetch(`https://pokeapi.co/api/v2/pokemon/${thridPokemonEvoName}/`);
        let thridPokemonOfEvoJson = await thirdPokemonOfEvo.json();
        pokemonDetails[0].innerHTML = showEvoChainWithThreePokemon(firstPokemonOfEvoJson, secondPokemonOfEvoJson, thridPokemonOfEvoJson);
    } else {
        pokemonDetails[0].innerHTML = showEvoChainWithTwoPokemon(firstPokemonOfEvoJson, secondPokemonOfEvoJson);
    }
}

function previousPokemon(i) {
    if (i > 0) {
        i--;
        dialog.innerHTML = showClickedPokemon(i, weight);
        getPokemonTypeForDialog(i);
        getAbilityofPokemon(i);
    }
}

function nextPokemon(i) {
    if (i < pokemonAmount - 1) {
        i++;
        dialog.innerHTML = showClickedPokemon(i, weight);
        getPokemonTypeForDialog(i);
        getAbilityofPokemon(i);
    }
}