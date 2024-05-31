<template>
  <div class="cardPokemon">
    <div class="containerCard">
      <div class="card">
        <div class="text-center p-2">
          <img draggable="false" :src="imgPoke" alt="pokemon" :class="{ visible: !mostrar }">
        </div>
        <div class="text-center" v-if="mostrar">
          <h5>
            <strong>{{ nombrePoke }}</strong>
          </h5>
        </div>
        <div class="text-center" v-else>
          <div class="p-2">
            <input class="p-2" type="text" v-model="respuestaPoke" @keyup.enter="descubrirPokemon" >
          </div>
          <div>
            <button class="btn btn-info p-2" @click="descubrirPokemon">
              Descubrir
            </button>
          </div>
        </div>



      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'CardPokemon',
  props: {
    imgPoke: String,
    nombrePoke: String
  },
  data() {
    return {
      respuestaPoke: "",
      mostrar: false
    }
  },
  methods: {
    showAlert: function () {
      this.$swal({
        title: 'Error',
        text: `Nombre incorrecto, el nombre del pokémon comienza con: ${this.nombrePoke.substring(0, 3)}...`,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    },
    enviarPoke: function () {
      if (this.nombrePoke === this.respuestaPoke) {
        this.$emit("descubrir")
        this.mostrar = !this.mostrar;

      } else {
        this.showAlert();
        this.respuestaPoke = ""
      }
    },
    descubrirPokemon: function () {
      this.enviarPoke();
    },


  }
}
</script>


<style scoped>
.card {
  background-color: rgba(63, 245, 245, 0.573);
}

.card img {
  width: 90%;
  height: 200px;
}

.card input,
button {
  width: 95%;
}

.visible {
  filter: blur(8px) grayscale(100%);
}
</style>
