<script setup lang="ts">
import 'animate.css'
import { type prize } from '@/types/prize'
const runtimeConfig = useRuntimeConfig();
const prizeMap = useState<Map<number, prize>>("prizeMap")
const route = useRoute();
const prizeId = Number(route.params.id);
const introVisible = ref(true);
const photoUrl = computed(() => {
    return `${runtimeConfig.public.bucket_url}img/${prizeMap.value.get(prizeId)?.photo_id}.jpeg`
})

setTimeout(() => {
    introVisible.value = false;
}, 5000);
</script>

<template>
    <div class="intro" v-if="introVisible">
        <h1 class="animate__animated animate__backInDown">{{ prizeMap.get(prizeId)?.name }}</h1>
    </div>
    <main v-if="!introVisible">
        <img :src="photoUrl" />
        <h3>{{ prizeMap.get(prizeId)?.name }}</h3>
        <h2>{{ prizeMap.get(prizeId)?.account_name }}様</h2>
        <NuxtLink v-bind:to="{ name: 'result-id', params: { id: Number(route.params.id) - 1 } }"
            v-if="Number(route.params.id) - 1 !== 0">
            <button class="middle">
                次の発表
            </button>
        </NuxtLink>
        <NuxtLink v-bind:to="{ name: 'result' }" v-else>
            <button class="middle">
                トップに戻る
            </button>
        </NuxtLink>
    </main>
</template>

<style scoped>
.intro {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: black;
    text-align: center;
}

h1 {
    margin-top: 0;
    font-size: 120px;
    margin-top: 40vh;
    color: white;
}

h2 {
    color: white;
    font-size: 80px;
    margin: 10px 0;
}

h3 {
    color: white;
    font-size: 40px;
    margin: 10px 0;
}

main {
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: black;
    text-align: center;
}

img {
    margin-top: 30px;
    max-width: 70vw;
    max-height: 70vh;
    /* object-fit: contain; */
}

button {
    background-color: black;
    border: 1px solid white;
    color: white;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: xx-large;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    position: absolute;
    bottom: 7vh;
    right: 1vw;
}
</style>
