"use client";

import { ChangeEvent, useState } from "react";
import { useUpdateProfile } from "./_hooks/useUpdateProfile";
import { Button } from "@/components/ui/button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useGetProfile } from "../_hooks/useGetProfile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Trash } from "lucide-react";

const EditProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  const onChangeThumbnail = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const files = e.target.files;

    if (files && files.length) {
      setSelectedImage(URL.createObjectURL(files[0]));
      setFieldValue("pictureProfile", files[0]);
    }
  };

  const removeThumbnail = (
    setFieldValue: (field: string, value: any) => void,
  ) => {
    setSelectedImage("");
    setFieldValue("pictureProfile", null);
  };

  const { mutateAsync: updateProfile, isPending } = useUpdateProfile();

  const { data: user, isLoading } = useGetProfile();

  return (
    <main className="container mx-auto px-4 pb-20">
      <Formik
        initialValues={{
          name: user?.name || "",
          pictureProfile: null,
        }}
        enableReinitialize
        onSubmit={async (values) => {
          await updateProfile(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <div className="flex flex-col gap-6">
              {/* name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Field
                  name="name"
                  as={Input}
                  type="text"
                  placeholder="your name"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
              {/* PROFILE PICTURE */}
              {selectedImage ? (
                <div className="relative w-fit">
                  <Image
                    src={selectedImage}
                    alt="thumbnail"
                    width={200}
                    height={150}
                    className="object-cover"
                  />
                  <Button
                    size="icon"
                    className="absolute -top-2 -right-2 rounded-full bg-red-500"
                    onClick={() => removeThumbnail(setFieldValue)}
                  >
                    <Trash />
                  </Button>
                </div>
              ) : (
                <div className="grid gap-2">
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <Input
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(e) => onChangeThumbnail(e, setFieldValue)}
                  />
                  <ErrorMessage
                    name="thumbnail"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading" : "Submit"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default EditProfilePage;
