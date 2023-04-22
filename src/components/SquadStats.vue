<template>
    <div class="card text-white bg-dark h-100">
        <div class="card-header text-uppercase">Squad Bonuses</div>
        <div class="card-body">
            <dl class="row mb-0">
                <dt class="col-8 small">Factions Bonus
                    <ul v-if="squad.stats.factions.length">
                        <li v-for="faction in uniqueItems(squad.stats.factions)" class="fw-normal">{{ faction }} ({{ squad.stats.factions.filter(f => f == faction).length }})</li>
                    </ul>
                </dt>
                <dd class="col-4 text-end small">{{ parseFloat(squad.stats.factionsBonus).toFixed(2) }}%</dd>
            </dl>
            <dl class="row mb-0">
                <dt class="col-8 small">Weapons Bonus
                    <ul v-if="squad.stats.weapons.length">
                        <li v-for="weapon in uniqueItems(squad.stats.weapons)" class="fw-normal">{{ weapon }} ({{ squad.stats.weapons.filter(w => w == weapon).length }})</li>
                    </ul>
                </dt>
                <dd class="col-4 text-end small">{{ parseFloat(squad.stats.weaponsBonus).toFixed(2) }}%</dd>
            </dl>
            <dl class="row mb-0">
                <dt class="col-8 small">Unite the 7 Bonus</dt>
                <dd class="col-4 text-end small">{{ squad.stats.uniteThe7Bonus }}%</dd>
            </dl>
        </div>
        <div class="card-footer">
            <dl class="row mt-auto mb-0">
                <dt class="col-8 small text-uppercase">Total Squad Bonus</dt>
                <dd class="col-4 text-end fw-bold small mb-0">{{ parseFloat(squad.stats.totalBonus).toFixed(2) }}%</dd>
            </dl>
        </div>
    </div>
</template>

<script setup>
import { useSquadStore } from '@/stores/squad'

const squad = useSquadStore()

const uniqueItems = (arr) => {
    return arr.filter((value, index, array) => array.indexOf(value) === index)
}
</script>
  
<style scoped></style>