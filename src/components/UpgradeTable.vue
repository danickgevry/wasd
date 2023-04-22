<template>
    <div class="card text-white bg-dark h-100">
        <div class="card-header text-uppercase">Upgrade Chances</div>
        <div class="card-body">
            <div class="d-flex d-md-inline-flex btn-group mb-2" role="group">
                <input type="radio" class="btn-check" name="wasxType" id="wasxType1" v-model="wasxType" value="iron">
                <label class="btn btn-outline-primary text-white border-2 px-3 px-md-5" for="wasxType1">Iron WASX</label>
                <input type="radio" class="btn-check" name="wasxType" id="wasxType2" v-model="wasxType" value="gold">
                <label class="btn btn-outline-primary text-white border-2 px-3 px-md-5" for="wasxType2">Gold WASX</label>
            </div>

            <div class="table-responsive">
                <table class="table table-sm table-dark table-striped table-hover table-borderless text-end">
                    <thead>
                        <tr class="small">
                            <th scope="col" class="align-top text-start">Tiers</th>
                            <th scope="col" class="align-top text-white-50">Base <br>chances</th>
                            <th scope="col" class="align-top">With <br>bonus<sup>1</sup></th>
                            <th scope="col" class="align-top">Pickaxes <br>per tier<sup>2</sup></th>
                            <th scope="col" class="align-top">Pickaxes <br> total<sup>3</sup></th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr class="small" v-for="(tier, index) in params.tiers">
                            <th scope="row" class="text-start">{{ tier.name }}</th>
                            <td class="text-white-50">{{ tier[wasxType + 'Chance'].toFixed(2) }}%</td>
                            <td class="fw-bold">{{ calcTierBonus(tier[wasxType + 'Chance']) }}%</td>
                            <td class="fw-bold">{{ Math.ceil(100 / calcTierBonus(tier[wasxType + 'Chance'])) }}</td>
                            <td class="fw-bold">{{ calcCumulativePickaxes(index, wasxType + 'Chance') }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="mb-0"><small class="text-muted">1. Base Chance x (100% + Bonus%) = Final Chance</small></p>
            <p class="mb-0"><small class="text-muted">2. Estimated amout of pickaxes required to level up by 1 tier, based on base + bonus chances</small></p>
            <p class="mb-0"><small class="text-muted">3. Estimated amout of pickaxes required to level up from Tier 0, based on base + bonus chances</small></p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useParamsStore } from '@/stores/params'
import { useSquadStore } from '@/stores/squad'

const params = useParamsStore()
const squad = useSquadStore()

const wasxType = ref('iron')

const calcTierBonus = (tierBase) => {
    return parseFloat(tierBase * (100 + squad.stats.totalBonus) / 100).toFixed(2)
}

const calcCumulativePickaxes = (index, type) => {
    let total = 0;
    for (let i = index; i >= 0; i--) {

        total += (100 / calcTierBonus(params.tiers[i][type]))
    }
    return Math.ceil(total)
}
</script>
  
<style scoped></style>