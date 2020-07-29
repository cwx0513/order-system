<template>
<div>
    <app-header></app-header>
    <app-navbar></app-navbar>
    <app-main></app-main>
</div>
</template>
<script>
import AppHeader from '@/components/AppHeader'
import AppNavbar from '@/components/AppNavbar'
import AppMain from '@/components/AppMain'
export default {
    components:{
        AppHeader,
        AppNavbar,
        AppMain
    }
    
}
</script>
<style scoped>


</style>