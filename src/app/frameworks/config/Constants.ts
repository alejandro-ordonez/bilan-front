import { TribePoint } from '@domain/models/stat.model';
import { environment } from 'src/environments/environment';

const API = {
  baseUrl: environment.apiUrl,
  auth: {
    validate: '/auth/register/validate',
    update: '/auth/register/update',
    create: '/auth/register/create',
    login: '/auth/login',
    updateUsers: '/user/info',
  },
  user: {
    stats: '/stats',
    info: '/user/info',
    load: '/user/load?userType={{userType}}&campusCodeDane={{campusCodeDane}}',
    loadDirectivo: '/user/load?userType={{userType}}',
    updateInfo: '/user/updateInfo',
    enableUser: '/user/enable',
    gets: '/user?page={{page}}&partialDocument={{partialDocument}}',
    getStudents: '/student?page={{page}}&partialDocument={{partialDocument}}',
    getTeachers:
      '/teacher/all?page={{page}}&partialDocument={{partialDocument}}',
    getTeacher: '/teacher?document={{document}}',
    updateTeacher: '/teacher',
    updateStudent: '/student',
  },
  game: {
    questions: '/questions',
    allQuestions: '/questions/all',
    validateQuestions: '/questions/validate',
    gameInfo: '/game-info',
    allActivities: '/activities/all',
  },

  generalInfo:{
    allStates: '/general/states',
    cities: '/general/city?state={{state}}',
    colleges: '/college?stateMunId={{locationId}}',
    courses: '/general/courses'
  },

  forum: {
    get: '/forums/post?postId={{postId}}&page={{page}}',
    post: '/forums/post',
    comment: '/forums/comment',
    threads: '/forums/threads?page={{page}}',
  },
  dashboard: {
    colleges: '/college?stateMunId={{locationId}}',
    gradesCourses: '/college/grades-courses?collegeId={{collegeId}}',
    gradesCoursesDane: '/college/grades-courses?codDane={{codDane}}',
    enrollTeacher: '/teacher/enroll',
    classRooms: '/teacher/class-rooms',
    classRoom: '/teacher/class-rooms/info?classRoomId={{classroomId}}',
    studentDashboard: '/student/dashboard',
    studentDashboardSingle:
      '/dashboard/statistics/student?document={{studentDocument}}',
    collegeStatistics: '/dashboard/statistics/college?collegeId={{collegeId}}',
    collegeDaneStatistics: '/dashboard/statistics/college?codDane={{codDane}}',
    governmentStatistics: '/dashboard/statistics',
    stateStatistics: '/dashboard/statistics/state?state={{state}}',
    munStatistics: '/dashboard/statistics/municipality?munId={{munId}}&page=0',
    courseStatistics:
      '/dashboard/statistics/grade?collegeId={{collegeId}}&grade={{grade}}&courseId={{courseId}}',
  },
  evidence: {
    getAll:
      '/evidences?grade={{grade}}&tribeId={{tribeId}}&courseId={{courseId}}&phase={{phase}}',
    evaluate: '/evidences/evaluate',
    upload: '/evidences/upload?phase={{phase}}&tribeId={{tribeId}}',
    download: '/evidences/download/{{evidenceId}}',
  },
};

const API_RESPONSE = {
  auth: {
    userRequireUpdate: 'UserRequireUpdate',
    userNotFound: 'UserNotFound',
    userExists: 'UserExists',
    userUpdated: 'UserUpdated',
    userRegistered: 'UserRegistered',
  },
};

const STORAGE = {
  auth: 'auth',
  gameInfo: 'game',
  userStats: 'stats',
  userInfo: 'info',
};

const DEFAULT_TRIBE_BALANCE: TribePoint[] = [
  {
    id: 1,
    score: 1,
    actionsPoints: [],
  },
  {
    id: 2,
    score: 1,
    actionsPoints: [],
  },
  {
    id: 3,
    score: 1,
    actionsPoints: [],
  },
  {
    id: 4,
    score: 1,
    actionsPoints: [],
  },
  {
    id: 5,
    score: 1,
    actionsPoints: [],
  },
];
export { API, API_RESPONSE, STORAGE, DEFAULT_TRIBE_BALANCE };
