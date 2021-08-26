import {getEpisodes, getOneCharacter} from './api.js';

const root = document.getElementById('root');

//header
const headerEl = document.createElement('header');
const showTitle = document.createElement('img');
headerEl.appendChild(showTitle);
root.appendChild(headerEl);
showTitle.src = './images/image4.png';

//flex container
const flexDivEl = document.createElement('div');
root.appendChild(flexDivEl);
flexDivEl.classList.add('flex-container');

//sidebar
const sidebarEl = document.createElement('aside');
const episodesListEl = document.createElement('ul');
const nextBtn = document.createElement('button');
nextBtn.textContent = 'Load episodes';

sidebarEl.appendChild(episodesListEl);
sidebarEl.appendChild(nextBtn);
flexDivEl.appendChild(sidebarEl);

const listOfEpisodes = await getEpisodes();
const arrOfEpisodes = listOfEpisodes.results;

//this function shows a list of episodes(links) in the side bar
async function showEpisodes() {

    arrOfEpisodes.forEach(episode => {

        const episodeEl = document.createElement('li');
        episodeEl.classList.add('list-items')

        const chapterLink = document.createElement('a');
        episodeEl.appendChild(chapterLink);
        episodesListEl.appendChild(episodeEl);

        chapterLink.classList.add('link');
        chapterLink.textContent = episode.name;
        chapterLink.href = episode.url;

        return chapterLink;
    })
}

showEpisodes();


//button functionallity
nextBtn.addEventListener('click', () => {
   console.log(listOfEpisodes.info.next)
   sidebarEl.classList.add('sidebar');
})

//main content
const mainEl = document.createElement('main');
flexDivEl.appendChild(mainEl);

//create a function that on clicking the episode title it shows
//you the above info


arrOfEpisodes.forEach(episode => {
        //- Name
       const nameEl = document.createElement('h1');
       nameEl.textContent = episode.name;
       mainEl.appendChild(nameEl);

       //- Air date
       const airDatePEl = document.createElement('p');
       airDatePEl.textContent = episode.air_date;
       mainEl.appendChild(airDatePEl);

       //- Episode code
       const episodeCodePEl = document.createElement('p');
       episodeCodePEl.textContent = episode.episode;
       mainEl.appendChild(episodeCodePEl); 
     })
       
async function getCharacters(url) {
    const character = await getOneCharacter(url);
    console.log(character)
}
getCharacters(url)



       const charactersArr = episode.characters;
       charactersArr.forEach(character => {
        console.log(character)
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
  