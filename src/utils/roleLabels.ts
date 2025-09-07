// Utilitaires pour les libellés des rôles utilisateur

import type { User } from '../types/api'

export type UserRole = User['role']

export const roleLabels: Record<UserRole, string> = {
  visitor: 'Visiteur',
  guest: 'Voyageur',
  host: 'Hôte',
  admin: 'Administrateur',
}

/**
 * Convertit un rôle interne en libellé utilisateur
 * @param role - Le rôle interne (guest, host, etc.)
 * @returns Le libellé utilisateur (Voyageur, Hôte, etc.)
 */
export function getRoleLabel(role: UserRole | string): string {
  return roleLabels[role as UserRole] || role
}

/**
 * Convertit un libellé utilisateur en rôle interne
 * @param label - Le libellé utilisateur (Voyageur, Hôte, etc.)
 * @returns Le rôle interne (guest, host, etc.)
 */
export function getRoleFromLabel(label: string): UserRole | null {
  const entry = Object.entries(roleLabels).find(([, value]) => value === label)
  return entry ? (entry[0] as UserRole) : null
}
