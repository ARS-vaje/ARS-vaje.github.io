<template>
    <v-container fluid style="display: flex; align-items: center; flex-direction: column;">
        <!-- Ovde krece sadrzaj pod stranice-->
        <v-container fluid style="display: flex; justify-content: space-between; width: 1000px; padding-left: 0px; padding-right: 0px;" >
            
            <v-sheet rounded width="400" style="background-color: #F3F3F3; padding: 10px;">
                <!-- Ovde ide kontrolni panel -->
                <p>Parametri sistema</p>
                <v-form v-model="isFormValid" @submit.prevent="generate" style="padding: 10px;">
                    <v-select 
                        v-model="cacheSize"  
                        label="Velikost predpomnilnika (v bajtih)"
                        :items="[8, 16, 32, 64, 128, 256]">
                    </v-select>
                    <v-radio-group inline label="Velikost bloka (v bajtih)" v-model="blockSize">
                        <v-radio label="2" :value="2"></v-radio>
                        <v-radio label="4" :value="4"></v-radio>
                        <v-radio label="8" :value="8"></v-radio>
                    </v-radio-group>
                    <v-radio-group inline label="Stopnja asociativnosti" v-model="associativity">
                        <v-radio label="1" :value="1"></v-radio>
                        <v-radio label="2" :value="2"></v-radio>
                        <v-radio label="4" :value="4"></v-radio>
                    </v-radio-group>

                    <v-btn
                        :loading="loading"
                        type="submit"
                        block
                        class="mt-2"
                        text="Generiraj"
                    ></v-btn>
                </v-form>
            </v-sheet>

            <v-sheet rounded width="400" style="background-color: #F3F3F3; padding: 10px;" >
                <!-- Ovde ide Read/Write komande-->
                <p>Operacije</p>
                <v-form v-model="isFormValid" @submit.prevent="read" style="padding: 10px; display: flex; flex-direction: row; justify-content: space-between;">
                    <!-- Form za read -->
                    <div style="width: 45%;">
                        <v-btn
                            :loading="loading"
                            type="submit"
                            block
                            class="mt-2"
                            text="Preberi"
                        ></v-btn>
                    </div>

                    <div style="width: 45%;">
                        <v-text-field
                            label="Naslov (0x??)"
                            v-model="readAdress"
                            :rules="rulesNum"
                        ></v-text-field>
                    </div>
                </v-form>

                <v-divider></v-divider>

                <v-form v-model="isFormValid" @submit.prevent="write" style="padding: 10px;">
                    <!-- Form za write -->
                    <div style="display: flex; flex-direction: row; justify-content: space-between;">
                        <div style="width: 45%;">
                            <v-text-field
                                label="Naslov (0x??)"
                                v-model="writeAdress"
                                :rules="rulesNum"
                            ></v-text-field>
                        </div>

                        <div style="width: 45%;">
                            <v-text-field
                                label="Podatek (0x??)"
                                v-model="writeData"
                                :rules="rulesNum"
                            ></v-text-field>
                        </div>
                    </div>

                    <v-btn
                        :loading="loading"
                        type="submit"
                        block
                        class="mt-2"
                        text="Shrani"
                    ></v-btn>
                </v-form>

                <v-divider></v-divider>

                <v-form v-model="isFormValid" @submit.prevent="generate" style="padding: 10px;">
                    <!-- Form za Flush -->
                    <v-btn
                        :loading="loading"
                        type="submit"
                        block
                        class="mt-2"
                        text="Flush"
                    ></v-btn>
                </v-form>
            </v-sheet>

        </v-container>
        <v-container rounded fluid style="display: flex; width: 1000px; padding-left: 0px; padding-right: 0px; background-color: #F3F3F3;">

            <v-sheet style="height: 1000px; width:30%; background-color: transparent; overflow: scroll; padding: 10px;" >
                <!-- output -->
                <p>Zgodovina operacija in razlage</p>
                <pre style="white-space: pre-wrap;"> {{ output }} </pre>
            </v-sheet>

            <v-sheet style="width:35%; background-color: transparent; padding: 10px;">
                <!-- Cache -->
                <p>Predpomnilnik</p>
                <table>
                    <thead>
                        <th style="border: 0px"></th>
                        <th>V</th>
                        <th>TAG</th>
                    </thead>
                    <tbody>
                        <tr v-for="(block, ind) in cache">
                            <span>{{ (ind % associativity == 0) ? ('Set ' + (ind/associativity)) : null }}</span>
                            <th>{{ block.valid }}</th>
                            <th>{{ block.tag }}</th>
                            <th v-for="(byte, j) in block.data" :class="{isActive: ( activeCache[ind][j] ) }">
                                {{ byte }}
                            </th>
                        </tr>
                    </tbody>
                </table>

            </v-sheet>

            <v-sheet style="width:35%; background-color: transparent; padding: 10px;">
                <!-- Memory -->
                <p>Memorija</p>
                <table>
                    <tbody>
                        <tr v-for="(block, ind) in memory">
                            <span style="padding: 3px;">{{ '0x' + (ind*8).toString(16).padStart(2, '0') }}</span>
                            <th v-for="(byte, j) in block" :class="{isActive: ( activeMemory[ind][j] )}">
                                {{byte}}
                                <v-tooltip
                                    activator="parent"
                                    location="top"
                                >{{ '0x' + (ind*8 + j).toString(16).padStart(2, '0') }}</v-tooltip>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </v-sheet>

        </v-container>
        <!-- Ovde se zavrsava sadrzaj podstranice -->
    </v-container>
</template>
<script lang="ts">
export default {
    name: 'Cache',
    data: vm => ({
        loading: false,
        isFormValid: false,
        rulesNum: [
            (v:any) => !!v || 'Number is required'
        ],
        timeout: 0,
        panel: null,
        readonly: true,
        cacheSize: 32, 
        blockSize: 2,
        associativity: 1,
        numberOfSets: 0,
        tagBits: 0,
        setBits: 0,
        offsetBits: 0,
        // data for reading
        readAdress: '00',
        writeAdress: '00',
        writeData: '00',
        memory: [
            ['3f', '6e', '91', '07', '1c', '37', '0a', 'c0'],
            ['e9', '70', 'a7', '40', '38', 'b0', '6a', '7f'], 
            ['62', '4a', 'e7', '9f', '69', 'a2', '90', 'c7'], 
            ['75', 'a3', 'cb', 'd1', '3e', 'a8', '18', 'a4'], 
            ['c5', '2f', '70', 'e0', '52', '90', '1f', '20'], 
            ['4a', '32', 'f1', 'ed', '24', 'a7', 'ec', 'dd'], 
            ['77', 'e1', '32', '10', 'e0', '9d', '45', '8a'], 
            ['80', 'b2', 'bc', '6d', '53', '9d', '86', '2a'], 
            ['38', '02', 'c6', '98', '83', '2d', 'f1', 'cd'], 
            ['dc', '5e', 'b6', '6c', '8a', '24', '29', '87'], 
            ['88', 'f0', '64', '0b', 'f8', '63', 'bb', '2f'], 
            ['be', 'a3', 'a4', 'c6', '0a', 'a0', '77', '71'], 
            ['40', '80', '56', '16', 'f3', '1c', 'd7', 'e5'], 
            ['37', '17', '50', '6b', 'b3', '91', '19', '9d'], 
            ['01', '2a', '6f', '83', '63', 'd0', '18', '1c'], 
            ['8a', '10', '40', 'be', '4e', '37', 'da', 'd9'], 
            ['8c', '74', '2f', 'f1', '33', '36', '68', '5d'], 
            ['50', '66', '33', '41', '5e', '74', '11', '98'], 
            ['fd', '33', '4b', '78', 'fd', 'be', '88', '36'], 
            ['c9', '82', 'cf', 'f8', '0d', '7a', 'bc', 'fd'], 
            ['f6', 'df', 'a4', 'f4', 'a8', 'a2', 'b6', '2b'], 
            ['86', 'a3', '2f', '1c', 'de', '74', '36', 'f5'], 
            ['fc', '65', 'd9', '39', '04', '8a', 'f0', 'a3'], 
            ['dd', '22', 'c5', '04', 'cb', '16', '63', '8d'], 
            ['c6', '4f', '43', '4e', 'd6', '41', 'a7', '08'], 
            ['4f', '62', 'ab', '5e', '40', '85', '28', '10'], 
            ['3d', '94', 'c5', '0c', '96', 'f7', '11', '44'], 
            ['06', 'c2', 'b9', 'b5', '60', '18', 'f3', 'd8'], 
            ['e8', '4b', '7d', '9c', '60', '84', '01', '83'], 
            ['59', '15', 'e9', '24', '4f', '09', '90', 'ab'], 
            ['d3', 'e8', '45', 'c2', '29', '63', '0d', '50'], 
            ['c4', 'a9', '3b', 'b0', '52', '88', 'b2', 'b7'], 
        ], // 2D array
        cache: [{valid: 0, tag: '-', data: ['0']}], // 2D array
        output: '',
        lru: [[0]],
        activeCache: [[false]],
        activeMemory: Array(32).fill(Array(8).fill(false))
    }),
    methods: {
        async generate(){
            console.log(this.cacheSize, this.blockSize, this.associativity)
            console.log(this.memory.length)
            // Generate cache
            this.numberOfSets = this.cacheSize / (this.blockSize * this.associativity)
            // the number of cache lines is the number of sets times the associativity
            this.cache = []
            /** 
             * Znaci, radimo sa adresama koje imaju po 8 bitova. 
             * Posledju deo mora da bude uslovanjen sa log(blackSize) bitova, da bi mogli da nadjemo bajt u liniji.
             * E onda prvih nekoliko idu za tag a ostatak ide za set.
             * Zapravo mogu da koristim maske i bit operacije da dobijem tacne bitove za tag i set i itd
             * */ 
            this.offsetBits = Math.ceil(Math.log2(this.blockSize)) ? Math.ceil(Math.log2(this.blockSize)) : 0
            this.setBits = Math.ceil(Math.log2(this.numberOfSets)) ? Math.ceil(Math.log2(this.numberOfSets)) : 0
            this.tagBits = 8 - this.setBits - this.offsetBits
            console.log('Raspodela bitova: ', this.tagBits, this.setBits, this.offsetBits)
            this.activeCache = []
            this.emptyActiveMemory()
            for(let i = 0; i < (this.numberOfSets * this.associativity); i++){
                this.cache.push({valid: 0, tag: ( this.tagBits >= 4 ? '--' : '-'), data: []})
                this.activeCache.push([])
                for(let j = 0; j < this.blockSize; j++){
                  this.cache[i].data.push('--')
                  this.activeCache[i].push(false)
                }
            }
            // sada bi trebalo da imam sve neophodne konstante i da imam lepo izgenerisani cache tabelu
            // treba i namestit lru
            this.lru = []
            for(let i = 0; i < this.numberOfSets; i++){
                this.lru.push([])
                for(let j = 0; j < this.associativity; j++){
                    this.lru[i].push(j)
                }
            }
            this.output += 'GENERATE: Narejen predpomnilnik velikosti ' + this.cacheSize + ' bajtih. Vsebuje ' + this.numberOfSets + ' skupin po ' + this.associativity + ' blokov.\n Vsaki blok je velikosti ' + this.blockSize + ' bajtov.\n'
            this.output += 'GENERATE: Tag je dolg ' + this.tagBits + ' bitov, skupina ' + this.setBits + ' bitov in pomik v bloku ' + this.offsetBits + ' bitov.\n'
        },
        async read(){
            // Decode address
            let address = parseInt(this.readAdress, 16).toString(2).padStart(8, '0')
            let tag = address.substring(0, this.tagBits)
            let set = address.substring(this.tagBits, this.tagBits + this.setBits)
            let offset = parseInt(address.substring(this.tagBits + this.setBits, 8), 2)
            let tagValue = (this.tagBits >= 4) ? parseInt(tag, 2).toString(16).padStart(2, '0') : parseInt(tag, 2).toString(16)
            let setValue = parseInt(set, 2) ? parseInt(set, 2) : 0
            //console.log(address, tag, set, offset)
            //console.log('setValue = ', setValue)
            //proverimo da li je dati tag vec u setu i da li je validan
            this.output += 'Skupina: ' + setValue + ' Tag: ' + tagValue + ' Pomik: ' + offset + '\n'
            let hit = false
            await this.emptyActiveCache()
            await this.emptyActiveMemory()
            for(let i = 0; i < this.associativity; i++){
                if(this.cache[setValue*this.associativity + i].valid == 1 && this.cache[setValue*this.associativity + i].tag == tagValue){
                    hit = true
                    console.log('Hit')
                    this.output += 'READ: Hit!\n'
                    await this.lruUpdate(setValue, i) // ažuriramo LRU
                    this.activeCache[setValue*this.associativity + i][offset] = true
                    this.activeMemory[Math.floor((parseInt(this.readAdress, 16) - offset)/8)][(parseInt(this.readAdress, 16)%8)] = true
                    break;
                }
            }

            if(hit == false){
                // miss, moramo da dodamo vrednost u set
                // uzimamo lru liniju
                this.output += 'READ: Miss!\n'
                let line = await this.lruCheck(setValue)
                //console.log("line je ", line)
                //console.log('offset je', offset)
                //console.log('parseInt(this.readAdress, 16) = ', parseInt(this.readAdress, 16))
                // azuriramo cache
                // this.cache[setValue*this.associativity + line]
                this.cache[setValue*this.associativity + line].tag = tagValue
                this.cache[setValue*this.associativity + line].valid = 1
                await this.emptyActiveCache()
                await this.emptyActiveMemory()
                for(let i = 0; i < this.blockSize; i++){
                    console.log(Math.floor((parseInt(this.readAdress, 16) - offset)/8))
                    this.cache[setValue*this.associativity + line].data[i] = this.memory[Math.floor((parseInt(this.readAdress, 16) - offset)/8)][i + (parseInt(this.readAdress, 16)-offset)%8]
                    this.activeCache[setValue*this.associativity + line][i] = true
                    this.activeMemory[Math.floor((parseInt(this.readAdress, 16) - offset)/8)][i + (parseInt(this.readAdress, 16)-offset)%8] = true
                }
                await this.lruUpdate(setValue, line) // ažuriramo LRU
            }

        },
        async write(){
            // console.log(this.writeAdress, this.writeData)
            // Decode address
            let address = parseInt(this.writeAdress, 16).toString(2).padStart(8, '0')
            let tag = address.substring(0, this.tagBits)
            let set = address.substring(this.tagBits, this.tagBits + this.setBits)
            let offset = parseInt(address.substring(this.tagBits + this.setBits, 8), 2)
            let tagValue = (this.tagBits >= 4) ? parseInt(tag, 2).toString(16).padStart(2, '0') : parseInt(tag, 2).toString(16)
            let setValue = parseInt(set, 2) ? parseInt(set, 2) : 0
            console.log(address, tag, set, offset)
            // proverimo da li je dati tag vec u set
            // let hit = false
            this.output += 'Skupina: ' + setValue + ' Tag: ' + tagValue + ' Pomik: ' + offset + '\n'
            this.emptyActiveCache()
            this.emptyActiveMemory()
            for(let i = 0; i < this.associativity; i++){
                if(this.cache[setValue*this.associativity + i].valid == 1 && this.cache[setValue*this.associativity + i].tag == tagValue){
                    //hit = true
                    console.log('Hit')
                    this.cache[setValue*this.associativity + i].data[offset] = this.writeData
                    this.output += 'WRITE: Hit!\n Posodobljamo vrednost v Predpomnilniku\n'
                    await this.lruUpdate(setValue, i) // ažuriramo LRU
                    this.activeCache[setValue*this.associativity + i][offset] = true
                    break;
                }
            }

            // update memory
            this.memory[Math.floor((parseInt(this.writeAdress, 16) - offset)/8)][(parseInt(this.writeAdress, 16)%8)] = this.writeData
            this.output += 'WRITE: Posodobljamo vrednost v Memoriji\n'
            this.activeMemory[Math.floor((parseInt(this.writeAdress, 16) - offset)/8)][(parseInt(this.writeAdress, 16)%8)] = true
        },
        async lruCheck(set: any){
            // kada nesto hocu da prebacim u cache, treba ga ubacim umesto lru-a za taj set.
            this.output += 'LRU: zamenjamo z blokom ' + this.lru[set][0] + ' iz skupine ' + set + '\n'
            return (this.lru[set][0]); // idejno ovo vraca indeks najmanje koriscene linije u setu
        },
        async lruUpdate(set: any, line:any){ // indeks seta i linije u setu koju updaejtujem.
            // kada nesto iskorisitm, popravim mu lru status
            this.lru[set] = this.lru[set].filter((item) => item !== line)
            this.lru[set].push(line)
            this.output += 'LRU: posodobljamo pozicijo ' + line + ' v skupini ' + set + '\n'
        },
        async emptyActiveCache(){
            this.activeCache = []
            for(let i = 0; i < (this.numberOfSets * this.associativity); i++){
                this.activeCache.push([])
                for(let j = 0; j < this.blockSize; j++){
                  this.activeCache[i].push(false)
                }
            }
        },
        async emptyActiveMemory() {
            this.activeMemory = []
            for(let i = 0; i < 32; i++){
                this.activeMemory.push([])
                for(let j = 0; j < 8; j++){
                    this.activeMemory[i].push(false)
                }
            }       
        }

    }
}
</script>
<style>
th {
    border: 1px solid black;
    padding: 0px 2px;
}

.isActive {
    background-color: greenyellow;
}
</style>