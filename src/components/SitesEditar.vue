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
      h1: '',
      loading: true,
      id: null,
      title: '',
      url: '',
    }
  },
  route: {
    data() {
      if (this.$route.params.id) {
        this.h1 = 'Editar Site'

        this.id = this.$route.params.id
        api.getOne(this.id).then(r => {
          this.title = r.title
          this.url = r.url
          this.loading = false
        })
      } else {
        this.h1 = 'Incluir Site'
        this.loading = false
      }

      this.$nextTick(() => this.$els.title.focus())
    }
  },
  methods: {
    salvarRegistro() {
      const site = {
        title: this.title,
        url: this.url
      }

      if (!site.title) {
        this.$dispatch('toast', 'O título do site é obrigatório!', 'error')
        this.$els.title.focus()
        return
      }

      if (!site.url) {
        this.$dispatch('toast', 'O endereço do site é obrigatório!', 'error')
        this.$els.url.focus()
        return
      }

      this.loading = true

      if (this.id) {
        site.id = this.id
        api.put(site)
      } else {
        api.post(site)
      }

      this.limparCampos()
      this.$dispatch('toast', 'Site salvo com sucesso!')
      this.$dispatch('navigate', '/sites')
    },
    limparCampos() {
      this.title = ''
      this.url = ''
      this.$els.title.focus()
    },
    excluirRegistro() {
      this.loading = true
      api.delete(this.id)

      this.limparCampos()
      this.$dispatch('toast', 'Site excluído com sucesso!')
      this.$dispatch('navigate', '/sites')
    }
  }
}
</script>

<template>
  <div id="cadastro-sites">
    <header>
      <h1>{{ h1 }}</h1>
      <p>Preencha com as informações desejadas.</p>
    </header>

    <section>
      <div>
        <h2>Dados do site</h2>
        <p>Cadastre os dados relevantes de cada site.</p>
      </div>

      <fieldset>
        <div>
          <input v-el:title v-model="title" id="titulo" required>
          <label for="titulo">Título</label>
        </div>

        <div>
          <input v-el:url v-model="url" id="endereço" required>
          <label for="endereço">Endereço</label>
        </div>

        <footer>
          <button @click="salvarRegistro" class="primary" title="Salvar site" :disabled="loading">
            <template v-if="id">Alterar</template>
            <template v-else>Incluir</template>
          </button>
          <button v-if="id" @click="excluirRegistro" title="Excluir site" :disabled="loading">Excluir</button>
          <button v-link="{ path: '/sites' }" title="Voltar à tela anterior" :disabled="loading">Cancelar</button>
        </footer>
      </fieldset>
    </section>
  </div>
</template>
