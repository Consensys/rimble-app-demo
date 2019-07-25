import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, Icon, Text, Button } from "rimble-ui";
import styled from "styled-components";

function ProgressAlert(props) {
  const [progress, setProgress] = useState(0); // percent of estimated time elapsed
  const [estimatedCompletionTime, setEstimatedCompletionTime] = useState(
    props.timeEstimate
  );
  const [remainingTime, setRemainingTime] = useState(props.timeEstimate); // estimated seconds until complete
  const [timeString, setTimeString] = useState("calculating..."); // human-friendly time until complete
  const [delay] = useState(1000); // set "tick" time for timer
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState(props.error);

  // Determines the amount of time remaining
  const calculateTimeRemaining = () => {
    if (remainingTime === 0) {
      setStatus("success");
    }
    setRemainingTime(remainingTime - 1);
    timeToString();
  };

  // Reads the value of RemainingTime and outputs a hunman-friendly string of time remaining
  const timeToString = () => {
    if (remainingTime === null) {
      return;
    }
    const now = Date.now();

    const timeObject = new Date();
    const estimatedCompletion = new Date(timeObject.getTime() + remainingTime);

    let diff = now - estimatedCompletion;
    diff = Math.abs(Math.floor(diff));

    const days = Math.floor(diff / (24 * 60 * 60));
    let leftSec = diff - days * 24 * 60 * 60;

    const hrs = Math.floor(leftSec / (60 * 60));
    leftSec = leftSec - hrs * 60 * 60;

    const min = Math.floor(leftSec / 60);
    leftSec = leftSec - min * 60;

    if (min > 1) {
      setTimeString("~" + min + " minutes");
    } else if (min === 1) {
      setTimeString("~ 1 minute remaining");
    } else if (leftSec > 30) {
      setTimeString("less than 1 minute remaining");
    } else {
      setTimeString("less than 30 seconds remaining");
    }
  };

  // Determines percent complete based on time remaining and estimated time
  const calculatePercentComplete = () => {
    console.log(
      "calculatePercentComplete: progress, remainingTime",
      progress,
      remainingTime,
      status
    );

    const currentProgress = Math.round(
      ((estimatedCompletionTime - remainingTime) / estimatedCompletionTime) *
        100
    );
    setProgress(currentProgress);
  };

  // Calls functions to update time and percent values
  const interval = useInterval(
    () => {
      calculateTimeRemaining();
      calculatePercentComplete();
    },
    remainingTime >= 0 ? delay : null // will stop the timer when remaining time is 0
  );

  return (
    <StyledProgressAlert>
      <Box>
        <Box
          bg={error ? "red" : "#34D994"}
          height={"8px"}
          width={error ? "100%" : progress + "%"}
        />
      </Box>
      <Flex p={3} alignItems={"center"} justifyContent={"space-between"}>
        <Flex alignItems={"center"}>
          {progress <= 100 && status === "pending" && (
            <Flex
              bg="#DADADA"
              borderRadius={"50%"}
              height={"32px"}
              width={"32px"}
              justifyContent={"center"}
              alignItems={"center"}
              mr={3}
            >
              <Text fontSize={"12px"}>{progress}%</Text>
            </Flex>
          )}

          {status === "success" && (
            <Flex
              bg="#00BF6F"
              borderRadius={"50%"}
              height={"32px"}
              width={"32px"}
              justifyContent={"center"}
              alignItems={"center"}
              mr={3}
            >
              <Icon name="Check" />
            </Flex>
          )}

          {error && (
            <Flex
              bg="#E94E4A"
              borderRadius={"50%"}
              height={"32px"}
              width={"32px"}
              justifyContent={"center"}
              alignItems={"center"}
              mr={3}
            >
              <Icon name="Error" />
            </Flex>
          )}

          <Flex flexDirection={"column"}>
            <Text fontWeight={"600"} color={"#fff"}>
              {props.message}
            </Text>

            <Text fontSize={"12px"} color={"#BCBCBC"}>
              {error ? "Error: " + error.message : ""}
              {Object.keys(error).length === 0 && status === "success"
                ? "Complete!"
                : timeString}
            </Text>
          </Flex>
        </Flex>

        <Button mainColor="#444" p={0} onClick={e => props.closeFunction(e)}>
          <Icon name="Close" />
        </Button>
      </Flex>
    </StyledProgressAlert>
  );
}

const StyledProgressAlert = styled(Box)`
  & {
    background: #444;
  }
  &.hasError {
    background: red;
  }
`;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default ProgressAlert;
