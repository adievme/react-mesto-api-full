function User(props) {
  return (
    <li className="element__user">
      <div className="profile__info">
          <div className="profile__avatar-wrapper">
            <img className="profile__avatar" src={props.user.avatar} alt="аватар"/>
          </div>
          <div className="profile__header">
            <h1 className="profile__name">{props.user.name}</h1>
            <p className="profile__job">{props.user.about}</p> 
          </div>
      </div> 
    </li>
  )
}

export default User;