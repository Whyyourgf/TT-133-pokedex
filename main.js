// backend
// html lengiaje de hipertexto
// css paginas de estilo en cascada
// javascript estructura y la logica
//IDE entorno de desarrollo integrado -visual studio code
//dreamweaver programa que permite diseñar y crear sitios web
//visual studio, muy completo
const pokemonList = document.getElementById("pokemonList")
const pokemonDetail =document.getElementById("pokemonDetail")
const backBTN =document.getElementById("backBTN")
const pokemonInfo = document.getElementById("pokemonInfo")
const searchInput =document.getElementById("searchInput")
const searchBtn =document.getElementById("searchBtn")
let query =""

//Necesito hacer una peticion
//fetch es buscar
async function fetchPokemonData(pokemonID) {
      //await es esperar
      const response= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
      //Esto quiere decir espera a que se resuelva lo anterior y luego si hazme el proceso
      const pokemon= await response.json()
      return pokemon
 }
 function displayPokemon(pokemon){
    const pokemonCard=document.createElement("div")
    pokemonCard.classList.add("pokemonCard")
    pokemonCard.innerHTML =`
    <h3>${pokemon.name}</h3>
    <img src=${pokemon.sprites.front_default} alt="${pokemon.name}">
    `
    pokemonCard.addEventListener ("click",  ()=>showPokemonDetail(pokemon))
    pokemonList.appendChild(pokemonCard)
 }
function showPokemonDetail (pokemon){
    console.log(pokemon)
    //
    pokemonList.style.display="none"
    pokemonDetail.style.display= "block"
    let abilities=" "
    for(let i=0; i<pokemon.abilities.lenght; i++){
        abilities= abilities+pokemon.abilities[i].ability.name+" "
    }

    let statsToPrint=""
    pokemon.stats.forEach(stat => {
      console.log(stat.base_stat)
      // cosole.log(stat.stat.name)
      statsToPrint = statsToPrint+ `<li>${stat.stat.name}: ${stat.base_stat}</li>`
});

let movements = ""
pokemon.moves.forEach(moves =>{
    movements = movements + `<li class="move">${moves.move.name}</li> `
})

//innerHTML siempre va a ir con una string
pokemonInfo.innerHTML=`
<h3${pokemon.name}</h3>
<img src=${pokemon.sprites.front_default} alt="${pokemon.name}">
<h4${abilities}></h4>
<h4>stats </h4>
<ul>
${statsToPrint}
</ul>
${movements}
</ul>
`
// console.log(pokemonCard)
}
 
searchInput.addEventListener("input", (evento)=>{
    query = evento.target.value;
})
async function searchPokemon() {
    try {
        const pokemon = await fetchPokemonData(query)
        showPokemonDetail(pokemon)
    } catch (error) {
        alert("pokemon no encontrado, intenta con otro ID o nombre")
    }
}
     searchBtn.addEventListener("click", ()=>{
     console.log(query)
     searchPokemon()
    })
    
    async function loadPokedex(){
        for(let i=1; i<51; i++){
         dato = await fetchPokemonData(i)
         // console.log(dato)
         displayPokemon(dato)
        }
    }

loadPokedex()
