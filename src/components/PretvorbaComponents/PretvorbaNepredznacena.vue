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
            <v-expansion-panels v-model="panel" :readonly="readonly">
                
                <v-expansion-panel>
                    <v-expansion-panel-title>
                        <b>Odgovor: </b> {{ num2 }} 
                    </v-expansion-panel-title>
                    <!-- Ovde krece postupak -->
                    <v-expansion-panel-text>
                        <pre> {{ postopek }} </pre>
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
        num2: '',
        b1: '',
        b2: '',
        postopek: '',
        rulesNum: [
            (num:any) => {
                if (Number(num) == num) return true

                return 'Enter a valid number'
            },
            (v:any) => !!v || 'This is required'
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
            (v:any) => !!v || 'This is required'
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
                let pos1 = '' // za generalni deo postupka
                let pos2 = '' // jer se u istom foru racunaju sve stvari
                pos1 += 'Stevilo pretvorimo u bazo 10 \n'
                if(nDec.length > 0){
                    pos1 += n + '.' + nDec + '(' + a + ')' + ' = '
                }else{
                    pos1 += n + '(' + a + ')' + ' = '
                }
                for(let i = 0; i < n.length; i++) {
                    let c = n[i]
                    pos1 += this.pretvori(c) + 'x' + a + '^' + (n.length - i - 1).toString() + ' + '
                    let k = this.pretvori(c) * Math.pow(a, n.length - i - 1)
                    m += k
                    pos2 += k.toString() + ' + '
                }
                for(let i = 0; i < nDec.length; i++) {
                    let c = nDec[i]
                    pos1 += this.pretvori(c) + 'x' + a + '^' + (-1 - i).toString() + ' + '
                    let k = this.pretvori(c) * Math.pow(a, -1 - i)
                    mDec += k
                    pos2 += k.toString() + ' + '
                }
                pos1 = pos1.substring(0, pos1.length - 2)
                pos2 = pos2.substring(0, pos2.length - 2)
                pos1 += ' = \n'
                pos1 += '= ' + pos2 + ' = \n' + (m + mDec).toString() 
                this.postopek += pos1 + '\n\n'
            }else{
                m = Number(n)
                mDec = Number('0.' + nDec)
            }
            console.log('m je ', m , ' mDec je ', mDec)
            //this.num2 = n + nDec // <- ovo je broj u bazi 10, n njegov ceo deo i nDec njegov ulomljeni deo sa 0. na pocetku
            //this.num2 = Number(n.toString() + '.' + nDec.toString())
            let mCopy = m
            let mDecCopy = mDec
            if(b!=10){
                // 2. Gledamo prvo ceo deo broja
                let kon = ''
                let pos1 = 'Pretvorimo stevilo iz baze 10 v bazo ' + b.toString() + '\n'
                while(m > 0) {
                    console.log('m je ', m, ' m % b je ', m%b)
                    kon += this.pretvoriNazad( m % b )
                    console.log('kon je ', kon)
                    pos1 += m.toString() + ' / ' + b.toString() + ' = ' + Math.floor(m / b) + ' + ' + (m%b).toString() + '\n'
                    m = Math.floor(m / b)
                }
                this.postopek += pos1 + '\n'
                kon = this.reverse(kon)
                console.log('konacno kon je ', kon)
                
                // 3. Sada gledamo razlomljeni deo broja
                let raz = ''
                let x = mDec
                pos1 = ''
                //pos1 = x.toString() + ' x '  + b.toString() + ' = ' + (x*b).toString() + '\n'
                //x = x * b
                for(let i = 0; i < 10 && Number(x) == x; i++) {
                    pos1 += x.toString() + ' x '  + b.toString() + ' = ' + (x*b).toString() + '\n'
                    x = x * b 
                    console.log('x je ', x)
                    raz += this.pretvoriNazad( Math.floor(x) )
                    console.log('raz je ', raz)
                    x = Number('0.' + x.toString().split('.')[1])
                    //pos1 += x.toString() + ' x '  + b.toString() + ' = ' + (x*b).toString() + '\n'
                    //x = x * b 
                }
                
            
                if(kon.length == 0){
                    kon += '0'
                }

                if(raz.length > 0 && Number(raz) != 0) {
                    this.num2 = kon.toString() + '.' + raz.toString()
                    this.postopek += pos1 + '\n'
                } else {
                    this.num2 = kon.toString()
                }
                if(nDec.length > 0) {
                    nDec = '.' + nDec
                }
                if(a!=10){
                    this.postopek += n + nDec + '(' + a + ')' + ' = ' + (mCopy + mDecCopy).toString() + ' = ' + this.num2 + '(' + b.toString() + ')' + '\n'
                }else{
                    this.postopek += n + nDec + '(' + a + ')' + ' = ' + this.num2 + '(' + b.toString() + ')' + '\n'
                }
            }else{
                this.num2 = (m+mDec).toString()
            }

            this.loading = false
        }
    }
}
</script>