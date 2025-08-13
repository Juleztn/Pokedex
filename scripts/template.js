function showPokemon(pokemonArr, i) {
    return `
        <div onclick="openPokemonDialog(${i})" class="pokemon-card ${pokemonArr[i].types[0].type.name}">
            <h3>${pokemonArr[i].name.charAt(0).toUpperCase() + pokemonArr[i].name.slice(1)}</h3>
            <div class="pokemon-img-type">
                <img class="pokemon-img pokemon-card-img" src="${pokemonArr[i].sprites.other['official-artwork'].front_default}">
                <div class="pokemon-type">
                    ${renderTypeIcons(pokemonArr[i].typeIcons)}
                </div>
            </div>
        </div>
    `;
}

function renderTypeIcons(typeIcons) {
    return typeIcons.map(src => `
        <div class="img-wrapper">
            <img class="type-img" src="${src}">
        </div>
    `).join('');
}

function showClickedPokemon(i, weight) {
    return `
        <div class="pokemon-dialog ${pokemonArr[i].types[0].type.name}">
            <div onclick="toggleOverlay()" class="x-mark-container ${pokemonArr[i].types[0].type.name}-hover">
                <img class="x-mark" src="./img/xmark-white.svg">
            </div>
            <div class="pokemon-name-and-img">
                <h2>${pokemonArr[i].name.charAt(0).toUpperCase() + pokemonArr[i].name.slice(1)}</h2>
                <img class="pokemon-img img-dialog" src="${pokemonArr[i].sprites.other['official-artwork'].front_default}">
            </div>
            <div class="pokemon-type-dialog">
                ${renderTypeIconsDialog(pokemonArr[i].typeIcons)}
            </div>
            <div class="pokemon-info ${pokemonArr[i].types[0].type.name}-info">
                <span onclick="showMainInfos(${i})" class="info main underline">main</span>
                <span onclick="showStats(${i})" class="info stats">stats</span>
                <span onclick="showEvoChain(${i})" class="info evo-chain">evo chain</span>
            </div>
            <div class="pokemon-details">
                <div class="main-info">
                    <div class="single-info"><span>Height:</span><span>${pokemonArr[i].height}0 cm</span></div>
                    <div class="single-info"><span>Weight:</span><span>${weight}</span></div>
                    <div class="single-info"><span>Base Experience:</span><span>${pokemonArr[i].base_experience}</span></div>
                    <div class="single-info"><span>Abilities:</span><div class="abilities"></div></div>
                </div>
            </div>
            <div class="arrows">
                <div class="left-arrow">
                    <img onclick="previousPokemon()" class="arrows-img ${pokemonArr[i].types[0].type.name}-hover" src="./img/angle-left-white.svg">
                </div>
                <div class="right-arrow">
                    <img onclick="nextPokemon()" class="arrows-img ${pokemonArr[i].types[0].type.name}-hover" src="./img/angle-right-white.svg">
                </div>
            </div>
        </div>
    `;
}

function showClickedPokemonFromList(list, i, weight) {
    return `
        <div class="pokemon-dialog ${list[i].types[0].type.name}">
            <div onclick="toggleOverlay()" class="x-mark-container ${list[i].types[0].type.name}-hover">
                <img class="x-mark" src="./img/xmark-white.svg">
            </div>
            <div class="pokemon-name-and-img">
                <h2>${list[i].name.charAt(0).toUpperCase() + list[i].name.slice(1)}</h2>
                <img class="pokemon-img img-dialog" src="${list[i].sprites.other['official-artwork'].front_default}">
            </div>
            <div class="pokemon-type-dialog">
                ${renderTypeIconsDialog(list[i].typeIcons)}
            </div>
            <div class="pokemon-info ${list[i].types[0].type.name}-info">
                <span onclick="showMainInfos(${i})" class="info main underline">main</span>
                <span onclick="showStats(${i})" class="info stats">stats</span>
                <span onclick="showEvoChain(${i})" class="info evo-chain">evo chain</span>
            </div>
            <div class="pokemon-details">
                <div class="main-info">
                    <div class="single-info"><span>Height:</span><span>${list[i].height}0 cm</span></div>
                    <div class="single-info"><span>Weight:</span><span>${weight}</span></div>
                    <div class="single-info"><span>Base Experience:</span><span>${list[i].base_experience}</span></div>
                    <div class="single-info"><span>Abilities:</span><div class="abilities"></div></div>
                </div>
            </div>
            <div class="arrows">
                <div class="left-arrow">
                    <img onclick="previousPokemon(${i})" class="arrows-img ${list[i].types[0].type.name}-hover" src="./img/angle-left-white.svg">
                </div>
                <div class="right-arrow">
                    <img onclick="nextPokemon(${i})" class="arrows-img ${list[i].types[0].type.name}-hover" src="./img/angle-right-white.svg">
                </div>
            </div>
        </div>
    `;
}

function showFilteredPokemon(p, i) {
    return `
            <div onclick="openPokemonDialog(${i})" class="pokemon-card ${p.types[0].type.name}">
                <h3>${p.name.charAt(0).toUpperCase() + p.name.slice(1)}</h3>
                <div class="pokemon-img-type">
                    <img class="pokemon-img pokemon-card-img" src="${p.sprites.other['official-artwork'].front_default}">
                    <div class="pokemon-type">
                        ${renderTypeIcons(p.typeIcons)}
                    </div>
                </div>
            </div>
        `;
}

function changeNameAndImage(i) {
    return `
        <h2>${pokemonArr[i].name.charAt(0).toUpperCase() + pokemonArr[i].name.slice(1)}</h2>
        <img class="pokemon-img img-dialog" src="${pokemonArr[i].sprites.other['official-artwork'].front_default}">
    `;
}

function changeMainInfo(i, weight) {
    return `
        <div class="single-info">
                <span>Height:</span>
                <span>${pokemonArr[i].height}0 cm</span>
            </div>
            <div class="single-info">
                <span>Weight:</span>
                <span>${weight}</span>
            </div>
            <div class="single-info">
                <span>Base Experience:</span>
                <span>${pokemonArr[i].base_experience}</span>
            </div>
            <div class="single-info">
                <span>Abilities:</span>
            <div class="abilities"></div>
        </div>
    `;
}

function showPokemonTypeDialog(imgSrcDialog) {
    return `
        <div class="types-dialog">
            <img src="${imgSrcDialog}">
        </div>
    `;
}

function showStatsHtml(i) {
    return `
        <div class="stats">
            <div class="single-stat">
                <span>Hp</span>
                <div class="stat-width">
                    <div class="base-stat" style="width: ${pokemonArr[i].stats[0].base_stat}px;">${pokemonArr[i].stats[0].base_stat}</div>
                </div>
            </div>
            <div class="single-stat">
                <span>Attack</span>
                <div class="stat-width">
                    <div class="base-stat" style="width: ${pokemonArr[i].stats[1].base_stat}px;">${pokemonArr[i].stats[1].base_stat}</div>
                </div>
            </div>
            <div class="single-stat">
                <span>Defense</span>
                <div class="stat-width">
                    <div class="base-stat" style="width: ${pokemonArr[i].stats[2].base_stat}px;">${pokemonArr[i].stats[2].base_stat}</div>
                </div>
            </div>
            <div class="single-stat">
                <span>Special Attack</span>
                <div class="stat-width">
                    <div class="base-stat" style="width: ${pokemonArr[i].stats[3].base_stat}px;">${pokemonArr[i].stats[3].base_stat}</div>
                </div>
            </div>
            <div class="single-stat">
                <span>Special Defense</span>
                <div class="stat-width">
                    <div class="base-stat" style="width: ${pokemonArr[i].stats[4].base_stat}px;">${pokemonArr[i].stats[4].base_stat}</div>
                </div>
            </div>
            <div class="single-stat">
                <span>Speed</span>
                <div class="stat-width">
                    <div class="base-stat" style="width: ${pokemonArr[i].stats[5].base_stat}px;">${pokemonArr[i].stats[5].base_stat}</div>
                </div>
            </div>
        </div>
    `;
}

function showMainInfosHtml(i) {
    return `
        <div class="main-info">
            <div class="single-info">
                <span>Height:</span>
                <span>${pokemonArr[i].height}0 cm</span>
            </div>
            <div class="single-info">
                <span>Weight:</span>
                <span>${weight}</span>
            </div>
            <div class="single-info">
                <span>Base Experience:</span>
                <span>${pokemonArr[i].base_experience}</span>
            </div>
            <div class="single-info">
                <span>Abilities:</span>
                <div class="abilities"></div>
            </div>
        </div>
    `;
}

function showEvoChainWithOnePokemon(firstPokemonOfEvoJson) {
    return `
        <div class="evo-chain-one">
            <img class="one-evo-img" src="${firstPokemonOfEvoJson.sprites.other['official-artwork'].front_default}">
        </div>
    `;
}

function showEvoChainWithTwoPokemon(firstPokemonOfEvoJson, secondPokemonOfEvoJson) {
    return `
        <div class="evo-chain-images">
            <img class="two-evo-img" src="${firstPokemonOfEvoJson.sprites.other['official-artwork'].front_default}">
            <img class="right-arrow" src="./img/arrow-right.svg">
            <img class="two-evo-img" src="${secondPokemonOfEvoJson.sprites.other['official-artwork'].front_default}">
        </div>
    `;
}

function showEvoChainWithThreePokemon(firstPokemonOfEvoJson, secondPokemonOfEvoJson, thridPokemonOfEvoJson) {
    return `
        <div class="evo-chain-images">
            <img class="evo-img" src="${firstPokemonOfEvoJson.sprites.other['official-artwork'].front_default}">
            <img class="right-arrow" src="./img/arrow-right.svg">
            <img class="evo-img" src="${secondPokemonOfEvoJson.sprites.other['official-artwork'].front_default}">
            <img class="right-arrow" src="./img/arrow-right.svg">
            <img class="evo-img" src="${thridPokemonOfEvoJson.sprites.other['official-artwork'].front_default}">
        </div>
    `;
}