import { aipApi } from '@/lib/aipApi';

/**
 * Wrapper for fetching sector projects.
 * Maintained for backward compatibility.
 * 
 * @param {string} sectorSlug - The URL slug for the sector
 * @returns {Promise<Array>} - Array of transformed project objects
 */
export const fetchSectorProjects = async (sectorSlug) => {
  return await aipApi.fetchProjectsBySector(sectorSlug);
};