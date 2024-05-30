export default function Feature(){
    return (
        <div>
            <div className="mt-8">
                <div style={{backgroundColor:"#F7F9FF", width:"100%"}} className="flex-col lg:flex-row flex p-14">
                    <div style={{width:"100%",justifyContent:"center", display:"flex"}}>
                        <img className="sm:h-6/6 "  src="\Features\EventsFeature.png"/>
                    </div>
                    <div className="lg:mx-4 lg:w-11/12">
                        <h2 className="lg:text-3xl text-2xl pt-2  font-bold tracking-tight text-gray-900  ">Personalized Campus Event at Your Fingertips</h2>
                        <p className="lg:text-2xl text-sm  leading-8 text-gray-600 pt-4 ">Discover events happening on and around campus right from the homepage. Our unique algorithm recommends events tailored to your interests.</p>
                    </div>
                </div>

                <div style={{width:"100%"}} className=" flex-col lg:flex-row flex p-14">
                    <div className="mx-4 lg:w-11/12 ">
                        <h2  className="lg:text-3xl text-2xl  font-bold tracking-tight text-gray-900">Looking For Something? </h2>
                        <p className="lg:text-2xl text-sm leading-8 pb-2 text-gray-600 pt-4 ">Are you itching to find a partner for a quick pick-up game or perhaps share your latest meme? Our “Looking For” feature is here to connect students seeking anything they need. Whether it's finding a study buddy, a ride share, or someone who loves the same hobbies, post your request and get connected with your peers instantly.</p>
                    </div>
                    <div style={{width:"100%",justifyContent:"center", display:"flex"}}>
                        <img  className="lg:h-6/6" src="\Features\LookingForFeature.png"/>
                    </div>
                </div>
                <div style={{backgroundColor:"#F7F9FF"}} className=" flex-col lg:flex-row flex p-14">
                    <div style={{width:"100%",justifyContent:"center", display:"flex"}}>
                        <img  className="lg: h-6/6" src="\Features\ProfilePage.png"/>
                    </div>
                    <div className="mx-4 w-11/12">
                        <h2  className="lg:text-3xl text-2xl pt-2  font-bold tracking-tight text-gray-900   ">Customize your own profile</h2>
                        <p className="lg:text-2xl text-sm leading-8 text-gray-600 pt-4 ">Keep track of all the events that you have attended or upcoming to share with peers, and check events that other users are attending to find events to attend with your peers!</p>
                    </div>
                </div>
                <div className=" flex-col lg:flex-row flex p-14">
                    <div className="mx-4 w-11/12 ">
                        <h2  className="lg:text-3xl text-2xl  font-bold tracking-tight text-gray-900   ">Unlock Insights with Our Analytics</h2>
                        <p className="lg:text-2xl text-sm pb-2  leading-8 text-gray-600 pt-4 ">Our app's analytics feature provides comprehensive statistics and tailored posts, empowering organizations to connect with their target market more effectively. Gain valuable insights, track engagement, and optimize your outreach strategies with our user-friendly reporting tools.</p>
                    </div>
                    <div style={{width:"100%",justifyContent:"center", display:"flex"}}>
                        <img className="lg:h-6/6 " src="\Features\analytic.png"/>
                    </div>
                </div>
            </div>
        </div>
    )
}