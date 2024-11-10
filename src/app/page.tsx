import { Container, DataTable } from "@/components";
import { Button } from "@/components/ui/button";
import { getAllPatients } from "@/utils/api/patients";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const { data: patients } = await getAllPatients(supabase);

  return (
    <div className="w-full flex flex-col gap-y-12 py-8">
      <Container>
        <div className="w-full flex max-sm:flex-col max-sm:gap-y-4 sm:justify-between">
          <h1>Patient List</h1>
          <Button asChild variant="outline">
            <Link href="/patient/new">New Patient</Link>
          </Button>
        </div>
      </Container>
      <Container>
        <div className="w-full flex flex-col gap-y-8 bg-white p-8 rounded-md">
          <DataTable patients={patients ?? []} />
        </div>
      </Container>
    </div>
  );
}
