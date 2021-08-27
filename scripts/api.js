async function getEpisodes(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

export {getEpisodes};