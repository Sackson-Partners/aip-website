import { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import bcrypt from 'bcryptjs';

export const useRegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // Min 8 chars, at least one uppercase, at least one number
    const re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
  };

  const registerUser = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { fullName, email, password, company, phone } = formData;

    // 1. Basic Validation
    if (!fullName || fullName.length < 2) {
      setError('Full Name must be at least 2 characters.');
      setLoading(false);
      return false;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return false;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long and contain at least one uppercase letter and one number.');
      setLoading(false);
      return false;
    }

    try {
      // 2. Check for existing email in custom table
      const { data: existingUsers, error: checkError } = await supabase
        .from('registrations')
        .select('email')
        .eq('email', email)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingUsers) {
        setError('This email is already registered. Please log in or use a different email.');
        setLoading(false);
        return false;
      }

      // 3. Hash Password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // 4. Insert into Supabase
      const { error: insertError } = await supabase
        .from('registrations')
        .insert([
          {
            full_name: fullName,
            email: email,
            password_hash: passwordHash,
            company: company || null,
            phone: phone || null,
            updated_at: new Date().toISOString()
          }
        ]);

      if (insertError) throw insertError;

      setSuccess(true);
      return true;

    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'An unexpected error occurred during registration.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return {
    registerUser,
    loading,
    error,
    success,
    validateEmail,
    validatePassword,
    resetForm
  };
};