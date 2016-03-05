import React from 'react';
import Submission from './Submission';
import $ from "jquery";

var SubmissionList = React.createClass({
  loadSubmissionsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleSubmissionSubmit: function(submission) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: submission,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadSubmissionsFromServer();
    //setInterval(this.loadSubmissionsFromServer, this.props.pollInterval);
  },
  render: function() {
    var submissionNodes = this.state.data.map(function(submission) {
      return (
        <Submission key={submission.id}
          title={submission.title}
          abstract={submission.abstract}
          tracks={submission.tracks}>
        </Submission>
      );
    });
    return (
      <div className="submissionList">
        <table>
          <tbody>
            {submissionNodes}
          </tbody>
        </table>
      </div>
    );
  }
});

export default SubmissionList;