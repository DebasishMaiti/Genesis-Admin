import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Upload,
  FileText,
  Image,
  FileSpreadsheet,
 
  X,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  File,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Layout from '@/components/layout/Layout';

interface StudyMaterial {
  id: string;
  title: string;
  type:
    | 'PDF'
    | 'Image'
    | 'Excel'
    | 'Word'
    | 'PowerPoint'
    | 'Video'
    | 'Notes'
    | 'Quiz';
  subject: string;
  size?: string;
  pages?: number;
  downloads?: number;
  fileUrl?: string;
}
 
const MIME_MAP: Record<StudyMaterial['type'], string[]> = {
  PDF: ['application/pdf'],
  Image: [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp',
  ],
  Excel: [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
    'application/vnd.ms-excel',  
    'text/csv',
  ],
  Word: [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'application/msword', 
  ],
  PowerPoint: [
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
    'application/vnd.ms-powerpoint', 
  ],
  Video: ['video/mp4', 'video/webm', 'video/ogg'],
  Notes: [], 
  Quiz: [],  
};
 
const SUBJECTS = [
  'Quantitative Aptitude',
  'English',
  'General Awareness',
  'Reasoning',
  'Mathematics',
  'General Intelligence',
  'General Science',
  'General Knowledge',
  'Computer Knowledge',
  'Child Development',
  'Language I',
  'Language II',
  'Environmental Studies',
  'CSAT',
  'Current Affairs',
  'Ethics',
];
 
const getFileIcon = (type: StudyMaterial['type']) => {
  switch (type) {
    case 'PDF':
      return <FileText className="w-8 h-8 text-red-600" />;
    case 'Image':
      return <Image className="w-8 h-8 text-blue-600" />;
    case 'Excel':
      return <FileSpreadsheet className="w-8 h-8 text-green-600" />;
    default:
      return <File className="w-8 h-8 text-gray-600" />;
  }
};

export default function AdminAddStudyMaterial() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<StudyMaterial>({
    id: '',
    title: '',
    type: 'PDF',
    subject: '',
    size: '',
    pages: undefined,
    downloads: 0,
    fileUrl: '',
  });

  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
 
  useEffect(() => {
    setFormData((prev) => ({ ...prev, id: `sm_${Date.now()}` }));
  }, []);
 
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
 
  const handleFile = (incoming: File) => {
    const allowed = MIME_MAP[formData.type] ?? [];
 
    const isNotesOrQuiz = formData.type === 'Notes' || formData.type === 'Quiz';

    if (!isNotesOrQuiz && !allowed.includes(incoming.type)) {
      setError(
        `Please upload a valid ${formData.type.toLowerCase()} file.`
      );
      return;
    }

    if (incoming.size > 100 * 1024 * 1024) {
      setError('File size must be less than 100 MB.');
      return;
    }

    setFile(incoming);
    setError('');

    const sizeMB = (incoming.size / (1024 * 1024)).toFixed(1);
    setFormData((prev) => ({
      ...prev,
      size: `${sizeMB} MB`,
      fileUrl: URL.createObjectURL(incoming),
    }));
  };

  const handleInputChange = (
    field: keyof StudyMaterial,
    value: any
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
 
    if (field === 'type' && file) {
      setFile(null);
      setFormData((prev) => ({
        ...prev,
        size: '',
        fileUrl: '',
      }));
    }
  }; 
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError('Please upload a file.');
      return;
    }
    if (!formData.title || !formData.subject) {
      setError('Please fill all required fields.');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess(false);

    try {
      await new Promise((r) => setTimeout(r, 1500));

      console.log('Study material added:', {
        examId,
        ...formData,
        file,
      });

      setSuccess(true);
      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      setError('Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };
 
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Exam
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Add Study Material
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Upload PDFs, images, Excel, Word, PowerPoint, videos, notes, or quizzes.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Material Details</CardTitle>
            <CardDescription>
              Fill the form and attach the file
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Quantitative Aptitude Complete Notes"
                    value={formData.title}
                    onChange={(e) =>
                      handleInputChange('title', e.target.value)
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(v: any) =>
                      handleInputChange('type', v)
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="Image">Image</SelectItem>
                      <SelectItem value="Excel">Excel</SelectItem>
                      <SelectItem value="Word">Word</SelectItem>
                      <SelectItem value="PowerPoint">
                        PowerPoint
                      </SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Notes">Notes</SelectItem>
                      <SelectItem value="Quiz">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(v) => handleInputChange('subject', v)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Pages – only for PDF */}
                <div>
                  <Label htmlFor="pages">
                    Pages {formData.type === 'PDF' && '*'}
                  </Label>
                  <Input
                    id="pages"
                    type="number"
                    placeholder="e.g., 240"
                    value={formData.pages ?? ''}
                    onChange={(e) =>
                      handleInputChange(
                        'pages',
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    className="mt-1"
                    disabled={formData.type !== 'PDF'}
                  />
                </div>
              </div>

              {/* ---------- FILE UPLOAD ---------- */}
              <div>
                <Label>Upload File *</Label>
                <div
                  className={`mt-1 border-2 border-dashed rounded-lg p-6 transition-colors ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    {file ? (
                      <div className="w-full space-y-3">
                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center gap-3">
                            {getFileIcon(formData.type)}
                            <div className="text-left">
                              <p className="text-sm font-medium text-gray-900">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formData.size}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setFile(null);
                              setFormData((p) => ({
                                ...p,
                                size: '',
                                fileUrl: '',
                              }));
                            }}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        {/* ---- Preview for Image / PDF ---- */}
                        {formData.type === 'Image' && formData.fileUrl && (
                          <img
                            src={formData.fileUrl}
                            alt="preview"
                            className="mx-auto max-h-48 rounded border"
                          />
                        )}
                        {formData.type === 'PDF' && formData.fileUrl && (
                          <iframe
                            src={formData.fileUrl}
                            className="w-full h-64 border rounded"
                            title="PDF preview"
                          />
                        )}
                      </div>
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-gray-400 mb-3" />
                        <p className="text-sm text-gray-600">
                          <label className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
                            <input
                              type="file"
                              className="hidden"
                              accept={
                                formData.type === 'Video'
                                  ? 'video/*'
                                  : MIME_MAP[formData.type]
                                      ?.join(',') ?? '*'
                              }
                              onChange={(e) =>
                                e.target.files?.[0] &&
                                handleFile(e.target.files[0])
                              }
                            />
                            Click to upload
                          </label>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formData.type === 'Video'
                            ? 'MP4, WebM, OGG up to 100 MB'
                            : `${formData.type} up to 100 MB`}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* ---------- FEEDBACK ---------- */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Study material added! Redirecting…
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                  disabled={uploading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    uploading ||
                    !file ||
                    !formData.title ||
                    !formData.subject
                  }
                  className="min-w-32"
                >
                  {uploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Uploading…
                    </>
                  ) : (
                    'Add Material'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}