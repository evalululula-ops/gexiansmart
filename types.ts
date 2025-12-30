
export enum ModuleType {
  CULTURE = 'CULTURE',
  ECO_INTERACTION = 'ECO_INTERACTION',
  SAFETY_EXPLORE = 'SAFETY_EXPLORE',
  MANAGEMENT = 'MANAGEMENT'
}

export type ManagementViewType = 'brain' | 'security' | 'data-center';

export interface ArchitectureNode {
  id: string;
  label: string;
  description: string;
  type: ModuleType;
  techStack: string[];
  scenarios: string[];
  managementView?: ManagementViewType;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
