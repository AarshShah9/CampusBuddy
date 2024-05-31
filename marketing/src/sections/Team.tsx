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
    image: "/MemberPic/Stalin_HeadShot.jpg"
  },
  {
    name: "Yang Liu",
    role: "CFO",
    href: "",
    image: "/MemberPic/Yang.jpg"
  },
  {
    name: "James Robert",
    role: "CTO/SDE",
    href: "",
    image: "/MemberPic/James.jpg"
  },
  {
    name: "JC Pretorius",
    role: "SDE",
    href: "",
    image: "/MemberPic/JC_headshot.jpg"
  },
  {
    name: "Johnny Tran",
    role: "SDE",
    href: "",
    image: "/MemberPic/Johnny_HeadPhoto.jpg"
  },
  {
    name: "Ajaypal Sallh",
    role: "CMO",
    href: "",
    image: "/MemberPic/Ajay.JPG"
  },
  {
    name: "Noman",
    role: "SDE",
    href: "",
    image: "/MemberPic/Ajay.JPG"
  },
];

export default function Team() {
  return (
    // <div className="bg-white py-24 sm:py-32">
    //   <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
    //     <div className="max-w-2xl">
    //       <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
    //         Meet our leadership
    //       </h2>
    //       <p className="mt-6 text-lg leading-8 text-gray-600">
    //         We started off as a team at Tech Start UCalgary and have been
    //         working together ever since. We are passionate about creating a
    //         platform that will bring students together and help them succeed.
    //       </p>
    //     </div>
    //     <ul
    //       role="list"
    //       className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
    //     >
    //       {people.map((person) => (
    //         <li key={person.name} className={"cursor-pointer"}>
    //           <a
    //             href={person.href}
    //             className="block p-6 rounded-lg bg-white/5 ring-1 ring-white/10"
    //             target={"_blank"}
    //           >
    //             <div className="flex items-center gap-x-6">
    //               <img
    //                 className="h-16 w-16 rounded-full"
    //                 src={person.imageUrl}
    //                 alt=""
    //               />
    //               <div>
    //                 <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
    //                   {person.name}
    //                 </h3>
    //                 <p className="text-sm font-semibold leading-6 text-blue-600">
    //                   {person.role}
    //                 </p>
    //               </div>
    //             </div>
    //           </a>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
    <div className="flex flex-col">
        <div className="text-center p-10 sm:selection:px-52">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-2">Meet our team</h1>
            <p className="text-sm sm:text-2xl leading-8 text-gray-600">We’re a diverse group of U of C students united by one mission: to make university life vibrant and engaging. Each member brings unique skills and perspectives, shaping a platform that resonates with our peers. Together, we’re dedicated to building a connected and thriving campus community at the University of Calgary.</p>
        </div>
        <div className="mx-auto sm:flex-wrap sm:flex-row sm:w-full  flex flex-col mt-4" >
          {people.map((item)=>(
            <div className=" flex flex-col justify-center align-middle text-center mt-2 mb-2 sm:w-1/4 ">
              <img className=" mx-auto w-40 h-40 object-cover rounded" src={item.image}/>
              <h3 className=" text-lg font-bold tracking-tight text-gray-900">{item.name}</h3>
              <p className="text-sm">{item.role}</p>
            </div>
          ))}
        </div>
    </div>
  );
}
