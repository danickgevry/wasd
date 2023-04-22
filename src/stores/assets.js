import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAssetsStore = defineStore('assets', () => {
    // State
    const assets = ref([])

    // Getters
    const all = computed(() => {
        return assets.value.sort((a, b) => parseInt(b.totalBonus) - parseInt(a.totalBonus))
    })

    // Actions
    function add (arr) {
        assets.value.push(arr)
    }

    function reset () {
        assets.value = []
    }

    return { assets, all, add, reset }
})