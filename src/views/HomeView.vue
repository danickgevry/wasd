<template>
    <main>
        <div class="banner bg-dark position-relative d-flex flex-column align-items-center justify-content-center px-3 py-5 text-center overflow-hidden vh-100" style="min-height: 300px;">
            <video class="position-absolute top-50 start-50 translate-middle opacity-75" id="video-bg" style="min-width: 100%; min-height: 100%;" autoplay muted loop>
                <source src="https://static.wasdnft.com/media/Header.6e824f6e.mp4" type="video/mp4">
            </video>
            <div class="position-relative mw-100">
                <h1 class="display-5 fw-bold text-white m-0">WASX Bonus Calculator</h1>
                <form class="d-flex flex-column justify-content-center mt-4 w-100" novalidate @submit.prevent="onSubmit">
                    <div class="input-group mb-3" style="width: 600px; max-width: 100%;" v-for="n in walletsCount">
                        <input type="text" class="form-control form-control-lg" :id="`wallet-address-${n}`" placeholder="ETH address or ENS" v-model="walletAddresses[n]">
                        <button class="btn btn-primary rounded-end" type="button" id="btn-submit" @click="walletsCount++" v-if="n == walletsCount"><i class="bi bi-plus-lg"></i></button>
                        <div class="d-block invalid-feedback invalid-wallet" v-if="invalidAddress">Please provide a valid ETH address or ENS.</div>
                    </div>
                    <div class="d-flex justify-content-center gap-3">
                        <button class="btn btn-primary rounded-end" type="submit" id="btn-submit" :disabled="loading">
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="loading"></span>
                            Load assets
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from "https://cdn.skypack.dev/axios@1.3.4"
import Web3 from "https://cdn.skypack.dev/web3@1.9.0"

import { useParamsStore } from '@/stores/params'
import { useAssetsStore } from '@/stores/assets'

const provider = new Web3.providers.WebsocketProvider('wss://mainnet.chainnodes.org/e71a47d0-9baa-4540-a7b2-77f244e2a4ba');
const web3 = new Web3(Web3.givenProvider || provider)

const router = useRouter()
const params = useParamsStore()
const assets = useAssetsStore()

const walletsCount = ref(1)
const walletAddresses = ref([])
const invalidAddress = ref(false)
const data = ref([])
const requests = ref(0)
const loading = computed(() => {
    return requests.value > 0 ? true : false
})

const onSubmit = () => {
    if (walletAddresses.value.length <= 0) {
        return invalidAddress.value = true
    }

    requests.value += 1

    walletAddresses.value.forEach(address => {
        if (address.length <= 0) {
            return invalidAddress.value = true
        }

        if (address.toLowerCase().endsWith('.eth')) {
            web3.eth.ens.getAddress(address, (response) => {
                if (typeof response === 'string') {
                    fetchData(response)
                } else {
                    return invalidAddress.value = true
                }
            })
        } else {
            fetchData(address)
        }
    })

    requests.value -= 1
}

const fetchData = (walletAddress) => {
    requests.value += 1

    fetch(walletAddress, '').then((response) => {
        data.value = response.data.assets
        
        if (response.data.next) {
            fetch(walletAddress, response.data.next).then((response) => {
                data.value = data.value.concat(response.data.assets)
                requests.value -= 1
            })
        } else {
            requests.value -= 1
        }
    })
}

const fetch = (walletAddress, cursor) => {
    const options = {
        method: 'GET',
        url: 'https://api.opensea.io/api/v1/assets',
        params: {
            owner: walletAddress,
            asset_contract_address: '0x27013d274aa60c6e6883aa2130e8b01249eb11d4',
            limit: '200',
            cursor: cursor || ''
        },
        headers: { accept: 'application/json' }
    }
    return axios.request(options)
}

watch(data, async () => {
    data.value.forEach(item => {
        let assetData = {
            name: item.name,
            img: item.image_thumbnail_url,
            skin: '',
            factions: [],
            weapon: null,
            totalBonus: 0
        }

        item.traits.forEach(trait => {
            const traitFaction = params.factions.find(faction => faction.traits.includes(trait.value))
            const traitWeapon = params.weapons.find(weapon => weapon.name == trait.value)

            if (trait.trait_type == 'Skin') {
                assetData.skin = trait.value
            }

            if (traitFaction) {
                const factionExists = assetData.factions.find(faction => faction.name == traitFaction.name)
                if (!factionExists) {
                    assetData.factions.push({ name: traitFaction.name, bonus: traitFaction.bonus })
                    assetData.totalBonus += traitFaction.bonus
                }
            }

            if (traitWeapon) {
                assetData.weapon = { name: traitWeapon.name, bonus: traitWeapon.bonus }
                assetData.totalBonus += traitWeapon.bonus
            }
        })

        assets.add(assetData)
    })
})

watch(loading, async (newState, oldState) => {
    // if was loading (oldState == true) and is not loading anymore (newState == false)
    if (oldState && !newState) {
        // redirect to team page
        router.push('/team')
    }
})
</script>