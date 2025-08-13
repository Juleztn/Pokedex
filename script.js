const pokemonRef = document.getElementById('pokemon');
const pokemonTypeRef = document.getElementsByClassName('pokemon-type');
const pokemonTypeDialogRef = document.getElementsByClassName('pokemon-type-dialog');
const pokemonAbilitiesRef = document.getElementsByClassName('abilities');
const loadingScreenRef = document.getElementById('loading-screen');
const btn = document.getElementById('btn');
const dialog = document.getElementById('dialog');
const overlay = document.getElementById('overlay');
const leftArrow = document.getElementsByClassName('left-arrow');
const rightArrow = document.getElementsByClassName('right-arrow');
const input = document.getElementById('search-input');
const mainInfos = document.getElementsByClassName('main');
const stats = document.getElementsByClassName('stats');
const evoChain = document.getElementsByClassName('evo-chain');
const pokemonDetails = document.getElementsByClassName('pokemon-details');

let pokemonArr = [];
let pokemonNames = [];
let filteredPokemonArr = []; 
let filteredPokemonNames = [];
let currentList = []; 
let currentIndex = 0; 
let pokemonStartAmount = 1;
let pokemonAmount = 20;
let pokemonIndex = 0;
let isFilter = false;
let weight;

async function fetchJSON(url) {
    return (await fetch(url)).json();
}

function getWeightString(pokemon) {
    let num = pokemon.weight.toString();
    return `${num[0]},${num.slice(1)} kg`;
}

function init() {
    getPokemonApi();
}

async function getPokemonApi() {
    showLoadingScreen();
    let allPokemon = await loadPokemonRange(pokemonStartAmount, pokemonAmount);
    pokemonArr = await Promise.all(allPokemon.map(enrichPokemonData));
    pokemonNames = pokemonArr.map(p => p.name);
    hideLoadingScreen();
    renderPokemon();
}

async function loadPokemonRange(start, end) {
    let promises = [];
    for (let i = start; i <= end; i++) {
        promises.push(fetchJSON(`https://pokeapi.co/api/v2/pokemon/${i}/`));
    }
    return Promise.all(promises);
}

async function enrichPokemonData(p) {
    p.typeIcons = await loadTypeIcons(p.types);
    p.evolutionChain = await loadEvolutionChain(p.species.url);
    return p;
}

async function loadTypeIcons(types) {
    return Promise.all(types.map(async t => {
        let typeData = await fetchJSON(t.type.url);
        return typeData.sprites['generation-viii']['sword-shield'].name_icon;
    }));
}

async function loadEvolutionChain(speciesUrl) {
    let speciesData = await fetchJSON(speciesUrl);
    let evoData = await fetchJSON(speciesData.evolution_chain.url);
    let chain = [];
    let current = evoData.chain;
    while (current) {
        let evoPokeData = await fetchJSON(`https://pokeapi.co/api/v2/pokemon/${current.species.name}/`);
        chain.push(evoPokeData);
        current = current.evolves_to[0] || null;
    }
    return chain;
}

function renderPokemon() {
    for (; pokemonIndex < pokemonArr.length; pokemonIndex++) {
        pokemonRef.innerHTML += showPokemon(pokemonArr, pokemonIndex);
    }
}

async function showMorePokemon() {
    showLoadingScreen();
    const oldAmount = pokemonAmount;
    pokemonAmount += 20;
    let newPokemon = await loadPokemonRange(oldAmount + 1, pokemonAmount);
    let enriched = await Promise.all(newPokemon.map(enrichPokemonData));
    pokemonArr = pokemonArr.concat(enriched);
    if (!isFilter) currentList = pokemonArr;
    hideLoadingScreen();
    enriched.forEach((p, idx) => {
        const i = oldAmount + idx;
        pokemonRef.innerHTML += showPokemon(pokemonArr, i);
    });
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
    let term = input.value.trim().toUpperCase();
    let alert = document.getElementById('alert');
    alert.classList.toggle('d_none', term.length === 0 || term.length >= 3);
    if (term.length < 3 && term.length > 0) return;
    isFilter = term.length >= 3;
    let filtered = pokemonArr.filter(p => p.name.toUpperCase().includes(term));
    currentList = filtered.length > 0 ? filtered : pokemonArr;
    renderFilteredPokemon(currentList);
}

function renderFilteredPokemon(list) {
    pokemonRef.innerHTML = "";
    list.forEach((p, i) => {
        pokemonRef.innerHTML += showFilteredPokemon(p, i);
    });
    btn.classList.toggle('d_none', isFilter);
}

function showAllPokemon() {
    btn.classList.remove('d_none');
    pokemonIndex = 0;
    pokemonAmount = pokemonArr.length;
    pokemonRef.innerHTML = "";
    renderPokemon();
}

function fillDialog(i) {
    let p = pokemonArr[i];
    weight = getWeightString(p);
    dialog.innerHTML = showClickedPokemon(i, weight);
    pokemonAbilitiesRef[0].innerHTML = p.abilities.map(a => a.ability.name).join(', ');
    if (i == 0) {
        leftArrow[0].innerHTML = '';
    }
}

function openPokemonDialog(i) {
    if (!currentList || currentList.length === 0) currentList = pokemonArr;
    currentIndex = i;
    fillDialogFromList(currentList, currentIndex);
    dialog.show();
    overlay.classList.remove('d_none');
    updateArrows(); // Pfeile direkt beim Öffnen updaten
}

function renderTypeIconsDialog(typeIcons) {
    return typeIcons.map(src => `
        <img src="${src}">
    `).join('');
}

function updateDialogContent(list, i) {
    const p = list[i];
    weight = getWeightString(p);
    dialog.innerHTML = showClickedPokemonFromList(list, i, weight);
    pokemonAbilitiesRef[0].innerHTML = p.abilities.map(a => a.ability.name).join(', ');
}

function fillDialogFromList(list, index) {
    let p = list[index];
    weight = getWeightString(p);
    dialog.innerHTML = showClickedPokemonFromList(list, index, weight);
    pokemonAbilitiesRef[0].innerHTML = p.abilities.map(a => a.ability.name).join(', ');
}

function previousPokemon() {
    if (currentIndex > 0) {
        currentIndex--;
        fillDialogFromList(currentList, currentIndex);
        updateArrows();
    }
}

function nextPokemon() {
    if (currentIndex < currentList.length - 1) {
        currentIndex++;
        fillDialogFromList(currentList, currentIndex);
        updateArrows();
    }
}
function previousPokemonFromList() {
    if (currentIndex > 0) {
        currentIndex--;
        let p = currentList[currentIndex];
        weight = getWeightString(p);
        dialog.innerHTML = showClickedPokemonFromList(currentList, currentIndex, weight);
        pokemonAbilitiesRef[0].innerHTML = p.abilities.map(a => a.ability.name).join(', ');
    }
}

function nextPokemonFromList() {
    if (currentIndex < currentList.length - 1) {
        currentIndex++;
        let p = currentList[currentIndex];
        weight = getWeightString(p);
        dialog.innerHTML = showClickedPokemonFromList(currentList, currentIndex, weight);
        pokemonAbilitiesRef[0].innerHTML = p.abilities.map(a => a.ability.name).join(', ');
    }
}

function updateArrows() {
    leftArrow[0].style.display = currentIndex > 0 ? "block" : "none";

    if (currentIndex < currentList.length - 1) {
        rightArrow[0].style.display = "flex";           // immer flex, wenn sichtbar
        rightArrow[0].style.justifyContent = "flex-end"; // rechts ausrichten
        rightArrow[0].style.width = "100%";            // volle Breite
    } else {
        rightArrow[0].style.display = "none";          // ausblenden
        rightArrow[0].style.justifyContent = "";       // zurücksetzen
        rightArrow[0].style.width = "";                // zurücksetzen
    }
}

function toggleOverlay() {
    overlay.classList.toggle('d_none');
    dialog.close();
}

function showMainInfos(i) {
    mainInfos[0].classList.add('underline');
    stats[0].classList.remove('underline');
    evoChain[0].classList.remove('underline');
    pokemonDetails[0].innerHTML = showMainInfosHtml(i);
    pokemonAbilitiesRef[0].innerHTML = pokemonArr[i].abilities.map(a => a.ability.name).join(', ');
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
    const list = currentList.length > 0 ? currentList : pokemonArr;
    const chain = list[i].evolutionChain;
    if (chain.length === 1) pokemonDetails[0].innerHTML = showEvoChainWithOnePokemon(chain[0]);
    if (chain.length === 2) pokemonDetails[0].innerHTML = showEvoChainWithTwoPokemon(chain[0], chain[1]);
    if (chain.length === 3) pokemonDetails[0].innerHTML = showEvoChainWithThreePokemon(chain[0], chain[1], chain[2]);
}