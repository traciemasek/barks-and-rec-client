import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Image, Header, Segment, Button, Icon, Modal, Card } from 'semantic-ui-react';
import "pure-react-carousel/dist/react-carousel.es.css"
import { Link } from 'react-router-dom';
import AdminDogEditModal from './AdminDogEditModal';
// import ImageCarousel from './ImageCarousel';

class DogShow extends Component {
  state = {
    showModal: false,
    image: ""
  }
  
  componentDidMount

  openModal = () => {
    this.setState({ showModal: true })
  } 

  closeModal = () => {
    this.setState({ showModal: false })
  }

  setImage = (img) => {
    this.setState({image: img})
  }

  render() {

    if (!this.props.dogs.find(dog=> dog.id === parseInt(this.props.dogId))) {
      return (
        <Grid centered>
          <Grid.Row></Grid.Row>
          <Grid.Row></Grid.Row>
          <Image alt="" src="https://httpstatusdogs.com/img/404.jpg"/>
        </Grid>
      )
    }

    if (this.props.dogs.length > 0) {
 
      const dogId = parseInt(this.props.dogId)
      const { showModal } = this.state
  
      const foundDog = this.props.dogs.find(dog=>dog.id === dogId)
      const { age, name, img1, img2, img3, breed, about, size, goodHome, badHome ,health, color, sex, houseTrained} = foundDog

      const subheader = `${breed} • ${age} • ${sex} • ${size} • ${color}`

      const charcoal = {
        color: "#464646"
      }

      
      let imageArr = [img1, img2, img3]
      // const images = imageArr.filter(img => !!img)
      
      let imageDots = imageArr.map((img, i) => {
        if (img) {
          return <Button onClick={()=>this.setImage(img)} key={i} icon>
          <Icon name='circle'/>
        </Button>
        }
      })

      return (
        <Grid centered>
          <Grid.Row></Grid.Row>
          <Grid.Column width={12}>
        
          <Grid centered >
            <Grid.Row></Grid.Row>
            <Grid.Column width={8}>
        
              {/* <ImageCarousel images={images}/> */}
            <Card fluid>
              <Image wrapped ui={false} fluid rounded alt="" src={this.state.image? this.state.image : img1}  />
              <Card.Content extra textAlign="center">
                <Segment basic textAlign="center">
                  <Button.Group>
                    {imageDots}
                  </Button.Group>
                </Segment>
              </Card.Content>
            </Card> 

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

            {badHome 
            ? 
            <><Header color="grey" size="medium" content="PREFERS A HOME WITHOUT"/>
            <p>
              {badHome}
            </p></>
            :
            null
            }

            <Header style={charcoal} size="large">Meet {name} </Header>
            <p>{about}</p>

    
            </Grid.Row>
            </Grid.Column>                   
          </Grid>
        </Grid.Column>
      </Grid>

      )  
    } else {
      return (
        <Grid centered>
          <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
        </Grid>
      )
      }
    } 
      
    
  
}
function msp(state){
  return {
    dogs: state.dogs
  }
}
export default connect(msp)(DogShow)
