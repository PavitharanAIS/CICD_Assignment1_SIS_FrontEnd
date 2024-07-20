import Container from "react-bootstrap/Container";
import NavBar from "../components/Navbar";
import React from "react";

function AboutMe () {
    return (
        <div>
            <NavBar/>

            <Container className={"w-75"}>
                <section className={"bg-dark rounded-2 p-3 mt-5"}>
                    <div className={"text-white"}>
                        <p><strong>Name:</strong> Pavitharan Rajaratnam</p>
                        <p><strong>Id:</strong> 20232094</p>
                        <p><strong>Programme:</strong> Post Graduate Diploma in Information Technology (Software Development)</p>
                        <p><strong>Course:</strong> SOFT806 - Continuous Integration and Continuous Deployment</p>
                        <p><strong>Lecturer:</strong> Lei Song</p>
                    </div>
                </section>
            </Container>

        </div>
    )
}

export default AboutMe;