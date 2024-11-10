"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Patient } from "@/utils/api/patients";
import { createClient } from "@/utils/supabase/client";

type TableProps = {
  patients: Patient[];
};

export const DataTable = ({ patients }: TableProps) => {
  const supabase = createClient();
  const [showPatients, setShowPatients] = React.useState<Patient[]>(patients);

  React.useEffect(() => {
    const subscribe = supabase
      .channel("patient-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "patients" },
        (payload) => {
          setShowPatients((prev) => [...prev, payload.new as Patient]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscribe);
    };
  }, [supabase]);

  return (
    <div className="rounded-md border">
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Middle Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Preferred Language</TableHead>
            <TableHead>Nationality</TableHead>
            <TableHead>EmergencyContact</TableHead>
            <TableHead>Religion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {showPatients.map((patient) => (
            <TableRow key={`patient-${patient.id}`}>
              <TableCell className="whitespace-nowrap">
                {patient.firstname}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {patient.middlename}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {patient.lastname}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {patient.date_of_birth}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {patient.gender}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {patient.phone}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {patient.email}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {patient.address}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {patient.preferred_language}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {patient.nationality}
              </TableCell>
              <TableCell>
                <div className="w-full flex flex-col gap-y-2"></div>
                <span className="whitespace-nowrap flex gap-x-1">
                  <p className="font-semibold">name:</p>
                  <p>{patient.emergency_contact_name}</p>
                </span>
                <span className="whitespace-nowrap flex gap-x-1">
                  <p className="font-semibold">PhoneNo:</p>
                  <p>{patient.emergency_contact_phone}</p>
                </span>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {patient.religion}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
