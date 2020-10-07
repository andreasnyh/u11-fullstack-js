import React, { Component } from 'react';
import styled from 'styled-components';

import { roomService } from '../services';
import {
  Button,
  Card,
  CardFull,
  FlexRow,
  Form,
  Input,
  Label,
  Select,
  Text,
  Textarea
} from './elements';

const StyledSplitInput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

class AddRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { room } = this.state;
    room[event.target.name] = event.target.value;
    this.setState({
      room
    });
  }

  handleSubmit(event) {
    const { room } = this.state;
    event.preventDefault();
    console.log('handleSubmit state AddRoom', JSON.stringify(room, null, 2));
    roomService.create(room);
    const { history } = this.props;
    history.push('/home');
  }

  render() {
    const { history } = this.props;
    const { room } = this.state;
    const {
      name,
      description,
      floor,
      from,
      to,
      street,
      postalNumber,
      town,
      password,
      price,
      priceType,
      imageUrl
    } = room;

    return (
      <CardFull static>
        <Text headline="Add new room" />
        <Card>
          <Form handleSubmit={this.handleSubmit}>
            <Label>
              Room name *
              <Input
                required
                type="text"
                name="name"
                value={name || ''}
                placeholder="Name"
                onChange={this.handleChange}
              />
            </Label>

            <Label>
              Password to room
              <Input
                type="text"
                name="password"
                value={password || ''}
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Label>

            <StyledSplitInput>
              <Label style={{ width: '48%' }}>
                Room size from *
                <Input
                  min="1"
                  max="200"
                  required
                  name="from"
                  value={from || ''}
                  type="number"
                  // style={{ width: '48%' }}
                  placeholder="Room size from"
                  onChange={this.handleChange}
                />
              </Label>
              <Label style={{ width: '48%' }}>
                Room size to *
                <Input
                  min="2"
                  max="250"
                  name="to"
                  value={to || ''}
                  required
                  type="number"
                  placeholder="To"
                  // style={{ width: '48%' }}
                  onChange={this.handleChange}
                />
              </Label>
            </StyledSplitInput>

            <Label>
              Street *
              <Input
                required
                type="text"
                name="street"
                value={street || ''}
                placeholder="Street"
                onChange={this.handleChange}
              />
            </Label>

            <Label>
              Town *
              <Input
                required
                type="text"
                name="town"
                value={town || ''}
                placeholder="Town"
                onChange={this.handleChange}
              />
            </Label>

            <Label>
              Floor
              <Input
                name="floor"
                type="number"
                value={floor || ''}
                placeholder="Floor"
                onChange={this.handleChange}
              />
            </Label>

            <Label>
              Postal Number
              <Input
                type="number"
                minLength="5"
                maxLength="5"
                max="99999"
                name="postalNumber"
                value={postalNumber || ''}
                placeholder="Postal Number"
                onChange={this.handleChange}
              />
            </Label>

            <StyledSplitInput>
              <Label>
                Price
                <Input
                  type="number"
                  name="price"
                  value={price || ''}
                  placeholder="Price"
                  onChange={this.handleChange}
                />
              </Label>
              <div style={{ marginLeft: '1rem', width: '70%' }}>
                <Label htmlFor="priceType">Price per</Label>
                <Select
                  type="select"
                  name="priceType"
                  value={priceType || ''}
                  placeholder="Price per"
                  onChange={this.handleChange}
                >
                  <option>kr/h</option>
                  <option>kr/6h</option>
                  <option>kr/12h</option>
                </Select>
              </div>
            </StyledSplitInput>

            <Label>
              Image
              <Input
                type="url"
                name="imageUrl"
                value={imageUrl || ''}
                placeholder="Link to your image"
                onChange={this.handleChange}
              />
            </Label>

            <Label>
              Description
              <Textarea
                name="description"
                value={description || ''}
                placeholder="Description"
                onChange={this.handleChange}
              />
            </Label>

            <FlexRow>
              <Button
                onClick={() => {
                  history.push('/');
                }}
              >
                Back
              </Button>

              <Button type="submit" confirm>
                Register
              </Button>
            </FlexRow>
          </Form>
        </Card>
      </CardFull>
    );
  }
}

export default AddRoom;
