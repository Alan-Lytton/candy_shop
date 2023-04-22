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
                                    <h3>MEET CHRIS</h3>
                                    <div class="c-card-details">
                                        I'm Chris, a bootcamp student student and full stack developer. You can explore my projects on my<a className='link_tag' target="_blank" href="https://www.singhcodes.com"> website </a>, connect with me on <a className='link_tag' target="_blank" href="https://www.linkedin.com/in/jang-singh-7b1484250/">LinkedIn </a>, or check out my code on <a className='link_tag' target="_blank" href="https://github.com/Jsingh651">Github </a>. In my free time, I love indulging in my favorite candy - Almond Joy.
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
                                        <p class="card-details">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem in
                                            quaerat cumque soluta tenetur? Doloribus, pariatur delectus! Neque, iste
                                            consequatur? Placeat dolor distinctio inventore, provident dignissimos iusto
                                            sit cumque cum.<br />
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
                                        <p class="card-details"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate consequatur qui, ut corrupti architecto quisquam modi, adipisci, delectus provident odit illo iure at cum. Commodi itaque illo adipisci impedit nihil!</p>
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
                                        <p class="card-details">Lorem ipsum dolor, sit amet consectetur adipisicing
                                            elit. Quis temporibus error nostrum voluptatum omnis eaque qui voluptatem
                                            minus illo, voluptate sequi laudantium commodi aperiam reiciendis magnam,
                                            maiores nulla corrupti nisi!</p>
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
