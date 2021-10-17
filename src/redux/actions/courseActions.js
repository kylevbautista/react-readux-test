import * as types from "./actionTypes";
import * as courseAPI from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusAction";

// action creator
// export function createCourse(course) {
//   return { type: types.CREATE_COURSE, course: course };
// }

// action creator for async api call
// gets called only when it courses gets loaded correctly
export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses: courses };
}

export function updateCourseSuccess(savedCourse) {
  //return { type: types.UPDATE_COURSE_SUCCESS, course: savedCourse };
  return { type: types.SAVE_COURSE_SUCCESS, course: savedCourse };
}

export function createCourseSuccess(savedCourse) {
  return { type: types.CREATE_COURSE_SUCCESS, course: savedCourse };
}

export function deleteCourseOpimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course: course };
}
// thunks are fuctions return funcitons
// dont have to pass dispatch in ourselves
// our calling code looks the same for asyn and sync calls
export function loadCourses() {
  return function (dispatch) {
    //
    dispatch(beginApiCall());
    return courseAPI
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function (dispatch) {
    //
    dispatch(beginApiCall());
    return courseAPI
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteCourse(course) {
  return function (dispatch) {
    dispatch(deleteCourseOpimistic(course));
    return courseAPI.deleteCourse(course.id);
  };
}
