import React from 'react'

const BASE_URL = 'http://localhost:8080'
// LoginComponent.js
export const LOGIN_CHECK_API = BASE_URL + '/user/login'

// ProfessorClassroom.js
export const FIND_ROLL_CALL_BY_CLASS_URL = BASE_URL + '/rollCall/classId/'

// StudentClassroom.js
export const FIND_ROLL_CALL_ID_BY_CLASS_URL = BASE_URL + '/rollCall/classId/'
export const FIND_ATTENDANCE_RECORD_BY_USER_URL =
  BASE_URL + '/attendanceRecord/user/'
export const BY_ROLL_CALL_ID_URL = '/rollcall/'

// StudentCheckInTable.js
export const CHECK_IN_BY_USER_ID_URL = BASE_URL + '/attendanceRecord/user/'

// RegisterPage.js
export const CHECK_INFO_VALID_URL = BASE_URL + '/user/checkInfoValid'
export const CREATE_USER_URL = BASE_URL + '/user/createUser'

// UserHomePage.js
export const FIND_CLASS_ID_URL =
  BASE_URL + '/classEnrolled/getClassEnroll/user'
export const FIND_CLASS_URL = BASE_URL + '/class/getClass/id'
export const FIND_CLASS_BY_USER_URL = BASE_URL + '/class/userId/'

// AddClassroomProfessor.js， AddClassroomStudent.js
export const GET_ALL_CLASS_URL = BASE_URL + '/class/getClass/'
export const CREATE_CLASS_URL = BASE_URL + '/class/createClass'
export const INSERT_ENROLL_URL = BASE_URL + '/classEnrolled/createEnroll/'
export const CHECK_ENROLL_URL = BASE_URL + '/classEnrolled/getClassEnroll/'
export const SEARCH_CLASS_URL = BASE_URL + '/class/getClassByTitle/'

// AttendanceDetailBySession.js
export const FIND_ALL_USER_URL = BASE_URL + '/user/nameIdPair/'
export const FIND_ALL_USER_BY_ROLLCALL_ID_URL =
  BASE_URL + '/attendanceRecord/rollCall/'
export const FIND_STUDENT_URL = BASE_URL + '/user/'

// AttendanceDetailByUser.js
export const FIND_ATTENDANCE_STATUS_URL = BASE_URL + '/attendanceRecord/user/'

// AttendenceRecordTable.js
export const FIND_STUDENT_ID_URL =
  BASE_URL + '/classEnrolled/getClassEnroll/user'
export const FIND_ROLL_CALL_ID_URL = BASE_URL + '/attendanceRecord/user/'
export const FIND_ROLL_CALL_URL = BASE_URL + '/rollCall/'
export const FIND_ALL_USER_BY_ROLLCALL_ID =
  BASE_URL + '/attendanceRecord/rollCall/'
export const FIND_STUDENT = BASE_URL + '/user/'

// Classrooms.js
export const DELETE_STUDENT_CLASS_URL =
  BASE_URL + '/classEnrolled/getClassEnroll/'
export const DELETE_PROFESSOR_CLASS_URL = BASE_URL + '/class/getClass/Id'

// RollCall.js
export const FIND_ALL_ENROLL_STUDENT_URL =
  BASE_URL + '/classEnrolled/getUser/class'
export const CREATE_ROLL_CALL_URL = BASE_URL + '/rollCall/createRollCall'

// StudentAttendanceTable.js
export const FIND_ALL_USER = BASE_URL + '/user/nameIdPair/'
export const FIND_ALL_STUDENT_BY_CLASS_ID =
  BASE_URL + '/classEnrolled/getClassEnroll/class'

//InvitationForm.js
export const GET_ALL_TITLE = BASE_URL + '/class/getDistinctClassTitle'
export const GET_USER_BY_TITLE = BASE_URL + '/class/getClassByTitle/'
export const GET_ALL_CLASS = BASE_URL + '/class/getAll'
