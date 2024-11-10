import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/utils/supabase/types";

export type Patient = Database["public"]["Tables"]["patients"]["Row"];

export const getAllPatients = async (
  supabase: SupabaseClient
): Promise<PostgrestSingleResponse<Patient[]>> => {
  return await supabase.from("patients").select("*", { count: "exact" });
};

export type PatientPayload = Omit<Patient, "id" | "created_at" | "updated_at">;

export const createNewPatient = async (
  supabase: SupabaseClient,
  data: PatientPayload
): Promise<PostgrestSingleResponse<Patient[]>> => {
  return await supabase.from("patients").insert(data).select();
};
