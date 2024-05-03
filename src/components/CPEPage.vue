<script setup lang="ts">
import TitleofAPage from './TitleofAPage.vue';
import CPI from './CPEComponents/CPI.vue';
import TOECPE from './CPEComponents/TOECPE.vue';
import Cache from  './CPEComponents/Cache.vue';
</script>

<template>
    <TitleofAPage title="Zmogljivost CPE"></TitleofAPage>
    <v-card variant="flat" style="background-color: transparent;">
        <v-tabs v-model="tab" align-tabs="center">
            <v-tab :value="1" :style="styleForTabs" >CPI</v-tab>
            <v-tab :value="2" :style="styleForTabs" >Trajanje operacije enociklene CPE</v-tab>
            <v-tab :value="3" :style="styleForTabs" >Predpomnilnik</v-tab>
        </v-tabs>
        <v-window v-model="tab" >
            <v-window-item :key="1" :value="1" >
                <CPI></CPI>
            </v-window-item>
            <v-window-item :key="2" :value="2">
                <TOECPE></TOECPE>
            </v-window-item>
            <v-window-item :key="3" :value="3">
                <Cache></Cache>
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script lang="ts">
export default {
    name: 'CPE',
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