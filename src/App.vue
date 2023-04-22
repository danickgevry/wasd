<template>
    <Header />
    <RouterView />
    <WelcomeModal />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import WelcomeModal from './components/WelcomeModal.vue'
import Header from '@/components/Header.vue'
  // import HelloWorld from './components/HelloWorld.vue'
</script>

<style scoped></style>
