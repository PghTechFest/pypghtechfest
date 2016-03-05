import React from 'react';
import Submission from './Submission';
import VoteForm from './VoteForm';

var SubmissionList = React.createClass({
  render: function() {
    var email = this.props.user.email
    var submissionNodes = this.props.data.map(function(submission) {
      return (
        <tr key={submission.id}>
          <td>
            <Submission key={submission.id}
              title={submission.title}
              abstract={submission.abstract}
              tracks={submission.tracks}>
            </Submission>
          </td>
          <td>
            <VoteForm key={submission.id} email={email}/>
          </td>
        </tr>
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