import React from 'react';
import Submission from './Submission';

var SubmissionList = React.createClass({
  render: function() {
    var submissionNodes = this.props.data.map(function(submission) {
      return (
        <Submission title={submission.title}
          abstract={submission.abstract}
          tracks={submission.tracks}>
        </Submission>
      );
    });
    return (
      <div>
        <div>HI!</div>
        <div className="submissionList">
          {submissionNodes}
        </div>
      </div>
    );
  }
});

export default SubmissionList;