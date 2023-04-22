<template>
    <main class="my-5 py-5">
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
                    <RouterLink to="/assets" class="btn btn-primary btn-lg">View all assets</RouterLink>
                </div>
            </div>
        </section>
        
        <!-- Stats -->
        <section class="container-fluid px-3 px-md-5 my-4">
            <div class="row">
                <div class="col-12 col-lg-6 col-xl-4 p-2">
                    <SquadStats />
                </div>

                <div class="col-12 col-lg-6 col-xl-8 p-2">
                    <UpgradeTable />
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAssetsStore } from '@/stores/assets'
import { useSquadStore } from '@/stores/squad'

import SquadList from '@/components/SquadList.vue'
import SquadStats from '@/components/SquadStats.vue'
import UpgradeTable from '@/components/UpgradeTable.vue'

const router = useRouter()
const assets = useAssetsStore()
const squad = useSquadStore()

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