import {
  Users,
  Target,
  Zap,
  Briefcase,
  BarChart3,
  ShieldCheck,
  Search,
  Map,
  UserCheck,
  Handshake,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#expertise' },
  {
    label: 'Products',
    href: '#',
    megaMenu: [
      {
        links: [
          { label: 'Amanzi ATS', href: '#ats' },
          { label: 'Assessment Tool', href: '#assessment-tool' }
        ]
      }
    ]
  },
  { label: 'Services', href: '#services' },
  { label: 'Jobs', href: '#careers' },
];

export const SERVICES = [
  {
    title: 'Permanent Staffing',
    description: 'Precision-driven search for long-term pillars. We don’t just match skills; we align culture and ambition for sustainable growth.',
    icon: Users,
    features: ['Cultural Alignment', 'Retention Focus', 'Deep Market Access']
  },
  {
    title: 'Executive Search',
    description: 'Discreet, high-stakes leadership acquisition. We identify visionaries who can navigate complexity and drive enterprise value.',
    icon: Target,
    features: ['C-Suite Focus', 'Confidential Search', 'Global Network']
  },
  {
    title: 'Contract Staffing',
    description: 'Agile talent for dynamic project needs. High-caliber specialists ready to integrate and deliver immediate business impact.',
    icon: Clock,
    features: ['Rapid Deployment', 'Vetted Specialists', 'Scalable Models']
  },
  {
    title: 'Bulk Hiring',
    description: 'Strategic volume recruitment without compromising quality. Optimized pipelines for rapid team scaling and new market entries.',
    icon: Zap,
    features: ['Process Automation', 'Quality at Scale', 'Time-to-Hire Focus']
  },
  {
    title: 'RPO Solutions',
    description: 'End-to-end recruitment process outsourcing. We become your internal talent engine, driving efficiency and employer branding.',
    icon: Briefcase,
    features: ['Cost Optimization', 'Brand Integration', 'Data-Driven Hiring']
  },
  {
    title: 'Industry-Specific Hiring',
    description: 'Niche expertise in Tech, Finance, and Engineering. We speak the language of your industry to find the 1% of talent.',
    icon: ShieldCheck,
    features: ['Domain Expertise', 'Technical Screening', 'Niche Pipelines']
  }
];

export const PAIN_POINTS = [
  {
    title: 'Stagnant Hiring Cycles',
    description: 'Positions remaining open for 90+ days, stalling critical projects and draining internal resources.',
    icon: Clock
  },
  {
    title: 'The Quality Gap',
    description: 'Reviewing hundreds of resumes only to find a lack of technical depth or cultural misalignment.',
    icon: AlertCircle
  },
  {
    title: 'High Attrition Rates',
    description: 'New hires leaving within 6 months due to poor expectation setting or mismatched capabilities.',
    icon: TrendingUp
  }
];

export const PROCESS_STEPS = [
  {
    id: '01',
    title: 'CV Screening',
    description: 'Our recruitment process starts with intelligent CV screening to identify candidates based on skills, experience, domain expertise, and role alignment.'
  },
  {
    id: '02',
    title: 'Advanced Technical Screening',
    description: 'Shortlisted candidates undergo detailed evaluation by experienced Technical Recruiters to validate technical competency, communication, and project expertise.'
  },
  {
    id: '03',
    title: 'L1 Online Assessment',
    description: 'Candidates are assessed through our advanced online assessment platform featuring technical tests, coding evaluations, aptitude, and domain-specific assessments.'
  },
  {
    id: '04',
    title: 'Quality-Driven Staffing',
    description: 'Our multi-level screening process ensures faster hiring, better candidate quality, reduced interview effort, and data-driven recruitment decisions.'
  }
];

export const STATS = [
  { value: '450+', label: 'Executive Placements', suffix: '' },
  { value: '94', label: 'Client Retention Rate', suffix: '%' },
  { value: '18', label: 'Avg. Days to Hire', suffix: '' },
  { value: '12', label: 'Industries Served', suffix: '' }
];

export const CASE_STUDIES = [
  {
    company: 'FinTech Unicorn',
    title: 'Scaling Engineering from 0 to 50 in 6 Months',
    challenge: 'A rapidly growing startup needed to build a robust engineering team in a hyper-competitive market without lowering the bar for quality.',
    result: 'Successfully placed 52 engineers with a 98% retention rate over the first year, reducing average time-to-hire by 40%.',
    image: 'https://picsum.photos/seed/fintech/800/600'
  },
  {
    company: 'Global Logistics Firm',
    title: 'C-Suite Transformation',
    challenge: 'A legacy enterprise required a new CTO to lead their digital transformation initiative, requiring a rare blend of technical vision and change management.',
    result: 'Identified and secured a visionary leader within 45 days who has since delivered a 30% increase in operational efficiency.',
    image: 'https://picsum.photos/seed/logistics/800/600'
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Precision Sourcing',
    description: 'We pinpoint the exact 1% of talent that fits your specific DNA and ambition.',
    icon: Target
  },
  {
    title: 'High-Velocity Hiring',
    description: 'Our average time-to-hire is 18 days, significantly faster than the industry average.',
    icon: Zap
  },
  {
    title: 'Vetted Quality',
    description: 'Every candidate undergoes a multi-layer evaluation for high intent and capability.',
    icon: UserCheck
  },
  {
    title: 'Global Network',
    description: 'Access a worldwide network of passive candidates not active on job boards.',
    icon: Globe
  }
];
