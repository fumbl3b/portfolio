import React from 'react';
import Block from '../Block/Block'
import styled from 'styled-components'
import gofish from '../../img/gofish.png'
import spaced from '../../img/spaced.png'
import cuppr from '../../img/cuppr.png'

The description for each project should explain what the app does, who it's for, and why you built it
export default function Projects(props) {
  const projectsArr = props.projects || [{
    title: 'GoFish.io',
    description: 'A multiplayer go fish simulator that runs entirely in the browser. Built alongside 4 other new web developers as practice, this is a great app to use with kids of all ages',
    img: gofish,
    liveLink: 'https://gofish-team2.vercel.app/',
    gitHubURL: 'https://github.com/thinkful-ei-rabbit/capstone-three-client-team-b',
    apiURL:'https://github.com/thinkful-ei-rabbit/capstone-three-server-team-b',
    techStack:'Utilizes  React, Socket.io, Node, and PostgreSQL',
  },
  {
    title: 'Spaced Repetition',
    description: 'A memory aid that allows users to log in and quiz themselves with vocabulary from different languages.  I built it for Data structures practice, but it is useful for learners of any age.',
    img: spaced,
    liveLink: 'https://spaced-repetition-jade.vercel.app/',
    gitHubURL: 'https://github.com/fumbl3b/spaced-repetition-capstone/tree/main/spaced-repetition',
    apiURL:'https://github.com/fumbl3b/spaced-repetition-capstone/tree/main/spaced-repetition-api',
    techStack:'Built with React, Node, Express, and PostgreSQL',
  },
  {
    title: 'CuppR',
    description: `CuppR is an anonymous coffee review aggregator. If you drink coffee, we're pretty sure you've got an opinion on it. Share that opinion here! This is for all the coffee aficionados in your life.`,
    img: cuppr,
    liveLink: 'https://cuppr-client.vercel.app/',
    gitHubURL: 'https://github.com/fumbl3b/cuppr-client',
    apiURL: 'https://github.com/fumbl3b/cuppr-api',
    techStack:'Built with React, Node, Express, PostgreSQL, and lots of coffee.',
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
          techStack={project.techStack}
        />
      )}
    </BlockContainer>

  )
}