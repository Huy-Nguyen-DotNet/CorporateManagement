import React from 'react';

const Trending = () => {
  return (
    <div className="section-header">
      <h3 className="section-title">Trending</h3>
      <img src="images/wave.svg" className="wave" alt="wave" />
      
      <div className="padding-30 rounded bordered">
        <div className="row gy-5">
          <div className="col-sm-6">
            {/* Post Large */}
            <div className="post">
              <div className="thumb rounded">
                <a href="category.html" className="category-badge position-absolute">Culture</a>
                <span className="post-format">
                  <i className="icon-picture"></i>
                </span>
                <a href="blog-single.html">
                  <div className="inner">
                    <img src="images/posts/t1-full.jpg" alt="post-title" />
                  </div>
                </a>
              </div>
              <ul className="meta list-inline mt-4 mb-0">
                <li className="list-inline-item">
                  <a href="#">
                    <img src="images/other/mHuy.jpg" className="author" alt="author" />
                    mHuy Doe
                  </a>
                </li>
                <li className="list-inline-item">29 March 2021</li>
              </ul>
              <h5 className="post-title mb-3 mt-3">
                <a href="blog-single.html">
                  T1 hậu vô địch CKTG 2024: Faker lập kỉ lục đi vào lịch sử
                </a>
              </h5>
              <p className="excerpt mb-0">
                Với chiến thắng trước BLG, T1 đã trở thành đội tuyển đầu tiên trong lịch sử CKTG vô địch hai lần liên tiếp với cùng một đội hình bao gồm ZOFGK.
              </p>
            </div>

            {/* Post Small 1 */}
            <div className="post post-list-sm square before-seperator">
              <div className="thumb rounded">
                <a href="blog-single.html">
                  <div className="inner">
                    <img src="images/posts/t1-cup-2.jpg" alt="post-title" />
                  </div>
                </a>
              </div>
              <div className="details clearfix">
                <h6 className="post-title my-0">
                  <a href="blog-single.html">T1 vô địch CKTG 2024, Faker lần thứ 5 trên đỉnh thế giới</a>
                </h6>
                <ul className="meta list-inline mt-1 mb-0">
                  <li className="list-inline-item">29 March 2021</li>
                </ul>
              </div>
            </div>

            {/* Post Small 2 */}
            <div className="post post-list-sm square before-seperator">
              <div className="thumb rounded">
                <a href="blog-single.html">
                  <div className="inner">
                    <img src="images/posts/t1-cup.jpg" alt="post-title" />
                  </div>
                </a>
              </div>
              <div className="details clearfix">
                <h6 className="post-title my-0">
                  <a href="blog-single.html">Chùm ảnh: T1 vô địch CKTG 2024, Faker lần thứ 5 trên đỉnh thế giới</a>
                </h6>
                <ul className="meta list-inline mt-1 mb-0">
                  <li className="list-inline-item">29 March 2021</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            {/* Post Large */}
            <div className="post">
              <div className="thumb rounded">
                <a href="category.html" className="category-badge position-absolute">Inspiration</a>
                <span className="post-format">
                  <i className="icon-earphones"></i>
                </span>
                <a href="blog-single.html">
                  <div className="inner">
                    <img src="images/posts/t1-faker-11.jpg" alt="post-title" />
                  </div>
                </a>
              </div>
              <ul className="meta list-inline mt-4 mb-0">
                <li className="list-inline-item">
                  <a href="#">
                    <img src="images/other/mHuy.jpg" className="author" alt="author" />
                    mHuy Doe
                  </a>
                </li>
                <li className="list-inline-item">29 March 2021</li>
              </ul>
              <h5 className="post-title mb-3 mt-3">
                <a href="blog-single.html">
                  T1 lại vô địch, fan đã già nhưng Faker còn trẻ!
                </a>
              </h5>
              <p className="excerpt mb-0">
                11 năm, hơn một thập kỷ, Faker vẫn ở đó, đứng trên sân khấu lớn nhất của Liên Minh Huyền Thoại và nâng cao Summoner’s Cup lần thứ 5 trong sự nghiệp.
              </p>
            </div>

            {/* Post Small 3 */}
            <div className="post post-list-sm square before-seperator">
              <div className="thumb rounded">
                <a href="blog-single.html">
                  <div className="inner">
                    <img src="images/posts/trending-sm-3.jpg" alt="post-title" />
                  </div>
                </a>
              </div>
              <div className="details clearfix">
                <h6 className="post-title my-0">
                  <a href="blog-single.html">Here Are 8 Ways To Success Faster</a>
                </h6>
                <ul className="meta list-inline mt-1 mb-0">
                  <li className="list-inline-item">29 March 2021</li>
                </ul>
              </div>
            </div>

            {/* Post Small 4 */}
            <div className="post post-list-sm square before-seperator">
              <div className="thumb rounded">
                <a href="blog-single.html">
                  <div className="inner">
                    <img src="images/posts/trending-sm-4.jpg" alt="post-title" />
                  </div>
                </a>
              </div>
              <div className="details clearfix">
                <h6 className="post-title my-0">
                  <a href="blog-single.html">Master The Art Of Nature With These 7 Tips</a>
                </h6>
                <ul className="meta list-inline mt-1 mb-0">
                  <li className="list-inline-item">29 March 2021</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="spacer" data-height="50"></div>
    </div>
  );
};

export default Trending;
