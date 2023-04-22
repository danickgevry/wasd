<template>
    <!-- <header class="navbar navbar-expand-lg p-2">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" class="d-flex align-items-center text-white text-decoration-none">
                    <i class="bi bi-calculator-fill me-2 fs-1"></i>
                    <span class="fs-4">WASX Bonus Calculator</span>
                </a>
                <nav>
                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><RouterLink to="/" class="nav-link px-2 text-white">Home</RouterLink></li>
                        <li><RouterLink to="/about" class="nav-link px-2 text-white">About</RouterLink></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header> -->

    <RouterView />
    <WelcomeModal />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import WelcomeModal from './components/WelcomeModal.vue'
  // import HelloWorld from './components/HelloWorld.vue'
</script>

<style scoped></style>
