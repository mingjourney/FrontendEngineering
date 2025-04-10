import { useEffect, useRef, useState } from "react"
interface Light  {
  color: string,
  duration: number,
  twinkleDuration: number,
}

const TraficLights = ({ lights } : { lights: Light[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTempClose, setIsTempClose] = useState(false);
  const twinklingRef = useRef<ReturnType<typeof setInterval>| null>(null);
  useEffect(() => { 
    const { duration, twinkleDuration } = lights[currentIndex];
    const twinkleTimer = setTimeout(() => {
      twinklingRef.current = setInterval(() => setIsTempClose(isTempClose => !isTempClose), 500);
      console.log('twinklingRef.current1', twinklingRef.current);
    }, duration - twinkleDuration);
    const changeLightTimer = setTimeout(() => {
      clearTimeout(twinkleTimer);
      setIsTempClose(false);
      setCurrentIndex((currentIndex) => (currentIndex + 1) % 3);
    }, duration);
    return () => {
      clearTimeout(twinkleTimer);
      clearTimeout(changeLightTimer);
      if (twinklingRef.current) {
        clearInterval(twinklingRef.current);
      }
    }
  }, [currentIndex, lights]);
  return (
    <>
      { lights.map((light, index) => (
        <div key={index} style={{ opacity: (currentIndex === index && !isTempClose) ? '100%' : '0' }}>
          <span>{ light.color }</span>
        </div>
      )) }
    </>
  )
}

export default TraficLights;