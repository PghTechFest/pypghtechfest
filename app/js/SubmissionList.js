import React from 'react';
import Submission from './Submission';

var SubmissionList = React.createClass({
  render: function() {
    var submissionNodes = this.props.data.map(function(submission) {
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