export type ProjectCategory = "ai-ml" | "data-viz" | "software";

export type Project = {
  slug: string;
  title: string;
  description: string;
  impact?: string;
  tags: string[];
  codeUrl: string;
  demoUrl: string | null;
  category: ProjectCategory;
  /** Optional path from public, e.g. /assets/projects/churn.png */
  image?: string;
};

const GITHUB_BASE = "https://github.com/gtejaswi2212";

export const projectCategories: Record<
  ProjectCategory,
  { label: string; description: string }
> = {
  "ai-ml": {
    label: "AI / ML Projects",
    description: "Machine learning systems, RAG, and predictive models",
  },
  "data-viz": {
    label: "Data / Visualization Projects",
    description: "Dashboards, analytics, and data pipelines",
  },
  software: {
    label: "Software Engineering Projects",
    description: "Full-stack apps, APIs, and deployment",
  },
};

/** AI/ML: From GitHub — bank-customer-churn-prediction, TravelWise-Project-RAG */
export const aiMlProjects: Project[] = [
  {
    slug: "bank-customer-churn-prediction",
    title: "Bank Customer Churn Prediction",
    description:
      "End-to-end ML system that predicts customer churn and provides an interactive web app for real-time predictions, model explainability, and retention recommendations.",
    impact: "Modular pipeline from raw data to cloud deployment; real-time risk classification",
    tags: ["Python", "Scikit-learn", "XGBoost", "Flask", "SMOTE", "Render"],
    codeUrl: `${GITHUB_BASE}/bank-customer-churn-prediction`,
    demoUrl: "https://bank-customer-churn-prediction-9k9h.onrender.com/",
    category: "ai-ml",
  },
  {
    slug: "travelwise-rag",
    title: "TravelWise: RAG Travel Assistant for NYC",
    description:
      "Adaptive RAG travel assistant that routes between local vector knowledge and live web search (Tavily), returning grounded NYC recommendations with source attribution.",
    impact: "Vector + web fallback reduces hallucinations; Streamlit UI with route indicators",
    tags: ["Python", "LangChain", "FAISS", "Gemini", "Tavily", "Streamlit"],
    codeUrl: `${GITHUB_BASE}/TravelWise-Project-RAG`,
    demoUrl: "https://travelwise-project-using-rag.onrender.com/",
    category: "ai-ml",
  },
];

/** Data/Visualization: From GitHub — retail-sales-performance-dashboard */
export const dataVizProjects: Project[] = [
  {
    slug: "retail-sales-dashboard",
    title: "Retail Sales Performance Dashboard",
    description:
      "Interactive Tableau dashboard analyzing retail sales performance with SQL and Excel. Delivers revenue growth, profit margins, seasonality, and customer retention insights.",
    impact: "Multi-page dashboards with KPIs, regional comparison, and trend forecasting",
    tags: ["Tableau", "SQL", "Excel", "MySQL"],
    codeUrl: `${GITHUB_BASE}/retail-sales-performance-dashboard`,
    demoUrl:
      "https://public.tableau.com/views/RetailSalesPerformanceDashboard_17618767413700/Dashboard2?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
    category: "data-viz",
  },
];

/** Software: From GitHub — my-portfolio */
export const softwareProjects: Project[] = [
  {
    slug: "my-portfolio",
    title: "Personal Portfolio (React)",
    description:
      "Recruiter-focused multi-page portfolio with project categories, detail pages, and experience. Built with React, Vite, TailwindCSS, and Framer Motion.",
    impact: "Structured routes for AI/ML, Data, and Software projects with GitHub integration",
    tags: ["React", "Vite", "TailwindCSS", "Framer Motion", "React Router"],
    codeUrl: `${GITHUB_BASE}/my-portfolio`,
    demoUrl: "https://gtejaswi2212.github.io/my-portfolio/",
    category: "software",
  },
];

export const featuredProjects: Project[] = aiMlProjects;
export const moreProjects: Project[] = [...dataVizProjects, ...softwareProjects];
export const allProjects: Project[] = [
  ...aiMlProjects,
  ...dataVizProjects,
  ...softwareProjects,
];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export const GITHUB_PROFILE_URL = "https://github.com/gtejaswi2212";
