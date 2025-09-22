import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Timeline from './components/Timeline'; // Replaced About with Timeline
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StarfieldBackground from './components/StarfieldBackground';
import './App.css';

export default function App() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        const sections = document.querySelectorAll('.section');
        sections.forEach(section => observer.observe(section));

        return () => sections.forEach(section => observer.unobserve(section));
    }, []);

    return (
        <div>
            <StarfieldBackground />
            <Header />
            <main>
                <Hero />
                <div className="container">
                    <Timeline /> {/* This is the new component */}
                    <Skills />
                    <Projects />
                    <Contact />
                </div>
            </main>
            <Footer />
        </div>
    );
}