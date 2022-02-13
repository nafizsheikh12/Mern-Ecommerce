import React from 'react'
import "./Footer.css"


const Footer = () => {
    return (
        <footer>
          <div className="row"> 
            <div className="leftfooter col-lg-3 ">
               <h4>Download our app</h4>
            </div>
             <div className="col-lg-6 middlefooter">
                 <h2>ECOMMERCE</h2>
             </div>
            <div className="rightfooter col-lg-3">
                <h3>Follow Use</h3><br/>
                <h2>Instagram</h2>
            </div>
           </div> 
        </footer>
    )
}

export default Footer
