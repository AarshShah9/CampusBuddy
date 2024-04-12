const people = [
  {
    name: "Aarsh Shah",
    role: "Co-Founder / CEO",
    href: "https://www.linkedin.com/in/aarsh-shah-0a84161a9/",
    imageUrl:
      "https://media.licdn.com/dms/image/D5603AQFcCfREqL0CKg/profile-displayphoto-shrink_200_200/0/1695400477930?e=1718236800&v=beta&t=AesyXp_JERKHPwV6T3WDsSteLpY01U4d9ka5yMpoabA",
  },
];

export default function Team() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We started off as a team at Tech Start UCalgary and have been
            working together ever since. We are passionate about creating a
            platform that will bring students together and help them succeed.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name} className={"cursor-pointer"}>
              <a
                href={person.href}
                className="block p-6 rounded-lg bg-white/5 ring-1 ring-white/10"
                target={"_blank"}
              >
                <div className="flex items-center gap-x-6">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={person.imageUrl}
                    alt=""
                  />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-blue-600">
                      {person.role}
                    </p>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
