import React from 'react';
import banner01_crop from '../images/banner01_crop.png'
import boopModal from '../images/boopModal.jpg'
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DogShow from '../dogs/DogShowAdopter'
import DogsContainer from '../dogs/DogsContainer';
import FavesContainer from '../dogs/FavesContainer';
import ApplicationContainer from './ApplicationContainer';
import HeaderAdopter from '../menus/HeaderAdopter';
import AdoptableDogsTeaserCard from '../teasers/AdoptableDogsTeaserCard'
import FavoriteDogsTeaserCard from '../teasers/FavoriteDogsTeaserCard'
import ApplicationTeaserCard from '../teasers/ApplicationTeaserCard'
import AboutModal from './AboutModal'
import { fetchDogs, addNotification, addFinalNotification } from '../actions';
import { Grid, Card, Image, Modal, Rail, Segment, Icon, Button } from 'semantic-ui-react'
import { ActionCableConsumer } from 'react-actioncable-provider';

class AdopterMainContainer extends React.Component {

  state = {
    showModal: false
  }

  componentDidMount(){
    this.props.fetchDogs()
  }

  openModal = () => {
    console.log("clicking on image")
    this.setState({
      showModal: true
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false
    })
  }

  handleClick = () => {
    this.openModal()
  }
  
  render() {

    const modalStyle = {
      backgroundImage: `url(${boopModal})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: "70vh",
      width: "70vw"
    }

    // const style = {
    //   backgroundImage: `url(${banner01_crop})`,
    //   backgroundPosition: 'center',
    //   backgroundSize: 'cover',
    //   backgroundRepeat: 'no-repeat',
    //   height: "35vh",
    //   width: "100vw"
    // }

    if (this.props.userLoading || this.props.dogsLoading) {
      return (
        <Grid centered>
          <img alt="fetching" src="https://miro.medium.com/max/450/1*dgfd5JaT0d7JT4VfhFEnzg.gif"/>
        </Grid>
      )
    } else {
      return (
        <div >
          <HeaderAdopter />

          {/* <Grid centered>
            <Grid.Row></Grid.Row>
          <Grid.Column width={12}> */}

          <Switch>
            <Route path="/adopter/dogs/:id" render={routerProps => {
              const { match } = routerProps
              const dogId = match.params.id
              return (
                <DogShow dogId={dogId}/>
              )
            }} />
            <Route path="/adopter/dogs" render={() => {
              return <DogsContainer />
            }}/>
            <Route path="/adopter/faves" render={() => {
              return <FavesContainer />
            }} />
            <Route path="/adopter/application" render={() => {
              return <ApplicationContainer />
            }} />
             {/* <Route path="/adopter/about" render={() => {
              return <AboutModal />
            }} /> */}
            <Route path="/adopter" render={()=>{
              return (
              <>
             
              <div>
              <Image fluid src={banner01_crop}></Image>
                </div>

             
  

              <Grid centered>
                <Grid.Row></Grid.Row>
              
                <Grid.Column width={12}>
          
                  <Grid verticalAlign="top" centered>
                    <Grid.Row></Grid.Row>
                    <Grid.Row></Grid.Row>

                    <Modal closeIcon style={modalStyle}
                      trigger={<Rail position='right'>
                      <Segment basic compact><Button basic circular icon="question"></Button></Segment></Rail>}>
                      {/* <Modal.Content image> */}
                        <AboutModal />
                      {/* </Modal.Content> */}
                  </Modal>

                    <Card.Group centered itemsPerRow={3}>

                      <AdoptableDogsTeaserCard />
                      <FavoriteDogsTeaserCard />
                      <ApplicationTeaserCard />
                    </Card.Group>

                    
                  </Grid>
                </Grid.Column>
                
              </Grid>
              
             </>)
            }} />
            
          </Switch>
        {/* </Grid.Column>
      </Grid> */}

      <ActionCableConsumer
        channel={{ channel: 'NotificationChannel' }}
        onReceived={response => {
          console.log("action cable consumer", response);
          if (response.notification.adopter_id === this.props.user.id) {
            response.newTask 
            ?
            this.props.addNotification(response)
            :
            this.props.addFinalNotification(response)
          }
        }}
      />

    </div>
    )
    }
  }
}

function msp(state){
  // console.log("adopter main state", state)
  return {
    user: state.user,
    dogs: state.dogs,
    userLoading: state.userLoading,
    dogsLoading: state.dogsLoading
  }
}


export default connect(msp, { fetchDogs, addNotification, addFinalNotification })(AdopterMainContainer)
