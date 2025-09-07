<template>
  <footer class="echoaway-footer">
    <div class="echoaway-footer-content">
      <div class="echoaway-footer-section">
        <h3>ECHOAWAY</h3>
        <p>
          Votre plateforme de référence pour découvrir des hébergements adaptés
          aux personnes électrosensibles.
        </p>
      </div>

      <div class="echoaway-footer-section">
        <h4>Navigation</h4>
        <ul>
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/accommodations">Hébergements</router-link></li>
          <li><a href="#">Loisirs</a></li>
        </ul>
      </div>

      <div class="echoaway-footer-section">
        <h4>À propos</h4>
        <ul>
          <li><a href="#">À propos de nous</a></li>
          <li><a href="#">Nous contacter</a></li>
          <li><a href="#">En savoir plus sur l'électrosensibilité</a></li>
        </ul>
      </div>

      <div class="echoaway-footer-section">
        <h4>Compte</h4>
        <ul>
          <li v-if="!authStore.isAuthenticated">
            <router-link to="/login">Connexion</router-link>
          </li>
          <li v-if="!authStore.isAuthenticated">
            <router-link to="/register">Inscription</router-link>
          </li>
          <li v-if="authStore.isAuthenticated">
            <router-link to="/profile">Mon profil</router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="echoaway-footer-bottom">
      <div class="echoaway-footer-bottom-content">
        <p>&copy; 2024 EchoAway. Tous droits réservés.</p>
        <div class="echoaway-social-links">
          <a href="#" aria-label="Facebook">
            <q-icon name="facebook" size="sm" />
          </a>
          <a href="#" aria-label="Instagram">
            <q-icon name="camera_alt" size="sm" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<!-- Styles sont maintenant dans src/styles/components/layout.css -->
