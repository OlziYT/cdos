import { supabase } from "../lib/supabase";
import { Club, ClubFormData } from "../types/club";

export const fetchClubs = async (): Promise<Club[]> => {
  try {
    const { data, error } = await supabase
      .from("clubs")
      .select(`
        id,
        name,
        committee_id,
        siret,
        rna,
        email,
        phone,
        street,
        city,
        postal_code,
        tags,
        sports,
        handicap_access,
        sport_health,
        image_url,
        raw_coordinates,
        location_json,
        committee:committees(name)
      `);

    if (error) {
      console.error("Erreur Supabase:", error);
      throw error;
    }

    const clubs =
      data?.map((club) => {
        // Si on a des raw_coordinates, on les utilise pour créer location_json
        if (club.raw_coordinates) {
          const coords = club.raw_coordinates.split(',').map(Number);
          club.location_json = {
            type: "Point",
            coordinates: [coords[1], coords[0]] // [longitude, latitude]
          };
        }
        
        return {
          ...club,
          location: club.location_json || null,
        };
      }) || [];

    console.log("Clubs transformés:", clubs);

    return clubs;
  } catch (error) {
    console.error("Erreur lors de la récupération des clubs:", error);
    return [];
  }
};

export const uploadClubImage = async (file: File): Promise<string | null> => {
  try {
    // Vérifier l'authentification
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.error('Erreur d\'authentification:', authError);
      return null;
    }
    if (!session) {
      console.error('Utilisateur non authentifié');
      return null;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    console.log('Tentative d\'upload:', {
      bucket: 'club_image',
      filePath,
      fileType: file.type,
      fileSize: file.size
    });

    // Upload du fichier
    const { error: uploadError } = await supabase.storage
      .from('club_image')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });

    if (uploadError) {
      console.error('Erreur détaillée lors de l\'upload:', uploadError);
      return null;
    }

    // Récupération de l'URL publique
    const { data } = await supabase.storage
      .from('club_image')
      .getPublicUrl(filePath);

    console.log("URL publique générée:", data.publicUrl);
    
    return data.publicUrl;
  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image:', error);
    return null;
  }
};

export const createClub = async (clubData: ClubFormData, image?: File): Promise<Club | null> => {
  try {
    console.log("Début de la création du club avec les données:", clubData);
    
    let imageUrl = null;
    if (image) {
      console.log("Upload de l'image en cours...");
      imageUrl = await uploadClubImage(image);
      if (!imageUrl) {
        console.error("Erreur: L'upload de l'image a échoué");
        return null;
      }
      console.log("Image uploadée avec succès, URL:", imageUrl);
    }

    const clubToCreate = {
      name: clubData.name,
      committee_id: clubData.committeeId,
      siret: clubData.siret,
      rna: clubData.rna,
      email: clubData.email,
      phone: clubData.phone,
      street: clubData.street,
      city: clubData.city,
      postal_code: clubData.postalCode,
      tags: clubData.tags || [],
      sports: clubData.sports ? [clubData.sports] : [], // Convertir en tableau et filtrer les valeurs vides
      handicap_access: clubData.handicapAccess,
      sport_health: clubData.sportHealth,
      image_url: imageUrl,
      raw_coordinates: clubData.raw_coordinates,
    };

    console.log("Tentative d'insertion dans la base de données:", clubToCreate);

    const { data, error } = await supabase
      .from('clubs')
      .insert([clubToCreate])
      .select()
      .single();

    if (error) {
      console.error('Erreur Supabase détaillée:', error);
      return null;
    }
    
    console.log("Club créé avec succès:", data);
    return data;
  } catch (error) {
    console.error('Erreur détaillée lors de la création du club:', error);
    return null;
  }
};

const extractImageFilename = (imageUrl: string): string | null => {
  try {
    // L'URL est de la forme : https://voxjkvqcrpaqjqxnvnry.supabase.co/storage/v1/object/public/club_image/[filename]
    const url = new URL(imageUrl);
    const pathname = url.pathname;
    const parts = pathname.split('/');
    // Le dernier segment est le nom du fichier
    return parts[parts.length - 1];
  } catch (error) {
    console.error("Erreur lors de l'extraction du nom de fichier:", error);
    return null;
  }
};

export const updateClub = async (
  id: string,
  clubData: ClubFormData,
  image?: File | null
): Promise<Club | null> => {
  try {
    let imageUrl = clubData.image_url;

    // Si l'image a été supprimée (image_url est null) et qu'il y avait une ancienne image
    if (clubData.image_url === null) {
      // Récupérer l'ancienne URL de l'image
      const { data: oldClub } = await supabase
        .from("clubs")
        .select("image_url")
        .eq("id", id)
        .single();

      if (oldClub?.image_url) {
        // Supprimer l'ancienne image du stockage
        const filename = extractImageFilename(oldClub.image_url);
        if (filename) {
          const { error: storageError } = await supabase.storage
            .from("club_image")
            .remove([filename]);

          if (storageError) {
            console.error("Erreur lors de la suppression de l'image:", storageError);
          }
        }
      }
    }

    // Si une nouvelle image est fournie, la télécharger
    if (image) {
      imageUrl = await uploadClubImage(image);
    }

    const { data, error } = await supabase
      .from("clubs")
      .update({
        name: clubData.name,
        committee_id: clubData.committeeId,
        siret: clubData.siret,
        rna: clubData.rna,
        email: clubData.email,
        phone: clubData.phone,
        street: clubData.street,
        city: clubData.city,
        postal_code: clubData.postalCode,
        tags: clubData.tags || [],
        sports: [clubData.sports].filter(Boolean),
        handicap_access: clubData.handicapAccess,
        sport_health: clubData.sportHealth,
        image_url: imageUrl,
        raw_coordinates: clubData.raw_coordinates,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du club:", error);
    throw error;
  }
};

export const deleteClub = async (id: string): Promise<void> => {
  try {
    // 1. Récupérer l'URL de l'image du club
    const { data: club, error: fetchError } = await supabase
      .from("clubs")
      .select("image_url")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    // 2. Si le club a une image, la supprimer du stockage
    if (club?.image_url) {
      const filename = extractImageFilename(club.image_url);
      if (filename) {
        const { error: storageError } = await supabase.storage
          .from("club_image")
          .remove([filename]);

        if (storageError) {
          console.error("Erreur lors de la suppression de l'image:", storageError);
        }
      }
    }

    // 3. Supprimer le club de la base de données
    const { error: deleteError } = await supabase
      .from("clubs")
      .delete()
      .eq("id", id);

    if (deleteError) throw deleteError;
  } catch (error) {
    console.error("Erreur lors de la suppression du club:", error);
    throw error;
  }
};
