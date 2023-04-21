<template>
  <main id="app">
		<!-- START Header -->
		<section class="banner bg-dark position-relative d-flex flex-column align-items-center justify-content-center px-3 py-5 text-center overflow-hidden" style="min-height: 300px;">
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
		</section>
		<!-- END Header -->
		
		<!-- START Stats -->
		<section class="container-fluid px-3 px-md-5 my-4 my-md-5" v-if="assets.length">
			<div class="row">
				<!-- START Squad Bonuses -->
				<div class="col-12 col-lg-6 col-xl-4 mb-4 mb-lg-0">
					<div class="card text-white bg-dark h-100">
						<div class="card-header text-uppercase">Squad Bonuses</div>
						<div class="card-body">
							<dl class="row mb-0">
								<dt class="col-8 small">Factions Bonus
									<ul v-if="selectedSquadStats.factions.length">
										<li v-for="faction in uniqueItems(selectedSquadStats.factions)" class="fw-normal">{{ faction }} ({{ selectedSquadStats.factions.filter(f => f == faction).length }})</li>
									</ul>
								</dt>
								<dd class="col-4 text-end small">{{ parseFloat(selectedSquadStats.factionsBonus).toFixed(2) }}%</dd>
							</dl>
							<dl class="row mb-0">
								<dt class="col-8 small">Weapons Bonus
									<ul v-if="selectedSquadStats.weapons.length">
										<li v-for="weapon in uniqueItems(selectedSquadStats.weapons)" class="fw-normal">{{ weapon }} ({{ selectedSquadStats.weapons.filter(w => w == weapon).length }})</li>
									</ul>
								</dt>
								<dd class="col-4 text-end small">{{ parseFloat(selectedSquadStats.weaponsBonus).toFixed(2) }}%</dd>
							</dl>
							<dl class="row mb-0">
								<dt class="col-8 small">Unite the 7 Bonus</dt>
								<dd class="col-4 text-end small">{{ selectedSquadStats.uniteThe7Bonus }}%</dd>
							</dl>
						</div>
						<div class="card-footer">
							<dl class="row mt-auto mb-0">
								<dt class="col-8 small text-uppercase">Total Squad Bonus</dt>
								<dd class="col-4 text-end fw-bold small mb-0">{{ parseFloat(selectedSquadStats.totalBonus).toFixed(2) }}%</dd>
							</dl>
						</div>
					</div>
				</div>
				<!-- END Squad Bonuses -->
				
				<!-- START Upgrade Chances -->
				<div class="col-12 col-lg-6 col-xl-8">
					<div class="card text-white bg-dark h-100">
						<div class="card-header text-uppercase">Upgrade Chances</div>
						<div class="card-body">
							<div class="btn-group mb-4" role="group">
								<input type="radio" class="btn-check" name="wasxType" id="wasxType1" v-model="wasxType" value="iron">
								<label class="btn btn-outline-primary text-white border-2 px-4" for="wasxType1">Iron WASX</label>
								<input type="radio" class="btn-check" name="wasxType" id="wasxType2" v-model="wasxType" value="gold">
								<label class="btn btn-outline-primary text-white border-2 px-4" for="wasxType2">Gold WASX</label>
							</div>

							<div class="table-responsive">
								<table class="table table-sm table-dark table-striped table-hover table-borderless text-end">
									<thead>
										<tr>
											<th scope="col" class="align-top text-start">Tiers</th>
											<th scope="col" class="align-top text-white-50">Base <br>chances</th>
											<th scope="col" class="align-top">With <br>bonus<sup>1</sup></th>
											<th scope="col" class="align-top">Pickaxes <br>per tier<sup>2</sup></th>
											<th scope="col" class="align-top">Pickaxes <br> cumulative<sup>3</sup></th>
										</tr>
									</thead>
									<tbody class="table-group-divider">
										<tr v-for="(tier, index) in tiers">
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
				</div>
				<!-- END Upgrade Chances -->
			</div>
		</section>
		<!-- END Header -->
		
		<!-- START Squad -->
		<section class="container-fluid px-3 px-md-5 my-4 my-md-5" v-if="assets.length">
			<h2>Selected squad <span class="badge bg-light small">{{ selectedAssets.length }}/7</span></h2>
			<div class="d-flex flex-column flex-md-row">
				<div class="d-flex flex-grow-1 flex-wrap justify-content-start w-100">
					<!-- Selected assets -->
					<div class="flex-grow w-50 p-2" style="max-width: 240px;" v-for="asset in selectedAssets">
						<div class="card border-0 h-100">
							<img :src="asset.img" class="card-img-top">
							<div class="card-footer p-2 p-md-3">
								<dl class="row mt-auto mb-0">
									<dt class="col-12 col-md-8 small">TOTAL BONUS</dt>
									<dd class="col-12 col-md-4 text-md-end fw-bold small mb-0">{{ parseFloat(asset.totalBonus).toFixed(2) }}</dd>
								</dl>
							</div>
						</div>
					</div>
					
					<!-- Placeholders -->
					<div class="flex-grow w-50 p-2" style="max-width: 240px;" v-for="n in (7 - selectedAssets.length)">
						<div class="card border-0 h-100">
							<svg class="bd-placeholder-img card-img-top h-auto" width="180" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect></svg>
							<div class="card-footer p-2 p-md-3">
								<dl class="row mt-auto mb-0">
									<dt class="col-12 col-md-8 small"><span class="placeholder col-8 col-md-10"></span></dt>
									<dd class="col-12 col-md-4 text-md-end fw-bold small mb-0"><span class="placeholder col-4 col-md-12"></span></dd>
								</dl>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- END Squad -->
		
		<!-- START Assets -->
		<section class="container-fluid px-3 px-md-5 my-4 my-md-5" v-if="assets.length">
			<h2>All assets <span class="badge bg-light small">{{ assets.length }}</span></h2>
			<div class="d-flex flex-wrap align-items-stretch justify-content-start">
				
				<div class="position-relative flex-grow w-50 p-1" style="max-width: 240px;" v-for="(asset, index) in sortedAssets">
					<input class="form-check-input position-absolute top-0 end-0 rounded-circle m-3 p-2" type="checkbox"
						v-model="selectedAssets"
						:id="`checkbox-${index}`"
						:value="asset"
						:disabled="selectedAssets.length > 6 && selectedAssets.indexOf(asset) === -1" >
					<label class="rounded-3 h-100" :for="`checkbox-${index}`">
						<div class="card border-0 h-100">
							<img :src="asset.img" class="card-img-top">
							<div class="card-body d-flex flex-column p-2 p-md-3">
								<h5 class="card-title">{{ asset.name }}</h5>
								<dl class="row mb-0" v-for="faction in asset.factions">
									<dt class="col-12 col-md-8 small">{{ faction.name }}</dt>
									<dd class="col-12 col-md-4 text-md-end small">{{ parseFloat(faction.bonus).toFixed(2) }}%</dd>
								</dl>
								<dl class="row mb-0" v-if="asset.weapon">
									<dt class="col-12 col-md-8 small">{{ asset.weapon.name }}</dt>
									<dd class="col-12 col-md-4 text-md-end small">{{ parseFloat(asset.weapon.bonus).toFixed(2) }}%</dd>
								</dl>
							</div>
							<div class="card-footer p-2 p-md-3">
								<dl class="row mt-auto mb-0">
									<dt class="col-12 col-md-8 small">TOTAL BONUS</dt>
									<dd class="col-12 col-md-4 text-md-end fw-bold small mb-0">{{ parseFloat(asset.totalBonus).toFixed(2) }}%</dd>
								</dl>
							</div>
						</div>
					</label>
				</div>
				
			</div>
		</section>
		<!-- END Assets -->
		
		<!-- START Assets -->
		<section class="container-fluid px-5 my-5 w-100" v-else>
			<div class="row justify-content-center">
				<div class="col-12 col-sm-10 col-md-8 col-lg-6" style="max-width: 600px;">
					<p class="mb-4">Hello survivors,</p>
					<p class="mb-4">I just wanted to thank everyone one that has been using this app and giving me feedback. I'm having a lot of fun building this!</p>
					<p class="mb-4">I also wanted to make a small disclaimer. The information that you will find here has been gathered through discussion with the community and might not be 100% accurate. Make sure to verify everything before making any kind moves.</p>
					<p class="mb-4">If you find any bug or error, please reach out to me directly on Twitter <a href="https://twitter.com/corgiking92">@corgiking92</a>.</p>
					<p class="mb-4">I hope that you will find this tool useful.</p>
					<div class="d-flex align-items-center justify-content-start">
						<div class="position-relative rounded overflow-hidden shadow-lg me-4" style="width: 120px; height: 120px;">
							<img class="position-absolute top-50 start-50 translate-middle pb-3" style="width: auto; height: 100%; min-height: 180px;" src="https://media1.giphy.com/media/Q8t2GH83ZIVOLKy3zK/giphy.gif?cid=ecf05e47digysg49zpy6b98gwqgkxtvkqxu7lj5m68t23zzc&rid=giphy.gif&ct=g" alt="">
						</div>
						<p>Much love,<br> Danick a.k.a Corgi King</p>
					</div>
				</div>
			</div>
		</section>
		<!-- END Assets -->
  </main>
</template>

<script setup>
	import { ref, watch, computed, onMounted } from 'vue'
	import axios from "https://cdn.skypack.dev/axios@1.3.4"
	import Web3 from "https://cdn.skypack.dev/web3@1.9.0"
	
	const provider = new Web3.providers.WebsocketProvider('wss://mainnet.chainnodes.org/e71a47d0-9baa-4540-a7b2-77f244e2a4ba');
	const web3 = new Web3(Web3.givenProvider || provider)
	
	const walletsCount = ref(1)
	const walletAddresses = ref([])
	const invalidAddress = ref(false)
	const data = ref([])
	const assets = ref([])
	const selectedAssets = ref([])
	const requests = ref(0)
	const wasxType = ref('iron')
	const showDisclaimer = ref(false)
	
	const uniteThe7Bonus = 50.00;
	const factions = [
		{ name: 'Tech Hails', traits: ['Tech Hail'], bonus: 5.00 },
		{ name: 'Wizard Clan', traits: ['Sorcerer Hat', 'Sorcerer'], bonus: 5.00 },
		{ name: 'Los Capos', traits: ['Nacho', 'El Capo'], bonus: 5.00 },
		{ name: 'Scorched Deados', traits: ['Scorched Deado'], bonus: 5.00 },
		{ name: 'Atlantis', traits: ['Atlantis Fallen Kingdom'], bonus: 5.00 },
		{ name: 'Pirate Gang', traits: ['Pillager', 'GoldenP'], bonus: 5.00 },
	]
	const weapons = [
		{ name: 'Necronomicon', bonus: 10.00},
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
	]
	const tiers = [
		{ name: 1, ironChance: 10.00, goldChance: 20.00 },
		{ name: 2, ironChance: 5.00, goldChance: 10.00 },
		{ name: 3, ironChance: 2.50, goldChance: 5.00 },
		{ name: 4, ironChance: 1.25, goldChance: 2.50 },
		{ name: 5, ironChance: 0.60, goldChance: 1.25 },
		{ name: 6, ironChance: 0.30, goldChance: 0.60 },
		{ name: 7, ironChance: 0.16, goldChance: 0.30 },
	]
	
	const loading = computed(() => {
		return requests.value > 0 ? true : false
	})
	
	const sortedAssets = computed(() => {
		return assets.value.sort((a, b) => parseInt(b.totalBonus) - parseInt(a.totalBonus))
	})
	
	const selectedSquadStats = computed(() => {
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
			squadStats.uniteThe7Bonus = uniteThe7Bonus
		}
		
		squadStats.totalBonus = squadStats.factionsBonus + squadStats.weaponsBonus + squadStats.uniteThe7Bonus
		return squadStats
	})
	
	watch(data, () => {
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
				const traitFaction = factions.find(faction => faction.traits.includes(trait.value))
				const traitWeapon = weapons.find(weapon => weapon.name == trait.value)
				
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
			
			assetData.totalBonus = assetData.totalBonus
			assets.value.push(assetData)
		})
	})
	
	const closeDisclaimer = () => {
		localStorage.setItem('dismissDisclaimer', true)
		showDisclaimer.value = false
	}
	
	const onSubmit = () => {
		requests.value += 1
		resetData()
		
		walletAddresses.value.forEach(address => {
			if (address.length <= 0) {
				return invalidAddress.value = true
			}

			if (address.toLowerCase().endsWith('.eth') || !address.toLowerCase().startsWith('0x')) {
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
			headers: {accept: 'application/json'}
		}
		return axios.request(options)
	}
	
	const resetData = () => {
		data.value = []
		assets.value = []
		selectedAssets.value = []
	}
	
	const uniqueItems = (arr) => {
		return arr.filter((value, index, array) => array.indexOf(value) === index)
	}
	
	const calcTierBonus = (tierBase) => {
		return parseFloat(tierBase * (100 + selectedSquadStats.value.totalBonus) / 100).toFixed(2)
	}
	
	const calcCumulativePickaxes = (index, type) => {
		let total = 0;
		for (let i = index; i >= 0; i--) {
			
			total += (100 / calcTierBonus(tiers[i][type]))
		}
		return Math.ceil(total)
	}
	
	onMounted(() => {
		if (localStorage.getItem('dismissDisclaimer') !== true) {
			showDisclaimer.value = true
		}
		
		// walletAddresses.value = ['danick.eth']
		// onSubmit()
	})
</script>

<style lang="scss">
	.form-check-input {
		z-index: 10;
	}
	
	input + label {
		border: 4px solid transparent;
	}
	
	input:checked + label {
		border: 4px solid #3459e6;
	}
	
	input:disabled + label {
		opacity: 0.5;
	}
</style>