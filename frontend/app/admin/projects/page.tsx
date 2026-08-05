'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Video, Images, Check, X, Smartphone, Monitor, Link as LinkIcon } from 'lucide-react';
import { CMSDataService } from '@/lib/cms/data-service';
import { formatMediaUrl } from '@/lib/cms/google-drive';
import { Project, AspectRatio, ProjectMedia } from '@/types/cms';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Media Input states for multi-media bundling
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [videoAspectRatio, setVideoAspectRatio] = useState<AspectRatio>('16:9');
  const [videoTitleInput, setVideoTitleInput] = useState('');
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
      thumbnail: '/assets/featured-projects/Artha_Capital_1.jpg',
      videoUrl: '',
      posters: [],
      media: [],
      isFeatured: true,
      isPublished: true,
    });
    setVideoUrlInput('');
    setVideoTitleInput('');
    setVideoAspectRatio('16:9');
    setImageUrlInput('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject({ ...project });
    setVideoUrlInput(project.videoUrl || '');
    setVideoTitleInput('');
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
      title: videoTitleInput || `${editingProject.title} Video`,
      displayOrder: (editingProject.media || []).length,
    };

    const updatedMedia = [...(editingProject.media || []), newVideo];
    setEditingProject({
      ...editingProject,
      videoUrl: editingProject.videoUrl || formattedUrl,
      media: updatedMedia,
    });
    setVideoUrlInput('');
    setVideoTitleInput('');
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
      title: `${editingProject.title} Photo`,
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
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#39FF14]">CMS Content Control</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Project Showcase Manager</h1>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 rounded-full border border-[#39FF14]/30 bg-[#39FF14] px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold text-black transition hover:bg-[#39FF14]/90"
        >
          <Plus size={14} /> Add New Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1417]">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 bg-[#071114] uppercase tracking-[0.2em] text-[#8ea1a7]">
            <tr>
              <th className="p-4 pl-6">Project Title & Client</th>
              <th className="p-4">Category</th>
              <th className="p-4">Bunched Media</th>
              <th className="p-4">Featured</th>
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
                        <Images size={12} /> {imageCount} photos
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    {project.isFeatured ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 px-2.5 py-1 text-[10px] uppercase text-[#39FF14]">
                        <Check size={10} /> Featured
                      </span>
                    ) : (
                      <span className="text-[10px] text-white/30 uppercase">Standard</span>
                    )}
                  </td>
                  <td className="p-4 text-right pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(project)}
                        className="rounded-lg border border-white/10 p-2 text-white hover:border-[#39FF14] hover:text-[#39FF14]"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="rounded-lg border border-white/10 p-2 text-red-400 hover:border-red-500 hover:text-red-400"
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

      {/* Edit / New Modal */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-[#0b1417] p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {editingProject.id ? 'Edit Project' : 'New Project'}
                </h2>
                <p className="text-[10px] uppercase tracking-wider text-[#39FF14]">Bundle videos, photos & Google Drive assets</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8ea1a7] hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6 text-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
                    placeholder="e.g. Nike Commercial Campaign"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Category</label>
                  <select
                    value={editingProject.category || 'Video Editing'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
                  >
                    <option value="Video Editing">Video Editing</option>
                    <option value="Motion Graphics">Motion Graphics</option>
                    <option value="Poster Series">Poster Series</option>
                    <option value="Social Reels">Social Reels</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Client Name</label>
                  <input
                    type="text"
                    value={editingProject.client || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
                    placeholder="e.g. Artha Capital / Streetwear Co"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Release Year</label>
                  <input
                    type="text"
                    value={editingProject.releaseDate || '2026'}
                    onChange={(e) => setEditingProject({ ...editingProject, releaseDate: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
                  placeholder="Describe the campaign, editorial direction, or motion design concept..."
                />
              </div>

              {/* Cover Thumbnail Image */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Thumbnail Cover Image (Google Drive / Direct URL)</label>
                <input
                  type="text"
                  placeholder="Paste Google Drive share link or image URL"
                  value={editingProject.thumbnail || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
                />
              </div>

              {/* Multi-Video Bunched Section */}
              <div className="rounded-2xl border border-[#39FF14]/20 bg-[#39FF14]/5 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-widest font-semibold text-[#39FF14] flex items-center gap-1.5">
                    <Video size={14} /> Add Video Items (Google Drive / YouTube / Direct Links)
                  </p>
                  <span className="text-[10px] text-[#8ea1a7]">Bunched Videos: {(editingProject.media || []).filter(m => m.mediaType === 'video').length}</span>
                </div>

                <div className="space-y-3">
                  <input
                    type="url"
                    placeholder="Paste Google Drive video share link or YouTube URL..."
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
                  />
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setVideoAspectRatio('16:9')}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] border ${
                          videoAspectRatio === '16:9' ? 'border-[#39FF14] text-[#39FF14]' : 'border-white/10 text-[#8ea1a7]'
                        }`}
                      >
                        <Monitor size={12} /> 16:9 Landscape
                      </button>
                      <button
                        type="button"
                        onClick={() => setVideoAspectRatio('9:16')}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[10px] border ${
                          videoAspectRatio === '9:16' ? 'border-[#39FF14] text-[#39FF14]' : 'border-white/10 text-[#8ea1a7]'
                        }`}
                      >
                        <Smartphone size={12} /> 9:16 Portrait Reel
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddVideo}
                      className="rounded-xl border border-[#39FF14]/40 bg-[#39FF14]/20 px-4 py-2 text-xs text-[#39FF14] font-medium hover:bg-[#39FF14]/30"
                    >
                      + Add Video
                    </button>
                  </div>
                </div>

                {/* List of Added Videos */}
                {(editingProject.media || []).filter((m) => m.mediaType === 'video').length > 0 && (
                  <div className="space-y-2 pt-2">
                    <p className="text-[10px] uppercase text-[#8ea1a7]">Videos in this project:</p>
                    <div className="space-y-2">
                      {(editingProject.media || [])
                        .filter((m) => m.mediaType === 'video')
                        .map((vid) => (
                          <div key={vid.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-[#071114] p-3 text-xs">
                            <div className="flex items-center gap-2 truncate pr-4">
                              <Video size={14} className="text-[#39FF14] shrink-0" />
                              <span className="truncate text-white/90">{vid.url}</span>
                              <span className="rounded bg-white/10 px-2 py-0.5 text-[9px] uppercase text-[#8ea1a7]">{vid.aspectRatio}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveVideo(vid.id)}
                              className="text-red-400 hover:text-red-300 p-1 shrink-0"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Multi-Image & Poster Bunched Section */}
              <div className="rounded-2xl border border-sky-500/20 bg-sky-500/5 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] uppercase tracking-widest font-semibold text-sky-400 flex items-center gap-1.5">
                    <Images size={14} /> Add Photos / Posters (Google Drive / Direct Links)
                  </p>
                  <span className="text-[10px] text-[#8ea1a7]">Bunched Images: {(editingProject.posters || []).length}</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="Paste Google Drive image link or direct photo URL..."
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    className="flex-1 rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-sky-400 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="rounded-xl border border-sky-400/40 bg-sky-400/20 px-4 py-2 text-xs text-sky-400 font-medium hover:bg-sky-400/30 shrink-0"
                  >
                    + Add Photo
                  </button>
                </div>

                {/* List of Added Images */}
                {(editingProject.posters || []).length > 0 && (
                  <div className="space-y-2 pt-2">
                    <p className="text-[10px] uppercase text-[#8ea1a7]">Images in this project:</p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {(editingProject.posters || []).map((imgUrl, idx) => (
                        <div key={imgUrl + idx} className="group relative rounded-xl border border-white/10 bg-[#071114] p-2 flex items-center justify-between text-xs">
                          <span className="truncate text-white/80 pr-2 text-[10px]">Photo #{idx + 1}</span>
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
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-white">
                  <input
                    type="checkbox"
                    checked={editingProject.isFeatured ?? true}
                    onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                    className="accent-[#39FF14]"
                  />
                  <span>Feature on Homepage Exhibition</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-white/10 px-5 py-2.5 text-xs text-[#8ea1a7] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full border border-[#39FF14] bg-[#39FF14] px-6 py-2.5 text-xs font-semibold text-black hover:bg-[#39FF14]/90"
                >
                  Save Project Bundle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
