
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Plus, Search, ChevronDown, X, Building2, Info } from 'lucide-react';
import { Project, Property } from './models';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProjectAssignmentWithPropertiesProps {
  file: File;
  projectId: string | null;
  projects: Project[];
  onFileProjectChange: (file: File, projectId: string | null) => void;
  onCreateProject: (name: string) => Project;
  required?: boolean;
}

const ProjectAssignmentWithProperties: React.FC<ProjectAssignmentWithPropertiesProps> = ({
  file,
  projectId,
  projects,
  onFileProjectChange,
  onCreateProject,
  required = false
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isCreatingProject, setIsCreatingProject] = useState<boolean>(false);
  const [newProjectName, setNewProjectName] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const selectedProject = projectId 
    ? projects.find(project => project.id === projectId) 
    : null;

  const filteredProjects = searchTerm 
    ? projects.filter(project => 
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : projects;

  const handleCreateProject = () => {
    if (newProjectName.trim()) {
      const newProject = onCreateProject(newProjectName.trim());
      onFileProjectChange(file, newProject.id);
      setNewProjectName('');
      setIsCreatingProject(false);
      setIsOpen(false);
    }
  };

  const toggleCreateProject = () => {
    setIsCreatingProject(!isCreatingProject);
    setNewProjectName('');
  };

  const handleClearProject = () => {
    onFileProjectChange(file, null);
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium mb-1 block">
          Project {required && <span className="text-red-500">*</span>}
          {!required && <span className="text-muted-foreground text-xs ml-1">(optional for rent rolls)</span>}
        </label>
        
        <div className="flex space-x-2">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between font-normal"
                role="combobox"
              >
                {selectedProject ? (
                  <div className="flex items-center justify-between w-full">
                    <span className="truncate">{selectedProject.name}</span>
                  </div>
                ) : (
                  "Select project"
                )}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[320px] p-0">
              <div className="p-2">
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    className="pl-10 text-sm"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                {isCreatingProject ? (
                  <div className="space-y-2">
                    <Input
                      placeholder="Enter new project name"
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      className="text-sm"
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={handleCreateProject}
                        disabled={!newProjectName.trim()}
                        className="w-full"
                      >
                        Create
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={toggleCreateProject}
                        className="w-full"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {selectedProject && (
                      <div className="mb-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={() => {
                            handleClearProject();
                            setIsOpen(false);
                          }}
                        >
                          <X className="mr-2 h-4 w-4" /> 
                          Clear Selection
                        </Button>
                      </div>
                    )}
                    <div className="max-h-[200px] overflow-y-auto">
                      {filteredProjects.length > 0 ? (
                        <div className="py-1">
                          {filteredProjects.map(project => (
                            <div
                              key={project.id}
                              className={`px-2 py-1.5 text-sm rounded cursor-pointer hover:bg-muted flex justify-between items-center ${
                                project.id === projectId ? 'bg-muted' : ''
                              }`}
                              onClick={() => {
                                onFileProjectChange(file, project.id);
                                setIsOpen(false);
                              }}
                            >
                              <span className="truncate">{project.name}</span>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                      <Info className="h-3.5 w-3.5 text-muted-foreground" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent side="right">
                                    <p className="text-xs">
                                      {project.properties?.length || 0} propert{project.properties?.length === 1 ? 'y' : 'ies'}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-6 text-center text-sm text-muted-foreground">
                          No projects found
                        </div>
                      )}
                    </div>
                    <div className="p-1 border-t">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="w-full justify-start text-sm"
                        onClick={toggleCreateProject}
                      >
                        <Plus className="mr-2 h-4 w-4" /> 
                        Create New Project
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>

          {selectedProject && (
            <Button 
              variant="outline" 
              size="icon"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleClearProject}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Properties panel that's always visible when a project is selected */}
      {selectedProject && (
        <Card className="p-3 bg-muted/30 border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Properties in this project</h3>
            <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-full">
              {selectedProject.properties?.length || 0} propert{selectedProject.properties?.length === 1 ? 'y' : 'ies'}
            </span>
          </div>
          
          {selectedProject.properties && selectedProject.properties.length > 0 ? (
            <ScrollArea className="h-[150px]">
              <div className="space-y-2">
                {selectedProject.properties.map(property => (
                  <div key={property.id} className="p-2 text-sm bg-background rounded-md">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                      <div className="font-medium truncate">{property.name}</div>
                    </div>
                    <div className="ml-5.5 text-xs text-muted-foreground mt-1">
                      {property.streetNo} {property.streetName}, {property.city}, {property.state} {property.zip}
                    </div>
                    <div className="flex justify-between ml-5.5 text-xs mt-1">
                      <div>{property.units} units</div>
                      <div>{property.sqft?.toLocaleString()} sqft</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center py-4 text-sm text-muted-foreground">
              No properties found in this project
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default ProjectAssignmentWithProperties;
