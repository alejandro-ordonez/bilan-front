import { DocumentType } from '@domain/enums/document-type.enum';
import { UserType } from '@domain/enums/user-type.enum';

export class Auth {
  document?: string;
  documentType?: DocumentType;
  userType?: UserType;
  password?: string;

  static getDefault(): Auth {
    return new Auth();
  }
}
