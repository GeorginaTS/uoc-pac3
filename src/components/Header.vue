<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Dragon_Ball_Z_Logo_A.png/320px-Dragon_Ball_Z_Logo_A.png"
          alt="Dragon Ball Logo"
        />
      </div>
      <nav class="nav">
        <RouterLink to="/" class="nav-link">
          <span class="icon">🏠</span>
          Home
        </RouterLink>
        <RouterLink to="/list" class="nav-link">
          <span class="icon">📋</span>
          Llista
        </RouterLink>
        <RouterLink to="/about" class="nav-link">
          <span class="icon">ℹ️</span>
          Sobre
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineOptions({
  name: 'AppHeader',
})
</script>

<style scoped>
.header {
  background-color: #f7931e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo img {
  height: 40px;
  width: auto;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  font-size: 1.2rem;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #d32f2f;
}
</style>
