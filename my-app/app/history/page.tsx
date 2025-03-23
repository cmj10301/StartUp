import { Button, Image } from "react-bootstrap";

export default function History() {
    return (
        <div className="main">
            <Image src="/zoom.gif" alt="zoom" width={200} height={200}/>
            <br></br>
            <h3>검색 기록으로 유추하기</h3>
            <div className="main_button_group">
                <Button size="lg" >시작하기</Button>
            </div>
        </div>
    )
}