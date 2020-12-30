import React from 'react'
import styled from 'styled-components'

export default class Block extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      expand: true,
    }
    this.handleExpand = this.handleExpand.bind(this)
  }

  static defaultProps = {
    title: 'Missing Title',
    expandContent: 'Missing Expand Content'
  }

  handleExpand = () => {
    this.setState({
      expand: !this.state.expand,
    })
  }

  genFlower = () => {
    const flowerArr = ['✽', '✾', '✿', '❀', '❁'];
    const idx = Math.floor(Math.random() * flowerArr.length)
    return flowerArr[idx]
  }


  render() {

    const Title = styled.h1`
      text-align: center;
      &:hover {
        color: white;
      }
    `;

    const Block = styled.section`
      font-size: 1.5em;
      color: red;
      background-color: yellow;
      animation-duration: 4s;
      max-width: 20vw;
      min-height: 200px;
      display: block;
      margin: 10px;
      padding: 10px;
      border-radius: 5px;

    `

    const flower = this.genFlower()

    return (
      <Block onClick={this.handleExpand}>
        <Title>{flower +'    '+ this.props.title +'    '+ flower}</Title>
        {this.state.expand && (<>
          <p style={{ fontSize: 18 }}>{this.props.expandContent}</p>
          <ul>
          <li><a href={this.props.liveLink}>live app</a></li>
          <li><a href={this.props.gitHubURL}>client</a></li>          
          <li><a href={this.props.apiURL}>server</a></li>
          </ul>
        </>)}
      </Block>
    )
  }
}

