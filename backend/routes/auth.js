import express from 'express';
import bcrypt from 'bcryptjs';

export default function authRouter(supabase) {
  const router = express.Router();

  router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            referral_code: 'REF' + Math.random().toString(36).substring(7),
          },
        },
      });

      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const { error: insertError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            name,
            email,
            referral_code: 'REF' + Math.random().toString(36).substring(7),
            available_balance: 0,
          },
        ]);

      if (insertError) {
        return res.status(400).json({ message: insertError.message });
      }

      res.status(201).json({ message: 'User registered' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return res.status(400).json({ message: error.message });
      }

      const { data: userData } = await supabase
        .from('users')
        .select('name, email, referral_code')
        .eq('id', data.user.id)
        .maybeSingle();

      res.json({
        token: data.session.access_token,
        user: userData || { name: '', email },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  return router;
}
