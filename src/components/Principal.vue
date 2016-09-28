<script>
export default {
  name: 'Principal',
  data() {
    return {
      pegadinha: false
    }
  }
}
</script>

<template>
  <div id="principal">
    <header>
      <h1>Super Sistema de Exemplo das Aulas</h1>
      <p>Bem-vindo ao super sistema criado durante as aulas, para estudar Vue.js.</p>
    </header>

    <section>
      <div>
        <h2>O que você quer fazer?</h2>
        <p>Escolha entra as opções abaixo para navegar para a tela desejada.</p>

        <div class="cards">
          <div tabindex class="card" v-link="{ path: '/sites' }">
            <picture>S</picture>
            <h3>Cadastro de Sites</h3>
          </div>

          <div tabindex class="card" v-link="{ path: '/jogos' }">
            <picture>J</picture>
            <h3>Cadastro de Jogos</h3>
          </div>

          <div tabindex class="card" @click="pegadinha = !pegadinha" :class="{ 'malandro': pegadinha }">
            <template v-if="!pegadinha">
              <picture>?</picture>
              <h3>Ajuda</h3>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
@import '../stylus/variables.styl'

.cards
  display: flex
  flex-flow: column
  margin: 1em -1em
  @media (min-width: $breakpoint-medium)
    flex-flow: row

.card
  flex: 1 1 auto
  min-height: 15em
  margin: 1em
  padding: 2em 1em
  background: #fff
  border: none
  box-shadow: 0 1px 1.5px 0 alpha(#000, .12), 0 1px 1px 0 alpha(#000, .24)
  border-radius: 3px
  text-align: center
  transition: box-shadow 250ms ease
  @media (min-width: $breakpoint-medium)
    flex-basis: calc(33.333% - 1em)
  picture
    display: inline-block
    background: #607d8b
    width: 12rem
    height: 12rem
    line-height: 12rem
    font-size: 5em
    color: #fff
    border-radius: 50%
    transition: background 250ms ease
  h3
    margin: 1em 0 0
    transition: color 250ms ease
  &:hover, &:focus
    cursor: pointer
    box-shadow 0 2px 2px 0 alpha(#000, .14), 0 3px 1px -2px alpha(#000, .2), 0 1px 5px 0 alpha(#000, .12)
    picture
      background: $color-secondary
    h3
      color: $color-secondary
  &.malandro
    background: url('http://veganagente.consciencia.blog.br/wp-content/uploads/2015/11/pegadinha-do-malandro.jpg')
    background-size: cover
</style>
