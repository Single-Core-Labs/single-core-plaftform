import { supabase } from '@/lib/supabase'

/**
 * Submits a Research Collective application to Supabase.
 *
 * @param {Object} formData - Raw form values from ApplicationFormSection.
 * @param {string} formData.fullName      - Applicant's full name (split into first/last internally).
 * @param {string} formData.email         - Applicant's email address.
 * @param {string} formData.researchArea  - Primary research track selected.
 * @param {string} [formData.affiliation] - Optional institutional affiliation.
 * @param {string} formData.statement     - Research interests and motivation.
 * @param {string} [formData.link]        - Optional link to work (GitHub, Scholar, etc.).
 *
 * @returns {Promise<{ error: string | null }>}
 *   Resolves with `{ error: null }` on success, or `{ error: <message> }` on failure.
 */
export async function submitResearchApplication(formData) {
  if (!supabase) {
    return { error: 'Database is not configured. Please contact support.' }
  }

  const trimmedName = formData.fullName.trim()
  const nameParts = trimmedName.split(' ')

  const payload = {
    first_name: nameParts[0] || '',
    last_name: nameParts.slice(1).join(' ') || '',
    email: formData.email,
    research_area: formData.researchArea,
    affiliation: formData.affiliation || null,
    statement: formData.statement,
    work_link: formData.link || null,
  }

  const { error } = await supabase
    .from('research_collective_applications')
    .insert([payload])

  if (error) {
    console.error('[researchCollective] Insert error:', error)
    return { error: 'Something went wrong. Please try again.' }
  }

  return { error: null }
}
