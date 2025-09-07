<template>
  <div class="feature-card">
    <div class="feature-image">
      <img
        v-if="feature.image"
        :src="feature.image"
        :alt="feature.title"
        loading="lazy"
      />
      <div v-else class="placeholder"></div>
    </div>
    <h3>{{ feature.title }}</h3>
    <p v-if="feature.description" class="feature-description">
      {{ feature.description }}
    </p>
    <q-btn
      :color="feature.buttonColor || 'primary'"
      :label="feature.buttonText || 'Découvrir'"
      flat
      class="feature-btn"
      @click="handleClick"
    />
  </div>
</template>

<script setup lang="ts">
interface Feature {
  id?: string
  title: string
  description?: string
  image?: string
  buttonText?: string
  buttonColor?: string
  action?: () => void
}

interface Props {
  feature: Feature
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [feature: Feature]
}>()

const handleClick = () => {
  if (props.feature.action) {
    props.feature.action()
  }
  emit('click', props.feature)
}
</script>

<style scoped>
.feature-card {
  padding: 2rem;
  background: white;
  border-radius: var(--border-radius-organic);
  box-shadow: var(--shadow-soft);
  text-align: center;
  transition: var(--transition-organic);
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-gentle);
}

.feature-image {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-soft);
  margin-bottom: 1rem;
}

.feature-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  width: 100%;
  height: 100%;
  background-color: var(--echoaway-warm);
}

.feature-card h3 {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--echoaway-accent);
  margin-bottom: 1rem;
  line-height: 1.3;
}

.feature-description {
  font-family: var(--font-body);
  color: var(--echoaway-dark);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.feature-btn {
  font-family: var(--font-body);
  font-weight: 500;
  text-transform: none;
  border-radius: var(--border-radius-soft);
  padding: 0.5rem 1.5rem;
  transition: var(--transition-organic);
}

.feature-btn:hover {
  transform: translateY(-1px);
}
</style>
