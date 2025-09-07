<template>
  <div class="accommodation-card">
    <div class="accommodation-image">
      <img
        v-if="accommodation.image"
        :src="accommodation.image"
        :alt="accommodation.title || accommodation.location"
        loading="lazy"
      />
      <div v-else class="placeholder"></div>
    </div>
    <div class="accommodation-content">
      <div class="accommodation-location">{{ accommodation.location }}</div>
      <div class="accommodation-host">
        <span>{{ accommodation.host }}</span>
        <q-icon
          v-if="accommodation.isFavorite"
          name="star"
          class="star-icon"
          size="sm"
        />
      </div>
      <div class="rating-dots">
        <div
          v-for="i in accommodation.rating"
          :key="`filled-${i}`"
          class="dot filled"
        ></div>
        <div
          v-for="i in 5 - accommodation.rating"
          :key="`empty-${i}`"
          class="dot"
        ></div>
      </div>
      <div class="price">
        {{ accommodation.minPrice }}€ - {{ accommodation.maxPrice }}€/nuit
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Accommodation {
  id?: string
  title?: string
  location: string
  host: string
  rating: number
  minPrice: number
  maxPrice: number
  image?: string
  isFavorite?: boolean
}

interface Props {
  accommodation: Accommodation
}

defineProps<Props>()
</script>

<style scoped>
.accommodation-card {
  background: white;
  border-radius: var(--border-radius-organic);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  transition: var(--transition-organic);
  cursor: pointer;
}

.accommodation-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-gentle);
}

.accommodation-image {
  width: 100%;
  height: 150px;
  position: relative;
  overflow: hidden;
}

.accommodation-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  width: 100%;
  height: 100%;
  background-color: var(--echoaway-warm);
}

.accommodation-content {
  padding: 1rem;
}

.accommodation-location {
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--echoaway-accent);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.accommodation-host {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--echoaway-primary);
  margin-bottom: 0.5rem;
  font-family: var(--font-body);
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

.dot.filled {
  background-color: var(--echoaway-accent);
}

.price {
  font-family: var(--font-body);
  font-weight: 600;
  color: var(--echoaway-accent);
  font-size: 1.1rem;
}
</style>
