import styled, { css, keyframes } from "styled-components";
import BackgroundImg from "../../images/background2.jpg";
import DrinkImg from "../../images/food_drink2.png";
import SaladImg from "../../images/food_salad2.png";
import SteakImg from "../../images/food_steak2.png";
import SatietyImg from "../../images/satiety_icon2.png";
import SlimeImg from "../../images/slime2.png";

import { useState, useEffect, useRef, useLayoutEffect } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import Icons from "../../global/Icons";

import { AlertMySwal } from "../../components/MySwal";

const Wrapper = styled.div`
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  background: url(${BackgroundImg});
  background-size: cover;
  background-position: center center;
  width: 100vw;
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  border: 1px solid rebeccapurple;
`;

const FoodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 5vw;
  top: 15vh;
  z-index: 2;
  gap: 10px;
`;

const FoodIcon = styled.div`
  width: clamp(100px, 6.25vw, 120px);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    object-fit: cover;
    z-index: 999;
    position: relative;
  }
`;

const SatietyWrapper = styled.div`
  position: absolute;
  top: 5vh;
  left: 5vw;
  width: auto;
`;

const SatietyContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  width: calc(
    clamp(80px, 5.2vw, 100px) +
      (calc(clamp(200px, 1.303vw, 250px) - calc(clamp(80px, 5.2vw, 100px) / 2))) +
      8px
  );
`;

const SatietyIcon = styled.div`
  width: clamp(80px, 5.2vw, 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const SatietyBarWrapper = styled.div`
  display: flex;
  align-items: center;

  height: 20px;

  left: calc(clamp(80px, 5.2vw, 100px) / 2);
  font-weight: bold;
  border-radius: 18px;
  position: absolute;
  z-index: 1;
  width: clamp(200px, 1.303vw, 250px);
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  padding: 7.5px 3px;
  background-color: black;
  /* box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px; */
`;

const SatietyBarContainer = styled.div`
  /* position: relative; */
  width: 100%;
  display: flex;
  flex: 1;
  position: relative;
  border: 3px solid whitesmoke;
  background-color: aliceblue;
  overflow: hidden;
  border-radius: 15px;
`;

const SatietyValueBar = styled.div`
  height: 25px;
  background-image: linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%);
  width: 0%;

  /* width: ${({ $width }) => `${$width}%`}; */
`;

const SatietyValueWrapper = styled.div`
  color: white;
  position: absolute;
  right: 2%;
  top: 80%;
`;

const SatietyValue = styled.span`
  font-size: 23px;
  color: aliceblue;
  text-shadow: 0 0 3px black, 0 0 3px black, 0 0 3px black, 0 0 3px black;
  font-weight: bold;
`;

const SlimeWrapper = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
`;

const SlimeContainer = styled.div`
  width: clamp(200px, 15.625vw, 300px);
  height: auto;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const MainPage = () => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowSize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowSize);

    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);

  useEffect(() => {
    console.log(windowSize[0]);
    refreshViewHeight();
  }, [windowSize[0]]);

  const refreshViewHeight = () => {
    const vh = windowSize[1] * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  gsap.registerPlugin(Draggable, MotionPathPlugin);

  const [tl, setTl] = useState();

  useGSAP(() => {
    const tl = gsap.timeline();
    setTl(tl);
  }, []);

  const container = useRef();
  const { contextSafe } = useGSAP({ scope: container });
  const [satiety, setSatiety] = useState(50);
  const [maxSatiety, setMaxSatiety] = useState(100);

  const foodList = [
    {
      id: 1,
      name: "steak",
      src: SteakImg,
      satiety: 24,
    },
    {
      id: 2,
      name: "salad",
      src: SaladImg,
      satiety: 12,
    },
    {
      id: 3,
      name: "drink",
      src: DrinkImg,
      satiety: 4,
    },
  ];

  const SlimeAnimInit = contextSafe(() => {
    gsap.to(".slime", {
      duration: 1.5,
      y: -20,
      x: +0,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  const SlimeAnimEnlarge = contextSafe(() => {
    gsap.to(".slime", {
      duration: 0.2,
      scale: 1.1,
      ease: "sine.inOut",
    });
  });
  const SlimeAnimReduce = contextSafe(() => {
    gsap.to(".slime", {
      duration: 0.2,
      scale: 1,
      ease: "sine.inOut",
    });
  });

  const SatietyBarAnim = contextSafe(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".satietyBar",
      { width: 0 },
      {
        width: `${satiety}%`,
      }
    );
  });

  useGSAP(
    () => {
      const foods = gsap.utils.toArray(".food");
      foods.forEach((food, index) => {
        const draggable = Draggable.create(food, {
          bounds: container.current,
          edgeResistance: 0.5,
          inertia: true,

          onDrag: () => {
            gsap.to(draggable[0].target, {
              duration: 0.1,
              scale: 1.3,
            });
            if (draggable[0].hitTest(".slime")) {
              SlimeAnimEnlarge();
            }
          },
          onDragEnd: () => {
            console.log("onDragEnd");

            if (draggable[0].hitTest(".slime")) {
              const tl = gsap.timeline();
              tl.to(draggable[0].target, {
                duration: 0.6,
                opacity: 0,
                scale: 0,
              })
                .to(draggable[0].target, {
                  y: 0,
                  x: 0,
                  scale: 1,
                })
                .to(draggable[0].target, {
                  opacity: 1,
                });

              handleHeal(foodList[index]?.satiety);
            } else {
              gsap.to(draggable[0].target, {
                duration: 0.6,
                y: 0,
                x: 0,
                scale: 1,
              });
            }

            SlimeAnimReduce();
          },
        });
      });
    },
    { scope: container }
  );

  const handleHeal = (blood) => {
    setSatiety((prevValue) => {
      if (prevValue + blood > 100) {
        console.log(prevValue);
        AlertMySwal({
          title: "",
          text: "我吃飽了",
        });
        return 100;
      } else {
        const tl = gsap.timeline();
        tl.fromTo(
          ".satietyBar",
          { width: 0, duration: 3 },
          {
            width: `${prevValue + blood}%`,
          }
        );
        return prevValue + blood;
      }
    });
  };

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(".satietyBar", {
      width: `${satiety}%`,
    });
  }, [satiety]);

  // const AnimationToValue = () => {
  //   gsap.from(".satietyValue", {
  //     textContent: satiety,
  //     duration: 4,
  //     ease: "Power1.easeIn",
  //     snap: { textContent: 1 },
  //     stagger: 1,
  //     // onUpdate: textContent.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  //   });
  // };

  useEffect(() => {
    SlimeAnimInit();
    SatietyBarAnim();
    // test();
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      setSatiety((prevValue) => prevValue - 0.00116);
    }, 1000);

    return () => clearInterval(tick);
  });

  return (
    <Wrapper>
      <Container ref={container}>
        {/* <svg width="100%" height="100%" viewBox="-20 0 557 190" id="svg">
          <path
            id="path"
            d="M9,100c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37"
          />

          <image href={SlimeImg} height="200" width="200" id="div" />
        </svg> */}

        {/* <svg id="motionPath" viewBox="-20 0 557 190">
          <path
            id="path"
            fill="none"
            d="M8,102 C15,83 58,25 131,24 206,24 233,63 259,91 292,125 328,155 377,155 464,155 497,97 504,74"
          />
        </svg> */}

        {/* <svg
          width="1280"
          height="207"
          viewBox="0 0 1280 300"
          fill="none"
          id="svg"
        >
          <path
            d="M0 165C1024 165 1280 165 1280 165"
            stroke="black"
            id="path"
          />

          <image href={SlimeImg} height="200" width="200" id="div" />
        </svg> */}
        <SatietyWrapper>
          <SatietyContainer>
            <SatietyIcon>
              <img src={SatietyImg} />
            </SatietyIcon>

            <SatietyValueWrapper>
              <SatietyValue className="satietyValue">
                {satiety.toFixed(2)}%
              </SatietyValue>
            </SatietyValueWrapper>

            <SatietyBarWrapper>
              <SatietyBarContainer>
                <SatietyValueBar
                  // $width={satiety}
                  className="satietyBar"
                ></SatietyValueBar>
              </SatietyBarContainer>

              {/* <span> / </span>
              <SatietyValue>{maxSatiety}</SatietyValue> */}
            </SatietyBarWrapper>
          </SatietyContainer>
        </SatietyWrapper>
        <FoodWrapper>
          {foodList.map((data) => (
            <FoodIcon className="foodContainer" key={data.id}>
              <img src={data.src} className="food" />
            </FoodIcon>
          ))}

          {/* <FoodIcon className="foodContainer">
            <img src={foodList[0]?.src} className="food" />
          </FoodIcon> */}
        </FoodWrapper>
        <SlimeWrapper>
          <SlimeContainer>
            <img src={SlimeImg} className="slime" />
          </SlimeContainer>

          {/* <Icons.Slime /> */}
        </SlimeWrapper>

        {/* <SlimeContainerSvg>
          <Icons.Slime />
        </SlimeContainerSvg> */}
      </Container>
    </Wrapper>
  );
};

export default MainPage;
