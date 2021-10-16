import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      // return updated copy of state using spread operator
      // copy existing array held in current state and then
      // add the course that was passed in on action.course
      return [...state, { ...action.course }];
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    case types.LOAD_COURSES_SUCCESS:
      // since whatever is return from our api will simply
      // replace our state, we just return the courses
      return action.courses;
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.id !== action.course.id);
    default:
      return state;
  }
}
