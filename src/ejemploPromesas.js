let urlIndice = "https://pokeapi.co/api/v2/pokemon";
let getPokemon = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    return {id: data.id, nombre: data.name, images: data.sprites.front_default}
}
let main = async () => {
    let response = await fetch(urlIndice);
    let data = await response.json();
    let arrayPromesas = data.results.map(pokemon => getPokemon(pokemon.url));
    Promise.all(arrayPromesas).then(pokemones => console.log(pokemones));
}
main();