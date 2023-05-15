import React, { useState } from "react";
import {message} from 'antd';
import Video from "./video.mp4";
import { ButtonT } from "./ButtonElements";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./HeroElements";
const HeroSection = () => {
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };

  return (
    <HeroContainer id="home">
      <HeroBg>
        <VideoBg className="background-video" autoPlay loop muted src={Video} type="video/mp4" />
      </HeroBg>
      <HeroContent>
        <HeroH1>
          <span style={{ color: "white" }}> Unleash Your Wanderlust</span>
        </HeroH1>
        <HeroP>
        Get on the Go with GoZee, the affordable way to travel!
        </HeroP>
        <HeroBtnWrapper>
          <ButtonT
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
            primary="true"
            dark="true"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
            onClick={() => {
              window.scrollTo({ top: 730, behavior: "smooth" });
              message.info("Check cars availability!")
            }}
          >
            Book Now {hover ? <ArrowForward /> : <ArrowRight />}
          </ButtonT>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
