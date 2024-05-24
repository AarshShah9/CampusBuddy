export default function About() {
    return (
      <div className="flex justify-center px-6 py-10 mx-auto max-w-7xl">
        <div className="max-w-4xl text-center">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About Campus Buddy
          </h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full p-4 md:w-1/2 md:pr-8">
              <p className="text-lg leading-8 text-gray-600">
                The team united around a shared frustration: constantly feeling out of the loop about campus events and activities.
                We often wanted to participate but missed opportunities because we learned about them too late.
              </p>
            </div>
            <div className="w-full p-4 md:w-1/2 md:pl-8">
              <p className="text-lg leading-8 text-gray-600">
                Motivated by this challenge, we aimed to create a solution that keeps students informed and connected.
                Our goal was to develop a platform where students could easily find out what’s happening on campus and stay engaged with their community.
              </p>
            </div>
            <div className="w-full p-4">
              <p className="text-lg leading-8 text-gray-600">
                This vision led to the creation of Campus Buddy.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  