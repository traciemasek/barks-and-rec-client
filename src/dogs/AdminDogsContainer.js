import React, { Component } from 'react';
import AdminDogCard from './AdminDogCard';
import { Grid, Button, Icon, Card , Segment, Header} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchDogs } from '../actions';
import { Link } from 'react-router-dom';

class AdminDogsContainer extends Component {

  renderDogs = () => {
    return this.props.dogs.map(dog => <AdminDogCard key={dog.id} dog={dog} />)
  }


  render() {
    if (this.props.dogsLoading || this.props.userLoading) {return (
      <Grid centered>
        <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
      </Grid>
    )
    } else {
      return (
        <Grid centered>
          <Grid.Row></Grid.Row>
          <Grid.Column width={12}>

            <Grid centered >

            <Grid.Row centered>
              <Segment basic >
                <Header style={{fontFamily: "Roboto"}} as={"h1"}>All Available Dogs</Header>
              </Segment>
              </Grid.Row>

              <Grid.Row>
              {/* <Segment basic floated="right">  */}
                <Button as={Link} floated="right" to='/admin/new' color="teal" icon labelPosition='left' >
                  <Icon name='plus' />
                  Add New Dog
                </Button>
              {/* </Segment> */}
            </Grid.Row>
            <Grid.Row></Grid.Row>
           
            <Card.Group stackable itemsPerRow={3} centered>
              {this.renderDogs()}
            </Card.Group>
          
    
          </Grid>
        </Grid.Column>
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