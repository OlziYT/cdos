import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useCommitteeStore } from "../../stores/committee";
import { useThemeStore } from "../../stores/theme";
import "../../styles/AddressSearch.css";
import type { ClubFormData } from "../../types/club";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { TagInput } from "../ui/TagInput";
import { AddressSearch } from "./AddressSearch";
import { UploadCloud } from "lucide-react";

const AVAILABLE_SPORTS = [
  "Football",
  "Basketball",
  "Tennis",
  "Natation",
  "Athlétisme",
  "Judo",
  "Gymnastique",
  "Cyclisme",
  "Rugby",
  "Volleyball",
  "Handball",
  "Pétanque",
  "Badminton",
  "Escalade",
  "Karaté"
] as const;

const clubSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  committeeId: z.string().min(1, "Le comité est requis"),
  siret: z.string().length(14, "Le SIRET doit contenir exactement 14 chiffres"),
  rna: z.string().regex(/^W\d{9}$/, "Le RNA doit commencer par W suivi de 9 chiffres"),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().regex(/^0[1-9]\d{8}$/, "Numéro de téléphone invalide"),
  street: z.string().min(5, "L'adresse est requise"),
  city: z.string().min(2, "La ville est requise"),
  postalCode: z.string().regex(/^\d{5}$/, "Code postal invalide"),
  tags: z.array(z.string()).default([]),
  sport: z.string().min(1, "Le sport est requis"),
  handicapAccess: z.boolean().default(false),
  sportHealth: z.boolean().default(false),
});

interface ClubFormProps {
  onSubmit: (data: ClubFormData, image: File | null) => Promise<void>;
  isLoading: boolean;
  initialData?: ClubFormData;
  submitText?: string;
}

export const ClubForm = ({ onSubmit, isLoading, initialData, submitText = "Créer le club" }: ClubFormProps) => {
  const { committees, fetchCommittees } = useCommitteeStore();
  const { isDark } = useThemeStore();

  useEffect(() => {
    fetchCommittees();
  }, [fetchCommittees]);

  const {
    register,
    handleSubmit: handleSubmitReactHookForm,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClubFormData>({
    resolver: zodResolver(clubSchema),
    defaultValues: initialData,
  });

  const handleAddressSelect = (address: {
    street: string;
    city: string;
    postal_code: string;
    validated_address: string;
    raw_coordinates: { lat: string; lon: string };
  }) => {
    setValue("street", address.street, { shouldValidate: true });
    setValue("city", address.city, { shouldValidate: true });
    setValue("postalCode", address.postal_code, { shouldValidate: true });
  };

  const street = useWatch({ control, name: "street" });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.image_url || null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitForm = handleSubmitReactHookForm(async (data: ClubFormData) => {
    try {
      console.log("Données du formulaire avant soumission:", data);
      await onSubmit(data, selectedImage);
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
    }
  });

  return (
    <form onSubmit={onSubmitForm} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Input
          label="Nom du club"
          {...register("name")}
          error={errors.name?.message}
          isDark={isDark}
        />
        <Select
          label="Comité"
          {...register("committeeId")}
          error={errors.committeeId?.message}
          isDark={isDark}
        >
          <option value="">Sélectionnez un comité</option>
          {committees.map((committee) => (
            <option key={committee.id} value={committee.id}>
              {committee.name}
            </option>
          ))}
        </Select>
        <Input
          label="Numéro SIRET"
          {...register("siret")}
          error={errors.siret?.message}
          isDark={isDark}
        />
        <Input
          label="Numéro RNA"
          {...register("rna")}
          error={errors.rna?.message}
          isDark={isDark}
        />
        <Input
          label="Email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          isDark={isDark}
        />
        <Input
          label="Téléphone"
          {...register("phone")}
          error={errors.phone?.message}
          isDark={isDark}
        />
        <Select
          label="Sport"
          {...register("sport")}
          error={errors.sport?.message}
          isDark={isDark}
        >
          <option value="">Sélectionnez un sport</option>
          {AVAILABLE_SPORTS.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </Select>
        <div>
          <label
            className={`block text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Adresse
          </label>
          <AddressSearch
            onAddressSelect={handleAddressSelect}
            defaultValue={street}
            isDark={isDark}
          />
          {errors.street && (
            <p className="mt-1 text-sm text-red-600">{errors.street.message}</p>
          )}
        </div>
        <Input
          label="Ville"
          {...register("city")}
          error={errors.city?.message}
          isDark={isDark}
          readOnly
        />
        <Input
          label="Code postal"
          {...register("postalCode")}
          error={errors.postalCode?.message}
          isDark={isDark}
          readOnly
        />
        <div className="col-span-2">
          <TagInput
            name="tags"
            control={control}
            label="Mots-clés"
            error={errors.tags?.message}
            isDark={isDark}
          />
        </div>
        <div className="col-span-2">
          <label
            className={`block text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Image du club
          </label>
          <div
            className={`mt-2 flex justify-center rounded-lg border border-dashed ${
              isDark ? "border-gray-600" : "border-gray-900/25"
            } px-6 py-10`}
          >
            <div className="text-center">
              {previewUrl ? (
                <div className="mb-4">
                  <img
                    src={previewUrl}
                    alt="Aperçu"
                    className="mx-auto h-32 w-32 object-cover rounded-lg"
                  />
                </div>
              ) : (
                <UploadCloud
                  className={`mx-auto h-12 w-12 ${
                    isDark ? "text-gray-400" : "text-gray-300"
                  }`}
                />
              )}
              <div className="mt-4 flex text-sm leading-6">
                <label
                  htmlFor="club-image"
                  className={`relative cursor-pointer rounded-md font-semibold ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  } focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500`}
                >
                  <span>Choisir une image</span>
                  <input
                    id="club-image"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                <p
                  className={`pl-1 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  ou glisser-déposer
                </p>
              </div>
              <p
                className={`text-xs leading-5 ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                PNG, JPG, GIF jusqu'à 10MB
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div
          className={`flex items-center gap-3 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <Checkbox
            {...register("handicapAccess")}
            checked={watch("handicapAccess")}
            onChange={(e) => setValue("handicapAccess", e.target.checked)}
            label="Ce club dispose d'installations pour les personnes en situation de handicap"
            isDark={isDark}
          />
        </div>

        <div
          className={`flex items-center gap-3 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <Checkbox
            {...register("sportHealth")}
            checked={watch("sportHealth")}
            onChange={(e) => setValue("sportHealth", e.target.checked)}
            label="Ce club propose des programmes sport-santé"
            isDark={isDark}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="submit"
          disabled={isLoading}
          isLoading={isLoading}
          className="w-full sm:w-auto"
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
};
