function User(props) {
  return (
    <li className="element__user">
      <div className="profile__info profile__info_user-card">
          <div className="profile__avatar-wrapper profile__avatar-wrapper_user-card">
            <img className="profile__avatar profile__avatar_user-card" src={props.user.avatar} alt="аватар"/>
          </div>
          <div className="profile__header profile__header_user-card">
            <h1 className="profile__name profile__name_user-card">{props.user.name}</h1>
            <p className="profile__job">{props.user.about}</p> 
          </div>
      </div> 
    </li>
  )
}

export default User;