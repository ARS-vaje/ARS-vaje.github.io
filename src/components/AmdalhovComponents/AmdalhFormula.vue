<template>
    <v-container fluid style="display: flex; align-items: center; flex-direction: column;">
        <!-- Ovde krece sadrzaj pod stranice-->
        <v-sheet width="600" style="background-color: transparent;">
            <v-form v-model="isFormValid" @submit.prevent="submit"> 
                <v-text-field
                    v-model="f"
                    :rules="rulesNum"
                    label="f: Delež operacij , ki se ne pohitrijo"
                ></v-text-field>
                <v-text-field
                    v-model="n"
                    :rules="rulesNum"
                    label="N: faktor pohitritve za (1 - f) operacij"
                ></v-text-field>
                <v-text-field
                    v-model="sn"
                    :rules="rulesNum"
                    label="S(N): povečanje hitrosti celotnega računalnika"
                ></v-text-field>

                <v-select
                    v-model="format"
                    :items="formats"
                    :rules="[v => !!v || 'Format is required']"
                    label="Kaj je potrebno izračunati?"
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
        f: '',
        n: '',
        sn: '',
        format: '',
        formats: [
            'f',
            'N',
            'S(N)'
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

            if(this.format == 'f'){
                let n = Number(this.n)
                let sn = Number(this.sn)
                this.odgovor = Number(((n/sn)-1)/(n-1)).toFixed(3)
                this.postopek = `f = ((N/S(N))-1)/(N-1) = ((${n}/${sn})-1)/(${n}-1) = ${this.odgovor}`
            }

            if(this.format == 'N'){
                let f = Number(this.f)
                let sn = Number(this.sn)
                this.odgovor = Number((1-f)/((1/sn) - f)).toFixed(3)
                this.postopek = `N = (1-f)/((1/S(N)) - f) = (1-${f})/((1/${sn}) - ${f}) = ${this.odgovor}`
            }

            if(this.format == 'S(N)'){
                let f = Number(this.f)
                let n = Number(this.n)
                this.odgovor = Number(1/(f + ((1-f)/n))).toFixed(3)
                this.postopek = `S(N) = 1/(f + ((1-f)/N)) = 1/(${f} + ((1-${f})/${n})) = ${this.odgovor}`
            }
            
            
            this.loading = false
        }
    }
}
</script>