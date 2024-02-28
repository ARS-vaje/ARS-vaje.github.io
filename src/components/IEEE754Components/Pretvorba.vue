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
                    <!--Ovde krece postupak -->
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
        format: '',
        formats: [
            'Baza 10 => Enojna natancnost',
            'Baza 10 => Dvojna natancnost',
            'Enojna natancnost => Baza 10',
            'Dvojna natancnost => Baza 10',
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
        jsF64ToF32IntegerBitsStr(double: any) {
            // float / f32 has 32 bit => 4 bytes
            const BYTES = 4
            // Buffer is like a raw view into memory
            const buffer = new ArrayBuffer(BYTES)
            // Float32Array: interpret bytes in the memory as f32 (IEEE-754) bits
            const float32Arr = new Float32Array(buffer)
            // UInt32Array: interpret bytes in the memory as unsigned integer bits.
            // Important that we use unsigned here, otherwise the MSB would be interpreted as sign
            const uint32Array = new Uint32Array(buffer)
            // will convert double to float during assignment
            float32Arr[0] = double
            // now read the same memory as unsigned integer value
            const integerValue = uint32Array[0]
            // to hex string
            const integerBitsHex = integerValue.toString(16)
            // + hex prefix
            // return '0x' + integerBitsHex;
            return '0x' + integerBitsHex.padStart(8, '0')
        },
        jsF64ToF64IntegerBitsStr(double: any) {
            // float / f64 has 64 bit => 8 bytes
            const BYTES = 8
            // Buffer is like a raw view into memory
            const buffer = new ArrayBuffer(BYTES)
            // Float32Array: interpret bytes in the memory as f32 (IEEE-754) bits
            const float64Arr = new Float64Array(buffer)
            // UInt32Array: interpret bytes in the memory as unsigned integer bits.
            // Important that we use unsigned here, otherwise the MSB would be interpreted as sign
            const uint64Array = new BigUint64Array(buffer)
            // will convert double to float during assignment
            float64Arr[0] = double
            // now read the same memory as unsigned integer value
            const integerValue = uint64Array[0]
            // to hex string
            const integerBitsHex = integerValue.toString(16)
            // + hex prefix
            // return '0x' + integerBitsHex;
            return '0x' + integerBitsHex.padStart(16, '0')
        },
        F32IntegerBitsStrTojsF64(double: any){
            const BYTES = 4
            const buffer = new ArrayBuffer(BYTES)
            const uint32Array = new Uint8Array(buffer)
            // assume double is written in hex without 0x prefix
            double = double.toString()
            double = double.padStart(8, '0')
            uint32Array[0] = parseInt('0x' + double.substring(0,2))
            uint32Array[1] = parseInt('0x' + double.substring(2,4))
            uint32Array[2] = parseInt('0x' + double.substring(4,6))
            uint32Array[3] = parseInt('0x' + double.substring(6,8))
            const view  = new DataView(buffer)
            return view.getFloat32(0, false).toString()
        },
        F64IntegerBitsStrTojsF64(double: any){
            const BYTES = 8
            const buffer = new ArrayBuffer(BYTES)
            const uint64Array = new Uint8Array(buffer)
            // assume double is written in hex without 0x prefix
            double = double.toString()
            double = double.padStart(16, '0')
            uint64Array[0] = parseInt('0x' + double.substring(0,2))
            uint64Array[1] = parseInt('0x' + double.substring(2,4))
            uint64Array[2] = parseInt('0x' + double.substring(4,6))
            uint64Array[3] = parseInt('0x' + double.substring(6,8))
            uint64Array[4] = parseInt('0x' + double.substring(8,10))
            uint64Array[5] = parseInt('0x' + double.substring(10,12))
            uint64Array[6] = parseInt('0x' + double.substring(12,14))
            uint64Array[7] = parseInt('0x' + double.substring(14,16))
            const view  = new DataView(buffer)
            return view.getFloat64(0, false).toString()
        },
        async submit(event: any) {
            if(!this.isFormValid) return
            this.loading = true
            this.readonly = false 
            this.postopek = ''
            this.odgovor = ''

            if(this.format == 'Baza 10 => Enojna natancnost') {
                this.odgovor = this.jsF64ToF32IntegerBitsStr(this.num)
                this.odgovor = this.odgovor.toUpperCase()
                this.postopek = 'Za to operacijo kalkulator ne ponuja natancnega postopka'
            }

            if(this.format == 'Baza 10 => Dvojna natancnost'){
                this.odgovor = this.jsF64ToF64IntegerBitsStr(this.num)
                this.odgovor = this.odgovor.toUpperCase()
                this.postopek = 'Za to operacijo kalkulator ne ponuja natancnega postopka'
            }

            if(this.format == 'Enojna natancnost => Baza 10'){
                this.odgovor = this.F32IntegerBitsStrTojsF64(this.num)
                this.postopek = 'Za to operacijo kalkulator ne ponuja natancnega postopka'
            }

            if(this.format == 'Dvojna natancnost => Baza 10'){
                this.odgovor = this.F64IntegerBitsStrTojsF64(this.num)
                this.postopek = 'Za to operacijo kalkulator ne ponuja natancnega postopka'
            }

            this.loading = false
        }
    }
}
</script>
