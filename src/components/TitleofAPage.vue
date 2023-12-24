<template>
    <header>
        <button @click="back()" id="back-button">
            <v-img 
                height="40"
                width="40"
                src='https://raw.githubusercontent.com/ARS-vaje/ARS-vaje.github.io/1e61ebd39b752074fa69d1a3d21f8313e3c5d963/src/components/icons/arrow-back-ios.svg'
            >
            </v-img>
        </button>
        <h1>{{title}}</h1>
    </header>
</template>

<script lang="ts">
export default {
    name: 'PretvorbaPage',
    props: ['title'],
    methods: {
        back() {
            window.history.back();
        }
    }
}
</script>

<style>
header {
    text-align: center;
    overflow: auto;
}

h1 {
    width: auto;
    margin: auto;
    margin: 10px;
    /*font-size: 50;*/
}

#back-button {
    margin: 14px;
    position: absolute;
    top: 0px;
    left: 0px;
}
</style>