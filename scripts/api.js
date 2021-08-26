async function getEpisodes() {
    const url = 'https://rickandmortyapi.com/api/episode';
    
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

async function getOneCharacter(url) {
  const response = await fetch (url);
  const character = await response.json();

  return character;
}


export {getEpisodes, getOneCharacter};