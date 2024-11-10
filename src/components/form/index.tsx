"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as v from "valibot";
import { DatePicker, SingleSelect } from "@/components";
import { useState } from "react";
import { PatientPayload } from "@/utils/api/patients";
import createPatient from "@/action/createPatient";

const FormSchema = v.object({
  firstName: v.pipe(v.string(), v.nonEmpty("Please enter your first name.")),
  middleName: v.optional(v.string()),
  lastName: v.pipe(v.string(), v.nonEmpty("Please enter your last name.")),
  gender: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your gender."),
    v.picklist(["male", "female"])
  ),
  dateOfBirth: v.pipe(
    v.date(),
    v.maxValue(new Date(), "Date of birth should not more than or equal today")
  ),
  phone: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your phone Number."),
    v.regex(/^(?!.*--).*$/, "Consecutive hyphens are not allowed."),
    v.startsWith("0", "Phone number must start with 0"),
    v.rawTransform(({ dataset }) => dataset.value.replace(/[^\d]/g, "")),
    v.minLength(10, "Phone number must be at least 10 characters")
  ),
  email: v.pipe(v.string(), v.nonEmpty("Please enter your email."), v.email()),
  address: v.pipe(v.string(), v.nonEmpty("Please enter your address.")),
  preferredLanguage: v.pipe(
    v.string(),
    v.nonEmpty("Please enter your preferred language.")
  ),
  nationality: v.pipe(v.string(), v.nonEmpty("Please enter your nationality.")),
  emergencyContact: v.object({
    name: v.pipe(
      v.string(),
      v.nonEmpty("Please enter your emergency contact name.")
    ),
    phone: v.pipe(
      v.string(),
      v.nonEmpty("Please enter your emergency contact phone number."),
      v.regex(/^(?!.*--).*$/, "Consecutive hyphens are not allowed."),
      v.startsWith("0", "Phone number must start with 0"),
      v.rawTransform(({ dataset }) => dataset.value.replace(/[^\d]/g, "")),
      v.minLength(10, "Phone number must be at least 10 characters")
    ),
  }),
  religion: v.optional(v.string()),
});

type PatientFormData = v.InferOutput<typeof FormSchema>;

export function PatientForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<PatientFormData>({
    resolver: valibotResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      gender: "male",
      phone: "",
      email: "",
      address: "",
      preferredLanguage: "",
      nationality: "",
      emergencyContact: {
        name: "",
        phone: "",
      },
    },
  });

  async function onSubmit(data: PatientFormData) {
    setIsSubmitting(true);
    const payload: PatientPayload = {
      address: data.address,
      date_of_birth: data.dateOfBirth.toISOString(),
      email: data.email,
      emergency_contact_name: data.emergencyContact.name,
      emergency_contact_phone: data.emergencyContact.phone,
      firstname: data.firstName,
      middlename: data.middleName,
      lastname: data.lastName,
      gender: data.gender,
      phone: data.phone,
      preferred_language: data.preferredLanguage,
      nationality: data.nationality,
      religion: data.religion,
    };
    const { error } = await createPatient({ payload });
    console.log(error, "error");

    setIsSubmitting(false);

    toast({
      variant: error ? "destructive" : "default",
      title: error
        ? "Something went wrong"
        : "Success, create new patient successful",
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-3xl space-y-6 border border-black rounded-md p-6 bg-white"
      >
        <h2>New Patient Form</h2>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input data-error={!!fieldState.error} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="middleName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input data-error={!!fieldState.error} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input data-error={!!fieldState.error} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value}
                  setDate={field.onChange}
                  data-error={!!fieldState.error}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <SingleSelect
                  data-error={!!fieldState.error}
                  options={[
                    {
                      label: "Male",
                      value: "male",
                    },
                    {
                      label: "Female",
                      value: "female",
                    },
                  ]}
                  onValueChange={(value) => field.onChange(value)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Phone No.</FormLabel>
              <FormControl>
                <Input data-error={!!fieldState.error} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input data-error={!!fieldState.error} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input data-error={!!fieldState.error} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferredLanguage"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Preferred Language</FormLabel>
              <FormControl>
                <SingleSelect
                  data-error={!!fieldState.error}
                  options={[
                    {
                      label: "English",
                      value: "eng",
                    },
                    {
                      label: "Thai",
                      value: "th",
                    },
                  ]}
                  onValueChange={(value) => field.onChange(value)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nationality"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input data-error={!!fieldState.error} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="religion"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Religion</FormLabel>
              <FormControl>
                <Input data-error={!!fieldState.error} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h3>Emergency Contact</h3>

        <FormField
          control={form.control}
          name="emergencyContact.name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input data-error={!!fieldState.error} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emergencyContact.phone"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Phone No.</FormLabel>
              <FormControl>
                <Input data-error={!!fieldState.error} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
