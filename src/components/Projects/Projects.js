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
    description: 'A memory aid that allows users to log in and quiz themselves with vocabulary from different languages.  Built with React, Node, Express, and PostgreSQL',
    img: '../img/test.jpg',
    liveLink: 'https://spaced-repetition-jade.vercel.app/',
    gitHubURL: 'https://github.com/fumbl3b/spaced-repetition-capstone/tree/main/spaced-repetition',
    apiURL:'https://github.com/fumbl3b/spaced-repetition-capstone/tree/main/spaced-repetition-api'
  },
  {
    title: 'CuppR',
    description: `CuppR is an anonymous coffee review aggregator. If you drink coffee, we're pretty sure you've got an opinion on it. Share that opinion here! Built with React, Node, Express, PostgreSQL, and lots of coffee.`,
    img: '../img/test.jpg',
    liveLink: 'https://cuppr-client.vercel.app/',
    gitHubURL: 'https://github.com/fumbl3b/cuppr-client',
    apiURL: 'https://github.com/fumbl3b/cuppr-api'
  }
];

  const BlockContainer = styled.div`
      background-color: red;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
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