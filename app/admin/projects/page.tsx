'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Video, Images, Check, X, Smartphone, Monitor, Star, Image as ImageIcon, Sparkles } from 'lucide-react';
import { CMSDataService } from '@/lib/cms/data-service';
import { formatMediaUrl } from '@/lib/cms/google-drive';
import { Project, AspectRatio, ProjectMedia } from '@/types/cms';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Media Input states
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [videoAspectRatio, setVideoAspectRatio] = useState<AspectRatio>('16:9');
  const [imageUrlInput, setImageUrlInput] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const list = await CMSDataService.getProjects();
    setProjects(list);
  };

  const handleOpenNew = () => {
    setEditingProject({
      title: '',
      slug: '',
      category: 'Video Editing',
      description: '',
      client: '',
      releaseDate: '2026',
      softwareUsed: ['Premiere Pro', 'After Effects'],
      projectType: 'Video Edit',
      thumbnail: '',
      videoUrl: '',
      posters: [],
      media: [],
      isFeatured: true,
      isPublished: true,
    });
    setVideoUrlInput('');
    setVideoAspectRatio('16:9');
    setImageUrlInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject({ ...project });
    setVideoUrlInput(project.videoUrl || '');
    setVideoAspectRatio('16:9');
    setImageUrlInput('');
    setIsModalOpen(true);
  };

  const handleAddVideo = () => {
    if (!videoUrlInput || !editingProject) return;
    const formattedUrl = formatMediaUrl(videoUrlInput, true);
    const newVideo: ProjectMedia = {
      id: `vid-${Date.now()}`,
      projectId: editingProject.id || '',
      mediaType: 'video',
      url: formattedUrl,
      aspectRatio: videoAspectRatio,
      title: `${editingProject.title || 'Project'} Video`,
      displayOrder: (editingProject.media || []).length,
    };

    const updatedMedia = [...(editingProject.media || []), newVideo];
    setEditingProject({
      ...editingProject,
      videoUrl: editingProject.videoUrl || formattedUrl,
      media: updatedMedia,
    });
    setVideoUrlInput('');
  };

  const handleRemoveVideo = (id: string) => {
    if (!editingProject) return;
    const updatedMedia = (editingProject.media || []).filter((m) => m.id !== id);
    const remainingVideo = updatedMedia.find((m) => m.mediaType === 'video');
    setEditingProject({
      ...editingProject,
      videoUrl: remainingVideo ? remainingVideo.url : '',
      media: updatedMedia,
    });
  };

  const handleAddImage = () => {
    if (!imageUrlInput || !editingProject) return;
    const formattedUrl = formatMediaUrl(imageUrlInput, false);
    const updatedPosters = [...(editingProject.posters || []), formattedUrl];
    const newImageMedia: ProjectMedia = {
      id: `img-${Date.now()}`,
      projectId: editingProject.id || '',
      mediaType: 'image',
      url: formattedUrl,
      aspectRatio: '3:4',
      title: `${editingProject.title || 'Project'} Photo`,
      displayOrder: (editingProject.media || []).length,
    };

    const updatedMedia = [...(editingProject.media || []), newImageMedia];
    setEditingProject({
      ...editingProject,
      thumbnail: editingProject.thumbnail || formattedUrl,
      posters: updatedPosters,
      media: updatedMedia,
    });
    setImageUrlInput('');
  };

  const handleRemoveImage = (indexToRemove: number, urlToRemove: string) => {
    if (!editingProject) return;
    const updatedPosters = (editingProject.posters || []).filter((_, idx) => idx !== indexToRemove);
    const updatedMedia = (editingProject.media || []).filter((m) => m.url !== urlToRemove);
    setEditingProject({
      ...editingProject,
      thumbnail: updatedPosters[0] || editingProject.thumbnail,
      posters: updatedPosters,
      media: updatedMedia,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    const slug = editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const formattedThumbnail = formatMediaUrl(editingProject.thumbnail || '', false);

    await CMSDataService.saveProject({
      ...editingProject,
      slug,
      thumbnail: formattedThumbnail || editingProject.thumbnail || '/assets/featured-projects/Artha_Capital_1.jpg',
      posters: editingProject.posters || [],
      media: editingProject.media || [],
    });

    setIsModalOpen(false);
    loadProjects();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await CMSDataService.deleteProject(id);
      loadProjects();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#39FF14] font-semibold">Client Admin Portal</p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">Portfolio & Projects Manager</h1>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#39FF14] bg-[#39FF14] px-6 text-xs uppercase tracking-[0.2em] font-semibold text-black hover:bg-[#39FF14]/90 transition shadow-lg shadow-[#39FF14]/10 shrink-0"
        >
          <Plus size={16} /> Add New Project
        </button>
      </div>

      {/* Responsive Mobile Cards Grid & Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1417]">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 bg-[#071114] uppercase tracking-[0.2em] text-[#8ea1a7]">
            <tr>
              <th className="p-4 pl-6">Project & Client</th>
              <th className="p-4">Category</th>
              <th className="p-4">Bunched Assets</th>
              <th className="p-4">Homepage Reel</th>
              <th className="p-4 text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {projects.map((project) => {
              const videoCount = (project.media || []).filter((m) => m.mediaType === 'video').length || (project.videoUrl ? 1 : 0);
              const imageCount = (project.posters || []).length;
              return (
                <tr key={project.id} className="hover:bg-white/5 transition">
                  <td className="p-4 pl-6 font-medium text-white">
                    <div className="font-semibold text-sm">{project.title}</div>
                    <div className="text-[10px] text-[#8ea1a7]">{project.client || 'Personal Project'} • {project.releaseDate}</div>
                  </td>
                  <td className="p-4 text-[#8ea1a7]">{project.category}</td>
                  <td className="p-4 text-[#8ea1a7]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-[#39FF14]">
                        <Video size={12} /> {videoCount} videos
                      </span>
                      <span className="flex items-center gap-1 text-sky-400">
                        <ImageIcon size={12} /> {imageCount} photos
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    {project.isFeatured ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 px-3 py-1 text-[10px] uppercase font-semibold text-[#39FF14]">
                        <Star size={10} className="fill-current" /> Featured Reel
                      </span>
                    ) : (
                      <span className="text-[10px] text-white/30 uppercase">Archive Only</span>
                    )}
                  </td>
                  <td className="p-4 text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(project)}
                        className="rounded-xl border border-white/10 p-2.5 text-white hover:border-[#39FF14] hover:text-[#39FF14] transition"
                        title="Edit Project"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="rounded-xl border border-white/10 p-2.5 text-red-400 hover:border-red-500 hover:text-red-400 transition"
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Optimized Cards List */}
      <div className="md:hidden space-y-4">
        {projects.map((project) => {
          const videoCount = (project.media || []).filter((m) => m.mediaType === 'video').length || (project.videoUrl ? 1 : 0);
          const imageCount = (project.posters || []).length;
          return (
            <div key={project.id} className="rounded-2xl border border-white/10 bg-[#0b1417] p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#39FF14] font-semibold">{project.category}</span>
                  <h3 className="text-base font-semibold text-white">{project.title}</h3>
                  <p className="text-xs text-[#8ea1a7]">{project.client || 'Personal Project'}</p>
                </div>
                {project.isFeatured && (
                  <span className="rounded-full bg-[#39FF14]/10 border border-[#39FF14]/30 px-2 py-0.5 text-[9px] uppercase font-semibold text-[#39FF14]">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs text-[#8ea1a7] pt-1">
                <span className="flex items-center gap-1 text-[#39FF14]">
                  <Video size={12} /> {videoCount} videos
                </span>
                <span className="flex items-center gap-1 text-sky-400">
                  <ImageIcon size={12} /> {imageCount} photos
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <button
                  onClick={() => handleOpenEdit(project)}
                  className="flex-1 inline-flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white hover:border-[#39FF14]"
                >
                  <Edit2 size={13} /> Edit Project
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-red-500/10 text-red-400 hover:border-red-500"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simple Client Edit/New Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0b1417] p-5 sm:p-8 shadow-2xl space-y-6 my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#39FF14] font-semibold">Easy Client Editor</p>
                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                  {editingProject.id ? 'Edit Project Details' : 'Add New Project'}
                </h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#8ea1a7] hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              {/* Step 1: Title & Category */}
              <div className="space-y-4 rounded-2xl border border-white/10 bg-[#071114] p-4">
                <p className="text-[10px] uppercase tracking-widest text-[#39FF14] font-semibold">1. Basic Information</p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase text-[#8ea1a7] mb-1">Project Name</label>
                    <input
                      type="text"
                      required
                      value={editingProject.title || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full h-11 rounded-xl border border-white/10 bg-[#0b1417] px-3.5 text-white text-sm focus:border-[#39FF14] outline-none"
                      placeholder="e.g. St. Aloysius Event Branding"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block text-[10px] uppercase text-[#8ea1a7] mb-1">Category</label>
                      <select
                        value={editingProject.category || 'Video Editing'}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="w-full h-11 rounded-xl border border-white/10 bg-[#0b1417] px-3.5 text-white focus:border-[#39FF14] outline-none"
                      >
                        <option value="Video Editing">Video Editing</option>
                        <option value="Motion Graphics">Motion Graphics</option>
                        <option value="Poster Series">Poster Series</option>
                        <option value="Social Reels">Social Reels</option>
                        <option value="Photo Editing">Photo Editing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase text-[#8ea1a7] mb-1">Client Name</label>
                      <input
                        type="text"
                        value={editingProject.client || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                        className="w-full h-11 rounded-xl border border-white/10 bg-[#0b1417] px-3.5 text-white focus:border-[#39FF14] outline-none"
                        placeholder="e.g. St. Aloysius College"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-[#8ea1a7] mb-1">Short Description</label>
                    <textarea
                      rows={2}
                      value={editingProject.description || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#0b1417] p-3 text-white focus:border-[#39FF14] outline-none"
                      placeholder="Brief overview of what was created..."
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Flagship Media Selection */}
              <div className="space-y-4 rounded-2xl border border-[#39FF14]/20 bg-[#39FF14]/5 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] uppercase tracking-widest text-[#39FF14] font-semibold flex items-center gap-1.5">
                    <Sparkles size={13} /> 2. Flagship Display Media
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase text-[#8ea1a7] mb-1">Main Cover Image (Google Drive link or Image URL)</label>
                    <input
                      type="text"
                      placeholder="Paste Google Drive share link for main photo..."
                      value={editingProject.thumbnail || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                      className="w-full h-11 rounded-xl border border-white/10 bg-[#071114] px-3.5 text-white focus:border-[#39FF14] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase text-[#8ea1a7] mb-1">Main Video Link (Optional Google Drive video or YouTube link)</label>
                    <input
                      type="text"
                      placeholder="Paste Google Drive share link for video..."
                      value={editingProject.videoUrl || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                      className="w-full h-11 rounded-xl border border-white/10 bg-[#071114] px-3.5 text-white focus:border-[#39FF14] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Additional Photos & Video Clip Items */}
              <div className="space-y-4 rounded-2xl border border-sky-500/20 bg-sky-500/5 p-4">
                <p className="text-[10px] uppercase tracking-widest text-sky-400 font-semibold flex items-center gap-1.5">
                  <Images size={13} /> 3. Additional Photos & Video Gallery
                </p>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Paste Google Drive link for additional photo or poster..."
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      className="flex-1 h-11 rounded-xl border border-white/10 bg-[#071114] px-3.5 text-white focus:border-sky-400 outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddImage}
                      className="h-11 rounded-xl border border-sky-400/40 bg-sky-400/20 px-4 text-xs text-sky-400 font-semibold hover:bg-sky-400/30 shrink-0"
                    >
                      + Add Photo
                    </button>
                  </div>

                  {/* List of Added Photos */}
                  {(editingProject.posters || []).length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {(editingProject.posters || []).map((imgUrl, idx) => (
                        <div key={imgUrl + idx} className="rounded-xl border border-white/10 bg-[#071114] p-2 flex items-center justify-between">
                          <span className="truncate text-white/80 text-[10px]">Photo #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx, imgUrl)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Homepage Feature Checkbox */}
              <div className="pt-1">
                <label className="flex items-center gap-2.5 cursor-pointer text-white">
                  <input
                    type="checkbox"
                    checked={editingProject.isFeatured ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                    className="h-4 w-4 rounded accent-[#39FF14]"
                  />
                  <span className="text-xs font-medium">Show in Homepage Featured Reels Feed</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="h-11 rounded-full border border-white/10 px-6 text-xs text-[#8ea1a7] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 rounded-full border border-[#39FF14] bg-[#39FF14] px-7 text-xs font-semibold text-black hover:bg-[#39FF14]/90 shadow-lg shadow-[#39FF14]/10"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
