<template>
  <header class="header">
    <div class="header-content">
      <div class="logo">
        <img
          src="https://web.dragonball-api.com/images-compress/logo_dragonballapi.webp"
          alt="Dragon Ball Logo"
        />
      </div>
      <nav class="nav">
        <RouterLink to="/" class="nav-link">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>Home</span>
        </RouterLink>
        <RouterLink to="/list" class="nav-link">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
            />
          </svg>
          <span>Llista</span>
        </RouterLink>
        <RouterLink to="/combat" class="nav-link">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6.92 5H5l9 9 9-9h-1.92L12 13.08z M12 3L1 14h3l8-8 8 8h3z" />
          </svg>
          <span>Combat</span>
        </RouterLink>
        <RouterLink to="/about" class="nav-link">
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
            />
          </svg>
          <span>Sobre</span>
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
  background-color: var(--color-primary);
  box-shadow: 0 2px 4px var(--color-shadow);
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
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9375rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
}

.icon {
  width: 20px;
  height: 20px;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.2);
}

.nav-link.router-link-active .icon {
  transform: scale(1.1);
}
</style>
