import React from 'react';
import styled from 'styled-components';

import * as api from '../api';
import SnackLike from './SnackLike';
import {relativeRedirect} from '../util';


class OneSnack extends React.Component {
  state = {liked: false}
  componentDidMount() {
    const {snack} = this.props;
    this.setState({liked: snack.user_liked, like_count: snack.like_count})
  }
  async toggleLike() {
    const newCount = this.state.liked ? this.state.like_count - 1 : this.state.like_count + 1;
    const fn = this.state.liked ? api.unlikeSnack : api.likeSnack;
    this.setState({liked: !this.state.liked, like_count: newCount})
    await fn(this.props.snack.id)
  }

  goToSnackOverview() {
    relativeRedirect(`snacks/${this.props.snack.id}`);
  }

  render() {
    const {liked, like_count} = this.state;
    const {image, name, full_name} = this.props.snack;
    return (
      <Container >
        <ImageHolder>
          <ItemImage data-toggle="tooltip" title={full_name} onClick={() => this.goToSnackOverview()} src={image} />
        </ImageHolder>
        <TextHolder>
          <ItemLabel onClick={() => this.goToSnackOverview()}>{name}</ItemLabel>
        </TextHolder>
        <SnackLike like_count={like_count} onClick={() => this.toggleLike()} liked={liked} />
      </Container>
    )
  }
}



const Container = styled.div`
    display: block;
    margin: 10px;
    padding: 10px;
    background-image: radial-gradient(50% 50%, rgba(55, 62, 62, 0.00) 50%, rgba(55, 62, 62, 0.01) 74%, rgba(55, 62, 62, 0.05) 100%);
    box-shadow: 10px 10px #dadada;
    width: 230px;
    height: 230px;
    position: relative;
    border-radius: 12px;
    &:hover {
        transform: scale(1.05, 1.05);
    }
`;

const ItemLabel = styled.label`
    font-weight: bold;
    display: block;
    &:hover {
        cursor: pointer;
    }
`;

const ItemImage = styled.img`
    max-height: 110px;
    max-width: 200px;
    &:hover {
        cursor: pointer;
    }
`;

const ImageHolder = styled.div`
    margin: auto;
`;


const TextHolder = styled.div`
  bottom: 58px;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0px;
  right: 0px;
`;



export default OneSnack;

