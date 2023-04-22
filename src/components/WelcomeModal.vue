<template>
    <div id="welcomeModal" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body p-4">
                    <button type="button" class="btn-close position-absolute top-0 end-0 p-4" @click="onClick" aria-label="Close"></button>
                    <p class="mb-4">Hello survivors,</p>
                    <p class="mb-4">I just wanted to thank everyone one that has been using this app and giving me feedback. I'm having a lot of fun building this!</p>
                    <p class="mb-4">I also wanted to make a small disclaimer. The information that you will find here has been gathered through discussion with the community and might not be 100% accurate. Make sure to verify everything before making any kind moves.</p>
                    <p class="mb-4">If you find any bug or error, please reach out to me directly on Twitter <a href="https://twitter.com/corgiking92">@corgiking92</a>.</p>
                    <p class="mb-4">I hope that you will find this tool useful.</p>
                    <div class="d-flex align-items-center justify-content-start">
                        <div class="position-relative rounded overflow-hidden shadow-lg me-4" style="width: 100px; height: 100px;">
                            <img class="position-absolute top-50 start-50 translate-middle pb-3" style="width: auto; height: 100%; min-height: 150px;" src="https://media1.giphy.com/media/Q8t2GH83ZIVOLKy3zK/giphy.gif?cid=ecf05e47digysg49zpy6b98gwqgkxtvkqxu7lj5m68t23zzc&rid=giphy.gif&ct=g" alt="">
                        </div>
                        <p>Much love,<br> Danick a.k.a Corgi King</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCookie } from "@vue-composable/cookie"
import * as bootstrap from 'bootstrap'

let welcomeModal = null
let { cookie, setCookie, removeCookie } = useCookie('dismissMessage')

const onClick = () => {
    setCookie(true)
    welcomeModal.hide()
}

onMounted(() => {
    if (!cookie.value) {
        welcomeModal = new bootstrap.Modal('#welcomeModal')
        welcomeModal.show()
    }
})
</script>

<style lang="scss"></style>