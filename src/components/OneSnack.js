import React from 'react';
import styled from 'styled-components';

import * as api from '../api';


class OneSnack extends React.Component {
    state = {liked: false}
    componentDidMount() {
        const { snack } = this.props;
        this.setState({liked: snack.user_liked, like_count: snack.like_count})
    }
    async toggleLike() {
        const newCount = this.state.liked ? this.state.like_count - 1 : this.state.like_count + 1;
        const fn = this.state.liked ? api.unlikeSnack : api.likeSnack;
        await fn(this.props.snack.id)
        this.setState({liked: !this.state.liked, like_count: newCount})
    }

    render() {
        const {liked, like_count} = this.state;
        const {image, name} = this.props.snack;
        const text = liked ? 'Unlike' : 'Like'
        const extraClass = liked ? 'already-liked' : '';
        return (
            <Container>
                <ItemImage src={image} />
                <ItemLabel>{name}</ItemLabel>
                {like_count}
                <div className="like-content">
                    <button className="btn-secondary like-review" onClick={() => this.toggleLike()}>
                        <i className={`fa fa-heart ${extraClass}`} />{text}
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

