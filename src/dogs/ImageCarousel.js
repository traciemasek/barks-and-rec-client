import React from 'react';
import { CarouselProvider, Image, Slide, Slider } from "pure-react-carousel";

import { Divider } from "semantic-ui-react";

import CustomDotGroup from "./CustomDotGroup";

function ImageCarousel({ images }){

  console.log("IMAGE CAROUSEL PROPS", images)

  let totalNumSlides = images.length

  let slides = images.map((image, i) => {
    return <Slide tag="a" key={i} index={i}>
    <Image src={image} />
  </Slide>
  })

  return (
    <CarouselProvider
    naturalSlideWidth={1}
    naturalSlideHeight={1}
    totalSlides={totalNumSlides}
  >
    <Slider>
      {slides}
    </Slider>

    <Divider />
    <CustomDotGroup slides={totalNumSlides} />
  </CarouselProvider>
  )
}

export default ImageCarousel