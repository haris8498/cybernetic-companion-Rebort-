import RobotScene from '@/components/RobotScene';
import HeroOverlay from '@/components/HeroOverlay';

const Index = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Robot on the right side */}
      <div className="absolute right-0 top-0 w-1/2 h-full">
        <RobotScene />
      </div>
      {/* Text overlay on the left */}
      <HeroOverlay />
    </div>
  );
};

export default Index;