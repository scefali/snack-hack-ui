import React from 'react';
import styled from 'styled-components';

import {getSnacks} from '../api';

import OneProduct from './OneSnack';


class Snacks extends React.Component {
  state = {snacks: [], initialized: false}
  async componentDidMount() {
    await this.loadSnacks();
    this.setState({initialized: true})
    setInterval(() => this.loadSnacks(), 1000 * 60 * 10)
  }

  async loadSnacks() {
    const snacks = await getSnacks();
    this.setState({snacks})
  }

  renderSnack(snack) {
    return (
      <OneProduct key={snack.id} snack={snack} />
    )
  }

  renderCore() {
    return (
      <ProductContainer>
        {this.state.snacks.map(this.renderSnack)}
      </ProductContainer>
    )
  }

  render() {
    return (
      <Container>
        {this.state.initialized ? this.renderCore() : 'Loading...'}
      </Container>
    )
  }
}



const Container = styled.div`
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-top: 20px;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  float: left;
  align-items: flex-start;
  justify-content: center;
`;

const Header = styled.h2``;



export default Snacks;
