import React from 'react';

const PopularPosts = () => {
  const posts = [
    {
      id: 1,
      title: "T1 vô địch CKTG 2024, Faker lần thứ 5 trên đỉnh thế giới",
      date: "29 March 2021",
      image: "/images/posts/tabs-1.jpg",
      link: "blog-single.html",
    },
    {
      id: 2,
      title: "Chùm ảnh: T1 vô địch CKTG 2024, Faker lần thứ 5 trên đỉnh thế giới",
      date: "29 March 2021",
      image: "/images/posts/tabs-2.jpg",
      link: "blog-single.html",
    },
    {
      id: 3,
      title: "T1 Lên Ngôi Vô Địch CKTG 2024: Một Chương Mới Trong Lịch Sử LMHT",
      date: "29 March 2021",
      image: "/images/posts/tabs-3.jpg",
      link: "blog-single.html",
    },
  ];

  return (
    <div className="widget rounded">
      <div className="widget-header text-center">
        <h3 className="widget-title">Popular Posts</h3>
        <img src="/images/wave.svg" className="wave" alt="wave" />
      </div>
      <div className="widget-content">
        {posts.map((post) => (
          <div className="post post-list-sm circle" key={post.id}>
            <div className="thumb circle">
              <span className="number">{post.id}</span>
              <a href={post.link}>
                <div className="inner">
                  <img src={post.image} alt={post.title} />
                </div>
              </a>
            </div>
            <div className="details clearfix">
              <h6 className="post-title my-0">
                <a href={post.link}>{post.title}</a>
              </h6>
              <ul className="meta list-inline mt-1 mb-0">
                <li className="list-inline-item">{post.date}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;
