import TraficLights from './components/traficLights';
interface Light  {
  color: string,
  duration: number,
  twinkleDuration: number,
}
const LIGHTS: Light[] = [
  { color: 'green', duration: 10000, twinkleDuration: 5000 },
  { color: 'yellow', duration: 6000, twinkleDuration: 3000 },
  { color: 'red', duration: 8000, twinkleDuration: 0 },
];

function App() {
  return (
    <div className="App">
      <TraficLights lights={LIGHTS} />
    </div>
  );
}

export default App;
