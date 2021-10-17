/**
 * Container Component where all the course data
 * gets parsed
 */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import { createBrowserHistory } from "history";
export const history = createBrowserHistory({ forceRefresh: true });
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageCoursePage({ ...props }) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (props.courses.length === 0) {
      props.loadCourses().catch((error) => {
        alert("Loading Courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }
    if (props.authors.length === 0) {
      props.loadAuthors().catch((error) => {
        alert("Loading Authors failed" + error);
      });
    }
  }, [props.course]);

  function handleChange(e) {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      // [name] lets you use result of expression as property name of object.
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  // client side validation
  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    console.log("ASDFASFSDFAS", Object.keys(errors).length);

    // Object.keys(errors) returns an array of the objects properties, so if no properties found then no errors found
    return Object.keys(errors).length === 0;
  }

  function handleSave(e) {
    e.preventDefault();
    if (!formIsValid()) {
      return;
    }
    setSaving(true);
    props
      .saveCourse(course)
      .then(() => {
        toast.success("Course Saved.");
        history.push("/courses");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
    console.log(course);
  }

  return props.authors.length === 0 && props.courses.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <CourseForm
        course={course}
        errors={errors}
        authors={props.authors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </>
  );
}

// Gets rid of eslint warning when ommiting mapDispatchToProps.
// Need to add what we are expecing in props to get rid
// of prop validation warning.
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

// selector
export function getCoursebySlug(courses, slug) {
  return courses.find((c) => c.slug === slug || null);
}

// ownProps lets us access our components props, done by redux
// this func will run each time redux store changes
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCoursebySlug(state.courses, slug)
      : newCourse;
  return {
    course: course,
    courses: state.courses,
    authors: state.author,
  };
}

// when using object style, each property is expected to be a actionCreator function
const mapDispatchToProps = {
  loadCourses: loadCourses,
  loadAuthors: loadAuthors,
  saveCourse: saveCourse,
  //object shorthand syntax when they have the same name
};

// const connectedStateAndProps = connect(mapStateToProps,mapDispatchToProps);
// export default connect((ManageCoursePage));
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
