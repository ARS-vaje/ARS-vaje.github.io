<script setup lang="ts">
import { isJSDocThisTag } from 'typescript';
import TitleofAPage from './TitleofAPage.vue';
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
                <v-container fluid style="display: flex; align-items: center; flex-direction: column;">
                    <!-- Ovde krece sadrzaj pod stranice-->
                    <v-sheet width="600" style="background-color: transparent;">
                        <v-form @submit.prevent="submit"> <!--validate-on="submit lazy"-->
                            <v-text-field
                                v-model="num"
                                :rules="rulesStev"
                                label="Stevilo"
                            ></v-text-field>
                            <v-text-field
                                v-model="b1"
                                :rules="rulesNum"
                                label="Pocetna baza"
                            ></v-text-field>
                            <v-text-field
                                v-model="b2"
                                :rules="rulesNum"
                                label="Krajnja baza"
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
                        <v-expansion-panels v-model="panel" :readonly="readonly" multiple>
                            
                            <v-expansion-panel>
                                <v-expansion-panel-title>
                                    <b>Odgovor:</b> {{ num2 }} 
                                </v-expansion-panel-title>

                                <v-expansion-panel-text> {{ 'nope' }} </v-expansion-panel-text>
                            </v-expansion-panel>

                            
                        </v-expansion-panels>
                    </v-sheet>
                    <!-- Ovde se zavrsava sadrzaj podstranice -->
                </v-container>
            </v-window-item>
            <v-window-item :key="2" :value="2">
                <v-container fluid>
                    
                </v-container>
            </v-window-item>
            <v-window-item :key="3" :value="3">
                <v-container fluid>
                    
                </v-container>
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
        num: '',
        num2: '',
        b1: '',
        b2: '',
        rulesNum: [
            (num:any) => {
                if (Number(num) == num) return true

                return 'Enter a valid number'
            }
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
                    /*if (this.pretvori(s[c]) && this.b1){
                        if (this.pretvori(s[c]) >= Number(this.b1)){
                            return 'Enter a valid number in a given baisis'
                        }
                    }*/
                }
                return true
            }
        ],
        timeout: 0,
        panel: null,
        readonly: true,
    }),
    methods: {
        back() {
            window.history.back();
        },
        reverse(s: string) {
            return s.split("").reverse().join("");
        },
        pretvori(c: any) {
            if (c == Number(c)) {
                return Number(c)
            }
            return (c.charCodeAt(0) - 'A'.charCodeAt(0) + 10);
        },
        async submit(event: any) {
            this.loading = true
            this.readonly = false
            let n = this.num.split('.')[0]
            let nDec = this.num.split('.')[1]
            if(!nDec) {
                nDec = ''
            }
            let a = Number(this.b1)
            let b = Number(this.b2)
            //console.log('broj: ', n, ' ', nDec, ' baza 1: ', a, ' baza 2: ', b)
            // Pretvaramo broj iz jedne u drugu bazu + treba da radi i za racionalne
            // 1. ako broj nije u bazi 10 onda ga pretvorimo u bazu 10
            let m = 0
            let mDec = 0
            if(a != 10) {
                for(let i = n.length - 1; i >= 0; i--) {
                    let c = n[i]
                    m += this.pretvori(c) * Math.pow(a, n.length - i - 1)
                }
                for(let i = 0; i < nDec.length; i++) {
                    let c = nDec[i]
                    mDec += this.pretvori(c) * Math.pow(a, -1 - i)
                }
            }else{
                m = Number(n)
                mDec = Number('0.' + nDec)
            }
            console.log('m je ', m , ' mDec je ', mDec)
            //this.num2 = n + nDec // <- ovo je broj u bazi 10, n njegov ceo deo i nDec njegov ulomljeni deo sa 0. na pocetku
            //this.num2 = Number(n.toString() + '.' + nDec.toString())


            // 2. Gledamo prvo ceo deo broja
            let kon = ''
            while(m > 0) {
                console.log('m je ', m, ' m % b je ', m%b)
                kon += m % b
                console.log('kon je ', kon)
                m = Math.floor(m / b)
            }
            kon = this.reverse(kon)
            console.log('konacno kon je ', kon)

            // 3. Sada gledamo razlomljeni deo broja
            let raz = ''
            let x = mDec * b
            for(let i = 0; i < 10 && Number(x) == x; i++) {
                console.log('x je ', x)
                raz += Math.floor(x)
                console.log('raz je ', raz)
                x = Number('0.' + x.toString().split('.')[1])
                x = x * b 
            }

            if(raz && Number(raz) > 0) {
                this.num2 = kon.toString() + '.' + raz.toString()
            } else {
                this.num2 = kon.toString()
            }

            this.loading = false
        },
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
