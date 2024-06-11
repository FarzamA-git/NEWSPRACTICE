import React,{useState,useEffect} from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=>{
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async ()=> {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  
  useEffect(() => {
      updateNews(page)
  }, [page, updateNews]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setPage(page + 1);
  };
  // This is PAGINATION FUNCTIONALITY
  // handlePage = async (pageState) => {
  //   if (pageState === "Prev") {
  //     this.updateNews();
  //     this.setState({
  //       page: this.state.page - 1,
  //     });
  //   } else if (pageState === "Next") {
  //     if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
  //       this.updateNews();
  //       this.setState({
  //         page: this.state.page + 1,
  //       });
  //     }
  //   }
  // };

    return (
      <>
        <h2 className="text-center" style={{ margin: "90px 0px 35px" }}>
          NewsMonkey - Top News
        </h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-2">
              {/* {!this.state.loading && this.state.articles.map((element) => {PAGINATION CONDITION */}
              {articles.map((element,index) => {
                return (
                  <div className="col-md-4" key={`${element.url}-${index}`}>
                  <NewsItems
                      key={`${element.url}-${index}`}
                      title={element.title}
                      description={element.description}
                      imageURL={element.urlToImage}
                      newsURL={element.url}
                      publishedAt={element.publishedAt}
                      author={element.author}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* This is PAGINATION */}
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page < 1}
            type="button"
            onClick={() => this.handlePage("Prev")}
            className="btn btn-dark"
          >
            Previous
          </button>
          <button
            type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            onClick={() => this.handlePage("Next")}
            className="btn btn-dark"
          >
            Next
          </button>
        </div> */}
      </>
    );
}

News.defaultProps = {
  country: "us",
  pageSize: 9,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
