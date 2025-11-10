import { useState } from 'react';
import { Plus, Trash2, BookOpen, GraduationCap, Video, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Layout from '@/components/layout/Layout';

interface TuitionClass {
  id: string;
  title: string;
  instructor: string;
  duration: number;
  date: string;
  time: string;
}

interface Chapter {
  id: string;
  title: string;
  tuitionClasses: TuitionClass[];
}

interface Subject {
  id: string;
  name: string;
  icon: string;
  chapters: Chapter[];
}

interface Class {
  id: string;
  name: string;
  subjects: Subject[];
}

interface Board {
  id: string;
  name: string;
  classes: Class[];
}

const mockData: Board[] = [
  {
    id: 'board-1',
    name: 'CBSE',
    classes: [
      {
        id: 'class-1',
        name: 'Class 10',
        subjects: [
          {
            id: 'sub-1',
            name: 'Mathematics',
            icon: 'Calculator',
            chapters: [
              {
                id: 'ch-1',
                title: 'Real Numbers',
                tuitionClasses: [
                  {
                    id: 'cls-1',
                    title: 'Introduction to Real Numbers',
                    instructor: 'Dr. Amit Kumar',
                    duration: 60,
                    date: '2025-10-15',
                    time: '10:00 AM'
                  },
                  {
                    id: 'cls-2',
                    title: "Euclid's Division Lemma",
                    instructor: 'Dr. Amit Kumar',
                    duration: 75,
                    date: '2025-10-10',
                    time: '10:00 AM'
                  }
                ]
              },
              {
                id: 'ch-2',
                title: 'Polynomials',
                tuitionClasses: [
                  {
                    id: 'cls-3',
                    title: 'Introduction to Polynomials',
                    instructor: 'Prof. Sneha Sharma',
                    duration: 60,
                    date: '2025-10-30',
                    time: '2:00 PM'
                  }
                ]
              }
            ]
          },
          {
            id: 'sub-2',
            name: 'Science',
            icon: 'Microscope',
            chapters: [
              {
                id: 'ch-3',
                title: 'Chemical Reactions and Equations',
                tuitionClasses: [
                  {
                    id: 'cls-4',
                    title: 'Types of Chemical Reactions',
                    instructor: 'Dr. Priya Patel',
                    duration: 90,
                    date: '2025-10-18',
                    time: '11:00 AM'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export default function AdminAddAcademics() {
  const [boards, setBoards] = useState<Board[]>(mockData);

  const [openBoardDialog, setOpenBoardDialog] = useState(false);
  const [openClassDialog, setOpenClassDialog] = useState(false);
  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
  const [openChapterDialog, setOpenChapterDialog] = useState(false);
  const [openTuitionClassDialog, setOpenTuitionClassDialog] = useState(false);

  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
 
  const [boardName, setBoardName] = useState('');
  const [className, setClassName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');
  const [tuitionClassData, setTuitionClassData] = useState({
    title: '',
    instructor: '',
    duration: 60,
    date: '',
    time: ''
  });
 
  const addBoard = () => {
    if (!boardName.trim()) return;
    const newBoard: Board = {
      id: `board-${Date.now()}`,
      name: boardName.trim(),
      classes: []
    };
    setBoards([...boards, newBoard]);
    setBoardName('');
    setOpenBoardDialog(false);
  };
 
  const addClass = () => {
    if (!className.trim() || !selectedBoardId) return;
    const newClass: Class = {
      id: `class-${Date.now()}`,
      name: className.trim(),
      subjects: []
    };
    setBoards(boards.map(b =>
      b.id === selectedBoardId
        ? { ...b, classes: [...b.classes, newClass] }
        : b
    ));
    setClassName('');
    setOpenClassDialog(false);
    setSelectedClassId(null);
  };
 
  const addSubject = () => {
    if (!subjectName.trim() || !selectedClassId) return;
    const newSubject: Subject = {
      id: `sub-${Date.now()}`,
      name: subjectName.trim(),
      icon: 'Book',
      chapters: []
    };
    setBoards(boards.map(b =>
      b.classes.map(c => c.id).includes(selectedClassId!)
        ? {
            ...b,
            classes: b.classes.map(c =>
              c.id === selectedClassId
                ? { ...c, subjects: [...c.subjects, newSubject] }
                : c
            )
          }
        : b
    ));
    setSubjectName('');
    setOpenSubjectDialog(false);
    setSelectedSubjectId(null);
  };
 
  const addChapter = () => {
    if (!chapterTitle.trim() || !selectedSubjectId) return;
    const newChapter: Chapter = {
      id: `ch-${Date.now()}`,
      title: chapterTitle,
      tuitionClasses: []
    };
    setBoards(boards.map(b =>
      b.classes.map(c => c.subjects.map(s => s.id).includes(selectedSubjectId!)).length > 0
        ? {
            ...b,
            classes: b.classes.map(c =>
              c.subjects.map(s => s.id).includes(selectedSubjectId!)
                ? {
                    ...c,
                    subjects: c.subjects.map(s =>
                      s.id === selectedSubjectId
                        ? { ...s, chapters: [...s.chapters, newChapter] }
                        : s
                    )
                  }
                : c
            )
          }
        : b
    ));
    setChapterTitle('');
    setOpenChapterDialog(false);
    setSelectedSubjectId(null);
  };
 
  const addTuitionClass = () => {
    if (!tuitionClassData.title || !selectedChapterId) return;
    const newClass: TuitionClass = {
      id: `cls-${Date.now()}`,
      ...tuitionClassData
    };
    setBoards(boards.map(b =>
      b.classes.map(c => c.subjects.map(s => s.chapters.map(ch => ch.id).includes(selectedChapterId!)).length > 0).length > 0
        ? {
            ...b,
            classes: b.classes.map(c =>
              c.subjects.map(s => s.chapters.map(ch => ch.id).includes(selectedChapterId!)).length > 0
                ? {
                    ...c,
                    subjects: c.subjects.map(s =>
                      s.chapters.map(ch => ch.id).includes(selectedChapterId!)
                        ? {
                            ...s,
                            chapters: s.chapters.map(ch =>
                              ch.id === selectedChapterId
                                ? { ...ch, tuitionClasses: [...ch.tuitionClasses, newClass] }
                                : ch
                            )
                          }
                        : s
                    )
                  }
                : c
            )
          }
        : b
    ));
    setTuitionClassData({ title: '', instructor: '', duration: 60, date: '', time: '' });
    setOpenTuitionClassDialog(false);
    setSelectedChapterId(null);
  };
 
  const deleteBoard = (id: string) => {
    if (!confirm('Delete board and everything inside?')) return;
    setBoards(boards.filter(b => b.id !== id));
  };

  const deleteClass = (boardId: string, classId: string) => {
    if (!confirm('Delete class and all subjects?')) return;
    setBoards(boards.map(b =>
      b.id === boardId
        ? { ...b, classes: b.classes.filter(c => c.id !== classId) }
        : b
    ));
  };

  const deleteSubject = (boardId: string, classId: string, subjectId: string) => {
    if (!confirm('Delete subject and its chapters?')) return;
    setBoards(boards.map(b =>
      b.id === boardId
        ? {
            ...b,
            classes: b.classes.map(c =>
              c.id === classId
                ? { ...c, subjects: c.subjects.filter(s => s.id !== subjectId) }
                : c
            )
          }
        : b
    ));
  };

  const deleteChapter = (boardId: string, classId: string, subjectId: string, chapterId: string) => {
    if (!confirm('Delete chapter and its tuition classes?')) return;
    setBoards(boards.map(b =>
      b.id === boardId
        ? {
            ...b,
            classes: b.classes.map(c =>
              c.id === classId
                ? {
                    ...c,
                    subjects: c.subjects.map(s =>
                      s.id === subjectId
                        ? { ...s, chapters: s.chapters.filter(ch => ch.id !== chapterId) }
                        : s
                    )
                  }
                : c
            )
          }
        : b
    ));
  };

  const deleteTuitionClass = (boardId: string, classId: string, subjectId: string, chapterId: string, clsId: string) => {
    if (!confirm('Delete this tuition class?')) return;
    setBoards(boards.map(b =>
      b.id === boardId
        ? {
            ...b,
            classes: b.classes.map(c =>
              c.id === classId
                ? {
                    ...c,
                    subjects: c.subjects.map(s =>
                      s.id === subjectId
                        ? {
                            ...s,
                            chapters: s.chapters.map(ch =>
                              ch.id === chapterId
                                ? { ...ch, tuitionClasses: ch.tuitionClasses.filter(cls => cls.id !== clsId) }
                                : ch
                            )
                          }
                        : s
                    )
                  }
                : c
            )
          }
        : b
    ));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Course Builder</h1>
              <p className="text-gray-600 mt-1">Build structured courses: Board → Class → Subject → Chapter → Class</p>
            </div>

            <Dialog open={openBoardDialog} onOpenChange={setOpenBoardDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Board
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Board</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <Label>Board Name</Label>
                  <Input
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    placeholder="e.g., CBSE"
                    onKeyDown={(e) => e.key === 'Enter' && addBoard()}
                  />
                  <Button onClick={addBoard} className="w-full mt-4">Create Board</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-8">
            {boards.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <GraduationCap className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700">No boards yet</h3>
                  <p className="text-gray-500 mt-1">Start by adding a board</p>
                </CardContent>
              </Card>
            ) : (
              boards.map((board) => (
                <Card key={board.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Users className="w-8 h-8" />
                        <div>
                          <CardTitle className="text-2xl">{board.name}</CardTitle>
                          <p className="text-sm opacity-90">{board.classes.length} Class{board.classes.length !== 1 ? 'es' : ''}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={() => deleteBoard(board.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Classes</h3>
                      <Dialog open={openClassDialog && selectedBoardId === board.id} onOpenChange={(open) => {
                        if (!open) setSelectedBoardId(null);
                        setOpenClassDialog(open);
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedBoardId(board.id);
                              setOpenClassDialog(true);
                            }}
                          >
                            <Plus className="w-4 h-4 mr-1" /> Add Class
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Class to {board.name}</DialogTitle>
                          </DialogHeader>
                          <div className="mt-4">
                            <Label>Class Name</Label>
                            <Input
                              value={className}
                              onChange={(e) => setClassName(e.target.value)}
                              placeholder="e.g., Class 10"
                              onKeyDown={(e) => e.key === 'Enter' && addClass()}
                            />
                            <Button onClick={addClass} className="w-full mt-4">Create Class</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>

                    {board.classes.length === 0 ? (
                      <p className="text-sm text-gray-500 italic">No classes yet</p>
                    ) : (
                      <Accordion type="single" collapsible className="w-full">
                        {board.classes.map((cls) => (
                          <AccordionItem key={cls.id} value={cls.id}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex items-center justify-between w-full pr-4">
                                <span className="font-medium">{cls.name}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-500">{cls.subjects.length} subjects</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteClass(board.id, cls.id);
                                    }}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="pl-6 space-y-4">
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-semibold">Subjects</h4>
                                  <Dialog open={openSubjectDialog && selectedClassId === cls.id} onOpenChange={(open) => {
                                    if (!open) setSelectedClassId(null);
                                    setOpenSubjectDialog(open);
                                  }}>
                                    <DialogTrigger asChild>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setSelectedClassId(cls.id);
                                          setOpenSubjectDialog(true);
                                        }}
                                      >
                                        <Plus className="w-3 h-3 mr-1" /> Add Subject
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Add Subject to {cls.name}</DialogTitle>
                                      </DialogHeader>
                                      <div className="mt-4">
                                        <Label>Subject Name</Label>
                                        <Input
                                          value={subjectName}
                                          onChange={(e) => setSubjectName(e.target.value)}
                                          placeholder="e.g., Mathematics"
                                          onKeyDown={(e) => e.key === 'Enter' && addSubject()}
                                        />
                                        <Button onClick={addSubject} className="w-full mt-4">Create Subject</Button>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </div>

                                {cls.subjects.length === 0 ? (
                                  <p className="text-sm text-gray-500 italic">No subjects yet</p>
                                ) : (
                                  <div className="space-y-3">
                                    {cls.subjects.map((subject) => (
                                      <Card key={subject.id} className="overflow-hidden">
                                        <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3">
                                          <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                              <div className="text-2xl">{subject.icon}</div>
                                              <div>
                                                <CardTitle className="text-lg">{subject.name}</CardTitle>
                                                <p className="text-xs opacity-90">{subject.chapters.length} chapters</p>
                                              </div>
                                            </div>
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="text-white hover:bg-white/20 h-7 w-7"
                                              onClick={() => deleteSubject(board.id, cls.id, subject.id)}
                                            >
                                              <Trash2 className="w-3 h-3" />
                                            </Button>
                                          </div>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                          <Accordion type="single" collapsible>
                                            {subject.chapters.map((chapter) => (
                                              <AccordionItem key={chapter.id} value={chapter.id} className="border-b-0">
                                                <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                                                  <div className="flex items-center justify-between w-full pr-2">
                                                    <div className="flex items-center gap-2 text-left">
                                                      <BookOpen className="w-4 h-4 text-indigo-600" />
                                                      <span className="text-sm font-medium">{chapter.title}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                      <span className="text-xs text-gray-500">
                                                        {chapter.tuitionClasses.length} class{chapter.tuitionClasses.length !== 1 ? 'es' : ''}
                                                      </span>
                                                      <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-6 w-6"
                                                        onClick={(e) => {
                                                          e.stopPropagation();
                                                          deleteChapter(board.id, cls.id, subject.id, chapter.id);
                                                        }}
                                                      >
                                                        <Trash2 className="w-3 h-3" />
                                                      </Button>
                                                    </div>
                                                  </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="px-4 pb-3">
                                                  <div className="space-y-2">
                                                    {chapter.tuitionClasses.length === 0 ? (
                                                      <p className="text-xs text-gray-500 italic">No classes yet</p>
                                                    ) : (
                                                      chapter.tuitionClasses.map((tClass) => (
                                                        <div
                                                          key={tClass.id}
                                                          className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs"
                                                        >
                                                          <div className="flex items-center gap-2">
                                                            <Video className="w-3 h-3 text-green-600" />
                                                            <div>
                                                              <p className="font-medium">{tClass.title}</p>
                                                              <p className="text-gray-600">
                                                                {tClass.instructor} • {tClass.duration} min • {tClass.date} {tClass.time}
                                                              </p>
                                                            </div>
                                                          </div>
                                                          <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6"
                                                            onClick={() => deleteTuitionClass(board.id, cls.id, subject.id, chapter.id, tClass.id)}
                                                          >
                                                            <Trash2 className="w-3 h-3" />
                                                          </Button>
                                                        </div>
                                                      ))
                                                    )}

                                                    <Dialog open={openTuitionClassDialog && selectedChapterId === chapter.id} onOpenChange={(open) => {
                                                      if (!open) {
                                                        setSelectedChapterId(null);
                                                        setTuitionClassData({ title: '', instructor: '', duration: 60, date: '', time: '' });
                                                      }
                                                      setOpenTuitionClassDialog(open);
                                                    }}>
                                                      <DialogTrigger asChild>
                                                        <Button
                                                          variant="outline"
                                                          size="sm"
                                                          className="w-full text-xs h-8"
                                                          onClick={() => {
                                                            setSelectedChapterId(chapter.id);
                                                            setOpenTuitionClassDialog(true);
                                                          }}
                                                        >
                                                          <Plus className="w-3 h-3 mr-1" /> Add Class
                                                        </Button>
                                                      </DialogTrigger>
                                                      <DialogContent className="max-w-md">
                                                        <DialogHeader>
                                                          <DialogTitle>Add Tuition Class</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="space-y-3 mt-4">
                                                          <div>
                                                            <Label>Class Title</Label>
                                                            <Input
                                                              value={tuitionClassData.title}
                                                              onChange={(e) => setTuitionClassData({ ...tuitionClassData, title: e.target.value })}
                                                              placeholder="e.g., Real Numbers Intro"
                                                            />
                                                          </div>
                                                          <div>
                                                            <Label>Instructor</Label>
                                                            <Input
                                                              value={tuitionClassData.instructor}
                                                              onChange={(e) => setTuitionClassData({ ...tuitionClassData, instructor: e.target.value })}
                                                              placeholder="e.g., Dr. Amit"
                                                            />
                                                          </div>
                                                          <div className="grid grid-cols-2 gap-3">
                                                            <div>
                                                              <Label>Duration (min)</Label>
                                                              <Input
                                                                type="number"
                                                                value={tuitionClassData.duration}
                                                                onChange={(e) => setTuitionClassData({ ...tuitionClassData, duration: parseInt(e.target.value) || 60 })}
                                                              />
                                                            </div>
                                                            <div>
                                                              <Label>Date</Label>
                                                              <Input
                                                                type="date"
                                                                value={tuitionClassData.date}
                                                                onChange={(e) => setTuitionClassData({ ...tuitionClassData, date: e.target.value })}
                                                              />
                                                            </div>
                                                          </div>
                                                          <div>
                                                            <Label>Time</Label>
                                                            <Input
                                                              type="time"
                                                              value={tuitionClassData.time}
                                                              onChange={(e) => setTuitionClassData({ ...tuitionClassData, time: e.target.value })}
                                                            />
                                                          </div>
                                                          <Button onClick={addTuitionClass} className="w-full">Add Class</Button>
                                                        </div>
                                                      </DialogContent>
                                                    </Dialog>
                                                  </div>
                                                </AccordionContent>
                                              </AccordionItem>
                                            ))}

                                            <div className="p-3 border-t">
                                              <Dialog open={openChapterDialog && selectedSubjectId === subject.id} onOpenChange={(open) => {
                                                if (!open) setSelectedSubjectId(null);
                                                setOpenChapterDialog(open);
                                              }}>
                                                <DialogTrigger asChild>
                                                  <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-full text-xs h-8"
                                                    onClick={() => {
                                                      setSelectedSubjectId(subject.id);
                                                      setOpenChapterDialog(true);
                                                    }}
                                                  >
                                                    <Plus className="w-3 h-3 mr-1" /> Add Chapter
                                                  </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                  <DialogHeader>
                                                    <DialogTitle>Add Chapter to {subject.name}</DialogTitle>
                                                  </DialogHeader>
                                                  <div className="mt-4">
                                                    <Label>Chapter Title</Label>
                                                    <Input
                                                      value={chapterTitle}
                                                      onChange={(e) => setChapterTitle(e.target.value)}
                                                      placeholder="e.g., Real Numbers"
                                                      onKeyDown={(e) => e.key === 'Enter' && addChapter()}
                                                    />
                                                    <Button onClick={addChapter} className="w-full mt-4">Create Chapter</Button>
                                                  </div>
                                                </DialogContent>
                                              </Dialog>
                                            </div>
                                          </Accordion>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}