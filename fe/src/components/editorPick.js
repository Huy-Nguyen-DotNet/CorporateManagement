import React from 'react';

const posts = [
  {
    category: 'Lifestyle',
    image: 'images/posts/t1-faker-1.jpg',
    authorImage: 'images/other/mHuy.jpg',
    author: 'mHuy Doe',
    date: '29 March 2021',
    title: 'Vô địch CKTG, Faker bước vào ngôi đền của các huyền thoại',
    excerpt: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy',
    link: 'blog-single.html',
  },
  {
    category: '',
    image: 'images/posts/t1-cup-2.jpg',
    authorImage: '',
    author: '',
    date: '29 March 2021',
    title: 'T1 vô địch CKTG 2024, Faker lần thứ 5 trên đỉnh thế giới',
    excerpt: '',
    link: 'blog-single.html',
  },
  {
    category: '',
    image: 'images/posts/t1-cup.jpg',
    authorImage: '',
    author: '',
    date: '29 March 2021',
    title: 'Chùm ảnh: T1 vô địch CKTG 2024, Faker lần thứ 5 trên đỉnh thế giới',
    excerpt: '',
    link: 'blog-single.html',
  },
  {
    category: '',
    image: 'images/posts/t1-full-2.jpg',
    authorImage: '',
    author: '',
    date: '29 March 2021',
    title: 'T1 Lên Ngôi Vô Địch CKTG 2024: Một Chương Mới Trong Lịch Sử LMHT',
    excerpt: '',
    link: 'blog-single.html',
  },
  {
    category: '',
    image: 'images/posts/t1-faker-1.jpg',
    authorImage: '',
    author: '',
    date: '29 March 2021',
    title: 'Vô địch CKTG, Faker bước vào ngôi đền của các huyền thoại',
    excerpt: '',
    link: 'blog-single.html',
  },
];

const EditorPick = () => {
  return (
    <div>
      <div className="section-header">
        <h3 className="section-title">Editor’s Pick</h3>
        <img src="images/wave.svg" className="wave" alt="wave" />
      </div>

      <div className="padding-30 rounded bordered">
        <div className="row gy-5">
          <div className="col-sm-6">
            {posts.slice(0, 1).map((post, index) => (
              <div key={index} className="post">
                <div className="thumb rounded">
                  {post.category && (
                    <a href="category.html" className="category-badge position-absolute">
                      {post.category}
                    </a>
                  )}
                  <span className="post-format">
                    <i className="icon-picture"></i>
                  </span>
                  <a href={post.link}>
                    <div className="inner">
                      <img src={post.image} alt="post-title" />
                    </div>
                  </a>
                </div>
                <ul className="meta list-inline mt-4 mb-0">
                  {post.authorImage && (
                    <li className="list-inline-item">
                      <a href="#">
                        <img src={post.authorImage} className="author" alt="author" />
                        {post.author}
                      </a>
                    </li>
                  )}
                  <li className="list-inline-item">{post.date}</li>
                </ul>
                <h5 className="post-title mb-3 mt-3">
                  <a href={post.link}>{post.title}</a>
                </h5>
                <p className="excerpt mb-0">{post.excerpt}</p>
              </div>
            ))}
          </div>
          <div className="col-sm-6">
            {posts.slice(1).map((post, index) => (
              <div key={index} className="post post-list-sm square">
                <div className="thumb rounded">
                  <a href={post.link}>
                    <div className="inner">
                      <img src={post.image} alt="post-title" />
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
      </div>

      <div className="spacer" data-height="50"></div>
    </div>
  );
};

export default EditorPick;
