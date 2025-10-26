import React from "react";
import { useLoaderData } from "react-router";
import Banner from "./Banner";

const Home = () => {
  const { data } = useLoaderData();

  return (
    <div>
      <Banner data={data} />
    </div>
  );
};

export default Home;
