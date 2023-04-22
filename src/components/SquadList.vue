<template>
    <!-- Selected assets -->
    <div class="col p-2 position-relative" v-for="asset in squad.selectedAssets">
        <div class="card h-100">
            <img :src="asset.img" class="card-img-top">
            <div class="card-footer p-2 p-md-3">
                <dl class="row mt-auto mb-0">
                    <dt class="col-6 small text-nowrap">TOTAL</dt>
                    <dd class="col-6 text-end text-nowrap fw-bold small mb-0">{{ parseFloat(asset.totalBonus).toFixed(2) }}%</dd>
                </dl>
            </div>
        </div>
    </div>

    <!-- Placeholders -->
    <div class="col p-2 position-relative" v-for="n in (7 - squad.selectedAssets.length)">
        <div class="card h-100">
            <svg class="bd-placeholder-img card-img-top h-auto" width="180" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#2b3035"></rect>
            </svg>
            <div class="card-footer p-2 p-md-3">
                <dl class="row mt-auto mb-0">
                    <dt class="col-6 small"><span class="placeholder col-10"></span></dt>
                    <dd class="col-6 text-end small mb-0"><span class="placeholder col-8"></span></dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useSquadStore } from '@/stores/squad'
    
    const squad = useSquadStore()
</script>
  
<style scoped>
</style>