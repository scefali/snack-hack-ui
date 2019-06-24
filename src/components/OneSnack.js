import React from 'react';
import styled from 'styled-components';

import * as api from '../api';


class OneSnack extends React.Component {
    state = {liked: false}
    async toggleLike() {
        const fn = this.state.liked ? api.unlikeSnack : api.likeSnack;
        await fn({snack_id: this.props.snack.id})
        this.setState({liked: !this.state.liked})
    }

    render() {
        const {image, name} = this.props.snack;
        const text = this.state.liked ? 'Unlike' : 'Like'
        const extraClass = this.state.liked ? 'already-liked' : '';
        return (
            <Container>
                <ItemImage src={image} />
                <ItemLabel>{name}</ItemLabel>
                <div class="like-content">
                    <button class="btn-secondary like-review" onClick={() => this.toggleLike()}>
                        <i class={`fa fa-heart ${extraClass}`} />{text}
                    </button>
                </div>
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
    height: 275px;
    position: relative
`;

const ItemLabel = styled.label`
    font-weight: bold;
    display: block;
`;

const ItemImage = styled.img`
    max-height: 130px;
`;




export default OneSnack;
