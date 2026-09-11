import React from 'react';

function Blog({ categories = [] }) {
  const posts = categories.length
    ? categories.slice(0, 4).map((category, index) => ({
        title: `${category.name} Hiring Signals`,
        category: category.name,
        date: 'Updated today',
        summary: `Explore practical hiring patterns and skill demand trends for ${category.name}.`,
      }))
    : [
        {
          title: 'Career Strategy Guide',
          category: 'Career Growth',
          date: 'Updated today',
          summary: 'Plan your next move with clearer role positioning and skill mapping.',
        },
        {
          title: 'Interview Preparation',
          category: 'Hiring',
          date: 'Updated today',
          summary: 'Prepare for better conversations before you apply to a role.',
        },
      ];

  return (
    <section className="blog-page">
      <div className="blog-hero">
        <span className="blog-kicker">Career Journal</span>
        <h1>Career Insights & Hiring Trends</h1>
        <p>Advice, hiring signals, and category-led role discovery from the jobs feed.</p>
      </div>

      <div className="blog-grid">
        {posts.map((post, index) => (
          <article className="blog-card" key={post.title}>
            <span className="blog-category">{post.category}</span>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <div className="blog-card-meta">
              <span>{post.date}</span>
              <a href="#read">Read article →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Blog;
