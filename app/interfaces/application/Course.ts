export const Courses = {
  ENG: 'ENG',
  SOFTWARE: 'SOFTWARE',
  AEROSPACE: 'AEROSPACE',
  ENERGY: 'ENERGY',
  AUTOMOTIVE: 'AUTOMOTIVE',
  ELETRONIC: 'ELETRONIC',
} as const;

export const CoursesLabels = {
  [Courses.ENG]: 'Engenharia',
  [Courses.SOFTWARE]: 'Engenharia de Software',
  [Courses.AEROSPACE]: 'Engenharia Aeroespacial',
  [Courses.ENERGY]: 'Engenharia de Energia',
  [Courses.AUTOMOTIVE]: 'Engenharia Automotiva',
  [Courses.ELETRONIC]: 'Engenharia Eletrônica',
};

export type ICourse = keyof typeof Courses;
