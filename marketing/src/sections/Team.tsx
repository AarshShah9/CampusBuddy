const people = [
  {
    name: "Aarsh Shah",
    role: "Co-Founder / CEO",
    href: "https://www.linkedin.com/in/aarsh-shah-0a84161a9/",
    image:
      "https://media.licdn.com/dms/image/D5603AQFcCfREqL0CKg/profile-displayphoto-shrink_200_200/0/1695400477930?e=1718236800&v=beta&t=AesyXp_JERKHPwV6T3WDsSteLpY01U4d9ka5yMpoabA",
  },
  {
    name: "Stalin D'Cunha",
    role: "COO",
    href: "",
    image: "/MemberPic/Stalin_HeadShot.jpg",
  },
  {
    name: "Yang Liu",
    role: "CFO",
    href: "",
    image: "/MemberPic/Yang.jpg",
  },
  {
    name: "James Robert",
    role: "CTO/SDE",
    href: "",
    image: "/MemberPic/James.jpg",
  },
  {
    name: "JC Pretorius",
    role: "SDE",
    href: "",
    image: "/MemberPic/JC_headshot.jpg",
  },
  {
    name: "Johnny Tran",
    role: "SDE",
    href: "",
    image: "/MemberPic/Johnny_HeadPhoto.jpg",
  },
  {
    name: "Ajaypal Sallh",
    role: "CMO",
    href: "",
    image: "/MemberPic/Ajay.JPG",
  },
  {
    name: "Noman",
    role: "SDE",
    href: "",
    image: "/MemberPic/unknownperson.jpg",
  },
];

export default function Team() {
  return (
    <div style={{ backgroundColor: "#F7F9FF"}} className="flex flex-col sm:px-20 pb-10">
      <div className="text-center p-10 sm:selection:px-52">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-2 ">
          Meet our team
        </h1>
        <p className="text-sm sm:text-2xl leading-8 text-gray-600">
          We’re a diverse group of U of C students united by one mission: to
          make university life vibrant and engaging. Each member brings unique
          skills and perspectives, shaping a platform that resonates with our
          peers. Together, we’re dedicated to building a connected and thriving
          campus community at the University of Calgary.
        </p>
      </div>
      <div className="mx-auto sm:flex-wrap sm:flex-row sm:w-full  flex flex-col mt-4">
        {people.map((item) => (
          <div className="flex flex-col justify-center align-middle text-center mt-2 mb-2 sm:w-1/4 ">
            <img
              className=" mx-auto w-40 h-40 object-cover rounded"
              src={item.image}
            />
            <h3 className=" text-lg font-bold tracking-tight text-gray-900">
              {item.name}
            </h3>
            <p className="text-sm">{item.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
