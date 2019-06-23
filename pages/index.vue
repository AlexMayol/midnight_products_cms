<template>
  <div class="container">
    <div>
      <h1 class="text-5xl">Midnight CMS</h1>
      <p class="text-3xl">Manage products of any kind, giving them descriptions in three languages, a cool preview image, a category and as many colors as you want!</p>
	  <p>Get started now!✅</p>
	  <ul class="inline-flex flex-col list-disc">
		  <li><a href="/categories" target="_blank" rel="noopener">First, create a category (anything you like)! 🦈</a></li>
		  <li><a href="/colors" target="_blank" rel="noopener">Then, create ♾️ colors ♾️ for the product</a></li>
		  <li><a href="/products" target="_blank" rel="noopener">You are now ready to create a new product! 💯</a></li>
	  </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
