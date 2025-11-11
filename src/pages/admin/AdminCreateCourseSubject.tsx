import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Trash2, Edit2, Clock, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';

const subjectSchema = z.object({
  name: z.string().min(2, 'Subject name must be at least 2 characters'),
  code: z.string().min(1, 'Subject code is required'),
  description: z.string().optional(),
});

const classSchema = z.object({
  title: z.string().min(1, 'Class title is required'),
  duration: z.string().min(1, 'Duration is required'),
  order: z.coerce.number().int().min(1, 'Order must be at least 1'),
});

type SubjectFormData = z.infer<typeof subjectSchema>;
type ClassFormData = z.infer<typeof classSchema>;

interface SubjectClass {
  id: string;
  title: string;
  duration: string;
  order: number;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  classes: SubjectClass[];
}

const mockData: Subject[] = [
  {
    id: '1',
    name: 'Mathematics',
    code: 'MATH101',
    description: 'Introduction to advanced mathematical concepts',
    classes: [
      { id: 'c1', title: 'Linear Algebra', duration: '3 hours', order: 1 },
      { id: 'c2', title: 'Calculus I', duration: '4 hours', order: 2 },
      { id: 'c3', title: 'Probability Theory', duration: '2.5 hours', order: 3 },
    ],
  },
  {
    id: '2',
    name: 'Physics',
    code: 'PHY201',
    description: 'Fundamental principles of classical and modern physics',
    classes: [
      { id: 'c4', title: 'Mechanics', duration: '3 hours', order: 1 },
      { id: 'c5', title: 'Electromagnetism', duration: '3.5 hours', order: 2 },
    ],
  },
  {
    id: '3',
    name: 'Computer Science',
    code: 'CS301',
    description: 'Core programming and algorithms',
    classes: [
      { id: 'c6', title: 'Data Structures', duration: '4 hours', order: 1 },
      { id: 'c7', title: 'Algorithms', duration: '3.5 hours', order: 2 },
      { id: 'c8', title: 'Database Systems', duration: '3 hours', order: 3 },
      { id: 'c9', title: 'Operating Systems', duration: '4 hours', order: 4 },
    ],
  },
];

export default function AdminCreateCourseSubject() {
  const [subjects, setSubjects] = React.useState<Subject[]>(mockData);
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<string | null>('1');
  const [isSubjectDialogOpen, setIsSubjectDialogOpen] = React.useState(false);
  const [isClassDialogOpen, setIsClassDialogOpen] = React.useState(false);
  const [editingSubject, setEditingSubject] = React.useState<Subject | null>(null);
  const [editingClass, setEditingClass] = React.useState<SubjectClass | null>(null);

  const subjectForm = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    defaultValues: { name: '', code: '', description: '' },
  });

const classForm = useForm<ClassFormData>({
  resolver: zodResolver(classSchema) as any,  
  defaultValues: { title: '', duration: '', order: 1 },
});

  const selectedSubject = subjects.find(s => s.id === selectedSubjectId);

  const onSubmitSubject = (data: SubjectFormData) => {
    if (editingSubject) {
      setSubjects(prev => prev.map(s => s.id === editingSubject.id ? { ...s, ...data } : s));
      setEditingSubject(null);
    } else {
      const newSubject: Subject = {
        id: Date.now().toString(),
        ...data,
        classes: [],
      };
      setSubjects(prev => [...prev, newSubject]);
    }
    subjectForm.reset();
    setIsSubjectDialogOpen(false);
  };

  const onEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    subjectForm.reset({
      name: subject.name,
      code: subject.code,
      description: subject.description || '',
    });
    setIsSubjectDialogOpen(true);
  };

  const onDeleteSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
    if (selectedSubjectId === id) setSelectedSubjectId(subjects[0]?.id || null);
  };

  const onSubmitClass = (data: ClassFormData) => {
    if (!selectedSubjectId) return;

    if (editingClass) {
      setSubjects(prev => prev.map(s => 
        s.id === selectedSubjectId 
          ? { ...s, classes: s.classes.map(c => c.id === editingClass.id ? { ...c, ...data } : c) }
          : s
      ));
      setEditingClass(null);
    } else {
      const newClass: SubjectClass = {
        id: Date.now().toString(),
        ...data,
      };
      setSubjects(prev => prev.map(s => 
        s.id === selectedSubjectId 
          ? { ...s, classes: [...s.classes, newClass].sort((a, b) => a.order - b.order) }
          : s
      ));
    }
    classForm.reset();
    setIsClassDialogOpen(false);
  };

  const onEditClass = (classItem: SubjectClass) => {
    setEditingClass(classItem);
    classForm.reset({
      title: classItem.title,
      duration: classItem.duration,
      order: classItem.order,
    });
    setIsClassDialogOpen(true);
  };

  const onDeleteClass = (classId: string) => {
    if (!selectedSubjectId) return;
    setSubjects(prev => prev.map(s => 
      s.id === selectedSubjectId 
        ? { ...s, classes: s.classes.filter(c => c.id !== classId) }
        : s
    ));
  }; 

  React.useEffect(() => {
    if (editingSubject) {
      subjectForm.reset({
        name: editingSubject.name,
        code: editingSubject.code,
        description: editingSubject.description || '',
      });
    } else {
      subjectForm.reset();
    }
  }, [editingSubject, subjectForm]);

  React.useEffect(() => {
    if (editingClass) {
      classForm.reset({
        title: editingClass.title,
        duration: editingClass.duration,
        order: editingClass.order,
      });
    } else {
      const nextOrder = selectedSubject ? Math.max(...selectedSubject.classes.map(c => c.order), 0) + 1 : 1;
      classForm.reset({ title: '', duration: '', order: nextOrder });
    }
  }, [editingClass, selectedSubject, classForm]);

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Course Subjects</h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">Create and manage subjects with classes</p>
          </div>
          <Dialog open={isSubjectDialogOpen} onOpenChange={setIsSubjectDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingSubject(null); subjectForm.reset(); }}>
                <Plus className="mr-2 h-4 w-4" /> Add Subject
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{editingSubject ? 'Edit' : 'Create'} Subject</DialogTitle>
                <DialogDescription>
                  {editingSubject ? 'Update subject details' : 'Add a new subject to your course'}
                </DialogDescription>
              </DialogHeader>
              <Form {...subjectForm}>
                <form onSubmit={subjectForm.handleSubmit(onSubmitSubject)} className="space-y-4">
                  <FormField
                    control={subjectForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Mathematics" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={subjectForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject Code</FormLabel>
                        <FormControl>
                          <Input placeholder="MATH101" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={subjectForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Brief description..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => { setIsSubjectDialogOpen(false); setEditingSubject(null); }}>
                      Cancel
                    </Button>
                    <Button type="submit">{editingSubject ? 'Update' : 'Create'}</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Subjects</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {subjects.map(subject => (
                    <div
                      key={subject.id}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedSubjectId === subject.id 
                          ? 'bg-blue-50 border-l-4 border-blue-500' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedSubjectId(subject.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <Hash className="h-3 w-3 mr-1" />
                            {subject.code}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {subject.classes.length} class{subject.classes.length !== 1 ? 'es' : ''}
                          </p>
                        </div>
                        <div className="flex gap-1 ml-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => { e.stopPropagation(); onEditSubject(subject); }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => { e.stopPropagation(); onDeleteSubject(subject.id); }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            {selectedSubject ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedSubject.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Hash className="h-4 w-4 mr-1" />
                        {selectedSubject.code}
                        {selectedSubject.description && (
                          <p className="mt-2 text-sm">{selectedSubject.description}</p>
                        )}
                      </CardDescription>
                    </div>
                    <Dialog open={isClassDialogOpen} onOpenChange={setIsClassDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => { setEditingClass(null); classForm.reset(); }}>
                          <Plus className="mr-2 h-4 w-4" /> Add Class
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>{editingClass ? 'Edit' : 'Create'} Class</DialogTitle>
                          <DialogDescription>
                            {editingClass ? 'Update class details' : 'Add a new class to this subject'}
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...classForm}>
                          <form onSubmit={classForm.handleSubmit(onSubmitClass)} className="space-y-4">
                            <FormField
                              control={classForm.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Class Title</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Introduction to Algebra" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={classForm.control}
                              name="duration"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Duration</FormLabel>
                                  <FormControl>
                                    <Input placeholder="2 hours" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={classForm.control}
                              name="order"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Order</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <DialogFooter>
                              <Button type="button" variant="outline" onClick={() => { setIsClassDialogOpen(false); setEditingClass(null); }}>
                                Cancel
                              </Button>
                              <Button type="submit">{editingClass ? 'Update' : 'Create'}</Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedSubject.classes.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <Clock className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                      <p className="text-sm">No classes yet</p>
                      <p className="text-xs mt-1">Add your first class to this subject</p>
                    </div>
                  ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {selectedSubject.classes.map((classItem) => (
                        <AccordionItem key={classItem.id} value={classItem.id}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center justify-between w-full pr-4">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600">#{classItem.order}</span>
                                <span className="font-medium">{classItem.title}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="h-4 w-4" />
                                {classItem.duration}
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex justify-end gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onEditClass(classItem)}
                              >
                                <Edit2 className="h-4 w-4 mr-1" /> Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => onDeleteClass(classItem.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Delete
                              </Button>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-4" />
                  <p className="text-gray-600">Select a subject to view classes</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}