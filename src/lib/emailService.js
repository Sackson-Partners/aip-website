import { supabase } from '@/lib/customSupabaseClient';

/**
 * Validates email configuration format.
 * Note: Client-side code cannot directly verify Supabase SMTP settings. 
 * This validation checks the email format integrity.
 * Actual SMTP verification happens during the send attempt via the backend/Supabase Auth.
 * 
 * @param {string} email 
 * @returns {boolean}
 */
export const validateEmailConfig = (email) => {
  if (!email) return false;
  // robust email regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Sends a confirmation email via Supabase Edge Function with retry logic.
 * 
 * @param {Object} params
 * @param {string} params.email - Recipient email
 * @param {string} params.name - Recipient name
 * @param {string} params.formType - Type of form submitted (e.g., 'contact', 'registration', 'demo')
 * @returns {Promise<{success: boolean, error?: any}>}
 */
export async function sendConfirmationEmail({ email, name, formType }) {
  if (!validateEmailConfig(email)) {
    return { success: false, error: new Error("Invalid email format provided.") };
  }

  const MAX_RETRIES = 2;
  const RETRY_DELAY = 1000; // 1 second

  let attempt = 0;

  while (attempt <= MAX_RETRIES) {
    try {
      const { data, error } = await supabase.functions.invoke('send-confirmation-email', {
        body: { email, name, formType }
      });

      if (error) {
        console.warn(`Edge function invocation failed (Attempt ${attempt + 1}):`, error);
        throw error;
      }
      
      return { success: true, data };
    } catch (error) {
      console.error(`Email send attempt ${attempt + 1} failed:`, error);
      
      attempt++;
      
      if (attempt > MAX_RETRIES) {
        // Return a structured error that the UI can handle gracefully
        return { 
          success: false, 
          error: error.message || "Failed to send confirmation email. The email service may be temporarily unavailable." 
        };
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
}