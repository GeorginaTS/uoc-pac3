<script setup lang="ts"></script>

<template>
  <div class="home">
    <div class="logo-container">
      <img
        src="https://web.dragonball-api.com/images-compress/logo_dragonballapi.webp"
        alt="Dragon Ball API Logo"
        class="logo"
      />
    </div>
    <h1>Benvingut a Dragon Ball</h1>
    <p>Explora el món dels personatges de Dragon Ball</p>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding: 2rem;
}

.logo-container {
  margin-bottom: 2rem;
}

.logo {
  width: 256px;
  height: auto;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

h1 {
  color: #ff6b00;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  animation: fadeIn 1s ease-in;
}

p {
  font-size: 1.2rem;
  color: #666;
  animation: fadeIn 1.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
