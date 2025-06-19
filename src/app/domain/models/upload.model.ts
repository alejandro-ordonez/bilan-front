import { UserType } from "@domain/enums/user-type.enum";


enum ImportStatus {
    ReadyForVerification = "Listo para verificación",
    Verifying = "Verificando",
    ApprovedWithErrors = "Aprobado con errores",
    Queued = "Encolado",
    Processing = "Procesando",
    Ok = "OK",
    Rejected = "Rechazado",
    Failed = "Fallido"
}


export class UploadModel {
    status: ImportStatus;
    importType: UserType;
    collegeId: number;
    processed: number;
    rejected: number;
    requestId: string;
    requestorId: string;
    created: string;
}