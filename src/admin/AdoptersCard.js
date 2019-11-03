import React, { Component } from 'react'

export default class AdoptersCard extends Component {
  render() {
    let { username } = this.props.adopter
    return (
      <div>
        Adopter username: {username}
      </div>
    )
  }
}
