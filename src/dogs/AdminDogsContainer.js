import React, { Component } from 'react';
import AdminDogCard from './AdminDogCard';
import { Grid, Button, Icon, Card , Segment} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchDogs } from '../actions';
import { Link } from 'react-router-dom';

class AdminDogsContainer extends Component {

  renderDogs = () => {
    return this.props.dogs.map(dog => <AdminDogCard key={dog.id} dog={dog} />)
  }


  render() {
    if (this.props.dogsLoading || this.props.userLoading) {
      return <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
    } else {
      return (
        <Grid >
          <Grid.Row>
            <Segment basic floated="right"> 
              <Button as={Link} to='/admin/new' color="teal" icon labelPosition='left' >
                <Icon name='plus' />
                Add New Dog
              </Button>
            </Segment>
          </Grid.Row>
  
          <Grid centered>
            <Card.Group centered>
              {this.renderDogs()}
            </Card.Group>
          </Grid>
  
        </Grid>
        
      )
    }
  }
}

function msp(state) {
  return ({
    user: state.user,
    dogs: state.dogs,
    userLoading: state.userLoading,
    dogsLoading: state.dogsLoading,
    favorites: state.favorites,
    favoriteDogs: state.favoriteDogs
  })
}

export default connect(msp, { fetchDogs })(AdminDogsContainer)