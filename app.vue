<template>
  <div>
    <header>
      <h1>EchoAway 🌍</h1>
      <nav>
        <NuxtLink to="/">Accueil</NuxtLink> |
        <NuxtLink to="/about">À propos</NuxtLink> |
        <NuxtLink to="/contact">Contact</NuxtLink>
      </nav>
    </header>
    <main>
      <NuxtPage />
      <!-- Injecte la page en cours -->
    </main>
  </div>
</template>
