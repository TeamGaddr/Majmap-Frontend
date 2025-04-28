// src/layout/sidebar/sidebar.constants.tsx
interface SidebarIcon {
  src: string;
  label: string;
  id: string;
  path: string;
}

export const ICONS: SidebarIcon[] = [
  { 
    src: '/assets/data.svg', 
    label: 'Upload data', 
    id: 'upload',
    path: '/dashboard/upload' 
  },
  { 
    src: '/assets/generate.svg', 
    label: 'Generate diagram', 
    id: 'generate',
    path: '/dashboard/generate' 
  },
  { 
    src: '/assets/template.svg', 
    label: 'Templates', 
    id: 'templates',
    path: '/dashboard/templates' 
  },
  { 
    src: '/assets/workflow.svg', 
    label: 'Workflow', 
    id: 'workflow',
    path: '/dashboard/workflow' 
  },
  { 
    src: '/assets/styling.svg', 
    label: 'Styling', 
    id: 'styling',
    path: '/dashboard/styling' 
  },
];

export const MORE_ACTIONS_ICON: Omit<SidebarIcon, 'src'> = {
  label: 'More actions',
  id: 'more',
  path: '#'
};