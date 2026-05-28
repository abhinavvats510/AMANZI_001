export interface Job {
  id: string;
  title: string;
  company?: string;
  description: string;
  location: string;
  mode: string;
  date: string;
}

export interface MegaMenuColumn {
  title?: string;
  links: NavLink[];
}

export interface NavLink {
  label: string;
  href: string;
  subLinks?: NavLink[];
  megaMenu?: MegaMenuColumn[];
}
