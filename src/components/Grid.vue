<script>
export default {
  name: 'Grid',
  props: {
    items: Array,
    columns: Array,
    selection: {
      type: String,
      twoway: true
    }
  },
  data() {
    return {
      sort: this.columns.length ? { key: this.columns[0].key, direction: 1 } : null
    }
  },
  methods: {
    selectionChanged(id) {
      this.selection = this.selection === id ? null : id
    },
    sortBy(key) {
      if (this.sort === null || this.sort.key !== key)
        this.sort = { key: key, direction: 1 }
      else
        this.sort = { key: key, direction: this.sort.direction === 1 ? -1 : 1 }

      this.selection = null
    }
  }
}
</script>

<template>
  <table v-if="items.length">
    <thead>
      <tr>
        <th v-for="column of columns"
          class="sortable"
          :class="{
            ascending: sort.key === column.key && sort.direction === 1,
            descending: sort.key === column.key && sort.direction === -1 }"
          :style="{ width: `${100 / columns.length}%` }"
          @click="sortBy(column.key)">
          {{ column.text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item of items | orderBy sort.key sort.direction"
        :class="{ selected: item.id === selection }"
        @click="selectionChanged(item.id)">
        <td v-for="column of columns">{{ item[column.key] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="stylus" scoped>
@import '../stylus/variables.styl'

table
  width 100%
  max-width 100%
  border 1px solid alpha(#000, .12)
  border-collapse collapse
  background-color #fff
  box-shadow 0 1px 1.5px 0 alpha(#000, .12), 0 1px 1px 0 alpha(#000, .24)
  @media (min-width $breakpoint-medium)
    width 84%
    margin 0 8%

  @media (min-width $breakpoint-large)
    width 76%
    margin 0 12%

tbody tr
  transition background-color .28s cubic-bezier(.4, 0, .2, 1)
  cursor pointer
  &:hover
    background-color alpha(#9e9e9e, .2)
  &.selected
    background-color $color-secondary
    color #fff
    &:hover
      background-color darken($color-secondary, 15%)

th
  vertical-align bottom
  text-overflow ellipsis
  font-weight 700
  letter-spacing 0
  font-size .75em
  color alpha(#000, .54)
  padding 1.125rem 18px .5rem
  text-align left
  &.sortable
    cursor pointer
    transition background-color .28s cubic-bezier(.4, 0, .2, 1)
    &:hover
      background-color alpha(#9e9e9e, .2)
    &::after
      content ''
      position relative
      display inline-block
      vertical-align middle
      width 0
      height 0
      margin -3px 0 0 5px
      opacity .66
    &.ascending::after
      border-left 4px solid transparent
      border-right 4px solid transparent
      border-top 4px solid @color
    &.descending::after
      border-left 4px solid transparent
      border-right 4px solid transparent
      border-bottom 4px solid @color

td
  border-top 1px solid alpha(#000, .12)
  font-size .9375em
  padding .75rem 18px
  white-space normal
  text-align left

th:first-of-type, td:first-of-type
  padding-left 1.5rem

th:last-of-type, td:last-of-type
  padding-right 1.5rem
</style>
