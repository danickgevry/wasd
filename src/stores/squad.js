import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useParamsStore } from '@/stores/params'

export const useSquadStore = defineStore('squad', () => {
    // State
    const selectedAssets = ref([])
    const params = useParamsStore()

    // Getters
    const stats = computed(() => {
        let squadSkins = [];
        let squadStats = {
            factions: [],
            weapons: [],
            factionsBonus: 0,
            weaponsBonus: 0,
            uniteThe7Bonus: 0,
            totalBonus: 0,
        }
    
        selectedAssets.value.forEach(asset => {
            if (asset.factions.length) {
                asset.factions.forEach(faction => {
                    squadStats.factions.push(faction.name)
                    squadStats.factionsBonus += faction.bonus
                })
            }
    
            if (asset.weapon) {
                squadStats.weapons.push(asset.weapon.name)
                squadStats.weaponsBonus += asset.weapon.bonus
            }
    
            if (squadSkins.indexOf(asset.skin) === -1) {
                squadSkins.push(asset.skin)
            }
        })
    
        if (squadSkins.length == 7) {
            squadStats.uniteThe7Bonus = params.uniteThe7Bonus
        }
    
        squadStats.totalBonus = squadStats.factionsBonus + squadStats.weaponsBonus + squadStats.uniteThe7Bonus
        return squadStats
    })

    // Actions
    function add (obj) {
        selectedAssets.value.push(obj)
    }

    function remove (obj) {
        const objWithNameIndex = selectedAssets.value.findIndex((item) => item.name === obj.name)
        
        if (objWithNameIndex > -1) {
            selectedAssets.value.splice(objWithNameIndex, 1)
        }
    }

    function reset () {
        selectedAssets.value = []
    }

    return { selectedAssets, stats, add, remove, reset }
})