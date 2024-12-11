-- Insérer un utilisateur admin dans auth.users
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
)
VALUES (
    '00000000-0000-0000-0000-000000000000',  -- instance_id par défaut
    gen_random_uuid(),                        -- id unique
    'authenticated',                          -- aud
    'authenticated',                          -- role
    'admin@cdos81.fr',                       -- email
    crypt('Admin123!', gen_salt('bf')),      -- mot de passe crypté
    NOW(),                                   -- email confirmé
    NOW(),                                   -- recovery sent
    NOW(),                                   -- dernier login
    '{"provider":"email","providers":["email"]}',  -- app metadata
    '{"role":"super_admin"}',                -- user metadata
    NOW(),                                   -- created_at
    NOW()                                    -- updated_at
);
