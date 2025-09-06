export default function AboutUs() {
  return (
    <section className="bg-card p-6 sm:p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold mb-6 border-b pb-4 text-primary">About Us</h1>
      <div className="prose prose-lg max-w-none space-y-4">
        <p>
          Welcome to the Ukrainian Writers' Space!
        </p>
        <p>
          This is a community-driven platform for Ukrainian technical writers, UX writers, content writers, 
          copywriters, and all other wordsmiths in the tech industry to share their expertise, learn from 
          each other, and grow together.
        </p>
        <p>
          Our mission is to create a vibrant and supportive environment where Ukrainian talent can shine. 
          Whether you want to share an article, ask a question, or connect with peers, you're in the right place.
        </p>
        <h2 className="text-2xl font-bold">What You Can Do</h2>
        <ul>
          <li><strong>Read & Learn:</strong> Explore insightful articles from writers in the community.</li>
          <li><strong>Share Your Voice:</strong> Become a contributor and publish your own tutorials and insights.</li>
          <li><strong>Connect:</strong> Join the conversation and become part of a growing professional network.</li>
        </ul>
        <p>
          Let's write together!
        </p>
      </div>
    </section>
  );
}
