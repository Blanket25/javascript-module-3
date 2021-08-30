import {getEpisodes} from './api.js';

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


let episodeNumber = 1;

function showEpisodesInfo(){
    
        let episode = `https://rickandmortyapi.com/api/episode/${episodeNumber}`
        fetch(episode)
            .then(response => response.json())
            .then(episode => {
                mainEl.textContent = '';

                const textDiv = document.createElement('div')
                mainEl.appendChild(textDiv)

                //- Name
                const nameEpisodeH1 = document.createElement('h1');
                textDiv.appendChild(nameEpisodeH1);
                nameEpisodeH1.classList.add('subtitle')
                nameEpisodeH1.textContent = episode.name;
            
                //- Air date //- Episode code
                const episodeInfoP = document.createElement('p');
                textDiv.appendChild(episodeInfoP);
                episodeInfoP.textContent = `${episode.air_date} | ${episode.episode}`;

                const charContainerDiv = document.createElement('div')
                mainEl.appendChild(charContainerDiv)
                charContainerDiv.classList.add('div-char-flex')

                let CharArr = episode.characters;

                CharArr.forEach(charUrl => {
                    fetch(charUrl)
                        .then(response => response.json())
                        .then(character => {
                            const charDiv = document.createElement('div');
                            charContainerDiv.appendChild(charDiv) 
                            
                            // - Character image
                            const charImg = document.createElement('img');
                            charDiv.appendChild(charImg);
                            charImg.classList.add('characters-img')
                            charImg.src = character.image;
                        
                            // - Character name
                            const charNameH3 = document.createElement('h3');
                            charDiv.appendChild(charNameH3);
                            charNameH3.textContent = character.name;
                            
                            // - Character status // - Character specie
                            const charStatusP = document.createElement('p');
                            charDiv.appendChild(charStatusP);               
                            charStatusP.textContent = `${character.species} | ${character.status}`;

                        })
                })
                })

        episodeNumber ++;             
}

let pageNumber = 1;

async function showEpisodes() {
    const episodes = await getEpisodes(pageNumber);
    episodes.results.forEach(episode => {
        const episodeListItem = document.createElement('li');
        episodesList.appendChild(episodeListItem)
        episodeListItem.classList.add('list-items')
        episodeListItem.textContent = episode.name;

        episodeListItem.addEventListener('click', showEpisodesInfo)
    });
    
}

showEpisodes()

nextBtn.addEventListener('click', () => {
    pageNumber ++;
    showEpisodes ()
    sidebarEl.classList.add('scrolling')
})

