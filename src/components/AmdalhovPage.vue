<script setup lang="ts">
import TitleofAPage from './TitleofAPage.vue';
import AmdalhFormula from './AmdalhovComponents/AmdalhFormula.vue';
import AmdalhMaxPohitritev from './AmdalhovComponents/AmdalhMaxPohitritev.vue';
</script>

<template>
    <TitleofAPage title="Amdalhov Zakon"></TitleofAPage>
    <v-card variant="flat" style="background-color: transparent;">
        <v-tabs v-model="tab" align-tabs="center">
            <v-tab :value="1" :style="styleForTabs" >Amdalhov zakon</v-tab>
            <v-tab :value="2" :style="styleForTabs" >Maksimalna možna pohitritev</v-tab>
        </v-tabs>
        <v-window v-model="tab" >
            <v-window-item :key="1" :value="1" >
                <AmdalhFormula></AmdalhFormula>
            </v-window-item>
            <v-window-item :key="2" :value="2">
                <AmdalhMaxPohitritev></AmdalhMaxPohitritev>
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script lang="ts">
export default {
    name: 'Amdalh',
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