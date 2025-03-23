import Link from 'next/link';
import { Button, Image } from "react-bootstrap";

export default function Home() {
  return (
    <div className="main">
      <Image src="/ai_icon.png" alt="ai_img" width={200} height={200} />
      <hr></hr>
      <h3>잃어버린 기억을 찾도록 도와드립니다</h3>
      <div className="main_button_group">
        <Link href="/history" passHref>
          <Button size="lg" className="me-2">검색 기록에서 찾아보기</Button>
        </Link>
        <Link href="/ai" passHref>
          <Button size="lg">AI와 대화하며 찾아보기</Button>
        </Link>
      </div>
    </div>
  );
}
