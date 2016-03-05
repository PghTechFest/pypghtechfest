import Submission from './Submission';
import SubmissionList from './SubmissionList';
import SubmissionBox from './SubmissionBox';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <SubmissionBox submissionsUrl="/api/submissions" votesUrl="/api/votes" pollInterval={200000}/>,
  document.getElementById('reactEntry')
);

