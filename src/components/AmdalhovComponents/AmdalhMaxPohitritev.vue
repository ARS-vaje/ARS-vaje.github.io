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
        sn: '',
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
            
            let f = Number(this.f)
            this.odgovor = (1/f).toFixed(3)
            this.postopek = `Maksimalna možna pohitritev je: 1/${f} = ${this.odgovor}`

            this.loading = false
        }
    }
}
</script>