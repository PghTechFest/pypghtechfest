import Submission from './Submission';
import SubmissionList from './SubmissionList';
import React from 'react';

var data = [
        {title: "Title 1", abstract: "Abstract 1", tracks: "Front"},
        {title: "Title 2", abstract: "Abstract 2", tracks: "Back"}
      ];

React.render(
  <SubmissionList data={data}/>,
  document.getElementById('reactEntry')
);

