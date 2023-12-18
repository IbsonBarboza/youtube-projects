const pokemonName = document.querySelector('.pokemon-name')
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonImage = document.querySelector('.pokemon')

const form = document.querySelector('.form')
const inputSearch = document.querySelector('.input-search')
const preview = document.querySelector('.btn-preview')
const next = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
    

}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    
    const data = await fetchPokemon(pokemon)
    if (data) {
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

        inputSearch.value = ''
        searchPokemon = data.id
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not Found'
        pokemonNumber.innerHTML = ''
    }
    
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    renderPokemon(inputSearch.value.toLowerCase())
})

preview.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
    }
    renderPokemon(searchPokemon)
})

next.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)