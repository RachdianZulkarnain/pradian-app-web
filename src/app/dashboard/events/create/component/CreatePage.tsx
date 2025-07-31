"use client";

import TiptapRichtextEditor from "@/components/TiptapRichtextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Trash } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import * as Yup from "yup";
import useCreateEvent from "../_hooks/useCreateEvent";


const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  location: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  content: Yup.string().required("Content is required"),
  thumbnail: Yup.mixed().nullable().required("Thumbnail is required"),
});

const CreateEventPage = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  const onChangeThumbnail = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (Field: string, value: any) => void,
  ) => {
    const files = e.target.files;

    if (files && files.length) {
      setSelectedImage(URL.createObjectURL(files[0]));
      setFieldValue("thumbnail", files[0]);
    }
  };

  const removeThumbnail = (
    setFieldValue: (Field: string, value: any) => void,
  ) => {
    setSelectedImage("");
    setFieldValue("thumbnail", null);
  };

  const { mutateAsync: createEvent, isPending } = useCreateEvent();

  return (
    <main className="container mx-auto px-4 pb-20">
      <Formik
        initialValues={{
          title: "",
          description: "",
          content: "",
          category: "",
          location:"",
          thumbnail: null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await createEvent(values);
        }}
        // uploud thumbnailnya dulu ke file storage
        // masukan data blog ke database
        // respons body-> {fileURL: string, filepath:string}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <div className="flex flex-col gap-6">
              {/* TITLE */}
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Field
                  name="title"
                  as={Input}
                  type="text"
                  placeholder="Title"
                />
                <ErrorMessage
                  name="title"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
              {/* CATEGORY */}
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Field
                  name="category"
                  as={Input}
                  type="text"
                  placeholder="Category"
                />
                <ErrorMessage
                  name="category"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
              {/* DESCRIPTION */}
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Field
                  name="description"
                  as={Textarea}
                  placeholder="Description"
                  style={{ resize: "none" }}
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              {/* CONTENT */}
              <TiptapRichtextEditor label="Content" name="content" />

              {/* THUMBNAIL */}
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
                    {" "}
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
                {isPending ? "Loading" : "Submit"} ;
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default CreateEventPage;
