import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Layout from "@/components/layout/Layout";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

 
const mockTestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z
    .number()
    .min(2000, "Year must be 2000 or later")
    .max(2099, "Year must be 2099 or earlier"),
  questions: z.number().min(1, "Must have at least 1 question"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  marks: z.number().min(1, "Marks must be at least 1"),
});
 
type MockTestForm = z.infer<typeof mockTestSchema>;

interface ExamReference {
  id: string;
  examName: string;  
}
 
const examsData = {
  list: [
    { id: "ge1", examName: "SSC CGL" },
    { id: "ge2", examName: "SSC CHSL" },
    { id: "ge3", examName: "IBPS PO" },
    { id: "ge4", examName: "SBI Clerk" },
    { id: "ge5", examName: "RRB NTPC" },
    { id: "ge6", examName: "RRB Group D" },
    { id: "ge7", examName: "NDA" },
    { id: "ge8", examName: "CDS" },
    { id: "ge9", examName: "LIC AAO" },
    { id: "ge10", examName: "CTET" },
    { id: "ge11", examName: "MPSC" },
    { id: "ge12", examName: "UPSC CSE" },
 
  ],
};
 
export default function AdminAddMockTest() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();

  /* ---- Find the exam name (fallback if not found) ---- */
  const currentExam: ExamReference | undefined = examsData.list.find(
    (e) => e.id === examId
  );
  const examDisplayName = currentExam?.examName ?? "Unknown Exam";

  /* ---- Form setup ---- */
  const form = useForm<MockTestForm>({
    resolver: zodResolver(mockTestSchema),
    defaultValues: {
      title: "",
      year: new Date().getFullYear(),
      questions: 100,
      duration: 60,
      marks: 100,
    },
  });

  /* ---- Submit handler ---- */
  const onSubmit = (data: MockTestForm) => {
    const payload = {
      examId,               // <-- the gov-exam id from URL
      ...data,
    };

    console.log("Mock test payload →", payload);

    // TODO: replace with real API call
    // await api.post(`/admin/exams/${examId}/mock-tests`, payload);

    // Reset + optional redirect
    form.reset();
    // navigate(`/admin/gov-exam/${examId}`); // back to exam detail
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 max-w-3xl">
        {/* ----- Back button + Header ----- */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add Mock Test</CardTitle>
            <CardDescription>
              For <span className="font-semibold">{examDisplayName}</span> (
              {examId})
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mock Test Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., IBPS PO 2023 Prelims"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Year */}
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 2023"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Questions */}
                <FormField
                  control={form.control}
                  name="questions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Questions</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 100"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Duration */}
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 60"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Marks */}
                <FormField
                  control={form.control}
                  name="marks"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Marks</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g., 100"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button type="submit" className="w-full">
                  Add Mock Test
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}