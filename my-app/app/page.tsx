'use client'
import { useState } from "react";
import { Figure } from "react-bootstrap";

export default function Home() {
  let [수량, 수량변경] = useState(0);
  return (
    <main>
      <Figure>
        <Figure.Image
          width={171}
          height={180}
          alt="171x180"
          src="Study/my-app/app/public/ai_icon.png"
        />
        <Figure.Caption>
          Nulla vitae elit libero, a pharetra augue mollis interdum.
        </Figure.Caption>
      </Figure>
      <button onClick={() => {수량변경(수량  + 1)}}>{수량}버튼</button>
    </main>
  );
}
