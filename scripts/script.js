import {getEpisodes} from './api.js';

const root = document.getElementById('root');

//header
const headerEl = document.createElement('header');
const showTitle = document.createElement('img');
headerEl.appendChild(showTitle);
root.appendChild(headerEl);
showTitle.src = './images/image4.png';
showTitle.classList.add('img:first-of-type');

//flex container
const flexDivEl = document.createElement('div');
root.appendChild(flexDivEl);
flexDivEl.classList.add('flex-container');

//sidebar
const sidebarEl = document.createElement('aside');
const episodesListEl = document.createElement('ul');
const nextBtn = document.createElement('button');
nextBtn.textContent = 'Load episodes';
sidebarEl.classList.add('sidebar')

sidebarEl.appendChild(episodesListEl);
sidebarEl.appendChild(nextBtn);
flexDivEl.appendChild(sidebarEl);


let nextPage;

async function showEpisodes(pageUrl) {
    const moreEpisodes = await getEpisodes(pageUrl);
    const arrOfEpisodes = moreEpisodes.results; 
    nextPage = moreEpisodes.info.next;
    return arrOfEpisodes;
}

let chapterLinks = [];

async function episodesToDom(arr) {

    arr.forEach(episode => {

        const episodeEl = document.createElement('li');
        episodeEl.classList.add('list-items')

        const chapterLink = document.createElement('a');
        episodeEl.appendChild(chapterLink);
        episodesListEl.appendChild(episodeEl);

        chapterLink.classList.add('link');
        chapterLink.textContent = episode.name;
        chapterLink.href = episode.url;
        chapterLinks.push(chapterLink.href)
    })
}

const episodesUrl = 'https://rickandmortyapi.com/api/episode';

episodesToDom(await showEpisodes(episodesUrl));

//button functionallity
nextBtn.addEventListener('click', async () => {
    episodesToDom(await showEpisodes(nextPage))
})
   
//main content
const mainEl = document.createElement('main');
flexDivEl.appendChild(mainEl);

function getEpisodeInfo(arr) {
arr.forEach(episode => {
         //- Name
       const nameEl = document.createElement('h1');
       nameEl.textContent = episode.name;
       mainEl.appendChild(nameEl);
       nameEl.classList.add('subtitle')

       //- Air date //- Episode code
       const airDatePEl = document.createElement('p');
       airDatePEl.textContent = `${episode.air_date} | ${episode.episode}`;
       mainEl.appendChild(airDatePEl);
    })
}

function getCharacterInfo(arr) {
   
    arr.forEach(character => {
        // - Character name
        const charNameEl = document.createElement('h3');
        charNameEl.textContent = character.name;
        mainEl.appendChild(charNameEl);
        
        
        // - Character status
        const charStatEl = document.createElement('p');
        charStatEl.textContent = character.status;
        mainEl.appendChild(charStatEl);

        // - Character specie
        const charSpecieEl = document.createElement('p');
        charSpecieEl.textContent = character.species;
        mainEl.appendChild(charSpecieEl);

        // - Character image
        const charImgEl = document.createElement('img');
        charImgEl.src = character.image;
        mainEl.appendChild(charImgEl);

       })
  
}




   