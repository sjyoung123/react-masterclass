import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  height: 100px;
  width: 100px;
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
          <Text>Hello</Text>
        </Box>
        <Circle bgColor="teal" />
      </Father>
      <Input />
      <Input />
      <Input />
    </>
  );
}

export default App;
