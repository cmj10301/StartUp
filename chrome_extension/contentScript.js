// contentScript.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'sendData') {
      const searchHistoryData = request.data;
      console.log('받은 검색 기록 데이터:', searchHistoryData);
      // 여기서 데이터를 처리하거나 웹 페이지와 상호작용하는 코드를 추가합니다.
      sendResponse({ status: '데이터를 성공적으로 수신하였습니다.' });
    }
  });
  