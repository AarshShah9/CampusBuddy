export default function Feature(){
    return (
        <div style={{width:"100%"}}>
            <div className="mt-8">
                <div style={{backgroundColor:"#F7F9FF", width:"100%"}} className="flex-row flex p-14">
                    <div style={{width:"100%",justifyContent:"center", display:"flex"}}>
                        <img style={{height:"700px"}} src="\Features\EventsFeature.png"/>
                    </div>
                    <div className="mx-4">
                        <h2 className="text-3xl  font-bold tracking-tight text-gray-900 ">Personalized Campus Event at Your Fingertips</h2>
                        <p className="text-2xl leading-8 text-gray-600 pt-4">Discover events happening on and around campus right from the homepage. Our unique algorithm recommends events tailored to your interests.</p>
                    </div>
                </div>
                <div className="flex-row flex p-14">
                    <div className="mx-4">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 ">Looking for</h2>
                        <p className="text-2xl leading-8 text-gray-600 pt-4">Our unique thread system caters to all student needs. Whether you’re looking for an extra player for pickleball or need a carpool, post your request here and get help from your peers!</p>
                    </div>
                    <div style={{width:"100%",justifyContent:"center", display:"flex"}}>
                        <img  style={{height:"700px"}} src="\Features\LookingForFeature.png"/>
                    </div>
                </div>
                <div style={{backgroundColor:"#F7F9FF"}} className="flex-row flex p-14">
                    <div style={{width:"100%",justifyContent:"center", display:"flex"}}>
                        <img  style={{height:"700px"}} src="\Features\ProfilePage.png"/>
                    </div>
                    <div className="mx-4">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 ">Customize your own profile</h2>
                        <p className="text-2xl leading-8 text-gray-600 pt-4">Keep track of all the events that you have attended or upcoming to share with peers, and check events that other users are attending to find events to attend with your peers!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}