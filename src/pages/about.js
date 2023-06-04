import React, { useEffect, useState } from "react";
const About = ({ data }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(time + 1);
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, [time]);
  return (
    <div className="about-wrapper">
      <>
        <h1 style={{ fontSize: "20px" }}>title: {data?.title}</h1>
        <div>Id: {data?.id}</div>
        <div>time: {time}</div>
      </>
    </div>
  );
};

export default About;

export async function getServerSideProps(context) {
  const { postId } = context?.query;
  context.res.setHeader(
    "Cache-Control",
    "s-maxage=15, stale-while-revalidate=30"
  );
  const res = await fetch(
    `https://js-post-api.herokuapp.com/api/posts/${postId}`
  );
  const data = await res.json();
  return {
    props: { data: data },
  };
}
