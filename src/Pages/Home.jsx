import React from "react";
import { useLoaderData } from "react-router";
import Banner from "./Banner";
import Category from "./Category";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [categories, setCategories] = useState([]);

  const { data } = useLoaderData();
  useEffect(() => {
    fetch("/courses.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch();
  }, []);

  return (
    <div>
      <Banner data={data} />
      <section className="px-10">
        <Category categories={categories}></Category>
      </section>
    </div>
  );
};

export default Home;
