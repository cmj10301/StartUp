// popup.js

// 전역 변수에 검색 기록 데이터를 저장
let searchHistoryData = [];

// '검색 기록 가져오기' 버튼 클릭 이벤트
document.getElementById("fetchHistoryBtn").addEventListener("click", () => {
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  chrome.history.search(
    { text: "", startTime: oneWeekAgo, maxResults: 100 },
    (historyItems) => {
      console.log("가져온 검색 기록:", historyItems);
      searchHistoryData = historyItems;
      alert("검색 기록을 성공적으로 가져왔습니다!");
    }
  );
});

// '내 웹페이지로 보내기' 버튼 클릭 이벤트
document.getElementById("sendDataBtn").addEventListener("click", () => {
  if (!searchHistoryData.length) {
    alert("먼저 검색 기록을 가져와 주세요.");
    return;
  }
  sendDataToServer(searchHistoryData);
});

function sendDataToServer(data) {
  fetch('http://localhost:3000/api/saveSearchHistory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

    .then(response => response.json())
    .then(result => {
      console.log('서버 응답:', result);
      alert('데이터가 성공적으로 전송되었습니다!');
    })
    .catch(error => {
      console.error('데이터 전송 중 오류 발생:', error);
      alert('데이터 전송에 실패하였습니다.');
    });
}
