<script>
import Grid from './Grid.vue'
import api from '../services/games'

export default {
  name: 'CadastroJogos',
  components: {
    Grid
  },
  data() {
    return {
      games: [],
      columns: [
        { key: 'title', text: 'Título' },
        { key: 'year', text: 'Lançamento' },
        { key: 'company', text: 'Fabricante' },
      ],
      selection: null
    }
  },
  route: {
    data() {
      api.getAll().then(r => this.games = r)
    }
  }
}
</script>

<template>
  <div id="cadastro-games">
    <header>
      <h1>Cadastro de Jogos</h1>
      <p>Organize seus jogos favoritos, informando todos que você deseja acessar no futuro.</p>

      <button class="floating add" v-if="!selection" v-link="{ path: '/jogos/incluir' }" title="Incluir novo"></button>
      <button class="floating edit" v-if="selection" v-link="{ path: `/jogos/editar/${selection}` }" title="Editar selecionado"></button>
    </header>

    <section>
      <div>
        <h2>Jogos cadastrados</h2>

        <p v-if="games.length">Você já cadastrou <b>{{ games.length }}</b>
          {{ games.length === 1 ? 'jogo': 'jogos' }} até o momento.</p>
        <p v-else>Nenhum jogo foi cadastrado até o momento.</p>
      </div>

      <grid :items="games" :columns="columns" :selection.sync="selection"></grid>
    </section>
  </div>
</template>
