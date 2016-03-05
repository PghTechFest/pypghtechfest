import React from 'react';
import Submission from './Submission';
import VoteForm from './VoteForm';

function zip(submissions, votes){
  var zipped = [];
  for (let submission of submissions) {
    var vote = {};
    for (var i=0; i < votes.length; i++) {
      if (votes[i].talkId === submission.id) {
        vote = votes[i];
      }
    }
    zipped.push({submission: submission, vote: vote});
  }

  return zipped;
}

var SubmissionList = React.createClass({
  render: function() {
    var combined = zip(this.props.submissions, this.props.votes);
    var submissionNodes = combined.map(function(item) {
      return (
        <tr key={item.submission.id}>
          <td>
            <Submission key={item.submission.id}
              title={item.submission.title}
              abstract={item.submission.abstract}
              tracks={item.submission.tracks}>
            </Submission>
          </td>
          <td>
            <VoteForm key={item.submission.id}
              talkId={item.submission.id}
              vote={item.vote}/>
          </td>
        </tr>
      );
    });
    return (
      <div className="submissionList">
        <form className="votingForm">
          <table>
            <tbody>
              {submissionNodes}
            </tbody>
          </table>
        </form>
      </div>
    );
  }
});

export default SubmissionList;