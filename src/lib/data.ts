// ============================================================
// Central data file — replace with D1 database in Phase 2
// ============================================================

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  status: 'active' | 'coming-soon' | 'beta';
  features: string[];
}

export interface ShowcaseEntry {
  slug: string;
  title: string;
  category: 'live-demo' | 'industry-spotlight' | 'before-after' | 'future-forecast' | 'build-log';
  categoryLabel: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  date: string;
}

// ---- PROJECTS ----
export const projects: Project[] = [
  {
    slug: 'docuflow-ai',
    title: 'DocuFlow AI',
    tagline: 'Intelligent document processing that learns your workflow',
    description:
      'DocuFlow AI reads, classifies, and extracts data from business documents — invoices, contracts, reports — with near-human accuracy. It adapts to your specific document formats and improves over time.',
    tags: ['Document Processing', 'NLP', 'Automation'],
    status: 'active',
    features: [
      'Automatic document classification (invoices, contracts, receipts, etc.)',
      'Intelligent data extraction with 97%+ accuracy',
      'Custom training on your specific document templates',
      'API-first design — integrates with any existing workflow',
      'Real-time processing dashboard',
    ],
  },
  {
    slug: 'insightengine',
    title: 'InsightEngine',
    tagline: 'Turn raw business data into clear, actionable decisions',
    description:
      'InsightEngine connects to your existing data sources and uses AI to surface trends, anomalies, and opportunities that humans might miss. No data science degree required.',
    tags: ['Analytics', 'Business Intelligence', 'AI'],
    status: 'beta',
    features: [
      'Connect any data source (SQL, spreadsheets, APIs)',
      'Natural language queries — ask questions in plain English',
      'Automated anomaly detection and alerting',
      'Visual dashboards generated from your data',
      'Scheduled report generation',
    ],
  },
  {
    slug: 'replyhub',
    title: 'ReplyHub',
    tagline: 'AI-powered customer communication that still feels human',
    description:
      'ReplyHub helps teams respond to customer inquiries faster while maintaining a personal, human touch. It drafts context-aware replies, learns your brand voice, and routes complex issues to the right person.',
    tags: ['Customer Service', 'NLP', 'Communication'],
    status: 'coming-soon',
    features: [
      'Draft replies based on conversation context and history',
      'Brand voice training — matches your tone and style',
      'Intelligent ticket routing and priority classification',
      'Multi-channel support (email, chat, social)',
      'Human-in-the-loop approval for sensitive responses',
    ],
  },
];

// ---- SHOWCASE ENTRIES ----
export const showcaseEntries: ShowcaseEntry[] = [
  {
    slug: 'ai-document-revolution',
    title: 'The Document Revolution',
    category: 'before-after',
    categoryLabel: 'Before & After',
    tagline: 'How AI turned a 4-hour process into 12 minutes',
    description:
      'A mid-size accounting firm was spending 4+ hours daily manually processing invoices. We deployed DocuFlow AI and watched the transformation unfold.',
    problem:
      'Manual invoice processing consumed 20+ hours per week across the team. Errors were common, data entry was tedious, and staff turnover was high because nobody wanted to do it.',
    solution:
      'DocuFlow AI was trained on the firm\'s specific invoice formats over a 2-week onboarding period. It now automatically reads, classifies, and extracts key data from every incoming document.',
    impact:
      'Processing time dropped from 4 hours to 12 minutes per batch. Error rate fell from ~8% to under 0.5%. The team now spends their time on advisory work instead of data entry.',
    date: '2026-03',
  },
  {
    slug: 'ai-reshaping-business-2027',
    title: 'How AI Will Reshape Business by 2027',
    category: 'future-forecast',
    categoryLabel: 'Future Forecast',
    tagline: 'The trends every business leader needs to understand now',
    description:
      'A forward-looking analysis of where AI is headed and how businesses should prepare. Based on current trajectories, research, and real deployment data.',
    problem:
      'Most businesses are either paralyzed by AI uncertainty or chasing hype without strategy. Both approaches leave them vulnerable.',
    solution:
      'A clear-eyed look at what AI can realistically do today, what it will be able to do in 12–18 months, and practical steps to prepare — without the fear or the hype.',
    impact:
      'Businesses that start preparing now will have a 2–3 year advantage over those that wait. The key is embracing AI deliberately, not reactively.',
    date: '2026-03',
  },
  {
    slug: 'building-docuflow',
    title: 'Building DocuFlow: A Build Log',
    category: 'build-log',
    categoryLabel: 'Build Log',
    tagline: 'Behind the scenes of how we built our document AI from scratch',
    description:
      'A transparent look at the decisions, challenges, and breakthroughs that went into creating DocuFlow AI. From initial prototype to production deployment.',
    problem:
      'Existing document processing tools were either too expensive, too rigid, or too inaccurate for small-to-mid businesses. We needed something better.',
    solution:
      'We built DocuFlow with a modular architecture that learns from each client\'s documents. The key insight was treating each client as a unique training environment rather than forcing a one-size-fits-all model.',
    impact:
      'DocuFlow now processes documents faster and more accurately than tools costing 5x more, and it keeps improving with every document it sees.',
    date: '2026-02',
  },
];

// ---- HELPERS ----
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getShowcaseEntry(slug: string): ShowcaseEntry | undefined {
  return showcaseEntries.find((e) => e.slug === slug);
}

export const categoryColors: Record<string, string> = {
  'live-demo': 'bg-teal/20 text-teal',
  'industry-spotlight': 'bg-accent/20 text-accent',
  'before-after': 'bg-amber-500/20 text-amber-400',
  'future-forecast': 'bg-purple-500/20 text-purple-400',
  'build-log': 'bg-emerald-500/20 text-emerald-400',
};

export const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  active: { bg: 'bg-success/10', text: 'text-success', label: 'Active' },
  beta: { bg: 'bg-amber-500/10', text: 'text-amber-600', label: 'Beta' },
  'coming-soon': { bg: 'bg-accent/10', text: 'text-accent', label: 'Coming Soon' },
};
