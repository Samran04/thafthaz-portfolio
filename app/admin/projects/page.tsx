'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Video, Images, Check, X, Smartphone, Monitor } from 'lucide-react';
import { CMSDataService } from '@/lib/cms/data-service';
import { Project, AspectRatio } from '@/types/cms';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [videoAspectRatio, setVideoAspectRatio] = useState<AspectRatio>('16:9');
  const [videoTitleInput, setVideoTitleInput] = useState('');

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
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject({ ...project });
    setVideoUrlInput(project.videoUrl || '');
    setVideoTitleInput('');
    setVideoAspectRatio('16:9');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    const slug = editingProject.slug || editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Attach video input if provided
    let mediaList = editingProject.media || [];
    if (videoUrlInput) {
      mediaList = [
        {
          id: `vid-${Date.now()}`,
          projectId: editingProject.id || '',
          mediaType: 'video',
          url: videoUrlInput,
          aspectRatio: videoAspectRatio,
          title: videoTitleInput || editingProject.title,
          displayOrder: 0,
        },
        ...mediaList.filter((m) => m.mediaType !== 'video' || m.url !== videoUrlInput),
      ];
    }

    await CMSDataService.saveProject({
      ...editingProject,
      slug,
      videoUrl: videoUrlInput || editingProject.videoUrl,
      media: mediaList,
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
          <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Project & Video Showcase Manager</h1>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-2 rounded-full border border-[#39FF14]/30 bg-[#39FF14] px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold text-black transition hover:bg-[#39FF14]/90"
        >
          <Plus size={14} /> Add Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1417]">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 bg-[#071114] text-[10px] uppercase tracking-[0.2em] text-[#8ea1a7]">
            <tr>
              <th className="p-4">Thumbnail & Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Media Type</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-[#8ea1a7]">
            {projects.map((project) => {
              const hasVideo = Boolean(project.videoUrl || project.media.some((m) => m.mediaType === 'video'));

              return (
                <tr key={project.id} className="hover:bg-white/[0.02]">
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-black border border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={project.thumbnail} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{project.title}</p>
                      <p className="text-[10px] text-[#8ea1a7]">{project.slug}</p>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-white">{project.category}</td>
                  <td className="p-4">
                    {hasVideo ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#39FF14]">
                        <Video size={10} /> Cloudinary Video
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#8ea1a7]">
                        <Images size={10} /> Gallery Artwork
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {project.isFeatured ? (
                      <span className="rounded-full bg-[#39FF14]/20 px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#39FF14]">
                        Featured
                      </span>
                    ) : (
                      <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-wider">
                        Standard
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
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
          <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0b1417] p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-xl font-semibold text-white">
                {editingProject.id ? 'Edit Project' : 'New Project'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8ea1a7] hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
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

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
                />
              </div>

              {/* Video Showcase Configuration */}
              <div className="rounded-xl border border-[#39FF14]/20 bg-[#39FF14]/5 p-4 space-y-3">
                <p className="text-[10px] uppercase tracking-widest font-semibold text-[#39FF14] flex items-center gap-1.5">
                  <Video size={12} /> Video Stream (Cloudinary / Direct URL)
                </p>
                <div>
                  <label className="block text-[10px] uppercase text-[#8ea1a7] mb-1">Cloudinary Streaming Video URL</label>
                  <input
                    type="url"
                    placeholder="https://res.cloudinary.com/.../video.mp4"
                    value={videoUrlInput}
                    onChange={(e) => setVideoUrlInput(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase text-[#8ea1a7] mb-1">Aspect Ratio Format</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setVideoAspectRatio('16:9')}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 border ${
                        videoAspectRatio === '16:9' ? 'border-[#39FF14] text-[#39FF14]' : 'border-white/10 text-[#8ea1a7]'
                      }`}
                    >
                      <Monitor size={14} /> 16:9 Landscape
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoAspectRatio('9:16')}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 border ${
                        videoAspectRatio === '9:16' ? 'border-[#39FF14] text-[#39FF14]' : 'border-white/10 text-[#8ea1a7]'
                      }`}
                    >
                      <Smartphone size={14} /> 9:16 Portrait Reel
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Thumbnail Cover Image URL</label>
                <input
                  type="text"
                  value={editingProject.thumbnail || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
                />
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
