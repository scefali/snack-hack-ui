import React from 'react';


const SnackLike = ({liked, onClick, like_count = 0}) => {
  const text = liked ? 'Unfollow' : 'Follow'
  const extraClass = liked ? 'already-liked' : '';
  return (
    <div className="like-content">
      <button className="btn-secondary like-review" onClick={onClick}>
        <i className={`fa fa-heart ${extraClass}`} /> {text} {like_count}
      </button>
    </div>
  )
}

export default SnackLike;