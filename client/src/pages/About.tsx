const About = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="hero">
          <h3>👋 Welcome!</h3>
          <p>
            We are a team of coders, engineers, and thinkers with over 6 years
            of experience building scalable, high-performance web applications.
          </p>
        </div>

        <div className="intro">
          <p>
            This site was built by one of us (shout-out to{" "}
            <strong>Tambi 📣</strong>) to keep you updated on Node.js and
            everything web-related. Here you’ll find:
          </p>
          <ul>
            <li>
              <strong>In-depth tutorials</strong> on everything from HTTP
              request logging with Morgan to advanced stream processing,
              clustering, and production-grade error handling.
            </li>
            <li>
              <strong>Practical guides</strong> on securing your APIs with JWT,
              rate-limiting traffic to protect your services, and scaling out
              via clusters and PM2.
            </li>
            <li>
              <strong>Hands-on code examples</strong> you can clone, fork, and
              adapt—whether you’re building your first server or optimizing a
              massive distributed system.
            </li>
          </ul>
        </div>

        <div className="mission">
          <p>
            Our goal is to help you master both the fundamentals and the edge
            cases of Node.js. Every topic is crafted from real projects we’ve
            led—so you get battle-tested patterns, clear explanations, and
            actionable snippets you can drop straight into your codebase.
          </p>
          <p>
            We hope you enjoy exploring these modules as much as we enjoyed
            writing them. Happy coding! 🚀
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
