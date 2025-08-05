function showPokemon(pokemonArr, i) {
    return `
        <div onclick="openPokemonDialog(${i})" class="pokemon-card ${pokemonArr[i].types[0].type.name}">
            <h3>${pokemonArr[i].name.charAt(0).toUpperCase() + pokemonArr[i].name.slice(1)}</h3>
            <img class="pokemon-img" src="${pokemonArr[i].sprites.other['official-artwork'].front_default}">
            <div class="pokemon-type"></div>
        </div>
    `;
    
}

function renderPokemonType(imgSrc) {
    return `
        <div class="img-wrapper">
            <img class="type-img" src=${imgSrc}>
        </div>
    `;
}

function showClickedPokemon(i, weight) {
    return `
        <div class="pokemon-dialog ${pokemonArr[i].types[0].type.name}">
            <h2>${pokemonArr[i].name.charAt(0).toUpperCase() + pokemonArr[i].name.slice(1)}</h2>
            <img class="pokemon-img" src="${pokemonArr[i].sprites.other['official-artwork'].front_default}">
            <div class="pokemon-type-dialog"></div>
            <div class="pokemon-info ${pokemonArr[i].types[0].type.name}-info">
                <span onclick="showMainInfos(${i})" class="info main underline">main</span>
                <span onclick="showStats(${i})" class="info stats">stats</span>
                <span onclick="showEvoChain(${i})" class="info evo-chain">evo chain</span>
            </div>
            <div class="pokemon-details">
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
            </div>
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