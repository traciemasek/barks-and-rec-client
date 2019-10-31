import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

class DogCard extends Component {

  render() {
    const {img1, name, id } = this.props.dog
    return (
      <Card >
        <Image src={img1} wrapped ui={false} as={Link} to={`/adopter/dogs/${id}`}/>
        <Card.Content as={Link} to={`/adopter/dogs/${id}`}>
          <Card.Header>{name}</Card.Header>
        </Card.Content>
        <Card.Content extra>
          {/* clicking on this should create favorite and need to conditionally render this based on if the dog is one of the adopter's favorites once i have auth */}
          <Icon name="like" />
        </Card.Content>
      </Card>
      // <div>
      //   <img alt="" src={img1}/>
      //   <p>{name}</p>
      // </div>
    )
  }
}

export default DogCard
