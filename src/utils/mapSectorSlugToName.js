/**
 * Maps URL-friendly sector slugs to their full display names/API parameter names.
 * @param {string} slug - The sector slug (e.g., 'energy', 'tmt')
 * @returns {string} The full sector name
 */
export const mapSectorSlugToName = (slug) => {
  const map = {
    'energy': "Energy",
    'water': "Water & Sanitation",
    'transport': "Transport, Logistics & Real Assets",
    'healthcare': "Healthcare",
    'tmt': "TMT (Digital & Connectivity)",
    'agriculture': "Agriculture & Food Systems"
  };

  return map[slug.toLowerCase()] || slug.charAt(0).toUpperCase() + slug.slice(1);
};