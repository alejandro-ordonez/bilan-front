import { Auth } from '@domain/models/auth.model';

export class User extends Auth {
  name?: string;
  lastName?: string;
  email?: string;
  metadata?: any;
  grade?: string;
  course?: string;
  courseId?: string;
  college?: string;
  collegeId?: string;
  selectedState?: string;
  selectedMunicipality?: string;
  codDane?: string;
  grantedAuthorities?: any;
  isEnabled?: boolean;
}
