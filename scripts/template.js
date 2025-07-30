function showFirstTwentyPokemon(pokemonJson, i) {
    return `
        <div class="pokemon-card">
            <h3>${pokemonJson.name}</h3>
            <img class="pokemon-img" src="${pokemonJson.sprites.front_default}">
        </div>
    `;
}