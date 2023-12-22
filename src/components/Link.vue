<template>
    <RouterLink :to="{path: link}">
        <!--<div>
            <img :src="icon" alt="icon">
            <p>{{ title }}</p>
        </div>-->
        <v-card width="400" style="background-color: #D0CFCF">
            <v-img
                height="200"
                :src="icon"
                style="margin: 10px;"
            >

            </v-img>
            <v-card-text style="display: flex; justify-content: space-around;">
                <h1>{{ title }}</h1>
            </v-card-text>
        </v-card>
    </RouterLink>
</template>

<script lang="ts">
export default {
    name: 'Link',
    data () {
        return {
            msg: 'nesto'
        }
    },
    props: ['title', 'link', 'icon']
}
</script>