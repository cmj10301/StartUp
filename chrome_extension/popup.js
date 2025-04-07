// popup.js

let searchHistoryData = [];

// 초기 실행 시 동의 여부 확인
chrome.storage.sync.get(['agreedToHistoryAccess'], (result) => {
  const agreed = result.agreedToHistoryAccess;
  updateUI(agreed);
});

document.getElementById("agreeBtn").addEventListener("click", () => {
  chrome.storage.sync.set({ agreedToHistoryAccess: true }, () => {
    updateUI(true);
  });
});

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

document.getElementById("sendDataBtn").addEventListener("click", () => {
  if (!searchHistoryData.length) {
    alert("먼저 검색 기록을 가져와 주세요.");
    return;
  }

  fetch('http://localhost:3000/api/saveSearchHistory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(searchHistoryData),
  })
    .then(res => res.json())
    .then(result => {
      console.log("서버 응답:", result);
      alert("데이터가 성공적으로 전송되었습니다!");

      chrome.tabs.query({}, (tabs) => {
        const targetTab = tabs.find(tab =>
          tab.url && tab.url.includes('/history')
        );

        if (targetTab && targetTab.id) {
          chrome.tabs.reload(targetTab.id);
        }
      });
    })
    .catch(err => {
      console.error("전송 오류:", err);
      alert("전송에 실패했습니다.")
    });
});


function updateUI(agreed) {
  const statusText = document.getElementById("statusText");
  const fetchBtn = document.getElementById("fetchHistoryBtn");
  const sendBtn = document.getElementById("sendDataBtn");

  if (agreed) {
    statusText.textContent = "✔ 검색 기록 수집에 동의하셨습니다.";
    fetchBtn.disabled = false;
    sendBtn.disabled = false;
  } else {
    statusText.textContent = "❗ 검색 기록 수집에 동의하지 않으셨습니다.";
    fetchBtn.disabled = true;
    sendBtn.disabled = true;
  }
}
