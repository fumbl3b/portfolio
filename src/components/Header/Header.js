import React from 'react'
import styled from 'styled-components'



export default function Header () {
  const Head = styled.div`
    background-color: yellowgreen;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  `;

  const Ulist = styled.ul`
    list-style: none;
  `;

  const Left = styled.div`
    color: white;
    background-color: blue;
    padding: 0 10px;
  `;

  const Right = styled.div`
    padding: 20px 10px;
  `;

  return (
    <Head>
        <Left>
          <h1>Harry Winkler</h1>
          <p>Web Design, Specialty Coffee Consulting</p>
        </Left>
        <Right>
          <nav>
          <Ulist>
            <a href='#contact'><li>Contact</li></a>
            <a href='#about_me'><li>About Me</li></a>
            <a href='#projects'><li>Projects</li></a>
          </Ulist>
        </nav>
        </Right>
    </Head>
  )
}