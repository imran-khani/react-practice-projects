import React, { useState, useEffect, useCallback } from 'react';

const NUM_ASTEROIDS = 20;

interface Asteroid {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

const ErrorPage = () => {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const createAsteroids = useCallback(() => {
    return Array.from({ length: NUM_ASTEROIDS }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.05 + 0.02,
    }));
  }, []);

  useEffect(() => {
    setAsteroids(createAsteroids());
    const interval = setInterval(() => {
      setAsteroids(prev => prev.map(asteroid => ({
        ...asteroid,
        x: (asteroid.x + asteroid.speed) % 100,
        y: (asteroid.y + asteroid.speed) % 100,
      })));
    }, 50);
    return () => clearInterval(interval);
  }, [createAsteroids]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900 via-black to-black"></div>
      {asteroids.map(asteroid => (
        <div
          key={asteroid.id}
          className="absolute rounded-full bg-gray-300"
          style={{
            left: `${asteroid.x}%`,
            top: `${asteroid.y}%`,
            width: `${asteroid.size}vmin`,
            height: `${asteroid.size}vmin`,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ))}
      <div 
        className="absolute w-20 h-20 rounded-full bg-blue-500 shadow-[0_0_20px_10px_rgba(59,130,246,0.5)]"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-9xl font-bold mb-4 animate-pulse">404</h1>
        <p className="text-2xl mb-8">Lost in the asteroid belt</p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 animate-bounce"
        >
          Navigate Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;