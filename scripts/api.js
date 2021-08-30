async function getEpisodes(page) {
    const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
    const result = await response.json();
    return result;
}


export {getEpisodes};