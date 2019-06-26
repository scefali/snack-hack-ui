import React from 'react';


const SnackLike = ({liked, onClick}) => {
  const text = liked ? 'Unlike' : 'Like'
  const extraClass = liked ? 'already-liked' : '';
  return (
    <div className="like-content">
      <button className="btn-secondary like-review" onClick={onClick}>
        <i className={`fa fa-heart ${extraClass}`} />{text}
      </button>
    </div>
  )
}

export default SnackLike;