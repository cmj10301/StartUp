import { Button, Image } from "react-bootstrap";

export default function History() {
    return (
        <div className="main">
            <Image src="/zoom.gif" alt="zoom" width={200} height={200}/>
            <p>기록을 찾는 여정</p>
            <Button>시작하기</Button>
        </div>
    )
}