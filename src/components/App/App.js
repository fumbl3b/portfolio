import React from 'react'
import Header from '../Header/Header'
import Projects from '../Projects/Projects'
import profile from '../../img/profiles.jpeg'
import Footer from '../Footer/Footer'
import styled from 'styled-components'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: `I'm a test value`
    };
  }


  render() {
    const FontWrapper = styled.div`
      font-family: sans-serif;
      background-color: eggshell;
    `;

    const Section = styled.section`
      margin: 0 40px;
    `;

    const PictureFrame = styled.div`
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
    `;

    return (

      <div className="App">
        <FontWrapper>

          <Header />
          <h3 style={{ color: 'red' }}>Contact</h3>
          <Section id='contact'>
            <PictureFrame>
              <div>
                <p>Please feel free to contact me with any interest in collaborating.</p>
                <ul>
                  <li><a href='mailto: harryewinkler@gmail.com'>Send me an email</a></li>
                  <li><a href='https://github.com/fumbl3b/'>Check out my GitHub page</a></li>
                  <li><a href='https://www.linkedin.com/in/harry-winkler/'>Connect on LinkedIn</a></li>
                </ul>
              </div>

              <img alt={`it's me`} src={profile} style={{ width: 150, marginRight: 40 }} />

            </PictureFrame>

          </Section>
          <h3 style={{ color: 'yellowgreen' }}>About Me</h3>
          <Section id='about_me'>
            <p>After spending almost a decade honing the processes of sourcing, roasting, and delivering high quality coffee to customers and cafes across the country, I'm focusing now on building web applications and systems that solve real problems.</p>
            <p>I love working on projects leverage our interconnected world to affect real change, and I love creating suprising experiences.  Sometimes conventions are meant to be broken !</p>
          </Section>
          <h3 style={{ color: 'orange' }}>Projects</h3>
          <Section id='projects'>
            <Projects />
          </Section>
        </FontWrapper>
        <Footer />
      </div>
    );
  }


}

export default App;
