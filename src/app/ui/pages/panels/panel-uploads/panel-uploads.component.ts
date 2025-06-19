
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@application/auth/auth.service';
import { CoursesOptions } from '@domain/data';
import { gradeOptions } from '@domain/data/grades';
import { tribesOptions } from '@domain/data/tribes';
import { DocumentType } from '@domain/enums/document-type.enum';
import { UserType } from '@domain/enums/user-type.enum';
import { ClassRoom } from '@domain/models/classroom.model';
import { StudentDto } from '@domain/models/student.model';
import { TeacherDto } from '@domain/models/teacher.model';
import { UploadModel } from '@domain/models/upload.model';
import { User } from '@domain/models/user.model';
import { TeacherUseCase } from '@domain/usecases';

import { DashboardUseCase } from '@domain/usecases/dashboard.usecase';
import { StudentUseCase } from '@domain/usecases/student.usecase';
import { UserDataUseCase } from '@domain/usecases/user-data.usecase';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Option } from '@ui/components/select/select.component';

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
        TeacherImport: "Docentes",
        StudentImport: "Estudiantes",
        TeacherEnrollment: "Vincular Docentes",
        CollegeImport: "Colegios"
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
            const ups = await this.userData.getUploads(this.page.toString());
            this.uploads = ups.map((up: any) => {
                const tipo = up.importType as string;
                return {
                    ...up,
                    tipo: this.tipos[tipo]
                }
            })
        } catch (error) { }
    }

}
