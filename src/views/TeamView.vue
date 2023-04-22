<template>
    <main>
        <!-- START Stats -->
        <section class="container-fluid px-3 px-md-5 my-4 my-md-5">
            <div class="row">
                <div class="col-12 col-lg-6 col-xl-4 p-2">
                    <SquadStats />
                </div>

                <div class="col-12 col-lg-6 col-xl-8 p-2">
                    <UpgradeTable />
                </div>
            </div>
        </section>
        <!-- END Header -->

        <!-- START Squad -->
        <section class="container-fluid px-3 px-md-5 my-4 my-md-5">
            <h2>Selected squad <span class="badge bg-secondary small ms-2">{{ squad.selectedAssets.length }}/7</span></h2>
            <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 row-cols-xxl-7">
                <SquadList />
            </div>
        </section>
        <!-- END Squad -->
        
        <!-- START Assets -->
        <section class="container-fluid px-3 px-md-5 my-4 my-md-5">
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
        <!-- END Assets -->
    </main>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useParamsStore } from '@/stores/params'
import { useAssetsStore } from '@/stores/assets'
import { useSquadStore } from '@/stores/squad'

import AssetCard from '@/components/AssetCard.vue'
import SquadList from '@/components/SquadList.vue'
import SquadStats from '@/components/SquadStats.vue'
import UpgradeTable from '@/components/UpgradeTable.vue'

const router = useRouter()
const params = useParamsStore()
const assets = useAssetsStore()
const squad = useSquadStore()
const wasxType = ref('iron')

// const resetData = () => {
//     data.value = []
//     assets.reset()
//     squad.reset()
// }

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
    // walletAddresses.value = ['danick.eth']
    // onSubmit()
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