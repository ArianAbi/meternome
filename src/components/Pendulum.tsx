import { motion } from 'framer-motion';
import { useState, type ReactNode, useEffect } from 'react';

interface Pendulum {
  tempo: number;
  playing: boolean;
  pendulumWeightPosition: number;
  tickCount: number;
}

export function Pendulum({
  tempo,
  playing,
  pendulumWeightPosition,
  tickCount,
}: Pendulum) {
  const [forward, setForward] = useState(true);

  useEffect(() => {
    setForward((prev) => !prev);
  }, [tickCount]);

  return (
    <>
      {/* SVG filter definition */}
      {/* <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="motionBlur" x="0" y="0" width="200%" height="100%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="5 0"
              result="blurred"
            />

            <feOffset in="blurred" dx="5" dy="0" result="offsetBlurred" />

            <feComposite
              in="SourceGraphic"
              in2="offsetBlurred"
              operator="over"
            />
          </filter>
        </defs>
      </svg> */}

      <motion.div
        key={tempo}
        className="absolute bottom-0 left-2/4 mt-auto h-[350px] w-2 origin-bottom -translate-x-2/4 translate-y-4 bg-stone-400"
        style={{ filter: 'url(#motionBlur)' }}
        initial={{ rotate: 0 }}
        animate={{ rotate: playing ? [-20, 20] : 0 }}
        transition={{
          repeat: playing ? Infinity : 0,
          duration: 60 / tempo,
          repeatType: 'mirror',
          ease: 'easeIn',
        }}
      >
        {/* pendulum weight */}
        <img
          className={`absolute left-2/4 top-[${pendulumWeightPosition}%] w-[100px] max-w-none -translate-x-2/4 px-6`}
          style={{
            top: `${pendulumWeightPosition}%`,
          }}
          src="/pendulum-weight.svg"
          alt="pendulum-weight"
        />
      </motion.div>
      {/* metronome background */}
      <img
        className="absolute bottom-0 left-2/4 -z-10 max-w-none -translate-x-2/4"
        src="metronome-background.svg"
        alt="metronome background"
      />
    </>
  );
}

export function PendulumContainer({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full origin-bottom scale-95 sm:scale-100 lg:scale-125">
      {children}
    </div>
  );
}
