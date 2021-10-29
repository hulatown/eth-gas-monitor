// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

const gas_uri = "https://api.ultrasound.money/fees/all";
const ethereum_explorer = "https://etherscan.io/address/";
let fetch_intervals = 15; 
let last_update_time, gas_price, gas_burner, gas_burner_url, gas_burner_name;

const get_gas_data = async () => {
  const response = await fetch(gas_uri);
  const response_json = await response.json()
  let now = new Date();
  last_update_time = now.toLocaleString('zh-CN');
  gas_price = Math.round(response_json['baseFeePerGas']/(10 ** 9));
  gas_burner = response_json['leaderboards']['leaderboard5m'][0];
  gas_burner_name = gas_burner['name'];
  if (gas_burner['id'] !== 'eth-transfers'){
    gas_burner_url = ethereum_explorer + gas_burner['id'];
  }else{
    gas_burner_url = "#";
  }

  chrome.action.setBadgeText({text: gas_price.toString()});
  
  chrome.storage.sync.set({"last_update_time": last_update_time, "gas_price": gas_price, "gas_burner": gas_burner_name, "gas_burner_contract": gas_burner_url}, function() {
    console.log('last update time:'+last_update_time);
    console.log('gas price:'+gas_price);
    console.log('gas burner:'+gas_burner_name);
    console.log('gas burner contract:'+gas_burner_url);
  })
  return response_json;
}


chrome.alarms.create({
  periodInMinutes: fetch_intervals/60,
  delayInMinutes: 0
});

chrome.alarms.onAlarm.addListener(() => {
  try{
    get_gas_data();
  }catch(e){
    console.log('Failed to fetch! Error message: '+e.message);
  }
});
