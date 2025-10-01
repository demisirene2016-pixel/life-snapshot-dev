import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem("portfolioData");
    return saved ? JSON.parse(saved) : null;
  });

  const handleDownload = () => {
    const dataStr = JSON.stringify(portfolioData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "portfolio-data.json";
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Success",
      description: "Portfolio data downloaded successfully",
    });
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          localStorage.setItem("portfolioData", JSON.stringify(data));
          setPortfolioData(data);
          toast({
            title: "Success",
            description: "Portfolio data uploaded successfully",
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Invalid JSON file",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
            <h1 className="text-3xl font-bold gradient-text">Admin Panel</h1>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={handleDownload} className="gap-2">
              <Download className="w-4 h-4" />
              Download Data
            </Button>
            <Button variant="default" className="gap-2 relative">
              <Upload className="w-4 h-4" />
              Upload Data
              <input
                type="file"
                accept=".json"
                onChange={handleUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </Button>
          </div>
        </div>

        {/* Content */}
        <Card className="glass-card p-8">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="awards">Awards</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="mt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">About Section</h2>
                <p className="text-muted-foreground">
                  Edit your personal information, introduction, and KPIs.
                </p>
                <div className="p-8 bg-muted/50 rounded-lg text-center">
                  <p className="text-muted-foreground">
                    Content management UI will be implemented here
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experience" className="mt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Experience Section</h2>
                <p className="text-muted-foreground">
                  Add, edit, or remove your work experience entries.
                </p>
                <div className="p-8 bg-muted/50 rounded-lg text-center">
                  <p className="text-muted-foreground">
                    Content management UI will be implemented here
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Skills Section</h2>
                <p className="text-muted-foreground">
                  Manage your skills and proficiency levels.
                </p>
                <div className="p-8 bg-muted/50 rounded-lg text-center">
                  <p className="text-muted-foreground">
                    Content management UI will be implemented here
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="mt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Projects Section</h2>
                <p className="text-muted-foreground">
                  Add, edit, or remove your portfolio projects.
                </p>
                <div className="p-8 bg-muted/50 rounded-lg text-center">
                  <p className="text-muted-foreground">
                    Content management UI will be implemented here
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="awards" className="mt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Awards Section</h2>
                <p className="text-muted-foreground">
                  Manage your awards, certifications, and trainings.
                </p>
                <div className="p-8 bg-muted/50 rounded-lg text-center">
                  <p className="text-muted-foreground">
                    Content management UI will be implemented here
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="mt-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Contact Section</h2>
                <p className="text-muted-foreground">
                  Update your contact information and social links.
                </p>
                <div className="p-8 bg-muted/50 rounded-lg text-center">
                  <p className="text-muted-foreground">
                    Content management UI will be implemented here
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
