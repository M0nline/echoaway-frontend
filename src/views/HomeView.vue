<template>
  <div class="home-page">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="logo">ECHOAWAY</div>
        <nav class="nav">
          <a href="#" class="nav-link">Séjours</a>
          <router-link to="/accommodations" class="nav-link">Hébergements</router-link>
          <a href="#" class="nav-link">Loisirs</a>
        </nav>
        <router-link to="/login">
          <q-btn color="dark" label="Connexion" class="login-btn" />
        </router-link>
      </div>
    </header>

    <!-- Section principale - Besoin de déconnecter -->
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">Besoin de déconnecter ? - CI/CD Test</h1>
        <p class="hero-description">
          EchoAway connecte les voyageurs à la déconnexion. Explorez zones blanches, 
          hébergements éco-responsables et activités hors réseau pour un séjour authentique, 
          loin du numérique et proche de l'essentiel.
        </p>
        
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-image"></div>
            <h3>No Wi-Fi</h3>
            <q-btn color="primary" label="Découvrir" flat />
          </div>
          <div class="feature-card">
            <div class="feature-image"></div>
            <h3>Zones blanches et grises</h3>
            <q-btn color="primary" label="Découvrir" flat />
          </div>
          <div class="feature-card">
            <div class="feature-image"></div>
            <h3>Zones blanches sans Wi-Fi</h3>
            <q-btn color="primary" label="Découvrir" flat />
          </div>
        </div>
      </div>
    </section>

    <!-- Section de recherche -->
    <section class="search-section">
      <div class="container">
        <h2 class="section-title">Recherchez votre hébergement</h2>
        <div class="search-form">
          <q-input 
            v-model="searchLocation"
            outlined 
            placeholder="Ville, région..." 
            class="search-input"
          />
          <q-input 
            v-model="searchType"
            outlined 
            placeholder="Type" 
            class="search-input"
          />
          <q-btn 
            color="dark" 
            label="Lancer la recherche" 
            class="search-btn"
            size="lg"
          />
        </div>
      </div>
    </section>

    <!-- Section hébergements -->
    <section class="accommodations-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Mieux notés x Sponsorisés</h2>
          <p class="section-subtitle">
            If you don't try this app, you won't become the superhero you were meant to be
          </p>
        </div>
        
        <div class="accommodations-grid">
          <div class="accommodation-card" v-for="i in 4" :key="i">
            <div class="accommodation-image"></div>
            <div class="accommodation-content">
              <div class="accommodation-location">Ville</div>
              <div class="accommodation-host">
                Hôte
                <q-icon name="star" size="sm" class="star-icon" />
              </div>
              <div class="rating">
                <div class="rating-dots">
                  <div class="dot" v-for="j in 4" :key="j"></div>
                </div>
              </div>
              <div class="price">Prix €€</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-links">
          <a href="#" class="footer-link">A propos de nous</a>
          <a href="#" class="footer-link">Notre assistance</a>
          <a href="#" class="footer-link">Nos conditions d'utilisation</a>
          <a href="#" class="footer-link">ECHOAWAY</a>
          <a href="#" class="footer-link">Nos tarifs</a>
          <a href="#" class="footer-link">Les avis</a>
          <a href="#" class="footer-link">En savoir plus sur l'éco-responsabilité</a>
        </div>
        <div class="footer-dots">
          <div class="dot" v-for="i in 5" :key="i"></div>
        </div>
        <div class="copyright">
          © 2025 Made by MLM with ❤️
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const searchLocation = ref('')
const searchType = ref('')

onMounted(() => {
  console.log('HomeView mounted')
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: #EDF6F9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.header {
  background-color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #006D77;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: #006D77;
  font-weight: 500;
}

.nav-link:hover {
  color: #83C5BE;
}

/* Styles pour router-link */
.nav a,
.nav router-link {
  text-decoration: none;
  color: #006D77;
  font-weight: 500;
}

.nav a:hover,
.nav router-link:hover {
  color: #83C5BE;
}

.login-btn {
  background-color: #006D77 !important;
  color: white !important;
}

/* Hero Section */
.hero-section {
  padding: 4rem 0;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #006D77;
}

.hero-description {
  font-size: 1.2rem;
  color: #E29578;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.feature-image {
  width: 100%;
  height: 200px;
  background-color: #83C5BE;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: #006D77;
}

/* Search Section */
.search-section {
  padding: 4rem 0;
  background-color: white;
}

.section-title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #006D77;
}

.search-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
}

.search-input {
  margin-bottom: 1rem;
}

.search-btn {
  background-color: #006D77 !important;
  color: white !important;
}

/* Accommodations Section */
.accommodations-section {
  padding: 4rem 0;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-subtitle {
  color: #E29578;
  font-style: italic;
  margin-top: 0.5rem;
}

.accommodations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.accommodation-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.accommodation-image {
  width: 100%;
  height: 150px;
  background-color: #83C5BE;
}

.accommodation-content {
  padding: 1rem;
}

.accommodation-location {
  font-weight: bold;
  color: #006D77;
  margin-bottom: 0.5rem;
}

.accommodation-host {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #E29578;
  margin-bottom: 0.5rem;
}

.star-icon {
  color: #ffd700;
}

.rating-dots {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ccc;
}

.price {
  font-weight: bold;
  color: #006D77;
}

/* Footer */
.footer {
  background-color: #006D77;
  color: white;
  padding: 2rem 0;
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.footer-link {
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
}

.footer-link:hover {
  text-decoration: underline;
}

.footer-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.footer-dots .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #FFDDD2;
}

.copyright {
  font-size: 0.8rem;
  color: #ccc;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav {
    gap: 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .accommodations-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  
  .footer-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
