const mongoose = require('mongoose');
const Project = require('../models/Project');
const User = require('../models/User');
require('dotenv').config();

const sampleProjects = [
  {
    title: "Train Booking Platform",
    description: "A comprehensive MERN-based train booking application with advanced features for modern travelers.",
    fullDescription: "Built a complete train booking ecosystem featuring real-time seat availability, dynamic pricing, multiple payment gateways, and live train tracking. Integrated with railway APIs for accurate scheduling and implemented secure user authentication with JWT.",
    image: "/images/projects/train-booking.png",
    liveUrl: "https://your-live-url.com",
    githubUrl: "https://github.com/your-repo/train-booking",
    tags: ["React", "Node.js", "MongoDB", "Express", "Socket.io", "JWT"],
    features: [
      "Real-time seat selection & booking",
      "Multiple payment gateway integration",
      "Live train tracking & notifications",
      "User authentication & profile management",
      "Booking history & e-tickets"
    ],
    technologies: [
      { name: "Frontend", items: ["React", "Redux Toolkit", "Tailwind CSS", "Chart.js"] },
      { name: "Backend", items: ["Node.js", "Express", "MongoDB", "Mongoose"] },
      { name: "APIs & Services", items: ["REST APIs", "Socket.io", "JWT", "Razorpay"] }
    ],
    challenges: [
      "Implemented real-time seat locking to prevent double booking",
      "Optimized database queries for faster search results",
      "Integrated multiple payment providers for flexibility"
    ],
    images: [
      "/images/projects/train-booking-1.png",
      "/images/projects/train-booking-2.png",
      "/images/projects/train-booking-3.png"
    ],
    status: "active",
    displayOrder: 1,
    startDate: new Date('2023-01-15')
  },
  {
    title: "Skill Sikhar Consultancy",
    description: "Modern business website for a growing consultancy firm with lead generation and service showcasing.",
    fullDescription: "Designed and developed a responsive business website focusing on lead generation and service presentation. Implemented smooth animations, contact forms, and SEO optimization to increase client visibility and engagement.",
    image: "/images/projects/skill-sikhar.png",
    liveUrl: "https://your-skill-sikhar.com",
    githubUrl: "https://github.com/your-repo/skillsikhar",
    tags: ["React", "Bootstrap", "CSS3", "Form Handling", "SEO"],
    features: [
      "Responsive design for all devices",
      "Contact form with email integration",
      "Service showcase with animations",
      "SEO optimized pages",
      "Fast loading performance"
    ],
    technologies: [
      { name: "Frontend", items: ["React", "Bootstrap", "CSS3", "JavaScript"] },
      { name: "Tools", items: ["Git", "Netlify", "Google Analytics"] }
    ],
    challenges: [
      "Achieved 95+ Google PageSpeed score",
      "Implemented smooth scroll animations",
      "Optimized images for fast loading"
    ],
    images: [
      "/images/projects/skill-sikhar-1.png",
      "/images/projects/skill-sikhar-2.png",
      "/images/projects/skill-sikhar-3.png"
    ],
    status: "active",
    displayOrder: 2,
    startDate: new Date('2023-03-20')
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany();
    console.log('Cleared existing projects');

    // Insert sample projects
    await Project.insertMany(sampleProjects);
    console.log('Sample projects inserted successfully');

    // Create admin user if not exists
    const adminExists = await User.findOne({ email: 'admin@portfolio.com' });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        email: 'admin@portfolio.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created');
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();