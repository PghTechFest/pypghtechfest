import Submission from './Submission';
import SubmissionList from './SubmissionList';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <SubmissionList url="/api/submissions" pollInterval={200000}/>,
  document.getElementById('reactEntry')
);

