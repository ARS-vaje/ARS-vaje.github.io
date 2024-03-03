<template>
    <v-container fluid style="display: flex; align-items: center; flex-direction: column;">
        <!-- Ovde krece sadrzaj pod stranice-->
        <v-sheet width="600" style="background-color: transparent;">
            <v-form v-model="isFormValid" @submit.prevent="submit"> 
                <v-text-field
                    v-model="tpcq"
                    :rules="rulesNum"
                    label="T_pcq"
                ></v-text-field>
                <v-text-field
                    v-model="tmem"
                    :rules="rulesNum"
                    label="T_mem"
                ></v-text-field>
                <v-text-field
                    v-model="trfread"
                    :rules="rulesNum"
                    label="T_RFread"
                ></v-text-field>
                <v-text-field
                    v-model="tmux"
                    :rules="rulesNum"
                    label="T_mux"
                ></v-text-field>
                <v-text-field
                    v-model="tale"
                    :rules="rulesNum"
                    label="T_ALE"
                ></v-text-field>
                <v-text-field
                    v-model="tadd"
                    :rules="rulesNum"
                    label="T_add"
                ></v-text-field>
                <v-text-field
                    v-model="tsetup"
                    :rules="rulesNum"
                    label="T_setup"
                ></v-text-field>
                <v-text-field
                    v-model="tgate"
                    :rules="rulesNum"
                    label="T_gate"
                ></v-text-field>
                <v-text-field
                    v-model="tse"
                    :rules="rulesNum"
                    label="T_se"
                ></v-text-field>

                <v-select
                    v-model="format"
                    :items="formats"
                    :rules="[v => !!v || 'Format is required']"
                    label="Vrsta ukaza"
                ></v-select>

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
        tpcq: '',
        tmem: '',
        trfread: '',
        tmux: '',
        tale: '',
        tadd: '',
        tsetup: '',
        tgate: '',
        tse: '',
        format: '',
        formats: [
            'Format R',
            'LW',
            'SW',
            'BEQ',
            'Format I'
        ],
        odgovor: '',
        postopek: '',
        rulesNum: [
            (num:any) => {
                if (Number(num) == num) return true

                return 'Enter a valid number'
            }
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

            if(this.format == 'Format R'){
                this.odgovor = Number(this.tpcq) + Number(this.tmem) + Number(this.trfread) + Number(this.tmux) + Number(this.tale) + Number(this.tmux) + Number(this.tsetup) 
                this.postopek += 'T_CPE = T_pcq + T_mem + T_RFread + T_mux + T_ALE + T_mux + T_setup = \n'
                this.postopek += `${this.tpcq} + ${this.tmem} + ${this.trfread} + ${this.tmux} + ${this.tale} + ${this.tmux} + ${this.tsetup}`
                this.postopek += ' = \n' + this.odgovor
            }
            
            if(this.format == 'LW'){
                //tCPE = tpcq + tmem + max[tRFread,tse+ tmux] + tALE + tmem + tmux + tsetup,RF
                this.odgovor = Number(this.tpcq) + Number(this.tmem) + Math.max( Number(this.trfread), Number(this.tse) + Number(this.tmux) ) + Number(this.tale) + Number(this.tmem) + Number(this.tmux) + Number(this.tsetup) 
                this.postopek += 'T_CPE = T_pcq + T_mem + max[T_RFread, T_se + T_mux] + T_ALE + T_mem + T_mux + T_setup = \n'
                this.postopek += `${this.tpcq} + ${this.tmem} + max[${this.trfread}, ${this.tse} + ${this.tmux}] + ${this.tale} + ${this.tmem} + ${this.tmux} + ${this.tsetup}`
                this.postopek += ' = \n' + this.odgovor
            }

            if(this.format == 'SW'){
                //tCPE = tpcq + tmem + max[tRFread,tse+ tmux] + tALE + tmem
                this.odgovor = Number(this.tpcq) + Number(this.tmem) + Math.max( Number(this.trfread), Number(this.tse) + Number(this.tmux) ) + Number(this.tale) + Number(this.tmem)
                this.postopek += 'T_CPE = T_pcq + T_mem + max(T_RFread, T_se + T_mux) + T_ALE + T_mem = \n'
                this.postopek += `${this.tpcq} + ${this.tmem} + max[${this.trfread}, ${this.tse} + ${this.tmux}] + ${this.tale} + ${this.tmem}`
                this.postopek += ' = \n' + this.odgovor
            }

            if(this.format == 'BEQ'){
                //tCPE = tpcq + tmem + max[tRFread + tmux + tALE + tgate, tse + tadd]+ tmux + tsetup,PC
                this.odgovor = Number(this.tpcq) + Number(this.tmem) + Math.max( Number(this.trfread) + Number(this.tmux) + Number(this.tale) + Number(this.tgate), Number(this.tse) + Number(this.tadd) ) + Number(this.tmux) + Number(this.tsetup) 
                this.postopek += 'T_CPE = T_pcq + T_mem + max[T_RFread + T_mux + T_ALE + T_gate, T_se + T_add]+ T_mux + T_setup = \n'
                this.postopek += `${this.tpcq} + ${this.tmem} + max[${this.trfread} + ${this.tmux} + ${this.tale} + ${this.tgate}, ${this.tse} + ${this.tadd}] + ${this.tmux} + ${this.tsetup}`
                this.postopek += ' = \n' + this.odgovor
            }

            if(this.format == 'Format I'){
                //tCPE = tpcq + tmem + max[tRFread, tse + tmux] + tALE + tmux + tsetup
                this.odgovor = Number(this.tpcq) + Number(this.tmem) + Math.max( Number(this.trfread), Number(this.tse) + Number(this.tmux) ) + Number(this.tale) + Number(this.tmux) + Number(this.tsetup) 
                this.postopek += 'T_CPE = T_pcq + T_mem + max[T_RFread, T_se + T_mux] + T_ALE + T_mux + T_setup = \n'
                this.postopek += `${this.tpcq} + ${this.tmem} + max[${this.trfread}, ${this.tse} + ${this.tmux}] + ${this.tale} + ${this.tmux} + ${this.tsetup}`
                this.postopek += ' = \n' + this.odgovor
            }
            
            this.loading = false
        }
    }
}
</script>