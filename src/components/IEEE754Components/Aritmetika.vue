<template>
    <v-container fluid style="display: flex; align-items: center; flex-direction: column;">
        <!-- Ovde krece sadrzaj pod stranice-->
        <v-sheet width="600" style="background-color: transparent;">
            <v-form v-model="isFormValid" @submit.prevent="submit"> <!--validate-on="submit lazy"-->
                <v-text-field
                    v-model="num"
                    :rules="rulesStev"
                    label="Stevilo"
                ></v-text-field>
                <v-text-field
                    v-model="b"
                    :rules="rulesNum"
                    label="Stevilo bitov"
                ></v-text-field>
                <v-select
                    v-model="format"
                    :items="formats"
                    :rules="[v => !!v || 'Format is required']"
                    label="Iz katerega v kateri format"
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
                        <b>Odgovor: </b> <pre> {{ odgovor }} </pre>
                    </v-expansion-panel-title>
                    <!-- Ovde krece postupak -->
                    <v-expansion-panel-text>
                        <pre style="white-space: pre-wrap;"> {{postopek }} </pre>
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
        num: '',
        odgovor: '',
        b: '',
        format: '',
        formats: [
            'Baza 10 => Predznak Velikostni',
            'Baza 10 => Z Odmikom',
            'Baza 10 => Enotski Komplement',
            'Baza 10 => Dvojiski Komplement',
            'Predznak Velikostni => Baza 10',
            'Z Odmikom => Baza 10',
            'Enotski Komplement => Baza 10',
            'Dvojiski Komplement => Baza 10'
        ],
        postopek: '',
        rulesNum: [
            (num:any) => {
                if (Number(num) == num) return true

                return 'Enter a valid number'
            },
            (v:any) => !!v || 'Number of bits is required'
        ],
        rulesStev: [
            (s:any) => {
                let count = 0
                for(let c in s){
                    if (s[c] == '.') {
                        count += 1
                    }
                    if (count > 1) {
                        return 'Enter a valid number'
                    }
                    if (Number(s[c]) != s[c] && (s[c].charCodeAt(0) < 65 && s[c].charCodeAt(0) > 90) ) {
                        return 'Enter a valid number'
                    }
                }
                return true
            },
            (v:any) => !!v || 'Number is required'
        ],
        timeout: 0,
        panel: null,
        readonly: true,
    }),
    methods: {
        reverse(s: string) {
            return s.split("").reverse().join("");
        },
        pretvori(c: any) {
            if (c == Number(c)) {
                return Number(c)
            }
            return (c.charCodeAt(0) - 'A'.charCodeAt(0) + 10);
        },
        pretvoriNazad(c: any){
            if (Number(c) >= 10){
                return String.fromCharCode('A'.charCodeAt(0) + Number(c) - 10)
            }
            return c
        },
        async submit(event: any) {
            if(!this.isFormValid) return
            this.loading = true
            this.readonly = false
            this.postopek = ''
            this.odgovor = ''
            let bits = []
            let stbit = Number(this.b)

            

            this.loading = false
        }
    }
}
</script>