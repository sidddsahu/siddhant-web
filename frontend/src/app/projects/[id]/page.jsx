"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById, clearCurrentProject } from "../../../../store/slice/projectSlice";
import { useParams, useRouter } from "next/navigation";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaTag,
  FaCode,
  FaLightbulb,
  FaRocket,
  FaArrowLeft,
  FaImages
} from "react-icons/fa";
import {
  Calendar,
  Clock,
  CheckCircle,
  ChevronLeft,
  Globe,
  Image as ImageIcon,
  Target,
  Zap,
  Loader2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { currentProject: project, loading, error } = useSelector((s) => s.projects);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    }

    return () => {
      dispatch(clearCurrentProject());
    };
  }, [dispatch, id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getProjectDuration = () => {
    if (!project?.startDate) return "";
    const start = new Date(project.startDate);
    const end = project.endDate ? new Date(project.endDate) : new Date();

    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 +
                      (end.getMonth() - start.getMonth());

    if (diffMonths < 1) return "Less than 1 month";
    if (diffMonths === 1) return "1 month";
    if (diffMonths < 12) return `${diffMonths} months`;

    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;

    if (months === 0) return `${years} year${years > 1 ? 's' : ''}`;
    return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-[var(--accent)] mx-auto mb-4" size={48} />
          <p className="text-gray-400">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="p-4 bg-red-500/20 rounded-full inline-block mb-4">
            <AlertCircle className="text-red-400" size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <p className="text-gray-400 mb-6">
            {error || "The project you're looking for doesn't exist."}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.back()}
              className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50/10 transition"
            >
              Go Back
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const allImages = [project.image, ...(project.images || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-color)]">
      {/* Back Navigation */}
      <div className="sticky top-0 z-40 bg-[var(--bg)]/80 backdrop-blur-sm border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-[var(--accent)] transition"
          >
            <ChevronLeft size={20} />
            Back to Projects
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <h1 className="text-2xl md: font-bold mb-4">{project.title}</h1>
              <p className="text-xl opacity-80 max-w-1xl">{project.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:scale-105 transition"
                >
                  <Globe size={18} /> Visit Live Site
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-[var(--border)] rounded-lg hover:border-[var(--accent)] transition"
                >
                  <FaGithub size={18} /> View Code
                </a>
              )}
            </div>
          </div>

          {/* Project Meta Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-[var(--card-bg)] rounded-2xl p-6 border border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--accent)]/20 rounded-lg">
                <Calendar className="text-[var(--accent)]" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Timeline</p>
                <p className="font-medium">
                  {formatDate(project.startDate)}
                  {project.endDate ? ` → ${formatDate(project.endDate)}` : ' → Present'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Clock className="text-blue-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Duration</p>
                <p className="font-medium">{getProjectDuration()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <CheckCircle className="text-green-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <p className="font-medium capitalize">{project.status}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Target className="text-purple-400" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-400">Display Order</p>
                <p className="font-medium">#{project.displayOrder || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Main Image Gallery */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <ImageIcon size={24} /> Project Gallery
                </h3>
                <span className="text-sm text-gray-400">
                  {activeImageIndex + 1} of {allImages.length}
                </span>
              </div>

              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden border border-[var(--border)]">
                <img
                  src={allImages[activeImageIndex]}
                  alt={`${project.title} - Image ${activeImageIndex + 1}`}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200";
                  }}
                />
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-4">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition ${
                        activeImageIndex === index
                          ? "border-[var(--accent)]"
                          : "border-transparent hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-20 h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Full Description */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <FaRocket /> Project Overview
              </h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed whitespace-pre-line">
                  {project.fullDescription || "No detailed description available."}
                </p>
              </div>
            </div>

            {/* Features Section */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Zap size={24} /> Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4 hover:border-[var(--accent)] transition"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-green-500/20 rounded-lg mt-0.5">
                          <CheckCircle size={16} className="text-green-400" />
                        </div>
                        <p className="text-gray-600">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tags Section */}
            <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-[var(--border)]">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaTag /> Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-[var(--accent)] bg-opacity-20 text-white rounded-lg text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Links */}
            <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-[var(--border)]">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaCode /> Project Links
              </h3>
              <div className="space-y-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-green-500/20 rounded">
                        <FaExternalLinkAlt className="text-green-400" size={16} />
                      </div>
                      <span className="text-white">Live Website</span>
                    </div>
                    <span className="text-gray-400 group-hover:text-white">↗</span>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-gray-600/20 rounded">
                        <FaGithub className="text-gray-700" size={16} />
                      </div>
                      <span className="text-white">GitHub Repository</span>
                    </div>
                    <span className="text-gray-400 group-hover:text-white">↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Project Stats */}
            {/* <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-[var(--border)]">
              <h3 className="text-xl font-bold mb-4">Project Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    project.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : project.status === 'draft'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Images</span>
                  <span className="font-medium">{allImages.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Features</span>
                  <span className="font-medium">{project.features?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Technologies</span>
                  <span className="font-medium">{project.tags?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Last Updated</span>
                  <span className="font-medium">
                    {project.updatedAt
                      ? new Date(project.updatedAt).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div> */}


              {/* Challenges Section */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <FaLightbulb /> Challenges & Solutions
                </h3>
                <div className="space-y-4">
                  {project.challenges.map((challenge, index) => (
                    <div
                      key={index}
                      className="bg-[var(--card-bg)] border border-[var(--border)] rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-1.5 bg-blue-500/20 rounded-lg mt-0.5">
                          <span className="text-blue-400 font-bold">#{index + 1}</span>
                        </div>
                        <p className="text-gray-600">{challenge}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


              {/* Related Projects */}
            <div className="bg-[var(--card-bg)] rounded-2xl p-6 border border-[var(--border)]">
              <h3 className="text-xl font-bold mb-4">More Projects</h3>
              <p className="text-gray-400 text-sm mb-4">
                Check out other projects in my portfolio
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline"
              >
                View All Projects →
              </Link>
            </div>


          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-30">
        <div className="flex flex-col gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[var(--accent)] text-white rounded-full shadow-lg hover:scale-110 transition"
              title="Visit Live Site"
            >
              <FaExternalLinkAlt size={20} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:scale-110 transition"
              title="View Source Code"
            >
              <FaGithub size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}