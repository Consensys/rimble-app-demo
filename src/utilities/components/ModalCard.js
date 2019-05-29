import React from "react";
import {
  Box,
  Flex,
  Card,
  Button,
} from "rimble-ui";

const ModalCard = ({children, closeFunc, ...props}) => (
  <Card
    border={0}
    m={0}
    p={0}
    maxWidth={"960px"}
    height={['100vh', 'auto']}
    overflow={"hidden"}
  >
    <Box
      position={"absolute"}
      top={'0'}
      right={'0'}
      m={3}
      borderRadius={'100%'}
      bg={'white'}
    >
      <Button.Text
        icononly
        icon={"Close"}
        mainColor={"moon-gray"}
        onClick={closeFunc}
        size={'2.5rem'}
      />
    </Box>
    <Flex flexDirection={'column'} height={'100%'}>
      {children}
    </Flex>
  </Card>
);

ModalCard.Body = ({children, ...props}) => (
  <Flex flex={'1'} style={{ overflow: 'auto' }} >
    <Box p={['4', '5']} m={'auto'}>
      {children}
    </Box>
  </Flex>
);

ModalCard.Footer = ({children, ...props}) => (
  <Flex
    flex={'0'}
    justifyContent={'center'}
    borderTop={1}
    borderColor={'light-gray'}
    p={3}
  >
    {children}
  </Flex>
);


ModalCard.BackButton = ({onClick, ...props}) => (
  <Box
    position={'absolute'}
    top={'0'}
    left={'0'}
    m={3}
    bg={'white'}
  >
    <Button.Outline
      onClick={onClick}
      icononly
      icon={'ArrowBack'}
      size={'2.5rem'}
    />
  </Box>
);

export default ModalCard;
