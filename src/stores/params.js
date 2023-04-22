import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useParamsStore = defineStore('params', () => {
    const uniteThe7Bonus = ref(50.00)
    const factions = ref([
        { name: 'Tech Hails', traits: ['Tech Hail'], bonus: 5.00 },
        { name: 'Wizard Clan', traits: ['Sorcerer Hat', 'Sorcerer'], bonus: 5.00 },
        { name: 'Los Capos', traits: ['Nacho', 'El Capo'], bonus: 5.00 },
        { name: 'Scorched Deados', traits: ['Scorched Deado'], bonus: 5.00 },
        { name: 'Atlantis', traits: ['Atlantis Fallen Kingdom'], bonus: 5.00 },
        { name: 'Pirate Gang', traits: ['Pillager', 'GoldenP'], bonus: 5.00 },
    ])
    const weapons = ref([
        { name: 'Necronomicon', bonus: 10.00 },
        { name: 'Skulio\'s Staff', bonus: 8.47 },
        { name: 'Glider', bonus: 6.32 },
        { name: 'Saber', bonus: 5.35 },
        { name: 'Unlife Bomb', bonus: 5.09 },
        { name: 'Aaron\'s Rod', bonus: 4.76 },
        { name: 'Laz Wand', bonus: 4.72 },
        { name: 'Blade of Minx', bonus: 4.66 },
        { name: 'Skate or Undie', bonus: 4.61 },
        { name: 'Vamps Air', bonus: 4.47 },
        { name: 'Shredor', bonus: 4.42 },
        { name: 'Pierca Bow', bonus: 4.28 },
        { name: 'Longinus', bonus: 3.90 },
        { name: 'Phalanges', bonus: 0.26 },
    ])
    const tiers = ref([
        { name: 1, ironChance: 10.00, goldChance: 20.00 },
        { name: 2, ironChance: 5.00, goldChance: 10.00 },
        { name: 3, ironChance: 2.50, goldChance: 5.00 },
        { name: 4, ironChance: 1.25, goldChance: 2.50 },
        { name: 5, ironChance: 0.60, goldChance: 1.25 },
        { name: 6, ironChance: 0.30, goldChance: 0.60 },
        { name: 7, ironChance: 0.16, goldChance: 0.30 },
    ])

    return { uniteThe7Bonus, factions, weapons, tiers }
})
