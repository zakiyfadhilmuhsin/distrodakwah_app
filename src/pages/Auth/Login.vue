<template>
  <q-page>
  	<div class="row logo-distrodakwah">
  		<div class="col">
    		<img src="~/assets/images/components/logo-distrodakwah-small.png" width="170px" />
    		<br/>
    		<h1 class="login-text">LOGIN</h1>
    		<p class="login-small-text">Untuk dapatkan berbagai macam<br/>keuntungan di Distrodakwah.id</p>
    		<q-input type="text" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Masukkan Email" />
    		<q-input type="text" dense class="bg-grey-2 q-mb-sm" outlined placeholder="Kata Sandi" />
    		<div class="text-right">
    			<p class="forgot-password-text text-amber-8" style="margin-bottom: 10px">Lupa Kata Sandi?</p>
    		</div>
    		<q-btn to="/storefront" flat class="bg-amber-8 full-width"><span class="text-white" style="font-weight: bolder; font-family: 'Open Sans'">MASUK</span></q-btn>
    		<br/>
    		<center>
    			<img src="~/assets/images/components/coin-big.png" style="width: 80%; margin-top: 35px" />
    		</center>
    	</div>
    </div>
  </q-page>
</template>

<style>
	.logo-distrodakwah{
		padding: 30px;
	}
	.login-text{
		font-size: 36px;
		font-weight: bolder;
		font-family: 'Open Sans';
		margin-bottom: 0px;
		line-height: 1.5em;
	}
	.login-small-text{
		font-family: 'Open Sans';
		font-size: 12px;
		margin-top: 0px;
		padding-left: 2px;
	}
	.forgot-password-text{
		font-size: 12px;
	}
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
