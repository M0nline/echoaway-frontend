<template>
  <section class="profile-header">
    <div class="container">
      <div class="profile-header-content">
        <!-- Avatar -->
        <div class="profile-avatar">
          <q-avatar size="120px" class="profile-avatar-img">
            <img v-if="user?.avatar" :src="user.avatar" alt="Avatar" />
            <q-icon v-else name="person" size="80px" color="grey-4" />
          </q-avatar>
        </div>

        <!-- Informations principales -->
        <div class="profile-info">
          <h1 class="profile-name">{{ fullName }}</h1>
          <div class="profile-meta">
            <span class="profile-role">
              <q-chip
                :color="roleColor"
                text-color="white"
                :icon="roleIcon"
                class="profile-role-chip"
              >
                {{ roleLabel }}
              </q-chip>
            </span>
            <span class="profile-date">
              Membre depuis le {{ memberSince }}
            </span>
          </div>
        </div>

        <!-- Actions rapides -->
        <div class="profile-actions">
          <q-btn
            color="primary"
            label="Modifier le profil"
            icon="edit"
            outline
            @click="$emit('edit-profile')"
          />
          <q-btn
            color="negative"
            label="Se déconnecter"
            icon="logout"
            outline
            @click="$emit('logout')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { getRoleLabel } from '../../utils/roleLabels'

// Props et emits
defineEmits<{
  'edit-profile': []
  logout: []
}>()

// Store
const authStore = useAuthStore()

// Computed
const user = computed(() => authStore.user)

const fullName = computed(() => {
  if (!user.value) return 'Utilisateur'
  const firstname = user.value.firstname || ''
  const name = user.value.name || ''
  return `${firstname} ${name}`.trim() || 'Utilisateur'
})

const roleLabel = computed(() => {
  const role = user.value?.role || 'visitor'
  return getRoleLabel(role)
})

const roleColor = computed(() => {
  const role = user.value?.role || 'visitor'
  return role === 'host' ? 'secondary' : 'primary'
})

const roleIcon = computed(() => {
  const role = user.value?.role || 'visitor'
  return role === 'host' ? 'home' : 'person'
})

const memberSince = computed(() => {
  if (!user.value?.createdAt) return 'N/A'
  return new Date(user.value.createdAt).toLocaleDateString('fr-FR')
})
</script>

<style scoped>
.profile-header {
  padding: 3rem 0;
  background: var(--echoaway-white);
  border-bottom: 1px solid rgba(226, 149, 120, 0.1);
}

.profile-header-content {
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.profile-avatar {
  flex-shrink: 0;
}

.profile-avatar-img {
  border: 4px solid var(--echoaway-white);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.profile-name {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--echoaway-dark);
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.profile-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.profile-role-chip {
  align-self: flex-start;
}

.profile-date {
  font-size: 0.95rem;
  color: var(--echoaway-dark);
}

.profile-actions {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-header {
    padding: 2rem 0;
  }

  .profile-header-content {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .profile-name {
    font-size: 2rem;
  }

  .profile-meta {
    align-items: center;
  }

  .profile-role-chip {
    align-self: center;
  }
}
</style>
