<template>
  <div id="q-app">
  	<div class="bg-white mobile-layout-on-desktop">
	  	<transition
		  appear
		  duration="500"
		  enter-active-class="animated fadeIn"
		  leave-active-class="animated fadeOut"
		>
	    	<router-view />
    	</transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
