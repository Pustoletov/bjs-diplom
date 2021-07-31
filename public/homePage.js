"use strict";

const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

logoutButton.action = () => ApiConnector.logout(callback => {
  if(callback.success = true) {
    location.reload();
  }
});


ApiConnector.current(callback => {
  if (callback.success = true) {
    ProfileWidget.showProfile(callback.data);
  }
});

function gateMoney () {
  ApiConnector.getStocks(callback => {
    if (callback.success = true) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(callback.data);
    }
  });
}

gateMoney();
let updateInterval = setInterval(() => gateMoney(), 60000);

moneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, callback => {
  if (callback.success) {
    ProfileWidget.showProfile(callback.data);
    moneyManager.setMessage(true, 'Балланс пополнен!');
  } else {
    moneyManager.setMessage(false, callback.error);
  }
});

moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, callback => {
  if (callback.success) {
    ProfileWidget.showProfile(callback.data);
    moneyManager.setMessage(true, 'Конвертация выполнена успешно!');
  } else {
    moneyManager.setMessage(false, callback.error);
  }
});

moneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, callback => {
  if (callback.success) {
    ProfileWidget.showProfile(callback.data);
    moneyManager.setMessage(true, 'Перевод выполнен успешно!');
  } else {
    moneyManager.setMessage(false, callback.error);
  }
});

ApiConnector.getFavorites(callback => {
  if (callback.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(callback.data);
    favoritesWidget.updateUsersList(callback.data);
  }
});

favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, callback => {
  if (callback.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(callback.data);
    favoritesWidget.updateUsersList(callback.data);
    favoritesWidget.setMessage(true, 'Пользователь добавлен!');
  } else {
    favoritesWidget.setMessage(false, callback.error);
  }
}); 

favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, callback => {
  if (callback.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(callback.data);
    favoritesWidget.updateUsersList(callback.data);
    favoritesWidget.setMessage(true, 'Пользователь удалён!');
  } else {
    favoritesWidget.setMessage(false, callback.error);
  }
}); 


