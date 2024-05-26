/* eslint-disable no-unused-vars */
import React from "react";
import { useGlobalContext } from "./Context";
import './Newslist.css';
import { useState,useRef } from "react";
const Newslist = () => {
  const { hits, isLoading } = useGlobalContext();
  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const sizesboxRef = useRef(null);
  const purchaseRef = useRef(null);

  function handleMouseMove(event) {
    const card = cardRef.current;
    const { offsetWidth: width, offsetHeight: height } = card;
    const { clientX, clientY } = event;
    const x = clientX - card.offsetLeft - width / 2;
    const y = clientY - card.offsetTop - height / 2;
    var mult = 3;
    setXRotation((y / height) * mult);
    setYRotation((x / width) * mult);
  }
  function handleMouseEnter() {
    const img = imgRef.current;
    const title = titleRef.current;
    const sizesBox = sizesboxRef.current;
    const purchase = purchaseRef.current;
    const desc = descRef.current
    title.style.transform = "translateZ(150px)";
    purchase.style.transform = "translateZ(75px)";
    desc.style.transform = "translateZ(75px)";
  }
  function handleMouseLeave() {
    setXRotation(0);
    setYRotation(0);

    const img = imgRef.current;
    const title = titleRef.current;
    const sizesBox = sizesboxRef.current;
    const purchase = purchaseRef.current;
    title.style.transform = "translateZ(0px)";
    purchase.style.transform = "translateZ(0px)";
  }

  if (isLoading) {
    return (
      <>
        <h1 style={{color:'white',fontSize:100}}>Loading.....</h1>
      </>
    );
  }
  return (
    <>
      <div className="newslist"
      >
        {hits.map((curPost) => {
          const { title, num_comments,url,author } = curPost;
          return (
            <div className="card"
            ref={cardRef}
      style={{
        transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    
      >
              <h2 ref={titleRef} style={{color:'white'}}>{title}</h2>
              <p ref={descRef} style={{color:'white'}}>
              Author:{author} | {num_comments}comments
              </p>
              <a href={url} ref={purchaseRef} >Read more</a>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Newslist;