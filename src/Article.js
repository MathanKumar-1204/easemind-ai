import React from 'react';

// ArticleItem Component
const ArticleItem = ({ title, description, link }) => {
    return (
      <div className="article-item" onClick={() => window.location.href = link}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    );
  };
  
  // Article Component
  const Article = () => {
    // List of articles
    const articles = [
      {
        title: "Stress Management/Reliever",
        description: "Is stress making you angry and grouchy? Stress relievers can help bring back calm and peace to your busy life. You don't have to put a lot of time or thought into stress relievers. If your stress is getting out of control and you need quick relief, try one of these tips.",
        link: "https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/stress-relievers/art-20047257"
      },
      {
        title: "16 Ways to Relieve Stress",
        description: "Engaging in activities that support self-care may help reduce stress and anxiety. These can include exercise and mindfulness practices.",
        link: "https://www.healthline.com/nutrition/16-ways-relieve-stress-anxiety#3.-Minimize-phone-use-and-screen-time"
      },
      {
        title: "Tools, Activities, Guidelines, Tips to Relieve Stress",
        description: "If you're stressed, whether by your job or something more personal, the first step to feeling better is to identify the cause.",
        link: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/tips-to-reduce-stress/"
      }
    ];
  
    return (
      <div className="article">
        {articles.map((article, index) => (
          <ArticleItem 
            key={index} 
            title={article.title} 
            description={article.description} 
            link={article.link}
          />
        ))}
      </div>
    );
  };
export default Article;