
import type { log } from 'console';

import type { log } from 'console';
<template>
    <v-container fluid style="display: flex; align-items: center; flex-direction: column;">
        <!-- Ovde krece sadrzaj pod stranice-->
        <v-sheet width="600" style="background-color: transparent;">
            <v-form v-model="isFormValid" @submit.prevent="submit"> 
                <v-text-field
                    v-model="n"
                    :rules="rulesNum"
                    label="N: Število vrts ukazov"
                ></v-text-field>
                <div v-for="i in Math.floor(Number(n))">
                    <v-text-field 
                        v-model="cpi[i]"
                        :label="'Število urinih period za ukaz vrste ' +  i.toString()"
                        :rules="rulesNum"
                        :key="i">
                    </v-text-field>
                    <v-text-field
                        v-model="p[i]"
                        :label="'Pogostost ukaza vrste ' +  i.toString()"
                        :rules="rulesNum"
                        :key="i">
                    </v-text-field>
                </div>

                <v-btn
                    :loading="loading"
                    type="submit"
                    block
                    class="mt-2"
                    text="Izracunaj"
                ></v-btn>
            </v-form>
        </v-sheet>
        <v-sheet width="600" style="margin-top: 30px;">
            <v-expansion-panels v-model="panel" :readonly="readonly">
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <b>Odgovor: </b> {{ odgovor }} 
                    </v-expansion-panel-title>
                    <!-- Ovde krece postupak -->
                    <v-expansion-panel-text>
                        <pre style="white-space: pre-wrap;"> {{ postopek }} </pre>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-sheet>
        <!-- Ovde se zavrsava sadrzaj podstranice -->
    </v-container>
</template>

<script lang="ts">
export default {
    name: 'PretvorbaNepredznacena',
    data: vm => ({
        loading: false,
        isFormValid: false,
        n: '0',
        cpi: [],
        p: [],
        odgovor: '',
        postopek: '',
        rulesNum: [
            (num:any) => {
                if (Number(num) == num) return true

                return 'Enter a valid number'
            },
            (v:any) => !!v || 'Number is required'
        ],
        timeout: 0,
        panel: null,
        readonly: true,
    }),
    methods: {
        
        async submit(event: any) {
            if(!this.isFormValid) return
            this.loading = true
            this.readonly = false
            this.postopek = ''

            this.odgovor = 0
            this.postopek += 'CPI = Σ (cpi[i] * p[i]) = \n'
            for(let i = 1;i <= Math.floor(Number(this.n)); i++){
                let a = Number(this.cpi[i])
                let b = Number(this.p[i])
                this.odgovor += a*b
                this.postopek += a.toString() + ' * ' + b.toString() 
                if(i < Math.floor(Number(this.n)) ) this.postopek += ' + '
            }
            console.log(this.odgovor)
            this.postopek += '\n = ' + this.odgovor.toString()
            
            this.loading = false
        }
    }
}
</script>