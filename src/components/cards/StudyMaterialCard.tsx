import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Lock } from "lucide-react";

interface StudyMaterialCardProps {
  id: string;
  title: string;
  type: string;
  subject: string;
  size: string;
  pages?: number;
  downloads: number;
  isLocked: boolean;
  onDownload?: () => void;
}

export function StudyMaterialCard({
  title,
  type,
  subject,
  size,
  pages,
  downloads,
  isLocked,
  onDownload,
}: StudyMaterialCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground line-clamp-2">{title}</h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {type}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {subject}
              </Badge>
            </div>
          </div>
          {isLocked && <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{size}</span>
          {pages && (
            <>
              <span>•</span>
              <span>{pages} pages</span>
            </>
          )}
          <span>•</span>
          <div className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            <span>{downloads.toLocaleString()}</span>
          </div>
        </div>

        <Button
          className="w-full"
          size="sm"
          variant={isLocked ? "outline" : "default"}
          disabled={isLocked}
          onClick={onDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          {isLocked ? "Enroll to Download" : "Download"}
        </Button>
      </div>
    </Card>
  );
}
