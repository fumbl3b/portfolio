import React from 'react';
import Block from '../Block/Block'
import styled from 'styled-components'

export default function Projects(props) {
  const projectsArr = props.projects || [{
    title: 'GoFish.io',
    description: 'A multiplayer go fish simulator that runs entirely in the browser. Built alongside 4 other new web developers.  Utilizes  React, Socket.io, Node, and PostgreSQL',
    img: '../img/test.jpg',
    liveLink: 'https://gofish-team2.vercel.app/',
    gitHubURL: 'https://github.com/thinkful-ei-rabbit/capstone-three-client-team-b',
    apiURL:'https://github.com/thinkful-ei-rabbit/capstone-three-server-team-b'
  },
  {
    title: 'Spaced Repetition',
    description: 'A multiplayer go fish simulator that runs entirely in the browser. Built alongside 4 other new web developers.  Utilizes  React, Socket.io, Node, and PostgreSQL',
    img: '../img/test.jpg',
    liveLink: 'https://gofish-team2.vercel.app/',
    gitHubURL: 'https://github.com/thinkful-ei-rabbit/capstone-three-client-team-b',
    apiURL:'https://github.com/thinkful-ei-rabbit/capstone-three-server-team-b'
  },
  {
    title: 'CuppR',
    description: 'A multiplayer go fish simulator that runs entirely in the browser. Built alongside 4 other new web developers.  Utilizes  React, Socket.io, Node, and PostgreSQL',
    img: '../img/test.jpg',
    liveLink: 'https://gofish-team2.vercel.app/',
    gitHubURL: 'https://github.com/thinkful-ei-rabbit/capstone-three-client-team-b',
    apiURL:'https://github.com/thinkful-ei-rabbit/capstone-three-server-team-b'
  }
];

  const BlockContainer = styled.div`
      background-color: red;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      border-radius: 7px;
    `;
  return (
    <BlockContainer>
      {projectsArr.map(project =>
        <Block
          title={project.title}
          expandContent={project.description}
          img={project.img}
          gitHubURL={project.gitHubURL}
          apiURL={project.apiURL}
          liveLink={project.liveLink}
        />
      )}
    </BlockContainer>

  )
}