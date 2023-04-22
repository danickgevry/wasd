<template>
    <div class="col p-1 position-relative" :class="{ 'opacity-50': disabled }">
        <input class="form-check-input position-absolute top-0 end-0 rounded-circle m-3 p-2" type="checkbox"
            :id="`checkbox-${asset.name}`"
            @input="updateValue"
            :disabled="disabled">
        <label class="rounded-3 h-100" :for="`checkbox-${asset.name}`">
            <div class="card h-100">
                <img :src="asset.img" class="card-img-top">
                <div class="card-body d-flex flex-column p-2 p-md-3">
                    <h5 class="card-title">{{ asset.name }}</h5>
                    <dl class="row mb-0" v-for="faction in asset.factions">
                        <dt class="col-7 text-truncate small">{{ faction.name }}</dt>
                        <dd class="col-5 text-end text-nowrap small mb-1">{{ parseFloat(faction.bonus).toFixed(2) }}%</dd>
                    </dl>
                    <dl class="row mb-0" v-if="asset.weapon">
                        <dt class="col-7 text-truncate small">{{ asset.weapon.name }}</dt>
                        <dd class="col-5 text-end text-nowrap small mb-1">{{ parseFloat(asset.weapon.bonus).toFixed(2) }}%
                        </dd>
                    </dl>
                </div>
                <div class="card-footer p-2 p-md-3">
                    <dl class="row mt-auto mb-0">
                        <dt class="col-6 small text-nowrap">TOTAL</dt>
                        <dd class="col-6 text-end text-nowrap fw-bold small mb-0">{{ parseFloat(asset.totalBonus).toFixed(2) }}%</dd>
                    </dl>
                </div>
            </div>
        </label>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps(['asset', 'disabled'])
const emit = defineEmits(['change'])

const updateValue = (event) => {
    if (event.target.checked) {
        emit('select', props.asset)
    } else {
        emit('unselect', props.asset)
    }
}
</script>
  
<style scoped>
.form-check-input {
    z-index: 10;
}

input + label {
    border: 3px solid transparent;
}

input:checked + label {
    border-color: #3459e6;
}
</style>