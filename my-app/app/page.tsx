import { Button, Image } from "react-bootstrap";

export default function Home() {
  return (
    <main>
      <div className="main">
        <Image src="/ai_icon.png" alt="ai_img" width={250} height={250}/>
        <br></br>
        <p>잃어버린 기억을 찾도록 도와드립니다</p>
        <div className="main_button_group">
          <Button>버튼1</Button>
        </div>
      </div>
    </main>
  );
}
