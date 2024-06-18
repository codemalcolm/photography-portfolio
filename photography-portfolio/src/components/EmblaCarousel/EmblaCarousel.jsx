import React from 'react'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from '../EmblaCarousel/ArrowButtons.jsx'
import useEmblaCarousel from 'embla-carousel-react'
import "./css/embla.css"
import { Box, Flex } from "@chakra-ui/react"

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <>
                <div className="embla__slide" key={slide.id}>
                  {slide.image}
                    <Box position={"relative"} id={"here"} key={slide.id}>{slide.text}</Box>
                </div>
            </>
          ))}
        </div>
          <Flex position={"absolute"}>
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </Flex>
      </div>
    </section>
  )
}

export default EmblaCarousel
