import { socialLinks } from './socialLinks';

const hasGithubProfile = !socialLinks.github.includes('your-github-username');
const GITHUB_BASE = hasGithubProfile ? socialLinks.github.replace(/\/$/, '') : null;
const GITHUB_USER = hasGithubProfile ? socialLinks.github.replace(/^https?:\/\/github\.com\/?/, '').replace(/\/$/, '') : null;
const repoUrl = (repo) => (GITHUB_BASE ? `${GITHUB_BASE}/${repo}` : null);
const demoUrlForRepo = (repo) => (GITHUB_USER ? `https://${GITHUB_USER}.github.io/${repo}/` : null);

export const categoryImages = {
  data: '/images/categories/data-viz.png',
  aiMl: '/images/categories/ai-ml.png',
  software: '/images/categories/software-eng.png',
};

export const projectImages = {
  travelwise: '/images/projects/travelwise-nyc-agentic-rag.png',
  churn: '/images/projects/churn-prediction.png',
  aiMlFallback: categoryImages.aiMl,
  dataFallback: categoryImages.data,
  softwareFallback: categoryImages.software,
};

export const projectCategories = [
  {
    key: 'data',
    title: 'Data / Visualization Projects',
    description: 'Analytics, feature pipelines, validation frameworks, and data storytelling systems.',
    path: '/projects/data',
    image: categoryImages.data,
  },
  {
    key: 'ai-ml',
    title: 'AI / ML Projects',
    description: 'Retrieval systems, deep learning pipelines, and model evaluation-driven AI applications.',
    path: '/projects/ai-ml',
    image: categoryImages.aiMl,
  },
  {
    key: 'software',
    title: 'Software Engineering Projects',
    description: 'Backend architecture, APIs, automation workflows, and production engineering practices.',
    path: '/projects/software',
    image: categoryImages.software,
  },
];

export const projects = [
  {
    title: 'TravelWise NYC Agentic RAG',
    slug: 'travelwise-nyc-agentic-rag',
    category: 'ai-ml',
    categoryLabel: 'AI / ML',
    description:
      'Agentic RAG system for NYC travel recommendations using iterative retrieval, reasoning orchestration, and grounded responses.',
    stack: ['Python', 'LangGraph', 'RAG', 'FAISS', 'LLM Evaluation'],
    image: projectImages.travelwise,
    githubUrl: repoUrl('TravelWise-Project-RAG'),
    demoUrl: 'https://travelwise-project-using-rag.onrender.com/',
    featured: true,
    metrics: ['Improved answer grounding across multi-hop prompts'],
    problem:
      'Travel assistants often miss context, produce weak source grounding, and fail on multi-step intent handling.',
    approach:
      'Built an agentic RAG flow with query decomposition, retrieval orchestration, and answer validation loops for better reliability.',
    outcomes: [
      'Improved contextual relevance for location-aware travel guidance',
      'Integrated source-aware retrieval for grounded recommendations',
      'Structured chain-of-tools orchestration for multi-step user intent',
    ],
    keyFeatures: [
      'Multi-agent retrieval orchestration',
      'Source-grounded recommendation generation',
      'Iterative evaluation loop for quality checks',
    ],
    impact: 'Higher relevance and consistency for travel Q&A workflows',
  },
  {
    title: 'Bank Customer Churn Prediction',
    slug: 'bank-customer-churn-prediction',
    category: 'ai-ml',
    categoryLabel: 'AI / ML',
    description:
      'Built a machine learning pipeline to predict customer churn using structured banking data, with preprocessing, feature engineering, model training, and business-focused analysis.',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'Matplotlib', 'Seaborn'],
    image: projectImages.churn,
    githubUrl: repoUrl('bank-customer-churn-prediction'),
    demoUrl: 'https://bank-customer-churn-prediction-9k9h.onrender.com/',
    featured: true,
    metrics: ['Customer churn classification and churn-driver analysis for retention strategy'],
    problem:
      'Retention teams needed a reliable way to identify high-risk customers early and understand the factors driving churn.',
    approach:
      'Developed a full ML workflow with preprocessing, feature engineering, model selection, evaluation, and interpretability analysis.',
    outcomes: [
      'Delivered churn classification pipeline on structured banking data',
      'Benchmarked model performance with clear evaluation metrics',
      'Produced feature-importance insights to guide retention interventions',
    ],
    keyFeatures: [
      'End-to-end churn prediction workflow',
      'Model evaluation and comparison',
      'Feature importance and business insight reporting',
    ],
    impact: 'Improved clarity on churn drivers and retention opportunities',
  },
  {
    title: 'Large-Scale Scientific Data Pipeline',
    slug: 'large-scale-scientific-data-pipeline',
    category: 'data',
    categoryLabel: 'Data / Visualization',
    description:
      'Distributed pipeline and ML framework for billion-scale longitudinal records with robust data quality controls.',
    stack: ['Python', 'SQL', 'PyTorch', 'Distributed Computing'],
    image: projectImages.dataFallback,
    githubUrl: repoUrl('scientific-data-pipeline'),
    demoUrl: null,
    featured: false,
    metrics: ['1B+ records processed', '78% reduction in data quality issues'],
    problem:
      'Training quality suffered from data inconsistency, schema drift, and low observability in billion-scale records.',
    approach:
      'Engineered a distributed ML framework with validation gates, reproducible feature pipelines, and anomaly detection.',
    outcomes: [
      'Automated data quality checks before model training',
      'Versioned transformation logic for reproducibility',
      'Shift and anomaly detection for early issue detection',
    ],
    keyFeatures: [
      'Distributed ETL and training data prep',
      'Validation gates and anomaly detection',
      'Reproducible feature generation',
    ],
    impact: 'Reduced data quality issues by 78%',
  },
  {
    title: 'Medical Image Classification with Deep Learning',
    slug: 'medical-image-classification-deep-learning',
    category: 'ai-ml',
    categoryLabel: 'AI / ML',
    description:
      'CNN benchmarking pipeline for medical image classification with improved inference performance.',
    stack: ['TensorFlow', 'Keras', 'CNNs'],
    image: projectImages.aiMlFallback,
    githubUrl: repoUrl('medical-image-cnn-benchmark'),
    demoUrl: null,
    featured: false,
    metrics: ['97% classification accuracy', '40% lower inference latency'],
    problem:
      'Clinical image classification required both high predictive performance and lower inference latency.',
    approach:
      'Benchmarked VGG19 and ResNet variants, then optimized training and inference with augmentation and profiling.',
    outcomes: [
      'Built comparable model benchmarking workflow',
      'Improved generalization with regularization strategy',
      'Reduced inference latency while maintaining accuracy',
    ],
    keyFeatures: ['CNN model benchmark suite', 'Augmentation pipeline', 'Latency-aware optimization'],
    impact: '97% accuracy with 40% lower latency',
  },
  {
    title: 'API-First Workflow Service',
    slug: 'api-first-workflow-service',
    category: 'software',
    categoryLabel: 'Software Engineering',
    description:
      'Backend service architecture for workflow orchestration, modular APIs, and reliability-focused CI/CD.',
    stack: ['Node.js', 'REST APIs', 'Docker', 'CI/CD'],
    image: projectImages.softwareFallback,
    githubUrl: repoUrl('api-first-workflow-service'),
    demoUrl: null,
    featured: false,
    metrics: ['Improved delivery reliability through automated quality checks'],
    problem:
      'Teams needed stable backend workflows with clearer release controls and maintainable service boundaries.',
    approach:
      'Designed API-first architecture with modular services, deployment automation, and operational quality gates.',
    outcomes: [
      'Improved service maintainability',
      'Strengthened release confidence through CI checks',
      'Enabled faster feature iteration with modular API design',
    ],
    keyFeatures: ['Modular API architecture', 'Containerized deployment flow', 'Quality-gated CI pipeline'],
    impact: 'Improved engineering delivery quality and reliability',
  },
];

export function getProjectsByCategory(categoryKey) {
  return projects.filter((project) => project.category === categoryKey);
}

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
