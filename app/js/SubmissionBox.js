import React from 'react';
import SubmissionList from './SubmissionList';
import $ from "jquery";

var SubmissionBox = React.createClass({
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
    return (
      <SubmissionList data={this.state.data} />
    );
  }
});

export default SubmissionBox;