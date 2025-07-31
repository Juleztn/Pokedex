function showFirstTwentyPokemon(pokemonArr, i) {
    return `
        <div class="pokemon-card ${pokemonArr[i].types[0].type.name}">
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