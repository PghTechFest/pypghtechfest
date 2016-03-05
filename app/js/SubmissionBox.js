import React from 'react';
import SubmissionList from './SubmissionList';
import $ from "jquery";

var SubmissionBox = React.createClass({
  loadUserFromServer: function() {
    $.ajax({
      url: this.props.userUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({user: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  loadSubmissionsFromServer: function() {
    $.ajax({
      url: this.props.submissionsUrl,
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
    return {data: [], user: { email: "" }};
  },
  componentDidMount: function() {
    this.loadUserFromServer();
    this.loadSubmissionsFromServer();
    //setInterval(this.loadSubmissionsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <SubmissionList data={this.state.data} user={this.state.user} />
    );
  }
});

export default SubmissionBox;