'use client';

import React, { ReactNode, useEffect, useState, createContext } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import {
  supabase as publicSupabase,
  createSupabaseClientWithAuth,
} from '@/lib/supabaseClient';
import type { SupabaseClient } from '@supabase/supabase-js';

// Context om de geauthenticeerde Supabase client door te geven
export const SupabaseContext = createContext<SupabaseClient>(publicSupabase);

type ProvidersProps = { children: ReactNode };

export default function Providers({ children }: ProvidersProps) {
  const { getToken, isLoaded: authLoaded } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const [db, setDb] = useState<SupabaseClient>(publicSupabase);

  // providers.tsx
useEffect(() => {
  if (!authLoaded || !userLoaded) return;

  const setupSupabaseClient = async () => {
    try {
      const token = await getToken({ template: 'supabase' });
      if (!token) return;

      const authenticatedClient = createSupabaseClientWithAuth(token);
      setDb(authenticatedClient);

      if (user) {
        // Check for existing profile
        const { data: profile, error: selectError } = await authenticatedClient
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .maybeSingle();

        if (selectError) {
          console.error('Profile check error:', selectError);
          return;
        }
        
        // Create profile if missing
        if (!profile) {
          const { error: insertError } = await authenticatedClient
            .from('profiles')
            .insert({
              id: user.id,
              email: user.primaryEmailAddress?.emailAddress || '',
              full_name: user.fullName || null
            });

          if (insertError) {
            console.error('Profile creation failed:', insertError);
          } else {
            console.log('Profile created successfully');
          }
        }
      }
    } catch (error) {
      console.error('Authentication flow error:', error);
    }
  };

  setupSupabaseClient();
}, [authLoaded, userLoaded, user, getToken]);


  return (
    <SupabaseContext.Provider value={db}>
      {children}
    </SupabaseContext.Provider>
  );
}