import React from "react";
import Featured from "../components/FeaturedNews";
import Trending from "../components/TrendingNews";
import Latest from "../components/LatestNews";
import Hero from "../components/HeroNews";
import Popular from "../components/PopularNews";
import WidgetTags from "../components/widgetTags";
import WidgetCategories from "../components/widgetCategories";

const Home = () => {
  return (
    <div>
      <section id="hero">
        <div class="container-xl">
          <div class="row gy-4">
            <div class="col-lg-12">
              <Hero />
            </div>
          </div>
        </div>
      </section>
      <section class="main-content">
        <div class="container-xl">
          <div class="row gy-4">
            <div class="col-lg-8">
              <Featured />
              <Trending />
              <Latest />
            </div>
            <div class="col-lg-4">
              <Popular />
              <WidgetCategories />
              <WidgetTags />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
