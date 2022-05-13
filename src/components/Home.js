import React from 'react'
import Navbaar from './Navbaar';
import box_img from '../images/box_img.png'

const Home = () => {

   return (
      <>
         <Navbaar />
         <div class="head_top">
            <section className="banner_main">
               <div className="container-fluid">
                  <div className="row d_flex">
                     <div className="col-md-6">
                        <div className="text-bg">
                           <h1>Full Stack Web Development</h1>
                           <p>The goal of the Full Stack Web Developer Nanodegree program is to equip learners with the unique skills they need to build database-backed APIs and web applications. A graduate of this program will be able to design and build databases for software applications, create and deploy database-backed web APIs, and secure and manage user authentication and access control for an application backend</p>
                        </div>
                     </div>
                     <div className="col-md-6">
                        <div className="text-img">
                           <figure><img src={box_img} alt="#" /></figure>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </>
   )
}

export default Home