import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Image, Header, Segment, Button, Icon, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import AdminDogEditModal from './AdminDogEditModal';

class DogShow extends Component {
  state = {
    showModal: false
  }

  openModal = () => {
    this.setState({ showModal: true })
  } 

  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    if (this.props.dogs.length > 0) {
 
      const dogId = parseInt(this.props.dogId)
      const { showModal } = this.state
  
      const foundDog = this.props.dogs.find(dog=>dog.id === dogId)
      const { age, name, img1, breed, about, size, goodHome, badHome ,health, color, sex, houseTrained } = foundDog

      const subheader = `${breed} • ${age} • ${sex} • ${size} • ${color}`

      const charcoal = {
        color: "#464646"
      }
    
      return (
        <Grid centered>
          <Grid.Row></Grid.Row>
          <Grid.Column width={12}>
        
          <Grid centered >
            <Grid.Row></Grid.Row>
            <Grid.Column width={8}>
              <Image rounded alt="" src={img1}  />
              <Segment basic > 
                <Button as={Link} to="/admin/dogs" floated="left" icon labelPosition='left' >
                  <Icon name='arrow left' />
                  Return to all dogs
                </Button>

                <Modal open={showModal} trigger={
                  <Button floated="right" color="teal" icon labelPosition='left' onClick={this.openModal}>
                    <Icon name='edit' />
                    Edit Me
                  </Button>} >
                  <Modal.Content>
                    
                  <AdminDogEditModal closeModal={this.closeModal} dogId={dogId}/>
                </Modal.Content>
              </Modal>

              </Segment>
            </Grid.Column>
            <Grid.Column  width={8}>
              <Header style={{paddingBottom: "10px", color: "#464646"}}
                as="h1"
                size="huge" 
                dividing
                content={name}
                subheader={subheader} >
              </Header>
              
            <Grid.Row>
        
            <Header style={charcoal} size="large">About</Header>

            <Header color="grey" size="medium" content="HEALTH"/>
            <p>Vaccinations up to date; spayed/neutered. Special needs: {health ? health : "N/A"}</p>

            <Header color="grey" size="medium" content="HOUSE-TRAINED"/>
            <p>{houseTrained}</p>

            <Header color="grey" size="medium" content="GOOD IN A HOME WITH"/>
            <p>{goodHome}</p>

            <Header color="grey" size="medium" content="PREFERS A HOME WITHOUT"/>
            <p>{badHome}</p>

            <Header style={charcoal} size="large">Meet {name} </Header>
            <p>{about}</p>
    
            </Grid.Row>
            </Grid.Column>                   
          </Grid>
        </Grid.Column>
      </Grid>

      )  
    } else {
        return <img alt="loading" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
      }
    } 
      
    
  
}
function msp(state){
  return {
    dogs: state.dogs
  }
}
export default connect(msp)(DogShow)
