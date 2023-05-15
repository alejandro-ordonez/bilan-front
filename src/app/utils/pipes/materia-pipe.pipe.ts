import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'materiaPipe',
})
export class MateriaPipePipe implements PipeTransform {
  materiaIndex: { [index: string]: any } = {
    matematicas: 'Matemáticas',
    competenciasCiudadanas: 'Competencias Ciudadanas',
    competenciasSocioemocionales: 'Competencias Socioemocionales',
    cienciasNaturales: 'Ciencias Naturales',
    lenguaje: 'Lenguaje',
    'competencias-ciudadanas': 'Competencias Ciudadanas',
    'competencias-socioemocionales': 'Competencias Socioemocionales',
    'ciencias-naturales': 'Ciencias Naturales',
  };

  transform(value: string, ...args: unknown[]): unknown {
    return this.materiaIndex[value];
  }
}
