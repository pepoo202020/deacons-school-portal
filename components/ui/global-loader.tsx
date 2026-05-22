import React from 'react';
import {
  BarLoader,
  BeatLoader,
  BounceLoader,
  CircleLoader,
  ClimbingBoxLoader,
  ClockLoader,
  DotLoader,
  FadeLoader,
  GridLoader,
  HashLoader,
  MoonLoader,
  PacmanLoader,
  PropagateLoader,
  PulseLoader,
  PuffLoader,
  RingLoader,
  RiseLoader,
  RotateLoader,
  ScaleLoader,
  SkewLoader,
  SquareLoader,
  SyncLoader,
} from 'react-spinners';

export type SpinnerType =
  | 'bar' | 'beat' | 'bounce' | 'circle' | 'climbingBox'
  | 'clip' | 'clock' | 'dot' | 'fade' | 'grid' | 'hash'
  | 'moon' | 'pacman' | 'propagate' | 'pulse' | 'puff'
  | 'ring' | 'rise' | 'rotate' | 'scale' | 'skew' | 'square' | 'sync';

interface GlobalLoaderProps {
  isLoading?: boolean;
  message?: string;
  type?: SpinnerType;
  color?: string;
  size?: number; 
  fullScreen?: boolean;
}

export default function GlobalLoader({
  isLoading = true,
  message,
  type = 'clip',
  color = '#1a52b8', 
  size,
  fullScreen = false,
}: GlobalLoaderProps) {
  
  if (!isLoading) return null;

  const renderSpinner = () => {
    const commonProps = { color };
    

    const sizeProps = size ? { size } : {};

    switch (type) {
      case 'bar': return <BarLoader {...commonProps} />;
      case 'beat': return <BeatLoader {...commonProps} {...sizeProps} />;
      case 'bounce': return <BounceLoader {...commonProps} {...sizeProps} />;
      case 'circle': return <CircleLoader {...commonProps} {...sizeProps} />;
      case 'climbingBox': return <ClimbingBoxLoader {...commonProps} {...sizeProps} />;
      case 'clock': return <ClockLoader {...commonProps} {...sizeProps} />;
      case 'dot': return <DotLoader {...commonProps} {...sizeProps} />;
      case 'fade': return <FadeLoader {...commonProps} />;
      case 'grid': return <GridLoader {...commonProps} {...sizeProps} />;
      case 'hash': return <HashLoader {...commonProps} {...sizeProps} />;
      case 'moon': return <MoonLoader {...commonProps} {...sizeProps} />;
      case 'pacman': return <PacmanLoader {...commonProps} {...sizeProps} />;
      case 'propagate': return <PropagateLoader {...commonProps} {...sizeProps} />;
      case 'pulse': return <PulseLoader {...commonProps} {...sizeProps} />;
      case 'puff': return <PuffLoader {...commonProps} {...sizeProps} />;
      case 'ring': return <RingLoader {...commonProps} {...sizeProps} />;
      case 'rise': return <RiseLoader {...commonProps} {...sizeProps} />;
      case 'rotate': return <RotateLoader {...commonProps} {...sizeProps} />;
      case 'scale': return <ScaleLoader {...commonProps} />; 
      case 'skew': return <SkewLoader {...commonProps} {...sizeProps} />;
      case 'square': return <SquareLoader {...commonProps} {...sizeProps} />;
      case 'sync': return <SyncLoader {...commonProps} {...sizeProps} />;
      case 'clip':
      default:
        return (
          <div
            className="animate-spin rounded-full border-2 border-t-transparent"
            style={{
              borderColor: `${color} transparent ${color} ${color}`,
              width: size || 28,
              height: size || 28,
            }}
          />
        );
    }
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm'
    : 'flex flex-col items-center justify-center p-4';

  return (
    <div className={containerClasses}>
      {renderSpinner()}
      
      {message && (
        <p className="mt-6 text-sm font-medium text-muted-foreground animate-pulse text-center">
          {message}
        </p>
      )}
    </div>
  );
}