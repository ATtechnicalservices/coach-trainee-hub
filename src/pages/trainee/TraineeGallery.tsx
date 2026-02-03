import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Camera, Plus, Calendar, ImagePlus, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

// Mock progress photos
const mockPhotos = [
  { id: '1', date: 'Jan 1, 2024', url: '', label: 'Week 1', notes: 'Starting point' },
  { id: '2', date: 'Jan 15, 2024', url: '', label: 'Week 3', notes: 'Feeling stronger' },
  { id: '3', date: 'Feb 1, 2024', url: '', label: 'Week 5', notes: 'Visible progress!' },
  { id: '4', date: 'Feb 15, 2024', url: '', label: 'Week 7', notes: 'Abs starting to show' },
  { id: '5', date: 'Mar 1, 2024', url: '', label: 'Week 9', notes: 'Best shape ever' },
  { id: '6', date: 'Mar 15, 2024', url: '', label: 'Week 11', notes: 'Almost at goal!' },
];

export default function TraineeGallery() {
  const { addProgressPhoto } = useApp();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [comparePhotos, setComparePhotos] = useState<string[]>([]);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      addProgressPhoto({
        id: `${Date.now()}`,
        url: '',
        date: new Date().toISOString(),
        notes: 'Progress photo',
      });
      setIsUploading(false);
    }, 1000);
  };

  const toggleComparePhoto = (photoId: string) => {
    if (comparePhotos.includes(photoId)) {
      setComparePhotos(comparePhotos.filter(id => id !== photoId));
    } else if (comparePhotos.length < 2) {
      setComparePhotos([...comparePhotos, photoId]);
    }
  };

  const currentPhotoIndex = mockPhotos.findIndex(p => p.id === selectedPhoto);
  const canGoBack = currentPhotoIndex > 0;
  const canGoForward = currentPhotoIndex < mockPhotos.length - 1;

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Progress Gallery</h1>
            <p className="text-muted-foreground">Track your visual transformation</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={compareMode ? 'neon' : 'outline'} 
              onClick={() => {
                setCompareMode(!compareMode);
                setComparePhotos([]);
              }}
            >
              {compareMode ? 'Exit Compare' : 'Compare Photos'}
            </Button>
            <Button variant="neon" onClick={handleUpload} disabled={isUploading}>
              <Plus className="w-4 h-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Upload Photo'}
            </Button>
          </div>
        </div>

        {/* Compare Mode Instructions */}
        {compareMode && (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4 flex items-center gap-4">
              <Camera className="w-8 h-8 text-primary" />
              <div>
                <p className="font-medium">Compare Mode Active</p>
                <p className="text-sm text-muted-foreground">
                  Select 2 photos to compare side by side ({comparePhotos.length}/2 selected)
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Compare View */}
        {compareMode && comparePhotos.length === 2 && (
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {comparePhotos.map((photoId) => {
                  const photo = mockPhotos.find(p => p.id === photoId);
                  return (
                    <div key={photoId} className="space-y-2">
                      <div className="aspect-[3/4] rounded-xl bg-muted flex items-center justify-center border-2 border-border">
                        <Camera className="w-12 h-12 text-muted-foreground" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{photo?.label}</p>
                        <p className="text-sm text-muted-foreground">{photo?.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Upload Card */}
          <Card 
            className="border-dashed border-2 border-border hover:border-primary/50 transition-colors cursor-pointer group"
            onClick={handleUpload}
          >
            <CardContent className="p-0">
              <div className="aspect-[3/4] flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <ImagePlus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="text-center">
                  <p className="font-medium">Add Photo</p>
                  <p className="text-xs text-muted-foreground">Upload progress pic</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photo Cards */}
          {mockPhotos.map((photo) => {
            const isSelected = comparePhotos.includes(photo.id);
            
            return (
              <Card 
                key={photo.id}
                className={cn(
                  "border-border overflow-hidden cursor-pointer transition-all",
                  compareMode && isSelected && "ring-2 ring-primary",
                  !compareMode && "hover:border-primary/30"
                )}
                onClick={() => {
                  if (compareMode) {
                    toggleComparePhoto(photo.id);
                  } else {
                    setSelectedPhoto(photo.id);
                  }
                }}
              >
                <CardContent className="p-0 relative">
                  <div className="aspect-[3/4] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative">
                    <Camera className="w-10 h-10 text-muted-foreground" />
                    
                    {compareMode && (
                      <div className={cn(
                        "absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                        isSelected 
                          ? "bg-primary border-primary text-primary-foreground" 
                          : "bg-background/80 border-border"
                      )}>
                        {isSelected && <span className="text-xs font-bold">{comparePhotos.indexOf(photo.id) + 1}</span>}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3">
                    <p className="font-semibold text-sm">{photo.label}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {photo.date}
                    </div>
                    {photo.notes && (
                      <p className="text-xs text-muted-foreground mt-1 truncate">{photo.notes}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Photo Viewer Modal */}
        {selectedPhoto && !compareMode && (
          <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setSelectedPhoto(null)}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!canGoBack}
                  onClick={() => setSelectedPhoto(mockPhotos[currentPhotoIndex - 1].id)}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>

                <div className="flex-1">
                  <div className="aspect-[3/4] max-h-[70vh] mx-auto rounded-2xl bg-muted flex items-center justify-center">
                    <Camera className="w-20 h-20 text-muted-foreground" />
                  </div>
                  
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-bold">{mockPhotos[currentPhotoIndex]?.label}</h3>
                    <p className="text-muted-foreground">{mockPhotos[currentPhotoIndex]?.date}</p>
                    {mockPhotos[currentPhotoIndex]?.notes && (
                      <p className="text-sm mt-2">{mockPhotos[currentPhotoIndex]?.notes}</p>
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  disabled={!canGoForward}
                  onClick={() => setSelectedPhoto(mockPhotos[currentPhotoIndex + 1].id)}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex justify-center gap-2 mt-6 overflow-x-auto pb-2">
                {mockPhotos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo.id)}
                    className={cn(
                      "w-16 h-20 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 transition-all",
                      photo.id === selectedPhoto 
                        ? "ring-2 ring-primary" 
                        : "opacity-50 hover:opacity-100"
                    )}
                  >
                    <Camera className="w-6 h-6 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <Card className="border-border">
          <CardContent className="p-6 flex items-center justify-around text-center">
            <div>
              <p className="text-3xl font-bold text-primary">{mockPhotos.length}</p>
              <p className="text-sm text-muted-foreground">Total Photos</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <p className="text-3xl font-bold text-accent">11</p>
              <p className="text-sm text-muted-foreground">Weeks Tracked</p>
            </div>
            <div className="h-12 w-px bg-border" />
            <div>
              <p className="text-3xl font-bold text-success">Amazing!</p>
              <p className="text-sm text-muted-foreground">Transformation</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
