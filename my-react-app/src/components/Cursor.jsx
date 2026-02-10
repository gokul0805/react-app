import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Cursor.css';

const Cursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    // Function to generate a star particle
    const createStar = (x, y) => {
        const star = document.createElement("div");
        star.classList.add("star-particle");

        // Random offset for trail width
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;

        star.style.left = `${x + offsetX}px`;
        star.style.top = `${y + offsetY}px`;

        // Random size
        const size = Math.random() * 6 + 2; // 2-8px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Random rotation
        star.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 800);
    };

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });

            // Create stars on move (no interpolation for scattered stardust look)
            // Generate a few per event for density
            for (let i = 0; i < 2; i++) {
                createStar(e.clientX, e.clientY);
            }
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    return (
        <>
            <motion.div
                className="cursor-dot"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                }}
                transition={{
                    duration: 0
                }}
            />
        </>
    );
};

export default Cursor;
