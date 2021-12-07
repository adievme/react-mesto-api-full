const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  idValidate,
  cardValidate,
} = require('../validator/validator');

router.get('/', getCards);
router.post('/', cardValidate, createCard);
router.delete('/:id', idValidate, deleteCard);
router.put('/:id/likes', idValidate, likeCard);
router.delete('/:id/likes', idValidate, dislikeCard);

module.exports = router;
