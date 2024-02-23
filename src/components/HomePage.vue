<script setup lang="ts">
import Link from './Link.vue'
</script>
<template>
  <header>
    <!--<RouterLink to="/">-->
      <p id="title">ARS-vaje</p>
    <!--</RouterLink>-->
  </header>
  <main style="display: flex; justify-content: space-around;">
    <!-- <nav>
      <RouterLink to="/pretvorba">Pretvorba</RouterLink>
      <RouterLink to="/ahmaldov">Ahmald</RouterLink>
      <RouterLink to="/ieee754">IEEE 754</RouterLink>
      <RouterLink to="/cpe">Zmogljivost CPE</RouterLink>
    </nav> -->
    <div style="display: grid; width: 840px;">
        <div v-for="(data, i) in linkData" :key="i" :style="{'grid-row': (i%2 + 1), 'grid-column': (i/2 + 1)}" style="margin:10px;">
        <!--<RouterLink :to="{ path:data.link }">{{data.title}}</RouterLink>-->
            <Link :title="data.title" :link="data.link" :icon="data.img"/>
        </div>
    </div>
    <!--<RouterLink :to="{path: '/pretvorba'}">{{ data.title, data.img }}</RouterLink>-->
  </main>
  <footer>
    Made by Djole Stevanovic
  </footer>
</template>

<script lang="ts">
export default {
  name: 'HomeView',
  data() {
      return {
        linkData: [
          {
            title: 'Pretvorba',
            link: '/pretvorba',
            img: 'https://raw.githubusercontent.com/ARS-vaje/ARS-vaje.github.io/303a110472d7adb92762983abc0ef1027aaaefd5/src/components/icons/binary-code.svg'
          },
          {
            title: 'IEEE 754',
            link: '/ieee754',
            img: 'https://raw.githubusercontent.com/ARS-vaje/ARS-vaje.github.io/d6dfcfba925bdbf6a47b95a4d8c21f63d7a22da2/src/components/icons/ieee.svg'
          },{
            title: 'Zmogljivost CPE',
            link: '/cpe',
            img: 'https://raw.githubusercontent.com/ARS-vaje/ARS-vaje.github.io/303a110472d7adb92762983abc0ef1027aaaefd5/src/components/icons/processor.svg'
          },
          {
            title: 'Amdalhov',
            link: '/amdalhov',
            img: 'https://raw.githubusercontent.com/ARS-vaje/ARS-vaje.github.io/303a110472d7adb92762983abc0ef1027aaaefd5/src/components/icons/function-math.svg'
          }
        ]
      }
  }
}
</script>

<style scoped>
#title {
  font-family: 'Roboto';
  font-size: 80px;
  color: #000000;
  text-align: center;
  margin-top: 20px;
}
</style>