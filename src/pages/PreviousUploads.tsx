
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { File as LucideFile, ChevronLeft, Calendar, Building2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface UploadRecord {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  project: string;
  status: 'success' | 'error' | 'processing';
  fileSize: string;
}

const MOCK_UPLOADS: UploadRecord[] = [
  {
    id: '1',
    fileName: 'rent-roll-2023-q1.xlsx',
    fileType: 'spreadsheet',
    uploadDate: '2023-04-15',
    project: 'Project A',
    status: 'success',
    fileSize: '2.4 MB'
  },
  {
    id: '2',
    fileName: 'property-valuation.pdf',
    fileType: 'document',
    uploadDate: '2023-03-22',
    project: 'Project B',
    status: 'success',
    fileSize: '5.1 MB'
  },
  {
    id: '3',
    fileName: 'operating-statement-2023.xlsx',
    fileType: 'spreadsheet',
    uploadDate: '2023-05-10',
    project: 'Project A',
    status: 'processing',
    fileSize: '1.8 MB'
  },
  {
    id: '4',
    fileName: 'property-photos.zip',
    fileType: 'archive',
    uploadDate: '2023-02-28',
    project: 'Project C',
    status: 'error',
    fileSize: '18.7 MB'
  }
];

const getStatusBadge = (status: UploadRecord['status']) => {
  switch (status) {
    case 'success':
      return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">Success</Badge>;
    case 'error':
      return <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-200">Error</Badge>;
    case 'processing':
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">Processing</Badge>;
    default:
      return null;
  }
};

const PreviousUploads: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link to="/upload">
            <Button variant="ghost" size="sm" className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              Back to Upload
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Previous Uploads</h1>
        </div>
        <Link to="/upload">
          <Button>Upload New Files</Button>
        </Link>
      </div>

      <div className="rounded-md border bg-card">
        <div className="p-4 flex items-center justify-between bg-muted/40">
          <div className="flex gap-4 text-sm font-medium text-muted-foreground">
            <span>File Name</span>
          </div>
          <div className="flex gap-4 text-sm font-medium text-muted-foreground">
            <span className="w-24 text-right">Date</span>
            <span className="w-24 text-right">Project</span>
            <span className="w-24 text-right">Status</span>
            <span className="w-20 text-right">Size</span>
          </div>
        </div>
        <Separator />
        
        <div className="divide-y">
          {MOCK_UPLOADS.map(upload => (
            <div key={upload.id} className="p-4 flex items-center justify-between hover:bg-muted/30">
              <div className="flex items-center gap-3">
                <LucideFile className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{upload.fileName}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 w-24 justify-end text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{upload.uploadDate}</span>
                </div>
                <div className="flex items-center gap-1 w-24 justify-end text-sm text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>{upload.project}</span>
                </div>
                <div className="w-24 flex justify-end">
                  {getStatusBadge(upload.status)}
                </div>
                <div className="w-20 text-right text-sm text-muted-foreground">
                  {upload.fileSize}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviousUploads;
