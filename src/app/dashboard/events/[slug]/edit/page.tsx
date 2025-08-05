"use client";

import { format } from "date-fns";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CalendarIcon, Trash } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";

import TiptapRichtextEditor from "@/components/TiptapRichtextEditor";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { DateRange } from "react-day-picker";
import useEditEvent from "../_hooks/useEditEvent";
import { useGetEventBySlug } from "../_hooks/useGetEventsBySlug";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
  dateRange: Yup.object({
    from: Yup.date().required("Start date is required"),
    to: Yup.date().required("End date is required"),
  }),
  thumbnail: Yup.mixed().nullable(),
});

const EditEventPage = () => {
  const { slug } = useParams() as { slug: string };
  const { data: event, isLoading } = useGetEventBySlug(slug);
  const { mutateAsync: editEvent, isPending } = useEditEvent();

  const [previewImage, setPreviewImage] = useState<string>("");

  const handleThumbnailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFieldValue("thumbnail", file);
    }
  };

  const handleRemoveThumbnail = (
    setFieldValue: (field: string, value: any) => void,
  ) => {
    setPreviewImage("");
    setFieldValue("thumbnail", null);
  };

  if (isLoading || !event) return <p>Loading...</p>;

  return (
    <main className="container mx-auto mt-10 px-4 pb-20">
      <h1 className="mb-6 text-3xl font-bold text-orange-500">Edit Event</h1>

      <Formik
        initialValues={{
          title: event.title,
          category: event.category,
          location: event.location,
          description: event.description,
          dateRange: {
            from: new Date(event.startDate),
            to: new Date(event.endDate),
          },
          thumbnail: null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const startDate = values.dateRange.from?.toISOString() || "";
          const endDate = values.dateRange.to?.toISOString() || "";

          await editEvent({
            slug,
            title: values.title,
            category: values.category,
            location: values.location,
            description: values.description,
            startDate,
            endDate,
            thumbnail: values.thumbnail,
          });
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-1">
                  <Label>Title *</Label>
                  <Field name="title" as={Input} />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <Label>Category *</Label>
                  <Field
                    as="select"
                    name="category"
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option value="">Select category</option>
                    <option value="music">Music</option>
                    <option value="nightlife">Nightlife</option>
                    <option value="arts">Arts</option>
                    <option value="food">Food</option>
                    <option value="business">Business</option>
                    <option value="dating">Dating</option>
                  </Field>
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <Label>Location *</Label>
                  <Field
                    as="select"
                    name="location"
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option value="">Select location</option>
                    <option value="Jakarta">Jakarta</option>
                    <option value="Bandung">Bandung</option>
                    <option value="Surabaya">Surabaya</option>
                    <option value="Semarang">Semarang</option>
                    <option value="Makassar">Makassar</option>
                    <option value="Yogyakarta">Yogyakarta</option>
                    <option value="Bali">Bali</option>
                  </Field>
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Date Range */}
                <div className="space-y-1">
                  <Label>Date Range *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {values.dateRange.from && values.dateRange.to ? (
                          <span>
                            {format(values.dateRange.from, "MMM d, yyyy")} -{" "}
                            {format(values.dateRange.to, "MMM d, yyyy")}
                          </span>
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        initialFocus
                        mode="range"
                        selected={values.dateRange}
                        onSelect={(range: DateRange | undefined) =>
                          setFieldValue("dateRange", range)
                        }
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                  <ErrorMessage
                    name="dateRange"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
              </div>

              {/* Thumbnail + Description */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <Label>Thumbnail *</Label>
                  {previewImage || event.thumbnail ? (
                    <div className="relative w-fit">
                      <Image
                        src={previewImage || event.thumbnail}
                        alt="Preview"
                        width={300}
                        height={200}
                        className="rounded-md object-cover shadow-md"
                      />
                      <Button
                        size="icon"
                        type="button"
                        className="absolute -top-2 -right-2 bg-red-500 text-white shadow"
                        onClick={() => handleRemoveThumbnail(setFieldValue)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Input
                      type="file"
                      name="thumbnail"
                      accept="image/*"
                      onChange={(e) => handleThumbnailChange(e, setFieldValue)}
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <TiptapRichtextEditor
                    name="description"
                    label="Description *"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-orange-500 text-white"
              >
                {isPending ? "Saving..." : "Update Event"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default EditEventPage;
