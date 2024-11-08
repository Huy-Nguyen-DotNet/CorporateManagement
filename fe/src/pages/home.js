import React from 'react';

const Home = () => {
  return (
    <section id="hero">
      <div className="container-xl">
        <div className="row gy-4">
          <div className="col-lg-8">
            {/* Featured Post Large */}
            <div className="post featured-post-lg">
              <div className="details clearfix">
                <a href="category.html" className="category-badge">Inspiration</a>
                <h2 className="post-title"><a href="blog-single.html">T1 lại vô địch, fan đã già nhưng Faker còn trẻ!</a></h2>
                <ul className="meta list-inline mb-0">
                  <li className="list-inline-item"><a href="#">mHuy Doe</a></li>
                  <li className="list-inline-item">29 March 2021</li>
                </ul>
              </div>
              <a href="blog-single.html">
                <div className="thumb rounded">
                  <div className="inner data-bg-image" style={{ backgroundImage: 'url(images/posts/t1-faker-11.jpg)' }}></div>
                </div>
              </a>
            </div>
          </div>

          <div className="col-lg-4">
            {/* Post Tabs */}
            <div className="post-tabs rounded bordered">
              <ul className="nav nav-tabs nav-pills nav-fill" id="postsTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button aria-controls="popular" aria-selected="true" className="nav-link active" data-bs-target="#popular" data-bs-toggle="tab" id="popular-tab" role="tab" type="button">Popular</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button aria-controls="recent" aria-selected="false" className="nav-link" data-bs-target="#recent" data-bs-toggle="tab" id="recent-tab" role="tab" type="button">Recent</button>
                </li>
              </ul>
              <div className="tab-content" id="postsTabContent">
                <div className="lds-dual-ring"></div>
                {/* Popular Posts */}
                <div aria-labelledby="popular-tab" className="tab-pane fade show active" id="popular" role="tabpanel">
                  <div className="post post-list-sm circle">
                    <div className="thumb circle">
                      <a href="blog-single.html">
                        <div className="inner">
                          <img src="images/posts/tabs-1.jpg" alt="post-title" />
                        </div>
                      </a>
                    </div>
                    <div className="details clearfix">
                      <h6 className="post-title my-0"><a href="blog-single.html">T1 vô địch CKTG 2024, Faker lần thứ 5 trên đỉnh thế giới</a></h6>
                      <ul className="meta list-inline mt-1 mb-0">
                        <li className="list-inline-item">29 March 2021</li>
                      </ul>
                    </div>
                  </div>
                  {/* More posts */}
                  <div className="post post-list-sm circle">
                    <div className="thumb circle">
                      <a href="blog-single.html">
                        <div className="inner">
                          <img src="images/posts/tabs-2.jpg" alt="post-title" />
                        </div>
                      </a>
                    </div>
                    <div className="details clearfix">
                      <h6 className="post-title my-0"><a href="blog-single.html">Chùm ảnh: T1 vô địch CKTG 2024, Faker lần thứ 5 trên đỉnh thế giới</a></h6>
                      <ul className="meta list-inline mt-1 mb-0">
                        <li className="list-inline-item">29 March 2021</li>
                      </ul>
                    </div>
                  </div>
                  <div className="post post-list-sm circle">
                    <div className="thumb circle">
                      <a href="blog-single.html">
                        <div className="inner">
                          <img src="images/posts/tabs-3.jpg" alt="post-title" />
                        </div>
                      </a>
                    </div>
                    <div className="details clearfix">
                      <h6 className="post-title my-0"><a href="blog-single.html">T1 Lên Ngôi Vô Địch CKTG 2024: Một Chương Mới Trong Lịch Sử LMHT</a></h6>
                      <ul className="meta list-inline mt-1 mb-0">
                        <li className="list-inline-item">29 March 2021</li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Recent Posts */}
                <div aria-labelledby="recent-tab" className="tab-pane fade" id="recent" role="tabpanel">
                  <div className="post post-list-sm circle">
                    <div className="thumb circle">
                      <a href="blog-single.html">
                        <div className="inner">
                          <img src="images/posts/tabs-2.jpg" alt="post-title" />
                        </div>
                      </a>
                    </div>
                    <div className="details clearfix">
                      <h6 className="post-title my-0"><a href="blog-single.html">Chùm ảnh: T1 vô địch CKTG 2024, Faker lần thứ 5 trên đỉnh thế giới</a></h6>
                      <ul className="meta list-inline mt-1 mb-0">
                        <li className="list-inline-item">29 March 2021</li>
                      </ul>
                    </div>
                  </div>
                  {/* More posts */}
                  <div className="post post-list-sm circle">
                    <div className="thumb circle">
                      <a href="blog-single.html">
                        <div className="inner">
                          <img src="images/posts/tabs-1.jpg" alt="post-title" />
                        </div>
                      </a>
                    </div>
                    <div className="details clearfix">
                      <h6 className="post-title my-0"><a href="blog-single.html">T1 vô địch CKTG 2024, Faker lần thứ 5 trên đỉnh thế giới</a></h6>
                      <ul className="meta list-inline mt-1 mb-0">
                        <li className="list-inline-item">29 March 2021</li>
                      </ul>
                    </div>
                  </div>
                  <div className="post post-list-sm circle">
                    <div className="thumb circle">
                      <a href="blog-single.html">
                        <div className="inner">
                          <img src="images/posts/t1-faker-1.jpg" alt="post-title" />
                        </div>
                      </a>
                    </div>
                    <div className="details clearfix">
                      <h6 className="post-title my-0"><a href="blog-single.html">Vô địch CKTG, Faker bước vào ngôi đền của các huyền thoại</a></h6>
                      <ul className="meta list-inline mt-1 mb-0">
                        <li className="list-inline-item">29 March 2021</li>
                      </ul>
                    </div>
                  </div>
                  <div className="post post-list-sm circle">
                    <div className="thumb circle">
                      <a href="blog-single.html">
                        <div className="inner">
                          <img src="images/posts/tabs-3.jpg" alt="post-title" />
                        </div>
                      </a>
                    </div>
                    <div className="details clearfix">
                      <h6 className="post-title my-0"><a href="blog-single.html">T1 Lên Ngôi Vô Địch CKTG 2024: Một Chương Mới Trong Lịch Sử LMHT</a></h6>
                      <ul className="meta list-inline mt-1 mb-0">
                        <li className="list-inline-item">29 March 2021</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
