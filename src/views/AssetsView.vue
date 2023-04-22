<template>
    <main class="mt-5 pt-4">
        <section class="container-fluid px-3 px-md-5 my-2">
            <RouterLink to="/" class="btn btn-outline-secondary text-white">
                <i class="bi bi-chevron-left"></i>
                Load new wallet(s)
            </RouterLink>
        </section>
            
        <!-- Squad -->
        <section class="my-4">
            <div class="container-fluid px-3 px-md-5">
                <h2>Selected squad <span class="badge bg-secondary small ms-2">{{ squad.selectedAssets.length }}/7</span></h2>
            </div>
            <div class="overflow-x-auto">
                <SquadList />
            </div>
            <div class="container-fluid px-3 px-md-5 mt-2 mt-md-3">
                <div class="d-grid d-sm-block">
                    <RouterLink to="/stats" class="btn btn-primary btn-lg" v-if="squad.selectedAssets.length">View squad stats</RouterLink>
                    <button type="button" class="btn btn-primary btn-lg" disabled v-else>View squad stats</button>
                </div>
            </div>
        </section>
        
        <!-- Assets -->
        <section class="container-fluid px-3 px-md-5 my-4">
            <h2>All assets <span class="badge bg-secondary small ms-2">{{ assets.all.length }}</span></h2>
            <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 row-cols-xxl-7">
                <AssetCard
                    v-for="asset in assets.all"
                    :asset="asset"
                    :disabled="squad.selectedAssets.length > 6 && squad.selectedAssets.indexOf(asset) === -1"
                    @select="onCardSelect"
                    @unselect="onCardUnselect" />
            </div>
        </section>
    </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAssetsStore } from '@/stores/assets'
import { useSquadStore } from '@/stores/squad'

import AssetCard from '@/components/AssetCard.vue'
import SquadList from '@/components/SquadList.vue'

const router = useRouter()
const assets = useAssetsStore()
const squad = useSquadStore()

const onCardSelect = (asset) => {
    squad.add(asset)
}

const onCardUnselect = (asset) => {
    squad.remove(asset)
}

onMounted(() => {
    if (assets.all.length <= 0) {
        router.push('/')
    }
})
</script>

<style>
@media (min-width: 1400px) {
    .row-cols-xxl-7 > * {
        flex: 0 0 auto;
        width: calc(100% / 7);
    }
}

@media (min-width: 1600px) {
    .row-cols-xxl-7 > * {
        flex: 0 0 auto;
        width: calc(100% / 8);
    }
}

@media (min-width: 2000px) {
    .row-cols-xxl-7 > * {
        flex: 0 0 auto;
        width: calc(100% / 10);
    }
}
</style>