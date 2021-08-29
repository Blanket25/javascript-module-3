async function getEpisodes(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

async function getCharacters() {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const {results} = await response.json();
    return results;
}

export {getEpisodes, getCharacters};