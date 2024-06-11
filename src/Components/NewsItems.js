import React from "react";
const NewsItems =(props)=> {
    let {title,description,imageURL,newsURL,author,publishedAt,source}=props;
    return (
      <div className="mb-3">
      <div className="card"> {/*style={{width: '26rem'}} */}
      <div style={{display: 'flex',justifyContent: 'flex-end',position: 'absolute',right: '0'}}> 
      <span className="badge rounded-pill bg-danger"style={{top:"10%",left:"90%",zIndex:'1'}}>{source}</span>
      </div>  
        <img src={!imageURL?"https://img.icons8.com/dusk/64/000000/no-image.png":imageURL} className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">By {author?author:'Unknown'} on {new Date(publishedAt).toGMTString()}</small></p>
          <a href={newsURL} className="btn btn-sm btn-dark" target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      </div>
      </div>
    );
}

export default NewsItems;
