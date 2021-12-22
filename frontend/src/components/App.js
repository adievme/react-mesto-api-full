import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import '../index.css';

function App() {
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [users, setUsers] = useState([])
  const [token, setToken] = useState('')

  // Стейт авторизации пользователя
  const [loggedIn, setLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const history = useHistory();

  const onLogin = ({ email, password }) => {
    return auth.authorize(email, password)
      .then((res) => {
        // Если токен валидный, то сохраняем его в localStorage, вызываем ф-ю authorize для получения email и выполняем вход
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          authorize(res.token)
          setLoggedIn(true);

          history.push('/lenta')

          return res
        } else {
          return res
        }
      })
      .catch(err => console.log(err));
  };

  const authorize = (jwt) => {
    return auth.getContent(jwt)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.email);
          
          history.push('/lenta')
        }
      })
      .catch(err => console.log(err));
  };

  const handleRequestAllData = (jwt) => {
    return api.getAllNeededData(jwt) // возвращает результат исполнения нужных промисов (карточки и информации пользователя)
      .then(([cards, userData, users]) => {
        setCurrentUser(userData)
        setCards(cards.reverse())
        setUsers(users)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authorize(jwt);
      handleRequestAllData(jwt)
      setToken(jwt)
    }
  }, [loggedIn]);

  const onRegister = ({ email, password }) => {
    return auth.register(email, password)
      .then(res => res)
      .catch(err => console.log(err));
  };

  // при нажатии на "выйти" удаляем токен из localStorage
  function onSignOut() {
    localStorage.removeItem('jwt')

    setLoggedIn(false)
    setUserEmail('')
    setIsMenuClick(false)
    setToken('')
    console.log(token)

    history.push('/sign-in')
  }
  
  const [isMenuClick, setIsMenuClick] = useState(false)

  function onMenuClick() {
    !isMenuClick ? setIsMenuClick(true) : setIsMenuClick(false)
  }

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    if (!isLiked) {
      api.like(card._id, token)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(err));
    } else {
      api.dislike(card._id, token)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(err));
    }
  } 

  function handleUpdateUser(dataUser) {
    api.setUserInfo(dataUser, token)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(avaLink) {
    api.setUserAvatar(avaLink, token)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(dataCard) {
    return api.addCard(dataCard, token)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  // Стейты открытия попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  // Стейт попапа регистрации
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState({ data: {}, isOpen: false });
  // Стейт попапа с картинкой
  const [selectedCard, setSelectedCard] = useState({ data: {}, isOpen: false })

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(dataCard) {
    setSelectedCard({ data: dataCard, isOpen: true})
  }
  
  const [cardId, setCardId] = useState('')
  
  // Открыть попап удаления карточки и обновить стейт id карточки, которая передается при клике на иконку удаления
  function handleDeleteCardClick(cardId) {
    setIsDeleteCardPopupOpen(true)
    setCardId(cardId) 
  }

  function handleCardDelete() {
    api.deleteCard(cardId, token)
      .then(() => {
        setCards(state => state.filter((card) => card._id !== cardId))
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsDeleteCardPopupOpen(false)

    setIsInfoTooltipPopupOpen({ data: {}, isOpen: false })

    setSelectedCard({ data: {}, isOpen: false })
  }

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', closeByEscape)
    
    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header 
          userEmail={userEmail} 
          onSignOut={onSignOut} 
          onMenuClick={onMenuClick} 
          isMenuClick={isMenuClick} 
          loggedIn={loggedIn}
        />
        
        <Switch>
          <ProtectedRoute 
            path="/lenta"
            cards={cards}
            users={users}
            component={Main}
            loggedIn={loggedIn}
            onCardLike={handleCardLike}
            onCardClick={handleCardClick}
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick} 
            onCardDeleteClick={handleDeleteCardClick}
             
          />

          <Route path="/sign-in">
            <Login onLogin={onLogin} infoTooltip={setIsInfoTooltipPopupOpen} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={onRegister} infoTooltip={setIsInfoTooltipPopupOpen}/>
          </Route>

          <Route>
            {loggedIn ? (
              <Redirect to="/lenta" />
            ) : (
              <Redirect to="/sign-in" />
            )}
          </Route>
        </Switch>

        <Footer />

         {/* Компоненты попапов  */}
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDelete} />
        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  );
}



export default App;


