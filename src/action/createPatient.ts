"use server";

import { createNewPatient, PatientPayload } from "@/utils/api/patients";
import { createClient } from "@/utils/supabase/server";

type Props = {
  payload: PatientPayload;
};

export default async function createPatient({ payload }: Props) {
  const supabase = await createClient();
  return await createNewPatient(supabase, payload);
}
