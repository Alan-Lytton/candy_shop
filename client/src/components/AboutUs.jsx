import React from 'react'
import { Link } from 'react-router-dom'
import '../css/AboutUs.css'
import Navbar from './Navbar'
import Footer from './Footer'
import '../css/AboutUs.css'
// <Link to={"/"}> <i class="fa-solid fa-arrow-left"></i> Home</Link>
const AboutUs = () => {
    return (
        <div>
            <div class="roadmap">
            <Link className='LinkToBack' to={"/"}> <i class="fa-solid fa-arrow-left"></i> Home</Link>

                <h2 className='main-title'>Meet the team</h2>
                <div class="_w-cloneable">
                    <div class="c-cards-list">
                        <div class="_w-cards-list">
                            <div class="c-card _1">
                                <div class="_w-card">
                                    <div class="c-card-title">
                                        <h2 class="card-title">Front-end</h2>
                                    </div>
                                    <h3>MEET JANG</h3>
                                    <div class="c-card-details">
                                        <p class="card-details">

                                            I'm Jang, a computer science student and full stack developer. You can explore my projects on my<a className='link_tag' target="_blank" href="https://www.singhcodes.com"> website </a>, connect with me on <a className='link_tag' target="_blank" href="https://www.linkedin.com/in/jang-singh-7b1484250/">LinkedIn </a>, or check out my code on <a className='link_tag' target="_blank" href="https://github.com/Jsingh651">Github </a>. In my free time, I love indulging in my favorite candy - Almond Joy.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="c-card _2">
                                <div class="_w-card">
                                    <div class="c-card-title">
                                        <h2 class="card-title">Front-end</h2>
                                    </div>
                                    <h3>MEET CHRIS M</h3>
                                    <div class="c-card-details">
                                    I am Chris, a full stack developer and coding bootcamp student who loves <span className='chrisSpecial'> </span>. I am passionate about web development and enjoys exploring the latest trends in the industry to keep up-to-date you cn connect with me on <a className='link_tag' target="_blank" href="https://www.linkedin.com/in/meehan-chris/"> LinkedIn </a>, and checkout my code on <a className='link_tag' target="_blank" href=" http://github.com/C-Meehan"> Github. </a>
                                        <p class="card-details"></p>
                                    </div>
                                </div>
                            </div>
                            <div class="c-card _3">
                                <div class="_w-card">
                                    <div class="c-card-title">
                                        <h2 class="card-title">BACK-END</h2>
                                    </div>
                                    <h3>MEET ALAN</h3>
                                    <div class="_2rem-divider"></div>
                                    <div class="c-card-details">
                                        <p class="card-details"> I am Alan a software developer and computer enthusiast with a passion for building my own custom computers. I am always on the lookout for the latest tech gadgets and In my free time, I enjoy indulging in my favorite candy, York Peppermint Patties, and contributing to open source projects on<a className='link_tag' target="_blank" href=" https://github.com/Alan-Lytton">Github.</a><br />
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="c-card _4">
                                <div class="_w-card">
                                    <div class="c-card-title">
                                        <h2 class="card-title">BACK-END</h2>
                                    </div>
                                    <div class="c-card-subtitle">
                                        <h3>MEET CHRIS B</h3>
                                        <div class="_2rem-divider"></div>
                                    </div>
                                    <div class="c-card-details">
                                        <p class="card-details"> I am Chris, a software engineer who has a passion for coding and a love for bikes. With a keen eye for detail and a love for problem-solving, I enjoy developing clean, efficient code that delivers results. You can checkout my project on <a className='link_tag' target="_blank" href=" https://github.com/cgbridgewater">Github.</a> and connect with me on <a className='link_tag' target="_blank" href=" www.linkedin.com/in/chris-bridgewater">LinkedIn.</a>My favorite candy is Swedish Fish.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="c-card _5">
                                <div class="_w-card">
                                    <div class="c-card-title">
                                        <h2 class="card-title">DOING IT ALL</h2>
                                    </div>
                                    <div class="c-card-subtitle">
                                        <h3>MEET PABLO</h3>
                                        <div class="_2rem-divider"></div>
                                    </div>
                                    <div class="c-card-details">
                                        <p class="card-details">My name is Pablo, software engineer student from Chicago, IL. 
                                        My enthusiasm for learning lead me to Coding Dojo and I truly enjoyed going through the bootcamp . KitKats are my favorite candy. One time I ate a whole bag of KitKat minis. Lets connect on <a className='link_tag' target="_blank" href="https://www.linkedin.com/in/jose-rodriguez-3968a6134/">LinkedIn.</a> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutUs
