<script>
import Grid from './Grid.vue'
import api from '../services/sites'

export default {
  name: 'CadastroSites',
  components: {
    Grid
  },
  data() {
    return {
      sites: [],
      columns: [
        { key: 'title', text: 'Título' },
        { key: 'url', text: 'Endereço' }
      ],
      selection: null
    }
  },
  route: {
    data() {
      api.getAll().then(r => this.sites = r)
    }
  }
}
</script>

<template>
  <div id="cadastro-sites">
    <header>
      <h1>Cadastro de Sites</h1>
      <p>Organize seus sites favoritos, informando todos que você deseja acessar no futuro.</p>

      <button class="floating add" v-if="!selection" v-link="{ path: '/sites/incluir' }" title="Incluir novo"></button>
      <button class="floating edit" v-if="selection" v-link="{ path: `/sites/editar/${selection}` }" title="Editar selecionado"></button>
    </header>

    <section>
      <div>
        <h2>Sites cadastrados</h2>

        <p v-if="sites.length">Você já cadastrou <b>{{ sites.length }}</b>
          {{ sites.length === 1 ? 'site': 'sites' }} até o momento.</p>
        <p v-else>Nenhum site foi cadastrado até o momento.</p>
      </div>

      <grid :items="sites" :columns="columns" :selection.sync="selection"></grid>
    </section>
  </div>
</template>
