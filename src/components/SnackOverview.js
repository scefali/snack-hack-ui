import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

import * as api from '../api';


class OneSnack extends React.Component {
  state = {
    snack: null
  }
  async componentDidMount() {
    const {snackId} = this.props.match.params;
    const snack = await api.getSnackInfo(snackId);
    this.setState({snack})
  }

  render() {
    const {snack} = this.state;
    if (!snack) {
      return (<div>Loading...</div>)
    }
    return (
      <Container>
        <ItemHeader>{snack.name}</ItemHeader>
        <ItemImage src={snack.image} />
        <ItemLabel>{snack.full_name}</ItemLabel>
        <Button disabled={true} variant="outline-primary" >Request</Button>
      </Container>
    )
  }
}



const Container = styled.div`
  display: ;
  margin: 10px;
  padding: 10px;
  position: relative;
`;

const ItemHeader = styled.h2`
  display: block;
`;

const ItemLabel = styled.label`
display: block;
`;

const ItemImage = styled.img`
  display: block;
  max-height: 300px;
  max-width: 300px;
  margin:auto;
`;






export default OneSnack;

