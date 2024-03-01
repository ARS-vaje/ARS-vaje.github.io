<script setup lang="ts">
import TitleofAPage from './TitleofAPage.vue';
import PretvorbaNepredznacena from './PretvorbaComponents/PretvorbaNepredznacena.vue'
import PretvorbaPredznacena from './PretvorbaComponents/PretvorbaPredznacena.vue'
import Aritmetika from './PretvorbaComponents/Aritmetika.vue'
</script>

<template>
    <TitleofAPage title="Prervorba"></TitleofAPage>
    <v-card variant="flat" style="background-color: transparent;">
        <v-tabs v-model="tab" align-tabs="center">
            <v-tab :value="1" :style="styleForTabs" >Nepredznacena</v-tab>
            <v-tab :value="2" :style="styleForTabs" >Predznacena</v-tab>
            <v-tab :value="3" :style="styleForTabs" >Aritmetika</v-tab>
        </v-tabs>
        <v-window v-model="tab" >
            <v-window-item :key="1" :value="1" >
                <PretvorbaNepredznacena></PretvorbaNepredznacena>
            </v-window-item>
            <v-window-item :key="2" :value="2">
                <PretvorbaPredznacena></PretvorbaPredznacena>
            </v-window-item>
            <v-window-item :key="3" :value="3">
                <Aritmetika></Aritmetika>
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script lang="ts">
export default {
    name: 'Pretvorba',
    data: vm => ({
        tab: null,
        styleForTabs: 'background-color: #D0CFCF; padding: 0px 40px;',
        loading: false,
        timeout: 0,
        panel: null,
        readonly: true,
    }),
    methods: {
        back() {
            window.history.back();
        }
    }
}
</script>
