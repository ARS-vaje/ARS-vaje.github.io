<script setup lang="ts">
import TitleofAPage from './TitleofAPage.vue';
</script>

<template>
    <TitleofAPage title="Prervorba"></TitleofAPage>
</template>

<script lang="ts">
export default {
    name: 'Pretvorba',
    methods: {
        back() {
            window.history.back();
        }
    }
}
</script>

<style>

</style>