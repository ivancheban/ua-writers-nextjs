export default function Contribute() {
  return (
    <section className="bg-card p-6 sm:p-8 rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold mb-6 border-b pb-4 text-primary">Contribute an Article</h1>
      <div className="prose prose-lg max-w-none space-y-6">
        <p>
          We are always looking for new voices to share their expertise with the community. If you have an idea for an article, a tutorial, or a case study, we would love to hear from you!
        </p>
        
        <form name="contact" method="POST" data-netlify="true" className="space-y-4">
          <input type="hidden" name="form-name" value="contact" />
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
            <input type="text" name="name" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
            <input type="email" name="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
          </div>
          <div>
            <label htmlFor="idea" className="block text-sm font-medium text-gray-700">Your Article Idea</label>
            <textarea name="idea" id="idea" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"></textarea>
          </div>
          <div>
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity font-semibold">
              Submit Idea
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}