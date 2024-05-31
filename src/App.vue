<template>
  <div id="app">
    <header class="text-center bg-info p-4" >
      <img class="imgHeader" :src="imgLogo" alt="">
    </header>
    <main class="container p-3" >
      <section>
        <div class="text-center" >
          <h2>¿Quién es ese pokémon?</h2>
          <p><strong>Pokemones descubiertos: {{ contador }}/20</strong></p>
        </div>
        <div class="row g-3">
             <div class="col-12 col-md-4 col-lg-3" v-for="(pokemon, index) in pokemones" :key="index" >
          <CardPokemon 
        :imgPoke="pokemon.image"
        :nombrePoke="pokemon.name"
        @descubrir="mostrarPoke(index)"
        />
        </div>
        </div>
     
        
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import CardPokemon from "./components/CardPokemon.vue"
export default {
  name: 'App',
  components: {
   CardPokemon
  },
  data() {
    return {
      pokemones: [],
      contador: "0",
      imgLogo: "/assets/Image20240529105536.png"
    }
  },
  computed: {
    todosDescubiertos: function() {
      return this.contador === 20;
    }
  },
  methods: {
    async getPokemon(){
      try {
        const getData = async function(url){
          let response = await axios.get(url);
          return {image: response.data.sprites.other.dream_world.front_default, name: response.data.name}
        }
        let response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        let { data } = response;
        this.pokemones = data.results;
        Promise.all(data.results.map(pokemon => getData(pokemon.url))).then(pokemones =>{ this.pokemones = pokemones;
          console.log(this.pokemones);
         })
      
        .catch(error =>{
          alert("Error al procesar pokemones")
          console.log(error)
        })
       console.log(data.results)
      } catch (error) {
        alert("Ha ocurrido un error al cargar")
      }
    },
    mostrarPoke: function(index){
      this.pokemones[index].mostrar = true;
      this.contador++
      if (this.todosDescubiertos) {
      this.$swal({
        title: '¡Felicidades!',
        text: '¡Descubriste todos los pokemones!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    }
    }

  },
  mounted(){
    this.getPokemon();
    
  }
}
</script>

<style>
main{
  color: white
}
.imgHeader{
  width: 50%;
  height: auto
}

</style>
