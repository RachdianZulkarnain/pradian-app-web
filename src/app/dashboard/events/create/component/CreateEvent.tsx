"use client";

import { useState, ChangeEvent } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { Trash, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TiptapRichtextEditor from "@/components/TiptapRichtextEditor";
import useCreateEvent from "../_hooks/useCreateEvent";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface FormValues {
  title: string;
  category: string;
  location: string;
  description: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  thumbnail: File | null;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
  dateRange: Yup.object({
    from: Yup.date().required("Start date is required"),
    to: Yup.date().required("End date is required"),
  }).required("Date range is required"),
  thumbnail: Yup.mixed().required("Thumbnail is required"),
});

const CreateEvent = () => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const { mutateAsync: createEvent, isPending } = useCreateEvent();

  const handleThumbnailChange = (
    e: ChangeEvent<HTMLInputElement>,
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

  return (
    <main className="container mx-auto mt-10 px-4 pb-20">
      <h1 className="mb-6 text-3xl font-bold text-orange-500">Create Event</h1>

      <Formik<FormValues>
        initialValues={{
          title: "",
          category: "",
          location: "",
          description: "",
          dateRange: { from: undefined, to: undefined },
          thumbnail: null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const { from, to } = values.dateRange;
          const startDate = from ? from.toISOString() : "";
          const endDate = to ? to.toISOString() : "";

          await createEvent({
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
              {/* Left Section */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="title">Title *</Label>
                  <Field name="title" as={Input} placeholder="Event title" />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="category">Category *</Label>
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

                <div className="space-y-1">
                  <Label htmlFor="location">Location *</Label>
                  <Field
                    as="select"
                    name="location"
                    className="w-full rounded-md border px-3 py-2"
                  >
                    <option value="">Select location</option>
                    <option value="jakarta">Jakarta</option>
                    <option value="bandung">Bandung</option>
                  </Field>
                  <ErrorMessage
                    name="location"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="dateRange">Date Range *</Label>
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

              {/* Right Section */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="thumbnail">Thumbnail *</Label>
                  {previewImage ? (
                    <div className="relative w-fit">
                      <Image
                        src={previewImage}
                        alt="Thumbnail preview"
                        width={300}
                        height={200}
                        className="rounded-md object-cover shadow-md"
                      />
                      <Button
                        size="icon"
                        type="button"
                        className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white shadow"
                        onClick={() => handleRemoveThumbnail(setFieldValue)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Input
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        onChange={(e) =>
                          handleThumbnailChange(e, setFieldValue)
                        }
                      />
                      <ErrorMessage
                        name="thumbnail"
                        component="div"
                        className="text-sm text-red-500"
                      />
                    </>
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
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                {isPending ? "Submitting..." : "Submit Event"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default CreateEvent;
