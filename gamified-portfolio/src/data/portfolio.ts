import type { IconType } from 'react-icons';
import {
    SiReact, SiNodedotjs, SiMongodb,
    SiExpress,
    SiTypescript, SiTailwindcss
} from 'react-icons/si';
import { HiCode, HiLightningBolt, HiUsers, HiAcademicCap } from 'react-icons/hi';
import { FaWindows } from "react-icons/fa";
import { GiWifiRouter } from "react-icons/gi";
import { FaNetworkWired } from "react-icons/fa";

export interface Project {
    title: string;
    description: string;
    techStack: string[];
    link?: string;
    github?: string;
    status: string;
    features?: string[];
    role: string;
}

export interface Experience {
    company: string;
    role: string;
    duration: string;
    location: string;
    responsibilities: string[];
    techStack: string[];
}

export interface PortfolioData {
    personal: {
        name: string;
        role: string;
        intro: string;
        bio: string;
        location: string;
        languages: string[];
        email: string;
        links: {
            github?: string;
            linkedin?: string;
            leetcode?: string;
            twitter?: string;
        };
        stats: {
            label: string;
            value: number;
            icon: IconType;
            description: string;
        }[];
        level: number;
    };
    skills: {
        category: string;
        items: {
            name: string;
            proficiency: number;
            icon: IconType | null;
        }[];
    }[];
    projects: Project[];
    experience: Experience[];
    education: {
        institution: string;
        degree: string;
        duration: string;
        cgpa: string;
        coursework: string;
    }[];
    achievements: string[];
}

export const portfolioData: PortfolioData = {
    personal: {
        name: "Ayesha Mohapatra",
        role: "Aspiring Software Development Engineer",
        intro: "Building scalable distributed systems and solving complex algorithmic challenges.",
        bio: "Aspiring Software Development Engineer with a strong foundation in Data Structures, Algorithms, and System Design. I specialize in building high-performance backend systems and scalable full-stack applications. With over 100+ LeetCode problems solved, I thrive on optimizing code efficiency and architecting robust solutions.",
        location: "Bhubaneswar, India",
        languages: ["English", "Hindi"],
        email: "ayeshamohapatra12@gmail.com",
        links: {
            github: "https://github.com/ayesha2104",
            linkedin: "https://linkedin.com/in/ayesha-mohapatra",
            leetcode: "https://leetcode.com/u/ayeshamohapatra"
        },
        stats: [
            { label: "DSA & Problem Solving", value: 90, icon: HiLightningBolt, description: "100+ LeetCode Problems" },
            { label: "System Design", value: 85, icon: HiCode, description: "Scalable Architecture" },
            { label: "Backend Engineering", value: 88, icon: HiUsers, description: "API Development" },
            { label: "CS Fundamentals", value: 92, icon: HiAcademicCap, description: "OS, DBMS, CN" }
        ],
        level: 5
    },
    skills: [
        {
            category: "Core Computer Science",
            items: [
                { name: "Data Structures & Algo", proficiency: 90, icon: HiCode },
                { name: "System Design", proficiency: 80, icon: FaNetworkWired },
                { name: "OOPs", proficiency: 85, icon: null },
                { name: "DBMS", proficiency: 85, icon: SiMongodb },
                { name: "OS", proficiency: 85, icon: FaWindows },
                { name: "CN", proficiency: 85, icon: GiWifiRouter },

            ]
        },
        {
            category: "Backend & Cloud",
            items: [
                { name: "Node.js", proficiency: 85, icon: SiNodedotjs },
                { name: "Express.js", proficiency: 85, icon: SiExpress },
            ]
        },
        {
            category: "Frontend & Languages",
            items: [
                { name: "JavaScript/TypeScript", proficiency: 90, icon: SiTypescript },
                { name: "React.js", proficiency: 85, icon: SiReact },
                { name: "Java", proficiency: 80, icon: null },
                { name: "Tailwind CSS", proficiency: 90, icon: SiTailwindcss },
            ]
        }
    ],
    projects: [
        {
            title: "Brainiacs - Enterprise ERP System",
            role: "Full Stack Engineer",
            description: "A comprehensive educational management system handling complex data relationships and role-based access control (RBAC). Designed to manage thousands of students, teachers, and administrative records with optimal query performance.",
            techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "Redis"],
            link: "https://github.com/ayesha2104/Brainiacs",
            github: "https://github.com/ayesha2104/Brainiacs",
            status: "Completed",
            features: [
                "Implemented Role-Based Access Control (RBAC) securely using JWT middleware.",
                "Optimized database schema with complex aggregation pipelines for real-time analytics.",
                "Designed RESTful APIs handling concurrent requests efficiently.",
                "Integrated real-time dashboard for administrative monitoring."
            ]
        },
        {
            title: "CollabFlow",
            role: "Backend Architect",
            description: "A high-performance project management tool enabling multiple users to start quests, update tasks, and chat in real-time. Focuses on concurrency control and low-latency communication.",
            techStack: ["Socket.io", "React", "Node.js", "Redis", "PostgreSQL"],
            link: "#",
            status: "In Progress",
            features: [
                "Engineered real-time bi-directional communication using WebSockets (Socket.io).",
                "Implemented Optimistic UI updates for instant user feedback.",
                "Designed a scalable pub/sub architecture for chat functionality.",
                "Handled data consistency across concurrent user sessions."
            ]
        },
        {
            title: "Scalable URL Shortener",
            role: "System Designer",
            description: "A highly available and scalable URL shortening service designed to handle high read traffic. Focuses on hashing algorithms, caching strategies, and database scalability.",
            techStack: ["Node.js", "Redis", "MongoDB", "Docker", "Nginx"],
            link: "#",
            status: "In Progress",
            features: [
                "Implemented a custom base62 encoding algorithm for unique URL generation.",
                "Utilized Redis caching to reduce database read operations by 80%.",
                "Dockerized the application for consistent deployment environments.",
                "Designed for horizontal scalability behind a load balancer (Nginx)."
            ]
        },
        {
            title: "Obesity Classification using Machine Learning",
            role: "Machine Learning Engineer",
            description: "A data-driven system that predicts obesity levels based on lifestyle habits, dietary patterns, and physical attributes. Focuses on robust preprocessing, model comparison, and explainable AI to support health analytics.",
            techStack: ["Python", "Scikit-learn", "XGBoost", "SHAP", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
            link: "https://github.com/ayesha2104/obesity-classification-ml",
            github: "https://github.com/ayesha2104/obesity-classification-ml",
            status: "Completed",
            features: [
                "Preprocessed structured health data using Label Encoding, StandardScaler, and Isolation Forest to remove anomalies.",
                "Performed in-depth exploratory data analysis with correlation heatmaps, boxplots, and lifestyle-based obesity trend analysis.",
                "Applied clustering techniques including DBSCAN and KMeans with LDA to identify lifestyle–obesity group patterns.",
                "Trained and evaluated multiple classification models including Logistic Regression, Random Forest, SVM, KNN, and XGBoost.",
                "Achieved best performance with XGBoost at 96.3% accuracy across 7 obesity categories.",
                "Implemented SHAP-based explainability to identify key predictive factors such as weight, diet, physical activity, hydration, and gender.",
                "Structured the project with modular notebooks, reports, and datasets for reproducibility and scalability."
            ]
        }

    ],
    experience: [
        {
            company: "Techwalla.in",
            role: "Frontend Developer Intern",
            duration: "June 2025 - July 2025",
            location: "Remote",
            responsibilities: [
                "Developed scalable UI components using React.js, ensuring 100% responsiveness.",
                "Refactored legacy codebases to improve maintainability and performance.",
                "Collaborated in Agile sprints to deliver features ahead of schedule.",
                "Integrated secure APIs and handled complex state management."
            ],
            techStack: ["React.js", "TypeScript", "Tailwind CSS", "Git", "REST APIs"]
        }
    ],
    education: [
        {
            institution: "Silicon University, BBSR",
            degree: "B.Tech in Computer Science & Engineering",
            duration: "2023 - 2027",
            cgpa: "8.88",
            coursework: "Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, System Design"
        }
    ],
    achievements: [
        "Global Rank 500 in LeetCode Bi-Weekly Contest.",
        "Solved 500+ algorithmic problems across LeetCode, GFG, and CodeStudio.",
        "Winner of Smart India Hackathon (internal rounds).",
        "Active Open Source contributor to community projects."
    ]
};
