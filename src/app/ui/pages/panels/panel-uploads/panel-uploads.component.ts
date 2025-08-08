
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserDataUseCase } from '@domain/usecases/user-data.usecase';

@Component({
    selector: 'panel-uploads',
    templateUrl: './panel-uploads.component.html',
    styleUrls: ['./panel-uploads.component.scss'],
})
export class PanelUploadsComponent implements OnInit {
    page: number = 0;
    totalPages: number = 1;

    uploads: any;
    tipos: any = {
        TeacherImport: "Anexo 3",
        StudentImport: "Estudiantes",
        TeacherEnrollment: "Vincular Docentes",
        CollegesImport: "Colegios"
    }

    estados: any = {
        ReadyForVerification: "Listo para verificación",
        Verifying: "Verificando",
        ApprovedWithErrors: "Aprobado con errores",
        Queued: "Encolado",
        Processing: "Procesando",
        Ok: "OK",
        Rejected: "Rechazado",
        Failed: "Fallido"
    }

    async ngOnInit(): Promise<void> {
        await this.getUploads();
    }

    constructor(private userData: UserDataUseCase) {

    }

    nextPage() {
        this.page++;
    }
    lastPage() {
        this.page--;
    }


    async downloadRejected(requestId: string) {
        let dataFile;

        try {
            dataFile = await this.userData.downloadRejected(requestId);

            const url = URL.createObjectURL(
                new Blob([dataFile], { type: dataFile.type })
            );
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = requestId;

            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error(error);
            alert('Lo sentimos descarga fallida, intentalo mas tarde');
        }
    }

    async getUploads() {
        this.uploads = [];
        try {
            const response = await this.userData.getUploads(this.page.toString());
            this.uploads = response.data.map((up: any) => {
                const tipo = up.importType as string;
                const estado = up.status as string;
                return {
                    ...up,
                    tipo: this.tipos[tipo],
                    status: this.estados[estado]
                }
            })
            this.totalPages = response.npages;
        } catch (error) { }
    }

}
