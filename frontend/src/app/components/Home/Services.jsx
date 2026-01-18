// "use client";

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   FaCode,
//   FaLaptopCode,
//   FaUserTie,
//   FaRocket,
//   FaMobileAlt,
//   FaPalette,
//   FaShieldAlt,
//   FaLightbulb,
//   FaCogs,
//   FaRobot,
//   FaLayerGroup,
// } from "react-icons/fa";

// import { fetchServices } from "../../../../store/slice/serviceSlice";

// /* =========================
//    ICON MAP (KEY → COMPONENT)
// ========================= */
// const iconMap = {
//   FaCode: FaCode,
//   FaLaptopCode: FaLaptopCode,
//   FaUserTie: FaUserTie,
//   FaRocket: FaRocket,
//   FaMobileAlt: FaMobileAlt,
//   FaPalette: FaPalette,
//   FaShieldAlt: FaShieldAlt,
//   FaRobot: FaRobot,
//   FaLayerGroup: FaLayerGroup,
// };

// /* =========================
//    GRADIENT MAP
// ========================= */
// const gradientMap = {
//   blue: "from-blue-500 to-cyan-500",
//   purple: "from-purple-500 to-pink-500",
//   green: "from-green-500 to-emerald-500",
//   yellow: "from-yellow-400 to-orange-500",
//   red: "from-red-500 to-pink-500",
//   indigo: "from-indigo-500 to-purple-600",
// };

// const ServicesSection = () => {
//   const dispatch = useDispatch();
//   const { services, loading, error } = useSelector((state) => state.service);

//   const [activeService, setActiveService] = useState(0);

//   useEffect(() => {
//     dispatch(fetchServices());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!services?.length) return;
//     const timer = setInterval(() => {
//       setActiveService((prev) => (prev + 1) % services.length);
//     }, 4000);
//     return () => clearInterval(timer);
//   }, [services]);

//   if (loading) {
//     return <p className="text-center py-20">Loading services...</p>;
//   }

//   if (error) {
//     return <p className="text-center py-20 text-red-500">{error}</p>;
//   }

//   return (
//     <section className="py-20 bg-[var(--bg)] text-white">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* HEADER */}
//         <div className="text-center mb-14">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-4">
//             <FaCogs />
//             <span>Comprehensive Services</span>
//           </div>
//           <h2 className="text-4xl font-bold mb-4">My Services</h2>
//           <p className="opacity-80">
//             End-to-end digital solutions with modern technology
//           </p>
//         </div>

//         {/* SERVICES GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {services.map((service, index) => {
//             const Icon = iconMap[service.iconKey] || FaCode;
//             const gradient =
//               gradientMap[service.gradient] ||
//               "from-blue-500 to-cyan-500";

//             return (
//               <div
//                 key={service._id}
//                 onMouseEnter={() => setActiveService(index)}
//                 className={`p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]
//                 transition-all duration-300 hover:scale-105
//                 ${
//                   activeService === index
//                     ? "ring-2 ring-[var(--accent)]"
//                     : ""
//                 }`}
//               >
//                 {/* ICON */}
//                 <div
//                   className={`w-fit mx-auto mb-4 p-3 rounded-xl bg-gradient-to-r ${gradient}`}
//                 >
//                   <Icon className="text-3xl text-white" />
//                 </div>

//                 {/* TITLE */}
//                 <h3 className="text-xl font-bold text-center mb-2">
//                   {service.title}
//                 </h3>

//                 {/* DESCRIPTION */}
//                 <p className="text-sm text-center opacity-80">
//                   {service.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>

//         {/* FOOTER */}
//         <div className="text-center mt-16">
//           <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-4 rounded-xl">
//             <FaLightbulb className="text-yellow-400" />
//             <span>Have a project in mind? Let’s build it 🚀</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;
// "use client";

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   FaCode,
//   FaLaptopCode,
//   FaUserTie,
//   FaRocket,
//   FaMobileAlt,
//   FaPalette,
//   FaShieldAlt,
//   FaLightbulb,
//   FaCogs,
//   FaRobot,
//   FaLayerGroup,
// } from "react-icons/fa";

// import { fetchServices } from "../../../../store/slice/serviceSlice";

// /* =========================
//    ICON MAP
// ========================= */
// const iconMap = {
//   FaCode: FaCode,
//   FaLaptopCode: FaLaptopCode,
//   FaUserTie: FaUserTie,
//   FaRocket: FaRocket,
//   FaMobileAlt: FaMobileAlt,
//   FaPalette: FaPalette,
//   FaShieldAlt: FaShieldAlt,
//   FaRobot: FaRobot,
//   FaLayerGroup: FaLayerGroup,
// };

// /* =========================
//    GRADIENT MAP
// ========================= */
// const gradientMap = {
//   blue: "from-blue-500 to-cyan-500",
//   purple: "from-purple-500 to-pink-500",
//   green: "from-green-500 to-emerald-500",
//   yellow: "from-yellow-400 to-orange-500",
//   red: "from-red-500 to-pink-500",
//   indigo: "from-indigo-500 to-purple-600",
// };

// const ServicesSection = () => {
//   const dispatch = useDispatch();
//   const { services, loading, error } = useSelector(
//     (state) => state.service
//   );

//   const [activeService, setActiveService] = useState(0);

//   useEffect(() => {
//     dispatch(fetchServices());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!services?.length) return;

//     const timer = setInterval(() => {
//       setActiveService((prev) => (prev + 1) % services.length);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [services]);

//   if (loading) {
//     return <p className="text-center py-20">Loading services...</p>;
//   }

//   if (error) {
//     return <p className="text-center py-20 text-red-500">{error}</p>;
//   }

//   return (
//     <section className="py-20 bg-[var(--bg)] text-white">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* HEADER */}
//         <div className="text-center mb-14">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-4">
//             <FaCogs />
//             <span>Comprehensive Services</span>
//           </div>
//           <h2 className="text-4xl font-bold mb-4">My Services</h2>
//           <p className="opacity-80">
//             End-to-end digital solutions with modern technology
//           </p>
//         </div>

//         {/* SERVICES GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {services.map((service, index) => {
//             const Icon = iconMap[service.icon] || FaCode;
//             const gradient =
//               gradientMap[service.gradient] ||
//               "from-blue-500 to-cyan-500";

//             return (
//               <div
//                 key={service._id}
//                 onMouseEnter={() => setActiveService(index)}
//                 className={`p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]
//                 transition-all duration-300 hover:scale-105
//                 ${
//                   activeService === index
//                     ? "ring-2 ring-[var(--accent)]"
//                     : ""
//                 }`}
//               >
//                 {/* ICON */}
//                 <div
//                   className={`w-fit mx-auto mb-4 p-3 rounded-xl bg-gradient-to-r ${gradient}`}
//                 >
//                   <Icon className="text-3xl text-white" />
//                 </div>

//                 {/* TITLE */}
//                 <h3 className="text-xl font-bold text-center mb-2">
//                   {service.title}
//                 </h3>

//                 {/* DESCRIPTION */}
//                 <p className="text-sm text-center opacity-80">
//                   {service.description}
//                 </p>
//               </div>
//             );
//           })}
//         </div>

//         {/* FOOTER */}
//         <div className="text-center mt-16">
//           <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-4 rounded-xl">
//             <FaLightbulb className="text-yellow-400" />
//             <span>Have a project in mind? Let’s build it 🚀</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FaCode,
  FaLaptopCode,
  FaUserTie,
  FaRocket,
  FaMobileAlt,
  FaPalette,
  FaShieldAlt,
  FaLightbulb,
  FaCogs,
  FaRobot,
  FaLayerGroup,
} from "react-icons/fa";

import { fetchServices } from "../../../../store/slice/serviceSlice";

/* =========================
   ICON MAP
========================= */
const iconMap = {
  FaCode: FaCode,
  FaLaptopCode: FaLaptopCode,
  FaUserTie: FaUserTie,
  FaRocket: FaRocket,
  FaMobileAlt: FaMobileAlt,
  FaPalette: FaPalette,
  FaShieldAlt: FaShieldAlt,
  FaRobot: FaRobot,
  FaLayerGroup: FaLayerGroup,
};

/* =========================
   FALLBACK GRADIENTS
========================= */
const gradientMap = {
  blue: "from-blue-500 to-cyan-500",
  purple: "from-purple-500 to-pink-500",
  green: "from-green-500 to-emerald-500",
  yellow: "from-yellow-400 to-orange-500",
  red: "from-red-500 to-pink-500",
  indigo: "from-indigo-500 to-purple-600",
};

const ServicesSection = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector(
    (state) => state.service
  );

  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (!services?.length) return;

    const timer = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [services]);

  if (loading) {
    return <p className="text-center py-20">Loading services...</p>;
  }

  if (error) {
    return <p className="text-center py-20 text-red-500">{error}</p>;
  }

  return (
    <section className="py-4 bg-[var(--bg)] text-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-4">
            <FaCogs />
            <span>Comprehensive Services</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">My Services</h2>
          <p className="opacity-80">
            End-to-end digital solutions with modern technology
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || FaCode;

            const isCssGradient =
              service.gradient?.includes("linear-gradient");

            return (
              <div
                key={service._id}
                onMouseEnter={() => setActiveService(index)}
                className={`p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)]
                transition-all duration-300 hover:scale-105
                ${
                  activeService === index
                    ? "ring-2 ring-[var(--accent)]"
                    : ""
                }`}
              >
                {/* ICON */}
                <div
                  className={`w-fit mx-auto mb-4 p-3 rounded-xl ${
                    !isCssGradient
                      ? `bg-gradient-to-r ${
                          gradientMap[service.gradient] ||
                          "from-blue-500 to-cyan-500"
                        }`
                      : ""
                  }`}
                  style={
                    isCssGradient
                      ? { background: service.gradient }
                      : {}
                  }
                >
                  <Icon className="text-3xl text-white" />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold text-center mb-2">
                  {service.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-sm text-center opacity-80">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-4 rounded-xl">
            <FaLightbulb className="text-yellow-400" />
            <span>Have a project in mind? Let’s build it 🚀</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
