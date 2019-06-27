import React from 'react';
import styled from 'styled-components';
import autobind from 'class-autobind';


import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {getSnacks, deleteSnack} from '../api';

import OneProduct from './OneSnack';


class Snacks extends React.Component {
  state = {snacks: [], initialized: false, snackIdToDelete: null}

  constructor() {
    super(...arguments);
    autobind(this);
  }


  async componentDidMount() {
    await this.loadSnacks();
    this.setState({initialized: true})
    setInterval(() => this.loadSnacks(), 1000 * 60 * 10)
  }

  async loadSnacks() {
    const snacks = await getSnacks();
    this.setState({snacks})
  }

  confirmDelete(snackId) {
    this.setState({snackIdToDelete: snackId})
  }

  clearItemToDelete() {
    this.setState({snackIdToDelete: null})
  }

  async deleteItem() {
    await deleteSnack(this.state.snackIdToDelete);
    this.clearItemToDelete();
    await this.loadSnacks();
  }

  renderModal() {
    const snack = this.state.snacks.find(snack => {
      return snack.id === this.state.snackIdToDelete;
    })
    const name = snack && snack.name;
    return (
      <Modal show={!!this.state.snackIdToDelete} onHide={this.clearItemToDelete}>
        <ModalHolder >
          <Modal.Header closeButton>
            <Modal.Title>Delete Snack</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Confirm delete {name}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.clearItemToDelete} variant="secondary">Close</Button>
            <Button onClick={this.deleteItem} variant="danger">Delete</Button>
          </Modal.Footer>
        </ModalHolder>
      </Modal>
    )
  }

  renderSnack(snack) {
    return (
      <OneProduct confirmDelete={() => this.confirmDelete(snack.id)} key={snack.id} snack={snack} />
    )
  }

  renderCore() {
    return (
      <ProductContainer>
        {this.renderModal()}
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

const ModalHolder = styled.div`
  & > .modal-content {
    align-text: center
  }
  & > h4 {
    text-align: center;
    width: 100%;
  }
`;


export default Snacks;
