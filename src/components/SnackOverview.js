import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

import * as api from '../api';


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
    const snackId = this.snackId;
    const snack = await api.getSnackInfo(snackId);
    const requested = ['ORDERED', 'REQUESTED'].indexOf(snack.current_state) > -1;
    const liked = snack.user_liked;
    this.setState({snack, requested, liked})
  }

  async requestItem() {
    this.setState({requested: true});
    await api.requestSnack(this.snackId)
  }


  renderOneLike(userLike) {
    return (
      <OneLikeContainer>
        <Avatar src={userLike.avatar} />
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


export default OneSnack;

