const VolunteersPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Join Our Volunteer Team</h1>
      
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Our volunteers are the heart of Save Cute Paws. Whether you have a few hours or a few days, 
          your time and skills can make a real difference in the lives of animals in need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {/* Opportunity 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Animal Care</h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li>• Feeding and water duties</li>
            <li>• Cleaning and maintaining spaces</li>
            <li>• Exercise and socialization</li>
            <li>• Basic grooming</li>
          </ul>
        </div>

        {/* Opportunity 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Event Support</h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li>• Adoption events</li>
            <li>• Fundraising activities</li>
            <li>• Community outreach</li>
            <li>• Educational programs</li>
          </ul>
        </div>

        {/* Opportunity 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Skills-Based</h3>
          <ul className="space-y-3 text-gray-600 dark:text-gray-300">
            <li>• Photography/Videography</li>
            <li>• Social media management</li>
            <li>• Website maintenance</li>
            <li>• Grant writing</li>
          </ul>
        </div>
      </div>

      {/* Application Section */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold mb-6 text-center">Ready to Help?</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="interests">
              Areas of Interest
            </label>
            <select
              id="interests"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            >
              <option value="">Select an area</option>
              <option value="animal-care">Animal Care</option>
              <option value="event-support">Event Support</option>
              <option value="skills-based">Skills-Based Support</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="message">
              Why do you want to volunteer?
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default VolunteersPage;
