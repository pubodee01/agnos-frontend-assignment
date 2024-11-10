import { Container } from "@/components";
import { PatientForm } from "@/components/form";
import React from "react";

export default function NewPatientPage() {
  return (
    <div className="w-full py-8">
      <Container className="flex justify-center">
        <PatientForm />
      </Container>
    </div>
  );
}
