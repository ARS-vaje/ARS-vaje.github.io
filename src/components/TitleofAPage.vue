<template>
    <header>
        <button @click="back()" id="back-button">
            Back
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
}

#back-button {
    margin: 20px;
    position: absolute;
    top: 0px;
    left: 0px;
}
</style>