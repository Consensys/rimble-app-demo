import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import ProgressAlert from "./ProgressAlert";
import { timingFunctions } from "polished";

class ProgressAlertProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      isOpen: false,
      unMount: true,
      currentMsg: this.props.messageData
    };
    this.timer = {};
  }

  static displayName = "Toast Message Provider";

  static defaultProps = {
    messageData: {
      message: "Default message…",
      transaction: "0x",
      timeEstimate: 60,
      error: false
    },
    delay: 3000
  };

  componentDidMount() {
    this.setState((state, props) => ({
      isReady: true
    }));

    window.onfocus = () => {
      this.startTimer();
    };
    window.onblur = () => {
      this.clearTimer();
    };
  }

  componentWillUnmount() {
    window.onfocus = null;
    window.onblur = null;
  }

  addMessage = (msg, data) => {
    if (!msg) {
      return false;
    }

    this.setState(
      () => ({
        isOpen: false
      }),
      () => {
        setTimeout(() => {
          this.setState(
            () => ({
              isOpen: true,
              unMount: false,
              currentMsg: {
                message: msg,
                ...data
              }
            }),
            () => {
              this.startTimer();
            }
          );
        }, 500);
      }
    );
  };

  removeMessage = () => {
    if (!this.state.isOpen) {
      return null;
    }
    this.clearTimer();
    this.setState((state, props) => ({
      isOpen: false
    }));
  };

  startTimer = () => {
    if (!document.hasFocus()) {
      return null;
    }
    this.clearTimer();
    this.timer = setTimeout(
      () => {
        this.removeMessage();
      },
      this.props.messageData.timeEstimate
        ? this.props.messageData.timeEstimate * 1000 + 3000
        : this.props.delay
    );
  };

  clearTimer = () => {
    clearTimeout(this.timer);
  };

  handleClose = e => {
    e.preventDefault();
  };

  handleEnter = e => {
    e.preventDefault();
    this.clearTimer();
  };

  handleLeave = e => {
    e.preventDefault();
    this.startTimer();
  };

  renderMessage = () => {
    return (
      <ProtoProgressAlert
        {...this.state.currentMsg}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        closeFunction={this.removeMessage}
      />
    );
  };

  render() {
    if (!this.state.isReady) {
      return null;
    }
    return (
      <StyledProgressAlertContainer>
        {!this.state.unMount && (
          <AnimationWrapper direction={this.state.isOpen ? null : "out"}>
            {this.renderMessage()}
          </AnimationWrapper>
        )}
      </StyledProgressAlertContainer>
    );
  }
}

class ProtoProgressAlert extends Component {
  static displayName = "Proto Progress Alert";

  static defaultProps = {
    message: "Proto text… ",
    transaction: "0xproto",
    timeEstimate: 30,
    error: false,
    closeElem: true
  };

  handleClose = e => {
    e.preventDefault();
  };

  render() {
    const { message, transaction, timeEstimate, error } = this.props;
    return (
      <ProgressAlert
        message={message}
        transaction={transaction}
        timeEstimate={timeEstimate}
        error={error}
        closeFunction={this.props.closeFunction}
        {...this.props}
      />
    );
  }
}

const StyledProgressAlertContainer = styled.div`
  & {
    display: block;
    position: fixed;
    z-index: 9999;
    top: auto;
    bottom: 0;
    left: auto;
    right: 0;
    width: 100%;
    max-width: 100%;
  }

  > div {
    width: 100%;
  }
`;

const animInKeyframes = keyframes`
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
`;

const animOutKeyframes = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }

  to {
    opacity: 0;
    transform: translateY(120%);
  }
`;

const animOutKeyframesDesktop = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    transform: translateX(120%);
  }
`;

const AnimationWrapper = styled.div`
  & {
    animation-name: ${props =>
      props.direction ? animOutKeyframes : animInKeyframes};
    animation-duration: ${props => (props.direction ? "500ms" : "300ms")};
    animation-timing-function: ${props =>
      props.direction ? timingFunctions("easeOutSine") : "ease"};
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
  }
  @media screen and (min-width: 420px) {
    animation-name: ${props =>
      props.direction ? animOutKeyframesDesktop : animInKeyframes};
  }
`;

export default ProgressAlertProvider;
