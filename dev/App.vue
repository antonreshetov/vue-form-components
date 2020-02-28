<template>
  <div class="dev">
    <h2>Default Select</h2>
    <div style="max-width: 400px; margin-bottom: 20px">
      <vue-select
        v-model="selected"
        :data="options"
        placeholder="Select"
        :multiple="true"
      />
    </div>
    <h2>Searchable functionality Select</h2>
    <div style="max-width: 400px">
      <vue-select
        v-model="selected2"
        :data="options2"
        placeholder="Select"
        :multiple="true"
        :searchable="true"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data () {
    return {
      options: [
        { label: 'label 1', value: 1 },
        { label: 'label 2', value: 2 },
        { label: 'label 3', value: 3 }
      ],
      options2: [
        { label: 'label 1', value: 1 },
        { label: 'label 2', value: 2 },
        { label: 'label 3', value: 3 }
      ],
      selected: [],
      selected2: []
    }
  }
}
</script>

<style lang="scss">
.dev {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
