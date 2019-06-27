import React from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import validUrl from 'valid-url';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl'


import * as api from '../api';
import * as util from '../util';
import Button from 'react-bootstrap/Button';


class AddSnack extends React.Component {
  state = {}
  inputChange(field, e) {
    const {value} = e.target;
    this.setState({[field]: value})
  }

  showError(message) {
    return toast.error(message, {
      position: toast.POSITION.TOP_CENTER
    })
  }

  async addSnack() {
    let {name, full_name, image} = this.state;
    name = name && name.trim();
    full_name = full_name && full_name.trim();
    image = image && image.trim();
    if (!name) {
      return this.showError('Must specify a short name');
    }
    if (!full_name) {
      return this.showError('Must specify a full name');
    }
    if (!image) {
      return this.showError('Must specify an image URL');
    }
    if (!validUrl.isUri(image)) {
      return this.showError('Must specify a valid image URL');
    }
    const snack_id = await api.addSnack(name, full_name, image);
    util.relativeRedirect(`snacks/${snack_id}`);
  }

  render() {
    return (
      <Container>
        <FormContainer>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Short Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="short-name-input"
              placeholder="Short Name"
              aria-label="Short Name"
              aria-describedby="basic-addon1"
              onChange={e => this.inputChange('name', e)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Full Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Full Name"
              aria-label="Full Name"
              aria-describedby="basic-addon1"
              onChange={e => this.inputChange('full_name', e)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>Image URL</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Image URL"
              aria-label="Image UR"
              aria-describedby="basic-addon1"
              onChange={e => this.inputChange('image', e)}
            />
          </InputGroup>
          <ButtonHolder>
            <Button onClick={() => this.addSnack()} variant="outline-success" >Add Snack</Button>
          </ButtonHolder>
        </FormContainer>
      </Container>
    )
  }
}


const Container = styled.div`
`;

const FormContainer = styled.div`
  margin: auto;
  max-width: 800px;
  & .input-group-text {
    width: 110px;
  }
  & #short-name-input {
    max-width: 400px;
  }
`;

const ButtonHolder = styled.div``;

export default AddSnack;
