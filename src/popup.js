'use strict';

import './popup.css';

chrome.storage.sync.get("last_update_time", ({ last_update_time }) => {
  document.getElementById("last_update_time").innerText = last_update_time?last_update_time:"no data";
});

chrome.storage.sync.get("gas_price", ({ gas_price }) => {
  document.getElementById("gas_price").innerText = gas_price?gas_price:"no data";
});

chrome.storage.sync.get("gas_burner", ({ gas_burner }) => {
  document.getElementById("gas_burner").innerText = gas_burner?gas_burner:"no data";
});

chrome.storage.sync.get("gas_burner_contract", ({ gas_burner_contract }) => {
  document.getElementById("gas_burner").href = gas_burner_contract?gas_burner_contract:"#";
});

chrome.storage.onChanged.addListener(function (changes, area) {
  if (changes["last_update_time"] && changes["last_update_time"].newValue){
    document.getElementById("last_update_time").innerText = changes["last_update_time"].newValue;
  }
  if (changes["gas_price"] && changes["gas_price"].newValue){
    document.getElementById("gas_price").innerText = changes["gas_price"].newValue;
  }
  if (changes["gas_burner"] && changes["gas_burner"].newValue && changes["gas_burner_contract"] && changes["gas_burner_contract"].newValue ){
    document.getElementById("gas_burner").innerText = changes["gas_burner"].newValue;
    document.getElementById("gas_burner").href = changes["gas_burner_contract"].newValue;
  }
});
