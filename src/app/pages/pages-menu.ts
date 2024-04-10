import { NbMenuItem } from '@nebular/theme';
export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: { icon: 'rp-dashboard', pack: 'rapisurv-icons' },
    link: '/app/dashboard',
    home: true,
  },
  {
    title: 'Applications',
    icon: { icon: 'grid-outline', pack: 'rapisurv-icons' },
    link: '/app/applications',
  },
  {
    title: 'Projects',
    icon: { icon: 'briefcase-outline', pack: 'rapisurv-icons' },
    link: '/app/projects'
  },
];


export const COLLAB_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: { icon: 'rp-dashboard', pack: 'rapisurv-icons' },
    link: '/app/dashboard',
    home: true,
  },
  {
    title: 'Projects',
    icon: { icon: 'briefcase-outline', pack: 'rapisurv-icons' },
    link: '/app/projects'
  },
];