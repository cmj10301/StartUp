// background.js
chrome.runtime.onInstalled.addListener(() => {
    // 예시: 기본 색상 저장 (추후 마인드맵 데이터 가공에도 활용 가능)
    chrome.storage.sync.set({ defaultColor: '#3aa757' });
    console.log('확장 프로그램이 설치되었습니다. 기본 색상이 저장되었습니다.');
  });
  