<script setup lang="ts">
import Link from './Link.vue'
</script>
<template>
    <header>
    <RouterLink to="/"><p id="title">ARS-vaje</p></RouterLink>
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
            img: './icons/12.png'
          },
          {
            title: 'Ahmald',
            link: '/ahmaldov',
            img: ''
          },{
            title: 'IEEE 754',
            link: '/ieee754',
            img: ''
          },{
            title: 'Zmogljivost CPE',
            link: '/cpe',
            img: ''
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