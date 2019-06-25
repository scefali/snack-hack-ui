import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

import * as api from '../api';
import * as util from '../util';


class OneSnack extends React.Component {
  state = {
    snack: null,
    requested: false
  }
  async componentDidMount() {
    const {snackId} = this.props.match.params;
    const snack = await api.getSnackInfo(snackId);
    const requested = !!snack.requested;
    this.setState({snack, requested})
  }

  async requestItem() {
    this.setState({requested: true})
  }

  goBack() {
    util.relativeRedirect('snacks');
  }

  renderOneLike(userLike) {
    return (
      <OneLikeContainer>
        <Avatar src={userLike.avatar}/>
        {userLike.name}
      </OneLikeContainer>
    )
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
        <BackButton onClick={() => this.goBack()}><i className="fa fa-arrow-left">Back</i></BackButton>
        <Holder>
          <SnackContainer>
            <ItemHeader>{snack.name}</ItemHeader>
            <ItemImage src={snack.image} />
            <ItemLabel>{snack.full_name}</ItemLabel>
            <Button onClick={() => this.requestItem()} disabled={requested} variant={variant} >{buttonStr}</Button>

          </SnackContainer>
          <UserLikesContainer>
            <h5>Users Who Like</h5>
            {snack.user_likes.map(this.renderOneLike)}
          </UserLikesContainer>
        </Holder>
      </Container>
    )
  }
}



const Container = styled.div`
  margin: auto;
`;

const SnackContainer = styled.div`
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
`;

const OneLikeContainer = styled.div``;

const BackButton = styled.button`
  right: 250px;
  position: relative;
  color: #007bff;
  border-color: #007bff;
`;

const ItemHeader = styled.h2`
  display: block;
`;

const ItemLabel = styled.div`
  display: block;
  margin: 10px;
`;

const ItemImage = styled.img`
  display: block;
  max-height: 400px;
  max-width: 400px;
  margin:auto;
`;



const Avatar = styled.image`
  width: 25px;
`;


export default OneSnack;

