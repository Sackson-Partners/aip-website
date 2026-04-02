import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FolderOpen, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

import SectorProjectsLayout from '@/components/SectorProjectsLayout';
import ProjectCard from '@/components/ProjectCard';
import LoadingProjectCard from '@/components/LoadingProjectCard';
import ProjectDetailModal from '@/components/ProjectDetailModal';

import { aipApi } from '@/lib/aipApi'; // Use new API
import { mapSectorSlugToName } from '@/utils/mapSectorSlugToName';

const SectorProjectsPage = () => {
  const { sectorSlug } = useParams();
  const sectorName = mapSectorSlugToName(sectorSlug || '');
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const loadProjects = async () => {
    if (!sectorSlug) return;

    try {
      setLoading(true);
      setError(null);
      // Direct API call as requested
      const data = await aipApi.fetchProjectsBySector(sectorSlug);
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects:', err);
      setError('Could not load projects. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [sectorSlug]);

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <SectorProjectsLayout sectorName={sectorName}>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <LoadingProjectCard key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20 bg-[#151a21] rounded-xl border border-red-500/10">
          <p className="text-red-400 mb-6 text-lg">{error}</p>
          <Button 
            onClick={loadProjects} 
            variant="outline" 
            className="border-white/20 text-white hover:bg-white/10 gap-2"
          >
            <RefreshCcw className="w-4 h-4" /> Try Again
          </Button>
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={handleCardClick} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 bg-[#151a21]/50 rounded-xl border border-white/5 border-dashed">
          <FolderOpen className="w-16 h-16 text-gray-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-300 mb-2">No Projects Found</h3>
          <p className="text-gray-500 max-w-md text-center">
            There are currently no projects listed in the {sectorName} sector. 
            Our pipeline is constantly updated, please check back later.
          </p>
        </div>
      )}

      {selectedProject && (
        <ProjectDetailModal 
          projectId={selectedProject.id}
            initialProject={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </SectorProjectsLayout>
  );
};

export default SectorProjectsPage;