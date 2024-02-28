<script setup lang="ts">
import TitleofAPage from './TitleofAPage.vue';
import Pretvorba from './IEEE754Components/Pretvorba.vue';
import Aritmetika from './IEEE754Components/Aritmetika.vue';
</script>

<template>
    <TitleofAPage title="IEEE 754"></TitleofAPage>
    <v-card variant="flat" style="background-color: transparent;">
        <v-tabs v-model="tab" align-tabs="center">
            <v-tab :value="1" :style="styleForTabs" >Pretvorba</v-tab>
            <v-tab :value="2" :style="styleForTabs" >Aritmetika</v-tab>
        </v-tabs>
        <v-window v-model="tab" >
            <v-window-item :key="1" :value="1" >
                <Pretvorba></Pretvorba>
            </v-window-item>
            <v-window-item :key="2" :value="2">
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
        /*async checkApi(num: any) {
            return new Promise(resolve => {
            clearTimeout(this.timeout)

            this.timeout = setTimeout(() => {
                if (Number(num) !== num) return resolve('Please enter a number.')
                return resolve(true)
            }, 1000)
            })
        }*/
    }
}
</script>