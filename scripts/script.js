import {getEpisodes, getCharacters} from './api.js';

const root = document.getElementById('root');

//header
const headerEl = document.createElement('header');
const showTitle = document.createElement('img');
headerEl.appendChild(showTitle);
root.appendChild(headerEl);
showTitle.src = './images/image4.png';
showTitle.classList.add('title-img');

//flex container
const flexDivEl = document.createElement('div');
root.appendChild(flexDivEl);
flexDivEl.classList.add('flex-container');

//sidebar
const sidebarEl = document.createElement('aside');
const episodesList = document.createElement('ul');
const nextBtn = document.createElement('button');
nextBtn.textContent = 'Load episodes';
sidebarEl.classList.add('sidebar')

sidebarEl.appendChild(episodesList);
sidebarEl.appendChild(nextBtn);
flexDivEl.appendChild(sidebarEl);

//main content
const mainEl = document.createElement('main');
flexDivEl.appendChild(mainEl);
mainEl.classList.add('main-container')


let nextPage;

async function showEpisodes(pageUrl) {
    const episodes = await getEpisodes(pageUrl);
    const arrOfEpisodes = episodes.results; 
    nextPage = episodes.info.next;

    return arrOfEpisodes;
}

async function episodesToDom(arr) {

    arr.forEach(episode => {
        const episodeListItem = document.createElement('li');
        episodesList.appendChild(episodeListItem)
        episodeListItem.classList.add('list-items')
        episodeListItem.textContent = episode.name;
        episodeListItem.addEventListener('click', async () => {

            const textDiv = document.createElement('div')
            mainEl.appendChild(textDiv)

             //- Name
            const nameEpisodeH1 = document.createElement('h1');
            nameEpisodeH1.textContent = episode.name;
            textDiv.appendChild(nameEpisodeH1);
            nameEpisodeH1.classList.add('subtitle')

            //- Air date //- Episode code
            const episodeInfoP = document.createElement('p');
            episodeInfoP.textContent = `${episode.air_date} | ${episode.episode}`;
            textDiv.appendChild(episodeInfoP);

            const charContainerDiv = document.createElement('div')
            mainEl.appendChild(charContainerDiv)
            charContainerDiv.classList.add('div-char-flex')

            const charactersArr = await getCharacters();

            charactersArr.forEach(character => {

                    const charDiv = document.createElement('div');
                    charContainerDiv.appendChild(charDiv) 
                    
                     // - Character image
                    const charImg = document.createElement('img');
                    charImg.src = character.image;
                    charDiv.appendChild(charImg);
                    charImg.classList.add('characters-img')
                
                    // - Character name
                    const charNameH3 = document.createElement('h3');
                    charNameH3.textContent = character.name;
                    charDiv.appendChild(charNameH3);
                    
                    // - Character status // - Character specie
                    const charStatusP = document.createElement('p');
                    charStatusP.textContent = `${character.species} | ${character.status}`;
                    charDiv.appendChild(charStatusP);                   
        
    })    
        })
    })
}

const episodesUrl = 'https://rickandmortyapi.com/api/episode';

episodesToDom(await showEpisodes(episodesUrl));

//button functionallity
nextBtn.addEventListener('click', async () => {
    episodesToDom(await showEpisodes(nextPage))
    sidebarEl.classList.add('scrolling')
})
   
   