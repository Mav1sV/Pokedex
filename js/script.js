const pokemonNum = document.querySelector('.poke_num');
const pokemonName = document.querySelector('.poke_name');
const pokemonImage = document.querySelector('.poke_image');

const form = document.querySelector('.form');
const input = document.querySelector('.inp_search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
    else{
        input.value = '';
    }}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNum.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
    pokemonImage.style.display = 'block';
    pokemonNum.innerHTML = data.id;
    pokemonName.innerHTML = data.name;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
    ['animated']['front_default'];

    input.value = '';
    searchPokemon = data.id;
    
    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNum.innerHTML = '';
    }}

form.addEventListener('submit', (event) =>{

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
})

next.addEventListener('click', (event) =>{


    searchPokemon ++;
    renderPokemon(searchPokemon)

})

prev.addEventListener('click', (event) =>{

    if(searchPokemon>1){
        searchPokemon --;
    renderPokemon(searchPokemon)
    }
})

renderPokemon(searchPokemon);