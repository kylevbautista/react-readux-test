/**
 * Container Component where all the course data
 * gets parsed
 */
import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    if (this.props.courses.length === 0) {
      this.props.actions.loadCourses().catch((error) => {
        alert("Loading Courses failed" + error);
      });
    }
    if (this.props.authors.length === 0) {
      this.props.actions.loadAuthors().catch((error) => {
        alert("Loading Authors failed" + error);
      });
    }
  }

  handleDelete = (course) => {
    toast.success("Course Deleted");
    this.props.actions.deleteCourse(course).catch((error) => {
      toast.error("Delete Failed" + error.message, { autoClose: false });
    });
  };
  // handleDelete = async (course) => {
  //   toast.success("Course Deleted");
  //   try{
  //     await this.props.actions.deleteCourse(course);
  //   }catch(error) {
  //     toast.error("Delete Failed" + error.message, { autoClose: false });
  //   }
  // };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => {
                this.setState({ redirectToAddCoursePage: true });
              }}
            >
              Add Course
            </button>
            <CourseList
              authors={this.props.authors}
              courses={this.props.courses}
              onDeleteClick={this.handleDelete}
            />
          </>
        )}
        {this.props.courses.map((cour) => (
          <div key={cour.title}>{cour.title}</div>
        ))}
      </>
    );
  }
}

// Gets rid of eslint warning when ommiting mapDispatchToProps.
// Need to add what we are expecing in props to get rid
// of prop validation warning.
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    courses:
      state.author.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.author.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.author,
    loading: state.apiCallsInProgress,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: (course) => dispatch(courseActions.createCourse(course)),

    // this wraps all courseActions into dispatch
    actions: {
      // bindActionCreators(courseActions, dispatch)
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

// when using object style, each property is expected to be a actionCreator function
// const mapDispatchToProps = {
//   createCourse: courseActions.createCourse
// };

// const connectedStateAndProps = connect(mapStateToProps,mapDispatchToProps);
// export default connect((CoursesPage));
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
