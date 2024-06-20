class Card {
  constructor(cardData, cardTemplate) {
    this._name = cardData.name;
    this._link = cardData.link;

    this._cardTemplate = cardTemplate;
  }

  _getTemplate() {
    document.querySelector(this._cardTemplate);
  }

  getView() {}
}

export default Card;
