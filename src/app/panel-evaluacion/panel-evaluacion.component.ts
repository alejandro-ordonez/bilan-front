import { Component, OnInit } from '@angular/core';

import { DashboardUseCase } from '@domain/usecases/dashboard.usecase';
import { CourseToEnroll } from '@domain/models/dashboard.model';

import { EvidenceUseCase } from '@domain/usecases/evidence.usecase';

import { ActivatedRoute, Params } from '@angular/router';

import { Evidence, Phase } from '@domain/models/evidence.model';

import { Option } from '@ui/components/select/select.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-panel-evaluacion',
  templateUrl: './panel-evaluacion.component.html',
  styleUrls: ['./panel-evaluacion.component.scss'],
})
export class PanelEvaluacionComponent implements OnInit {
  modal: boolean = false;
  buttonIsDisabled: boolean = false;

  classrooms: CourseToEnroll[];

  evaluateOptions: Option[];
  evaluateForm: FormGroup;

  evaluateTotal: number = 0;

  pathActivities: string;
  courseData: any;

  phases: any[] = [
    {
      name: 'Fase preactiva',
      value: 'PRE_ACTIVE',
    },
    {
      name: 'Fase interactiva',
      value: 'INTERACTIVE',
    },
    {
      name: 'Fase postactiva',
      value: 'POST_ACTIVE',
    },
  ];

  materiaIdIndex: any = {
    1: 'competencias-socioemocionales',
    2: 'lenguaje',
    3: 'ciencias-naturales',
    4: 'competencias-ciudadanas',
    5: 'matematicas',
  };

  idMateriaIndex: any = {
    'competencias-socioemocionales': 1,
    lenguaje: 2,
    'ciencias-naturales': 3,
    'competencias-ciudadanas': 4,
    matematicas: 5,
  };

  courseIdIndex: any = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: '1',
    6: '2',
    7: '3',
    8: '4',
    9: '01',
    10: '02',
    11: '03',
    12: '04',
  };

  idCoursesIndex: any = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    '1': 5,
    '2': 6,
    '3': 7,
    '4': 8,
    '01': 9,
    '02': 10,
    '03': 11,
    '04': 12,
  };

  materia: string;
  grade: string;
  course: string;
  phase: Phase;
  evidences: Evidence[];

  evidenceId: string;
  studentDocument: string;

  constructor(
    private fb: FormBuilder,
    private dashboard: DashboardUseCase,
    private evidence: EvidenceUseCase,
    private route: ActivatedRoute
  ) {
    this.evaluateOptions = [
      {
        key: 0,
        value: 'Bajo',
      },
      {
        key: 1,
        value: 'Mínimo',
      },
      {
        key: 2,
        value: 'Satisfactorio',
      },
      {
        key: 3,
        value: 'Alto',
      },
    ];

    this.evaluateForm = this.fb.group({
      cbScore: ['', Validators.required],
      ccScore: ['', Validators.required],
      csScore: ['', Validators.required],
      tribeScore: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.materia = params.materia;
      this.grade = params.grade;
      this.course = params.course;
      this.phase = params.phase;
      this.courseData = localStorage.getItem('classTeacher') ? localStorage.getItem('classTeacher') : '';
      this.pathActivities = this.courseData;
    });

    this.getData();
  }

  async getData() {
    let allclassrooms = await this.dashboard.getClassrooms();

    this.classrooms = allclassrooms.filter(
      (classroom) => classroom.tribeId == this.idMateriaIndex[this.materia]
    );

    this.evidences = await this.evidence.getEvidences(
      this.grade,
      this.idMateriaIndex[this.materia],
      this.idCoursesIndex[this.course],
      this.phase
    );
  }

  selectEvidence(evidenceId: string, studentDocument: string) {
    this.evidenceId = evidenceId;
    this.studentDocument = studentDocument;
  }

  async getDownload(evidence: any) {
    let dataFile;

    try {
      dataFile = await this.evidence.download(evidence.fileNameEvidence);

      const url = URL.createObjectURL(
        new Blob([dataFile], { type: dataFile.type })
      );
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download =
        evidence.name + evidence.lastName + evidence.fileNameEvidence;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error(error);
      alert('Lo sentimos descarga fallida, intentalo mas tarde');
    }
  }

  sendEvaluate() {
    this.buttonIsDisabled = true;
    try {
      this.evidence.evaluate({
        student: this.studentDocument,
        evidenceId: this.evidenceId,
        cbScore: Number(this.evaluateForm.value.cbScore),
        ccScore: Number(this.evaluateForm.value.csScore),
        csScore: Number(this.evaluateForm.value.csScore),
        tribeScore: Number(this.evaluateForm.value.tribeScore),
      });
      this.modal = false;
      alert('Evaluado con exito');
      this.buttonIsDisabled = false;
      this.getData();
    } catch (error) {
      alert('Lo sentimos hubo un error, intentalo mas tarde');
      this.getData();
    }
  }

  selectChange() {
    this.evaluateTotal = Math.round(
      (Number(this.evaluateForm.value.cbScore) +
        Number(this.evaluateForm.value.csScore) +
        Number(this.evaluateForm.value.csScore) +
        Number(this.evaluateForm.value.tribeScore)) /
        4
    );
  }

  openModal() {
    this.modal = !this.modal;
  }
}
