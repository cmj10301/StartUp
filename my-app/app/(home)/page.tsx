import { Button, Image } from "react-bootstrap";

export default function Home() {
  return (
    <div className="main">
      <Image src="/ai_icon.png" alt="ai_img" width={200} height={200} />
      <hr></hr>
      <h3>잃어버린 기억을 찾도록 도와드립니다</h3>
      <div className="main_button_group">
        <Button className="me-2">버튼1</Button>
        <Button>버튼2</Button>
      </div>
    </div>
  );
}
