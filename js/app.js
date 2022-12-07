const typesPokemon = {
    bug: '#26de81',
    dragon: '#ffeaa7',
    electric: '#fed330',
    fairy: '#ff0069',
    fighting: '#30336b',
    fire: '#D73502',
    flying: '#81ecec',
    grass: '#00b894',
    ground: '#efb549',
    ghost: '#a55eea',
    ice: '#74b9ff',
    normal: '#95afc0',
    poison: '#6c5ce7',
    psychic: '#a29bfe',
    rock: '#2d3436',
    water: '#0190ff',
};

const api = 'https://pokeapi.co/api/v2/pokemon/';
const card = document.getElementById('card');
const btnGenerate = document.getElementById('btn');




let getPokeData = () => {
    //  Number Random
    let id = Math.floor(Math.random() * 150) + 1;
    //  Pokemon Id
    const numberId = api + id;

    fetch(numberId)
        .then(response => response.json())
        .then((data) => {
            generateCard(data);
        });
}


let generateCard = (data) => {
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;


    //  Add set themeColor for Pokemon Type
    const themeColor = typesPokemon[data.types[0].type.name];
    card.innerHTML = `
        <p class="hp">
            <span>HP</span>
            ${hp}
        </p>
        <img src=${imgSrc} />
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types"></div>

        <div class="stats">
            <div>
                <h3>${statAttack}</h3>
                <p>Attack</p>
            </div>
            
            <div>
                <h3>${statDefense}</h3>
                <p>Defense</p>
            </div>

            <div>
                <h3>${statSpeed}</h3>
                <p>Speed</p>
            </div>
        </div>
    `;

    appendTypes(data.types);
    styleCard(themeColor);
}


let appendTypes = (types) => {
    types.forEach((item) => {
        let span = document.createElement('span');
        span.textContent = item.type.name;
        document.querySelector('.types').appendChild(span);
    });
}

let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #fff 36%)`;
    card.querySelectorAll('.types span').forEach((typesPokemon) => {
        typesPokemon.style.backgroundColor = color;
    });
}

btnGenerate.addEventListener('click', getPokeData);
window.addEventListener('load', getPokeData);