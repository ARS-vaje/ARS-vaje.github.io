<script setup lang="ts">
import HomePage from '../components/HomePage.vue'
</script>

<template>
  <main>
    <HomePage />
    <!-- <nav>
      <RouterLink to="/pretvorba">Pretvorba</RouterLink>
      <RouterLink to="/ahmaldov">Ahmald</RouterLink>
      <RouterLink to="/ieee754">IEEE 754</RouterLink>
      <RouterLink to="/cpe">Zmogljivost CPE</RouterLink>
    </nav> -->
    <!--<div v-for="(data, i) in linkData">
      <RouterLink :to="{ path:data.link }">{{data.title}}</RouterLink>
    </div>-->
    <!--<RouterLink :to="{path: '/pretvorba'}">{{ data.title, data.img }}</RouterLink>-->
  </main>
</template>