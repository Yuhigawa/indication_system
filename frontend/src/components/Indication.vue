<script setup lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component ({
  name: 'Indication'
})
export default class Indication extends Vue {
  private msg: string = "welcome to my app"
}
</script>

<template>
  <div>
    Hello World
  </div>
</template>

<style scoped>
</style>
