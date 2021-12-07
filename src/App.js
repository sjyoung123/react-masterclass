import styled, { keyframes } from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Emoji = styled.span`
  color: ghostwhite;
`;

const rotateAnimation = keyframes`
0%{
  transform:rotate(0deg);
  border-radius:0%;
}
50%{
  border-radius:50%;
}
100%{
  transform:rotate(360deg);
  border-radius:0%;
}

`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotateAnimation} ease-in-out 1s infinite;
  ${Emoji} {
    &:hover {
      font-size: 50px;
    }
    &:active {
      opacity: 10%;
    }
  }
`;

const Circle = styled(Box)`
  border-radius: 50%;
`;

const Text = styled.span`
  color: ghostwhite;
`;

const Input = styled.input.attrs({ required: true, placeholder: "hi" })`
  color: ghostwhite;
  background-color: black;
`;

function App() {
  return (
    <>
      <Father as="header">
        <Box bgColor="tomato">
          <Emoji as="p">(●'◡'●)</Emoji>
        </Box>
        <Circle bgColor="teal">
          <Text>Hello</Text>
        </Circle>
      </Father>
      <Emoji>(❁´◡`❁)</Emoji>
      <Input />
      <Input />
      <Input />
    </>
  );
}

export default App;
