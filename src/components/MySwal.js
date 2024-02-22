import styled from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SlimeImg from "../images/slime2.png";
import Icons from "../global/Icons";
import Close from "../images/icons/close2.svg";

const MySwal = withReactContent(Swal);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /* background: "linear-gradient(180deg, #13547a 0%, #80d0c7 100%)", */
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

const ImageWrapper = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 200px;
    object-fit: cover;
  }
`;

const TitleWrapper = styled.div``;

const Title = styled.div``;

const TextWrapper = styled.div`
  padding: 20px;
`;

const Text = styled.div`
  color: white;
  font-size: 30px;
  color: white;
  text-shadow: 0 0 5px #7b90d2, 0 0 5px #7b90d2, 0 0 5px #7b90d2,
    0 0 5px #7b90d2;
  font-weight: bold;
  letter-spacing: 2px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 3%;
  right: 3%;
`;

const ConfirmButton = styled.button`
  font-size: 20px;
  font-weight: bold;
  color: whitesmoke;
  background: transparent;
  border: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  flex-direction: column;

  img {
    width: 20px;
    object-fit: cover;
  }
`;

export const AlertMySwal = ({ title, text, confirmButtonText }) => {
  return MySwal.fire({
    showCloseButton: false,
    showConfirmButton: false,
    showCancelButton: false,
    confirmButtonColor: "#22254a",
    background: "#fcfcfc",
    backdrop: `rgba(11,11,11,0.5)`,
    allowOutsideClick: false,
    background: "black",
    // background: "linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%)",
    // background-image: linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%);

    background: "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",

    html: (
      <Wrapper>
        <ContentWrapper>
          {/* <TitleWrapper>
            <Title>{title}</Title>
          </TitleWrapper> */}

          {text && (
            <TextWrapper>
              <Text>{text}</Text>
            </TextWrapper>
          )}
          <ImageWrapper>
            <img src={SlimeImg} />
          </ImageWrapper>
          <ButtonWrapper>
            <ConfirmButton onClick={() => MySwal.clickConfirm()}>
              <img src={Close} />
            </ConfirmButton>
          </ButtonWrapper>
        </ContentWrapper>
      </Wrapper>
    ),
  });
};
