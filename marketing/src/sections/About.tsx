import { SparklesCore } from "../components/sparkles";

export default function About() {
    return (
      <div className="flex flex-col items-center px-6 py-10 mx-auto max-w-7xl">
        <div className="max-w-4xl text-center">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            About
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
            <div className="w-full p-4 pb-16">
              <p className="text-lg leading-8 text-gray-600">
                This vision led to the creation of.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">Campus Buddy</h2>
          <div className="relative w-full h-40">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full blur-sm" />
            <div className="absolute inset-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            <div className="absolute inset-x-1/4 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/2 blur-sm" />
            <div className="absolute top-0 w-1/2 h-px inset-x-1/4 bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
  
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#3A86FF"
            />
  
            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_50%,white)]"></div>
          </div>
        </div>
      </div>
    );
  }
  