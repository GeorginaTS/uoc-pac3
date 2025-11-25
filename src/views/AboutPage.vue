<template>
  <div class="about-page">
    <div class="about-container">
      <aside class="profile-section">
        <img
          src="https://avatars.githubusercontent.com/u/128484388?v=4"
          alt="Georgina Tomas"
          class="profile-image"
        />
        <h1>Georgina Tomas</h1>
        <p class="title">FullStack Developer</p>
        <p class="location">📍 Arbúcies, Girona</p>

        <nav class="social-links">
          <a href="https://github.com/GeorginaTS" target="_blank" class="social-link">
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/georgina-tomas/" target="_blank" class="social-link">
            <span>LinkedIn</span>
          </a>
        </nav>
      </aside>

      <main class="info-section">
        <section class="bio">
          <h2>Sobre mi</h2>
          <p>
            Desenvolupadora FullStack apassionada per la tecnologia i l'aprenentatge continu.
            Especialitzada en desenvolupament web modern amb JavaScript, TypeScript i frameworks com
            Vue.js i React.
          </p>
        </section>

        <section class="skills">
          <h2>Habilitats Tècniques</h2>
          <div class="skills-grid">
            <span class="skill-tag">HTML5</span>
            <span class="skill-tag">CSS3</span>
            <span class="skill-tag">JavaScript (ES6)</span>
            <span class="skill-tag">TypeScript</span>
            <span class="skill-tag">Vue.js 3</span>
            <span class="skill-tag">React</span>
            <span class="skill-tag">Node.js</span>
            <span class="skill-tag">Express.js</span>
            <span class="skill-tag">SQL</span>
            <span class="skill-tag">NoSQL</span>
            <span class="skill-tag">MongoDB</span>
            <span class="skill-tag">MySQL</span>
            <span class="skill-tag">API REST</span>
            <span class="skill-tag">Git & GitHub</span>
            <span class="skill-tag">AWS</span>
            <span class="skill-tag">Responsive Design</span>
            <span class="skill-tag">Agile</span>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.about-page {
  padding: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.about-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
}

.profile-section {
  background: var(--color-card-bg);
  padding: 2rem;
  border-radius: var(--radius-md);
  box-shadow: 0 1px 3px var(--color-shadow);
  text-align: center;
  height: fit-content;
  position: sticky;
  top: 2rem;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 1.5rem;
  border: 4px solid var(--color-border);
}

.profile-section h1 {
  color: var(--color-text);
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.title {
  color: var(--color-primary);
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.location {
  color: var(--color-text-light);
  font-size: 0.9375rem;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.social-link {
  display: block;
  padding: 0.75rem 1rem;
  background: var(--color-background);
  color: var(--color-text);
  text-decoration: none;
  border-radius: var(--radius-sm);
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid var(--color-border);
}

.social-link:hover {
  background: var(--color-primary);
  color: white;
  transform: translateX(5px);
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.bio,
.skills {
  background: var(--color-card-bg);
  padding: 2rem;
  border-radius: var(--radius-md);
  box-shadow: 0 1px 3px var(--color-shadow);
}

.bio h2,
.skills h2 {
  color: var(--color-text);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  border-left: 4px solid var(--color-primary);
  padding-left: 1rem;
}

.bio p {
  color: var(--color-text-light);
  line-height: 1.7;
  font-size: 1rem;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--color-background);
  color: var(--color-text);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid var(--color-border);
  transition: all 0.2s ease;
}

.skill-tag:hover {
  background: var(--color-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px var(--color-shadow);
}

@media (max-width: 768px) {
  .about-container {
    grid-template-columns: 1fr;
  }

  .profile-section {
    position: static;
  }
}
</style>
