import React from 'react';
import './Article.css';
import { format } from 'date-fns';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SellIcon from '@mui/icons-material/Sell';

const Article = ({ title, data, sorcePage, handleTags }) => {
  return (
    <>
      <div className="articleContainer">
        <p>記事数 : {data.length}</p>
        <a className='articleTitle' href={sorcePage} target="_blank" rel="noopener noreferrer"><h2 className={`articleTitle-${title}`}>{title}</h2></a>
        {data.length === 0 ? (
          <div className="no-data"><h2>No data</h2></div>
        ) : (
          <div className="articleBody">
            {data.map((item, index) => (
              <div key={index}>
                <ThumbUpAltIcon />: {item.likes}
                <CalendarMonthIcon />: {format(Date.parse(item.postDate), 'yyyy/MM/dd')}
                <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                <div className="tagContainer">
                  <SellIcon />
                  {item.tags.map((tag, index) => (
                    <div key={index} className='articleTagsSquare' onClick={() => handleTags(tag)} >{tag}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Article;
