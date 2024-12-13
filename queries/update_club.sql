UPDATE clubs 
SET location = geocode_address(street || ', ' || city || ' ' || postal_code)
WHERE id = 'f00c733d-ff46-4685-908e-b288edc4b367'; 