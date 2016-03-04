import Submission from './Submission';
import SubmissionList from './SubmissionList';
import React from 'react';
import ReactDOM from 'react-dom';

var data = [
        {id: 1, title: "Title 1", abstract: "Abstract 1", tracks: "Front"},
        {id: 2, title: "Title 2", abstract: "Abstract 2", tracks: "Back"}
      ];

ReactDOM.render(
  <SubmissionList data={data}/>,
  document.getElementById('reactEntry')
);

