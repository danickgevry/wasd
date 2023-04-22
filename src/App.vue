<template>
    <Header />

    <RouterView />

    <WelcomeModal />
    <Footer />
</template>

<script setup>
import { RouterView } from 'vue-router'
import WelcomeModal from './components/WelcomeModal.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped></style>
