"use strict";

const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();

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