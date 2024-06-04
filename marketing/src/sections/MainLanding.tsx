export default function MainLanding() {
  return (
    <div
      className="relative isolate px-6 pt-6 lg:px-8"
      style={{ backgroundColor: "#F7F9FF" }}
    >
      {/* <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#125fdb] to-[#3483eb] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div> */}
      <div className="mx-auto max-w-2xl pt-32 sm:pt-48 lg:pt-56 pb-10 sm:pb-16 lg:pb-32">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our initial release soon.{" "}
            {/*<a href="#" className="font-semibold text-blue-600">*/}
            {/*  <span className="absolute inset-0" aria-hidden="true" />*/}
            {/*  Read more <span aria-hidden="true">&rarr;</span>*/}
            {/*</a>*/}
          </div>
        </div>
        <div className="text-center">
          <h1 className=" font-bold tracking-tight text-gray-900 sm:text-6xl text-2xl">
            The one-stop shop for all your campus needs
          </h1>
          <p className="mt-6 sm:text-2xl text-sm leading-8 text-gray-600">
            CampusBuddy is a platform that connects students with resources and
            opportunities on campus. We are launching soon and can't wait for
            you to join us.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-4">
            <a
              href="https://apps.apple.com/app/example-app-id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/applebadge.svg"
                alt="Download on the App Store"
                height={40}
                width={134}
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=example.app.id"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/google-play-badge.png"
                alt="Get it on Google Play"
                height={60}
                width={170}
              />
            </a>
          </div>
        </div>
      </div>
      {/* <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#125fdb] to-[#3483eb] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div> */}
    </div>
  );
}
