function showFirstTwentyPokemon(pokemonJson) {
    return `
        <div class="pokemon-card">
            <h3>${pokemonJson.name.charAt(0).toUpperCase() + pokemonJson.name.slice(1)}</h3>
            <img class="pokemon-img" src="${pokemonJson.sprites.other['official-artwork'].front_default}">
            <div>
                ${showPokemonType(pokemonJson)}
            </div>
        </div>
    `;
}

function renderPokemonType(imgSrc) {
    return `
        <img src="${imgSrc}">
    `;
}