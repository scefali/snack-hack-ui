import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import "react-step-progress-bar/styles.css";
import {ProgressBar, Step} from "react-step-progress-bar";

import SnackLike from './SnackLike';
import * as api from '../api';
import popcorn from '../images/popcorn.png';
import truck from '../images/truck.png';
import mailbox from '../images/mailbox.png';


class OneSnack extends React.Component {
  state = {
    snack: null,
    requested: false,
    liked: false
  }
  get snackId() {
    return this.props.match.params.snackId;
  }

  async componentDidMount() {
    await this.loadSnack();
  }

  async loadSnack() {
    const snackId = this.snackId;
    const snack = await api.getSnackInfo(snackId);
    const requested = ['ORDERED', 'REQUESTED'].indexOf(snack.current_state) > -1;
    const liked = snack.user_liked;
    this.setState({snack, requested, liked})
  }


  async requestItem() {
    this.setState({requested: true});
    await api.requestSnack(this.snackId);
    await this.loadSnack();
  }

  async toggleLike() {
    const fn = this.state.liked ? api.unlikeSnack : api.likeSnack;
    this.setState({liked: !this.state.liked});
    await fn(this.snackId);
    await this.loadSnack();
  }


  renderOneLike(userLike) {
    return (
      <OneLikeContainer>
        <Avatar src={userLike.avatar} />
        {userLike.name}
      </OneLikeContainer>
    )
  }

  renderProgressBar() {
    const {snack} = this.state;
    let percent, word, showOrdered = false, showDelivered = false;
    switch (snack.current_state) {
      case 'REQUESTED':
        percent = 100.0 / 3;
        word = 'Requested';
        break;
      case 'ORDERED':
        percent = 200.0 / 3;
        word = 'Ordered'
        showOrdered = true;
        break;
      case 'DELIVERED':
        percent = 100.0;
        word = 'Delivered'
        showOrdered = true;
        showDelivered = true;
        break;
      default:
        percent = 0.0;
    }


    return (
      <div>
        <ProgressBar
          percent={percent}
          filledBackground="linear-gradient(to right, #8b78ed, #3c2e87)"
          height={15}
        >
          <Step transition="scale">
            {({accomplished}) => (
              null
            )}
          </Step>
          <Step transition="scale">
            {({accomplished}) => (
              <StepHolder>
                <img
                  style={{filter: `grayscale(${accomplished ? 0 : 80}%)`}}
                  width="40"
                  src={popcorn}
                />
                {snack.request_date && moment(snack.request_date).format("MM/DD/YY")}
              </StepHolder>
            )}
          </Step>
          <Step transition="scale">
            {({accomplished}) => (
              <StepHolder>
                <img
                  style={{filter: `grayscale(${accomplished ? 0 : 80}%)`}}
                  width="40"
                  src={truck}
                />
                {showOrdered && moment(snack.order_date).format("MM/DD/YY")}
              </StepHolder>
            )}
          </Step>
          <Step transition="scale">
            {({accomplished}) => (
              <StepHolder>
                <img
                  style={{filter: `grayscale(${accomplished ? 0 : 80}%)`}}
                  width="40"
                  src={mailbox}
                />
                {showDelivered && moment(snack.delivery_date).format("MM/DD/YY")}
              </StepHolder>
            )}
          </Step>
        </ProgressBar>
        {word && (
          <StatusWidget>
            Status: {word}
          </StatusWidget>)}
      </div>
    );
  }

  render() {
    const {snack, requested} = this.state;
    if (!snack) {
      return (<div>Loading...</div>)
    }
    const variant = requested ? 'outline-dark' : 'outline-primary'
    const buttonStr = requested ? 'Requested' : 'Request'
    return (
      <Container>
        <ItemHeader>{snack.name}</ItemHeader>
        <Holder>
          <SnackContainer>
            <ItemImageHolder>
              <LikeIcon onClick={() => this.toggleLike()} liked={this.state.liked} className="fa fa-heart" />
              <ItemImage src={snack.image} />
            </ItemImageHolder>
            <ItemLabel>{snack.full_name}</ItemLabel>

            <ButtonHolder>
              <Button onClick={() => this.requestItem()} disabled={requested} variant={variant} >{buttonStr}</Button>
            </ButtonHolder>

            <HolderHolder>
              <ProgressBarHolder>
                {this.renderProgressBar()}
              </ProgressBarHolder>
            </HolderHolder>
          </SnackContainer>
          <UserLikesContainer>
            <h5>Users Who Follow</h5>
            {snack.user_likes.map(this.renderOneLike)}
          </UserLikesContainer>
        </Holder>
      </Container>
    )
  }
}


const ButtonHolder = styled.div``;


const LikeIcon = styled.i`
  position: relative;
  left: 30%;
  &:hover {
      cursor: pointer;
  }
  &:before {
    color: ${props => props.liked ? "#ed2553" : "gray"};a
  }
  font-size: 1.5em;
`;

const Container = styled.div`
  margin: auto;
`;

const SnackContainer = styled.div`
  max-width: 600px;
  margin-bottom: 20px;
`;


const Holder = styled.div`
  display: flex;
  align-items: row;
  margin: 0 auto;
  justify-content: center;
`;


const UserLikesContainer = styled.div`
  margin-top: 70px;
  margin-left: 15px;
  display: block;
`;

const OneLikeContainer = styled.div`
  float: left;
  display: block;
  clear: left
`;


const ItemHeader = styled.h2`
  display: block;
`;

const ItemLabel = styled.div`
  display: block;
  margin: 10px;
`;

const ItemImageHolder = styled.div`
`;

const ItemImage = styled.img`
display: block;
max-height: 400px;
max-width: 400px;
margin:auto;
`;



const Avatar = styled.img`
  width: 40px;
  margin: 5px;
`;


const ProgressBarHolder = styled.div`
  width: 600px;
  margin-top: 30px;
`;

const HolderHolder = styled.div`
  display: inline-flex;
`;

const StatusWidget = styled.h4`
  margin: 40px;
`;

const StepHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default OneSnack;

