<template>
    <v-container fluid style="display: flex; align-items: center; flex-direction: column;">
        <!-- Ovde krece sadrzaj pod stranice-->
        <v-sheet width="600" style="background-color: transparent;">
            <v-form v-model="isFormValid" @submit.prevent="submit"> <!--validate-on="submit lazy"-->
                <v-text-field
                    v-model="num1"
                    :rules="rulesStev"
                    label="Stevilo 1"
                ></v-text-field>
                <v-text-field
                    v-model="num2"
                    :rules="rulesStev"
                    label="Stevilo 2"
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
                    label="Format"
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
                        <b>Odgovor: </b> {{odgovor }} 
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
        num1: '',
        num2: '',
        b: '',
        format: '',
        formats: [
            'Nepredznaceno',
            'Dvojiski komplement'
        ],
        odgovor: '',
        postopek: '',
        rulesNum: [
            (num:any) => {
                if (Number(num) == num) return true

                return 'Enter a valid number'
            },
            (v:any) => !!v || 'Number is required'
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
            
            if(this.format == 'Nepredznaceno'){
                let a = this.num1.split('')
                let b = this.num2.split('')
                let bits = []
                let stbit =  Number(this.b)
                let pos1 = ''
                if(a.length < stbit){
                    pos1 += 'Razirimo prvo stevilo na ' + stbit + ' bitov\n'
                    while(a.length < stbit){ a.unshift('0') }
                    pos1 += this.num1 + ' => ' + a.join('') + '\n'
                }
                if(b.length < stbit){
                    pos1 += 'Razirimo drugo stevilo na ' + stbit + ' bitov\n'
                    while(b.length < stbit){ b.unshift('0') }
                    pos1 += this.num2 + ' => ' + b.join('') + '\n'
                }
                // zapis
                if(pos1.length == 0){
                    pos1 += ' ' + a.join('') + '\n'
                }else{
                    pos1 += '  ' + a.join('') + '\n'
                }
                
                pos1 += '+ ' + b.join('') + '\n'
                pos1 += '-'.repeat(stbit+2) + '\n'
                let o = 0
                for(let i = stbit-1; i>=0; i--){
                    let a1 = Number(a[i])
                    let b1 = Number(b[i])
                    let s = a1 + b1 + o
                    if(s>1){
                        s = s%2
                        o = 1
                    }else{
                        o = 0
                    }
                    bits.unshift(s)
                }
                if(o!=0){
                    pos1 += ' ' + o + bits.join('') + '\n'
                    pos1 += 'pojavi se prenos\n'
                }else{
                    pos1 += '  ' + bits.join('') + '\n'
                }
                this.odgovor = bits.join('')
                this.postopek = pos1
            }else{
                // 2'K
                let pos1 = ''
                let a = this.num1.split('')
                if(a[0]=='-'){
                    a.shift()
                    
                    for(let i = 0;i < a.length;i++){
                        a[i] = Number(!Number(a[i])).toString()
                    }
                    
                    let s = 1
                    let i = a.length - 1
                    while(s == 1){
                        a[i] = (Number(a[i])+1).toString()
                        if(a[i]=='2'){
                            a[i] = '0'
                            i -= 1
                        }else{
                            s = 0
                        }
                    }
                    pos1 += 'Ker prvo stevilo ima - spredi negiramo vse bite in pristejemo 1\n'
                    pos1 += this.num1 + ' => ' + a.join('') + '\n'
                }
                let b = this.num2.split('')
                if(b[0]=='-'){
                    b.shift()
                    for(let i = 0;i < b.length;i++){
                        b[i] = Number(!Number(b[i])).toString()
                    }
                    let s = 1
                    let i = b.length - 1
                    while(s == 1){
                        b[i] = (Number(b[i])+1).toString()
                        if(b[i]=='2'){
                            b[i] = '0'
                            i -= 1
                        }else{
                            s = 0
                        }
                    }
                    pos1 += 'Ker drugo stevilo ima - spredi negiramo vse bite in pristejemo 1\n'
                    pos1 += this.num2 + ' => ' + b.join('') + '\n'
                }
                let bits = []
                let stbit =  Number(this.b)
                
                if(a.length < stbit){
                    pos1 += 'Razirimo prvo stevilo na ' + stbit + ' bitov\n'
                    while(a.length < stbit){ a.unshift(a[0]) }
                    pos1 += this.num1 + ' => ' + a.join('') + '\n'
                }
                if(b.length < stbit){
                    pos1 += 'Razirimo drugo stevilo na ' + stbit + ' bitov\n'
                    while(b.length < stbit){ b.unshift(b[0]) }
                    pos1 += this.num2 + ' => ' + b.join('') + '\n'
                }
                // zapis
                if(pos1.length == 0){
                    pos1 += ' ' + a.join('') + '\n'
                }else{
                    pos1 += '  ' + a.join('') + '\n'
                }
                
                pos1 += '+ ' + b.join('') + '\n'
                pos1 += '-'.repeat(stbit+2) + '\n'
                let o = 0
                for(let i = stbit-1; i>=0; i--){
                    let a1 = Number(a[i])
                    let b1 = Number(b[i])
                    let s = a1 + b1 + o
                    if(s>1){
                        s = s%2
                        o = 1
                    }else{
                        o = 0
                    }
                    bits.unshift(s)
                }
                if(o!=0){
                    pos1 += ' ' + o + bits.join('') + '\n'
                    pos1 += 'pojavi se prenos\n'
                }else{
                    pos1 += '  ' + bits.join('') + '\n'
                }
                if((Number(a[0])==0 && Number(b[0])==0 && Number(bits[0])==1)||(Number(a[0])==1 && Number(b[0])==1 && Number(bits[0])==0)){
                    pos1 += 'pojavi se preliv\n'
                }
                this.odgovor = bits.join('')
                this.postopek = pos1
            }

            this.loading = false
        }
    }
}
</script>