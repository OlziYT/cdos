import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kfaxblzyenmpmohwppor.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmYXhibHp5ZW5tcG1vaHdwcG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM0ODY2MDAsImV4cCI6MjA0OTA2MjYwMH0.qGXQo0g5WBj_6JKdnpnEkRjjerEsqkbOT_yjdDY6Hpo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createAdminUser() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@cdos81.fr',
    password: 'Admin123!',
    options: {
      data: {
        role: 'super_admin'
      }
    }
  });

  if (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error.message);
    return;
  }

  console.log('Utilisateur créé avec succès:', data);
}

createAdminUser();
