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
      h1: '',
      loading: true,
      id: null,
      title: '',
      year: '',
      company: ''
    }
  },
  route: {
    data() {
      if (this.$route.params.id) {
        this.h1 = 'Editar Jogo'

        this.id = this.$route.params.id
        api.getOne(this.id).then(r => {
          this.title = r.title
          this.year = r.year
          this.company = r.company
          this.loading = false
        })
      } else {
        this.h1 = 'Incluir Jogo'
        this.loading = false
      }

      this.$nextTick(() => this.$els.title.focus())
    }
  },
  methods: {
    salvarRegistro() {
      const game = {
        title: this.title,
        year: this.year,
        company: this.company
      }

      if (!game.title) {
        this.$dispatch('toast', 'O título do jogo é obrigatório!', 'error')
        this.$els.title.focus()
        return
      }

      this.loading = true

      if (this.id) {
        game.id = this.id
        api.put(game)
      } else {
        api.post(game)
      }

      this.limparCampos()
      this.$dispatch('toast', 'Jogo salvo com sucesso!')
      this.$dispatch('navigate', '/jogos')
    },
    limparCampos() {
      this.title = ''
      this.year = ''
      this.company = ''
      this.$els.title.focus()
    },
    excluirRegistro() {
      this.loading = true
      api.delete(this.id)

      this.limparCampos()
      this.$dispatch('toast', 'Jogo excluído com sucesso!')
      this.$dispatch('navigate', '/jogos')
    }
  }
}
</script>

<template>
  <div id="cadastro-games">
    <header>
      <h1>{{ h1 }}</h1>
      <p>Preencha com as informações desejadas.</p>
    </header>

    <section>
      <div>
        <h2>Dados do jogo</h2>
        <p>Cadastre os dados relevantes de cada jogo.</p>
      </div>

      <fieldset>
        <div>
          <input v-el:title v-model="title" id="titulo" required>
          <label for="titulo">Título</label>
        </div>

        <div>
          <input v-el:year v-model="year" id="ano" required>
          <label for="ano">Ano de lançamento</label>
        </div>

        <div>
          <input v-el:company v-model="company" id="fabricante" required>
          <label for="fabricante">Fabricante</label>
        </div>

        <footer>
          <button @click="salvarRegistro" class="primary" title="Salvar jogo" :disabled="loading">
            <template v-if="id">Alterar</template>
            <template v-else>Incluir</template>
          </button>
          <button v-if="id" @click="excluirRegistro" title="Excluir jogo" :disabled="loading">Excluir</button>
          <button v-link="{ path: '/games' }" title="Voltar à tela anterior" :disabled="loading">Cancelar</button>
        </footer>
      </fieldset>
    </section>
  </div>
</template>
