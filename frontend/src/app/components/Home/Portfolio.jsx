// "use client";

// import { useState, useEffect, useRef } from "react";
// import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchActiveProjects } from "../../../../store/slice/projectSlice";
// import { Loader2 } from "lucide-react";
// import Link from "next/link";

// export default function PortfolioSection() {
//   const dispatch = useDispatch();
//   const { activeProjects, loading, error } = useSelector((s) => s.projects);
//   const [active, setActive] = useState(0);
//   const scrollContainerRef = useRef(null);

//   useEffect(() => {
//     dispatch(fetchActiveProjects({ limit: 20 }));
//   }, [dispatch]);

//   // Transform backend data to match frontend format
//   const transformedProjects = activeProjects.map(project => ({
//     title: project.title || "Untitled Project",
//     description: project.description || "No description available",
//     tech: project.tags || [],
//     image: project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
//     live: project.liveUrl || "#",
//     github: project.githubUrl || "#",
//     slug: project._id,
//     _id: project._id
//   })) || [];

//   // Calculate project width including gap
//   const projectWidth = 400; // Approximate width of each project card
//   const gap = 32; // gap-8 = 32px

//   const scrollToProject = (index) => {
//     if (scrollContainerRef.current) {
//       const scrollPosition = index * (projectWidth + gap);
//       scrollContainerRef.current.scrollTo({
//         left: scrollPosition,
//         behavior: 'smooth'
//       });
//       setActive(index);
//     }
//   };

//   const scrollPrev = () => {
//     if (active > 0) {
//       scrollToProject(active - 1);
//     }
//   };

//   const scrollNext = () => {
//     if (active < transformedProjects.length - 1) {
//       scrollToProject(active + 1);
//     }
//   };

//   // Handle scroll events to update active indicator
//   const handleScroll = () => {
//     if (scrollContainerRef.current) {
//       const scrollLeft = scrollContainerRef.current.scrollLeft;
//       const activeIndex = Math.round(scrollLeft / (projectWidth + gap));
//       if (activeIndex !== active) {
//         setActive(activeIndex);
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <section className="relative py-4 bg-[var(--bg)] text-[var(--text-color)] overflow-hidden">
//         <div className="relative max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-extrabold mb-4">
//               Featured <span className="text-[var(--accent)]">Projects</span>
//             </h2>
//             <p className="max-w-2xl mx-auto text-lg opacity-80">
//               Hand-crafted digital products built with performance, scalability
//               and clean UI in mind.
//             </p>
//           </div>
//           <div className="flex justify-center items-center h-64">
//             <Loader2 className="animate-spin text-[var(--accent)]" size={48} />
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="relative py-4 bg-[var(--bg)] text-[var(--text-color)] overflow-hidden">
//         <div className="relative max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-extrabold mb-4">
//               Featured <span className="text-[var(--accent)]">Projects</span>
//             </h2>
//             <p className="max-w-2xl mx-auto text-lg opacity-80">
//               Hand-crafted digital products built with performance, scalability
//               and clean UI in mind.
//             </p>
//           </div>
//           <div className="text-center py-12">
//             <p className="text-red-400">Failed to load projects. Please try again later.</p>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="relative py-4 bg-[var(--bg)] text-[var(--text-color)] overflow-hidden">
//       {/* Glow */}
//       <div className="absolute -top-20 -left-20 w-96 h-96 bg-[var(--accent)] opacity-20 blur-3xl rounded-full" />
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-20 blur-3xl rounded-full" />

//       <div className="relative max-w-7xl mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-16">
//              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[var(--text-color)] to-[var(--accent)] bg-clip-text text-transparent">
//             Featured  <span className="text-[var(--accent)]">Projects</span>
//           </h2>

//           <p className="max-w-2xl mx-auto text-lg opacity-80">
//             Hand-crafted digital products built with performance, scalability
//             and clean UI in mind.
//           </p>
//         </div>

//         {/* Projects Slider */}
//         {transformedProjects.length > 0 ? (
//           <div className="relative">
//             {/* Navigation Buttons */}
//             {transformedProjects.length > 1 && (
//               <>
//                 <button
//                   onClick={scrollPrev}
//                   disabled={active === 0}
//                   className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 p-3 rounded-full bg-[var(--card-bg)] border border-[var(--border)] shadow-2xl hover:bg-[var(--accent)] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
//                 >
//                   <FaChevronLeft size={20} />
//                 </button>
//  {/* </button

//  > */}
//                 <button
//                   onClick={scrollNext}
//                   disabled={active === transformedProjects.length - 1}
//                   className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 p-3 rounded-full bg-[var(--card-bg)] border border-[var(--border)] shadow-2xl hover:bg-[var(--accent)] hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
//                 >
//                   <FaChevronRight size={20} />
//                 </button>
//               </>
//             )}

//             <div
//               ref={scrollContainerRef}
//               onScroll={handleScroll}
//               className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-6"
//               style={{
//                 scrollBehavior: 'smooth',
//                 msOverflowStyle: 'none',
//                 scrollbarWidth: 'none'
//               }}
//             >
//               <style jsx>{`
//                 div::-webkit-scrollbar {
//                   display: none;
//                 }
//               `}</style>

//               {transformedProjects.map((project, index) => (
//                 <div
//                   key={project._id}
//                   onMouseEnter={() => setActive(index)}
//                   className="min-w-[300px] md:min-w-[350px] lg:min-w-[400px] snap-center group"
//                 >
//                   <div className="relative rounded-3xl overflow-hidden bg-[var(--card-bg)] border border-[var(--border)] shadow-2xl hover:scale-[1.03] transition-all duration-500">
//                     {/* Image with Link */}
//                     <Link href={`/projects/${project.slug}`}>
//                       <div className="h-64 overflow-hidden cursor-pointer">
//                         <img
//                           src={project.image}
//                           alt={project.title}
//                           className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
//                           onError={(e) => {
//                             e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200";
//                           }}
//                         />
//                       </div>
//                     </Link>

//                     {/* Content */}
//                     <div className="p-6 space-y-4">
//                       <Link href={`/projects/${project.slug}`}>
//                         <h3 className="text-2xl font-bold hover:text-[var(--accent)] transition-colors cursor-pointer">
//                           {project.title}
//                         </h3>
//                       </Link>
//                       <p className="opacity-80">{project.description}</p>

//                       {/* Tech Tags */}
//                       <div className="flex flex-wrap gap-2">
//                         {project.tech.slice(0, 5).map((tech, i) => (
//                           <span
//                             key={i}
//                             className="px-3 py-1 text-xs rounded-full bg-[var(--accent)] bg-opacity-20 text-white"
//                           >
//                             {tech}
//                           </span>
//                         ))}
//                         {project.tech.length > 5 && (
//                           <span className="px-3 py-1 text-xs rounded-full bg-gray-700 bg-opacity-50 text-white">
//                             +{project.tech.length - 5} more
//                           </span>
//                         )}
//                       </div>

//                       {/* Links */}
//                       <div className="flex gap-4 pt-4">
//                         {project.live !== "#" && (
//                           <a
//                             href={project.live}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white hover:scale-105 transition"
//                           >
//                             Live <FaExternalLinkAlt />
//                           </a>
//                         )}
//                         {project.github !== "#" && (
//                           <a
//                             href={project.github}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition"
//                           >
//                             Code <FaGithub />
//                           </a>
//                         )}
//                         <Link
//                           href={`/projects/${project.slug}`}
//                           className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:bg-opacity-10 transition"
//                         >
//                           View Details →
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Indicator Dots with click functionality */}
//             <div className="flex justify-center gap-3 mt-8">
//               {transformedProjects.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => scrollToProject(i)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
//                     active === i
//                       ? "bg-[var(--accent)] scale-125"
//                       : "bg-gray-400 opacity-40 hover:opacity-70 hover:scale-110"
//                   }`}
//                   aria-label={`Go to project ${i + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <div className="inline-block p-8 rounded-full bg-gray-800 bg-opacity-30 mb-4">
//               <FaGithub className="text-4xl text-gray-500" />
//             </div>
//             <h3 className="text-2xl font-bold mb-2">No Projects Yet</h3>
//             <p className="text-gray-400">
//               Projects will appear here once added from the admin panel
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveProjects } from "../../../../store/slice/projectSlice";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function PortfolioSection() {
  const dispatch = useDispatch();
  const { activeProjects, loading, error } = useSelector((s) => s.projects);

  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(fetchActiveProjects({ limit: 20 }));
  }, [dispatch]);

  const projects =
    activeProjects?.map((p) => ({
      title: p.title || "Untitled Project",
      description: p.description || "No description available",
      tech: p.tags || [],
      image:
        p.image ||
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
      live: p.liveUrl || "#",
      github: p.githubUrl || "#",
      slug: p._id,
      _id: p._id,
    })) || [];

  const scrollTo = (i) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[i];
    card?.scrollIntoView({ behavior: "smooth", inline: "center" });
    setActive(i);
  };

  if (loading) {
    return (
      <section className="py-10 flex justify-center">
        <Loader2 className="animate-spin text-[var(--accent)]" size={50} />
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 text-center text-red-500">
        Failed to load projects
      </section>
    );
  }

  return (
    <section className="relative py-10 bg-[var(--bg)] text-[var(--text-color)] overflow-hidden">
      {/* Header */}
      <div className="text-center mb-14 px-4">
        <h2 className="text-3xl md:text-4xl font-bold">
          Featured <span className="text-[var(--accent)]">Projects</span>
        </h2>
        <p className="mt-3 text-gray-400 max-w-xl mx-auto">
          High-quality projects built with clean UI, performance & scalability.
        </p>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Desktop arrows */}
        {projects.length > 1 && (
          <>
            <button
              onClick={() => scrollTo(active - 1)}
              disabled={active === 0}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[var(--card-bg)] border border-[var(--border)] hover:bg-[var(--accent)] transition"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={() => scrollTo(active + 1)}
              disabled={active === projects.length - 1}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[var(--card-bg)] border border-[var(--border)] hover:bg-[var(--accent)] transition"
            >
              <FaChevronRight />
            </button>
          </>
        )}

        {/* Cards */}
        <div
          ref={scrollRef}
          onScroll={(e) => {
            const i = Math.round(
              e.target.scrollLeft / e.target.clientWidth
            );
            setActive(i);
          }}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-5 pb-6 scroll-smooth"
        >
          {projects.map((p, i) => (
            <div
              key={p._id}
              className="min-w-[85%] sm:min-w-[70%] md:min-w-[380px] snap-center"
            >
              <div className="bg-[var(--card-bg)] rounded-3xl border border-[var(--border)] overflow-hidden hover:scale-[1.03] transition">
                {/* Image */}
                <Link href={`/projects/${p.slug}`}>
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-56 object-cover"
                  />
                </Link>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="text-sm opacity-80 line-clamp-3">
                    {p.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {p.tech.slice(0, 5).map((t, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-[var(--accent)]/20 text-white"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    {p.live !== "#" && (
                      <a
                        href={p.live}
                        target="_blank"
                        className="px-4 py-2 text-sm rounded-lg bg-[var(--accent)] text-white"
                      >
                        Live <FaExternalLinkAlt className="inline ml-1" />
                      </a>
                    )}

                    {p.github !== "#" && (
                      <a
                        href={p.github}
                        target="_blank"
                        className="px-4 py-2 text-sm rounded-lg border border-[var(--border)]"
                      >
                        Code <FaGithub className="inline ml-1" />
                      </a>
                    )}

                    <Link
                      href={`/projects/${p.slug}`}
                      className="px-4 py-2 text-sm rounded-lg border border-[var(--border)]"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`w-3 h-3 rounded-full transition ${
                active === i
                  ? "bg-[var(--accent)] scale-125"
                  : "bg-gray-500/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
