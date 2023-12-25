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

            if(this.format == 'Baza 10 => Predznak Velikostni') {
                if(Math.abs( Number(this.num) ) >= Math.pow(2, stbit-1)){
                    this.odgovor = 'Napaka: Stevilo je ven obsega formata'
                    this.postopek = 'Obseg PV formata: [-' + (Math.pow(2, stbit-1) - 1) + ', ' + (Math.pow(2, stbit-1) - 1) + ']'
                }else{
                    let pos1 = 'Pretvorimo stevilo v bazo 2 kot nepredznaceno\n'
                    let bits = []
                    let stbit = Number(this.b)
                    let predznak = Math.sign(Number(this.num))
                    let num2 = Math.abs(Number(this.num))
                    while(num2>0){
                        bits.unshift(num2%2)
                        pos1 += num2.toString() + ' / 2 = ' + (Math.floor(num2/2)).toString() +  ' + ' + (num2%2).toString() + '\n'
                        num2 = Math.floor(num2/2)
                    }
                    while(bits.length<stbit-1){
                        bits.unshift(0)
                    }
                    pos1 += 'Prvi bit je enak '
                    if(predznak >= 0){
                        bits.unshift(0)
                        pos1 += bits[0] + ' ker je predznak +\n'
                    }else{
                        bits.unshift(1)
                        pos1 += bits[0] + ' ker je predznak -\n'
                    }

                    // da li da dodam koliko se dobje na kraju?
                    this.odgovor = bits.join('').toString()
                    pos1 += this.num + ' = ' + this.odgovor + ' v Predznak Velikostnem formatu'
                    this.postopek = pos1
                }
            }

            if(this.format == 'Baza 10 => Z Odmikom') {
                if(( Number(this.num) ) >= Math.pow(2, stbit-1) || ( Number(this.num) ) <= -Math.pow(2, stbit)){
                    this.odgovor = 'Napaka: Stevilo je ven obsega formata'
                    this.postopek = 'Obseg formata z odmikom: [-' + Math.pow(2, stbit-1) + ', ' + (Math.pow(2, stbit-1) - 1) + ']'
                }else{
                    let pos1 = ''
                    let bits = []
                    let stbit = Number(this.b)
                    let predznak = Math.sign(Number(this.num))
                    let num2 = Number(this.num) + Math.pow(2, stbit-1)
                    pos1 += 'Preistejemo stevilu ' + this.num + ' odmik 2^' + (stbit-1).toString() + ' = ' + this.num + ' + ' + Math.pow(2, stbit-1) + ' = ' + num2.toString() + '\n'
                    pos1 += 'Potem to stevilo pretvorimo v bazo 2 kot nepredznaceno\n'
                    while(num2>0){
                        bits.unshift(num2%2)
                        pos1 += num2.toString() + ' / 2 = ' + (Math.floor(num2/2)).toString() +  ' + ' + (num2%2).toString() + '\n'
                        num2 = Math.floor(num2/2)
                    }
                    while(bits.length<stbit){
                        bits.unshift(0)
                    }
                    // da li da dodam koliko se dobje na kraju?
                    this.odgovor = bits.join('').toString()
                    pos1 += this.num + ' = ' + this.odgovor + ' v formatu z odmikom'
                    this.postopek = pos1
                }
            }

            if(this.format == 'Baza 10 => Enotski Komplement') {
                if(Math.abs( Number(this.num) ) >= Math.pow(2, stbit-1)){
                    this.odgovor = 'Napaka: Stevilo je ven obsega formata'
                    this.postopek = 'Obseg Enotskega komplementa : [-' + (Math.pow(2, stbit-1) - 1) + ', ' + (Math.pow(2, stbit-1) - 1) + ']'
                }else{
                    let pos1 = 'Pretvorimo stevilo v bazo 2 kot nepredznaceno\n'
                    let bits = []
                    let stbit = Number(this.b)
                    let predznak = Math.sign(Number(this.num))
                    let num2 = Math.abs(Number(this.num))
                    while(num2>0){
                        bits.unshift(num2%2)
                        pos1 += num2.toString() + ' / 2 = ' + (Math.floor(num2/2)).toString() +  ' + ' + (num2%2).toString() + '\n'
                        num2 = Math.floor(num2/2)
                    }
                    while(bits.length<stbit){
                        bits.unshift(0)
                    }
                    num2 = Math.abs(Number(this.num))
                    pos1 += num2 + ' = ' + bits.join('').toString() +' v bazi 2\n'
                    if(predznak < 0){
                        pos1 += 'Ker je predzank -, negiramo vse bite\n'
                        for(let i = 0;i < stbit;i++){
                            bits[i] = Number(!bits[i])
                        }
                    }else{
                        pos1 += 'Ket je predznak +, ne negiramo bite\n'
                    }

                    // da li da dodam koliko se dobje na kraju?
                    this.odgovor = bits.join('').toString()
                    pos1 += this.num + ' = ' + this.odgovor + ' v Enotskem komplementu'
                    this.postopek = pos1
                }
            }

            if(this.format == 'Baza 10 => Dvojiski Komplement') {
                if(( Number(this.num) ) >= Math.pow(2, stbit-1) || ( Number(this.num) ) <= -Math.pow(2, stbit)){
                    this.odgovor = 'Napaka: Stevilo je ven obsega formata'
                    this.postopek = 'Obseg formata z odmikom: [-' + Math.pow(2, stbit-1) + ', ' + (Math.pow(2, stbit-1) - 1) + ']'
                }else{
                    let pos1 = 'Pretvorimo stevilo v bazo 2 kot nepredznaceno\n'
                    let bits = []
                    let stbit = Number(this.b)
                    let predznak = Math.sign(Number(this.num))
                    let num2 = Math.abs(Number(this.num))
                    while(num2>0){
                        bits.unshift(num2%2)
                        pos1 += num2.toString() + ' / 2 = ' + (Math.floor(num2/2)).toString() +  ' + ' + (num2%2).toString() + '\n'
                        num2 = Math.floor(num2/2)
                    }
                    while(bits.length<stbit){
                        bits.unshift(0)
                    }
                    num2 = Math.abs(Number(this.num))
                    pos1 += num2 + ' = ' + bits.join('').toString() +' v bazi 2\n'
                    if(predznak < 0){
                        pos1 += 'Ker je predzank -, negiramo vse bite in pristejemo 1\n'
                        for(let i = 0;i < stbit;i++){
                            bits[i] = Number(!bits[i])
                        }
                        let s = 1
                        let i = stbit - 1
                        while(s == 1){
                            bits[i] += 1
                            if(bits[i]==2){
                                bits[i] = 0
                                i -= 1
                            }else{
                                s = 0
                            }
                        }
                    }else{
                        pos1 += 'Ket je predznak +, ne negiramo bite in ne pristevamo 1\n'
                    }

                    // da li da dodam koliko se dobje na kraju?
                    this.odgovor = bits.join('').toString()
                    pos1 += this.num + ' = ' + this.odgovor + ' v Dvojiskem komplementu'
                    this.postopek = pos1
                }
            }

            if(this.format == 'Predznak Velikostni => Baza 10'){
                // Prvo rasirimo stevilo do odgovarajuceg broja bitova/ ili ga smanjimo na dobar broj bitova
                bits = this.num.split('')
                if(bits[0]=='-'){
                    bits.shift()
                }
                while(bits.length < stbit) {
                    bits.unshift('0')
                }
                while(bits.length > stbit) {
                    bits.shift()
                }
                let pos1 = 'Nastavimo stevilo na ' + this.b + ' bitov \n' 
                pos1 += this.num + ' = ' + bits.join('') + '\n'
                let num2 = 0
                pos1 += 'V(' + bits.join('') + ') = (-1)^' + bits[0] + ' x ('
                let predznak = Math.pow((-1), Number(bits[0])) 
                for(let i = 1; i < bits.length; i++) {
                    num2 += Math.pow(2, bits.length - 1 - i) * Number(bits[i])
                    pos1 +=  bits[i] +'x2^' + (bits.length - 1 - i) +' + '
                }
                pos1 = pos1.substring(0, pos1.length - 3)
                num2 = num2 * predznak
                pos1 += ') = '+ num2 + '\n'
                this.odgovor = num2.toString()
                this.postopek = pos1
            }
            
            if(this.format == 'Z Odmikom => Baza 10'){
                bits = this.num.split('')
                if(bits[0]=='-'){
                    bits.shift()
                }
                while(bits.length < stbit) {
                    bits.unshift('0')
                }
                while(bits.length > stbit) {
                    bits.shift()
                }
                let pos1 = 'Nastavimo stevilo na ' + this.b + ' bitov \n' 
                pos1 += this.num + ' = ' + bits.join('') + '\n'
                let num2 = 0
                pos1 += 'V(' + bits.join('') + ') = '
                for(let i = 0; i<bits.length; i++){
                    num2 += Math.pow(2, bits.length - 1 - i) * Number(bits[i])
                    pos1 += bits[i] + 'x2^' + (bits.length - 1 - i) + ' + '
                }
                pos1 = pos1.substring(0, pos1.length - 2)
                pos1 += ' - 2^' + (bits.length-1)
                num2 -= Math.pow(2, bits.length-1)
                pos1 += ' = '+ num2 + '\n'
                this.odgovor = num2.toString()
                this.postopek = pos1
            }

            if(this.format == 'Enotski Komplement => Baza 10') {
                bits = this.num.split('')
                if(bits[0]=='-'){
                    bits.shift()
                }
                while(bits.length < stbit) {
                    bits.unshift('0')
                }
                while(bits.length > stbit) {
                    bits.shift()
                }
                let pos1 = 'Nastavimo stevilo na ' + this.b + ' bitov \n' 
                pos1 += this.num + ' = ' + bits.join('') + '\n'
                let num2 = 0
                pos1 += 'V(' + bits.join('') + ') = '
                for(let i = 0; i<bits.length; i++){
                    num2 += Math.pow(2, bits.length - 1 - i) * Number(bits[i])
                    pos1 += bits[i] +'x2^' + (bits.length - 1 - i) + ' + '
                }
                pos1 = pos1.substring(0, pos1.length - 2)
                pos1 += ' - '+ bits[0] +'x(2^' + (bits.length) + ' - 1)'
                num2 -= (Math.pow(2, bits.length) - 1)*Number(bits[0])
                pos1 += ' = '+ num2 + '\n'
                this.odgovor = num2.toString()
                this.postopek = pos1
            }

            if(this.format == 'Dvojiski Komplement => Baza 10') {
                bits = this.num.split('')
                if(bits[0]=='-'){
                    bits.shift()
                }
                while(bits.length < stbit) {
                    bits.unshift('0')
                }
                while(bits.length > stbit) {
                    bits.shift()
                }
                let pos1 = 'Nastavimo stevilo na ' + this.b + ' bitov \n' 
                pos1 += this.num + ' = ' + bits.join('') + '\n'
                let num2 = 0
                pos1 += 'V(' + bits.join('') + ') = '
                for(let i = 0; i<bits.length; i++){
                    num2 += Math.pow(2, bits.length - 1 - i) * Number(bits[i])
                    pos1 += bits[i] +'x2^' + (bits.length - 1 - i) + ' + '
                }
                pos1 = pos1.substring(0, pos1.length - 2)
                pos1 += ' - '+bits[0] + 'x2^' + (bits.length) 
                num2 -= Math.pow(2, bits.length)*Number(bits[0])
                pos1 += ' = '+ num2 + '\n'
                this.odgovor = num2.toString()
                this.postopek = pos1
            }

            this.loading = false
        }
    }
}
</script>