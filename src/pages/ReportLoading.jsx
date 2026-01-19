import { useEffect, useState } from "react";
import { ReportProcessingScreen } from "../components/common/ProcessingStates";

export function ReportLoading({ onLoadingComplete, estimatedTime = 45000 } = {}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSlowSource, setIsSlowSource] = useState(false);

  useEffect(() => {
    const stepDuration = estimatedTime / 5;
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 5) {
          clearInterval(stepInterval);
          if (onLoadingComplete) {
            setTimeout(onLoadingComplete, 500);
          }
          return 5;
        }
        return prev + 1;
      });
    }, stepDuration);

    const slowSourceTimeout = setTimeout(() => {
      setIsSlowSource(true);
    }, 30000);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(slowSourceTimeout);
    };
  }, [estimatedTime, onLoadingComplete]);

  const estimatedTimeText = estimatedTime < 60000 ? "under a minute" : "1-2 minutes";

  return (
    <ReportProcessingScreen
      currentStep={currentStep}
      isSlowSource={isSlowSource}
      estimatedTime={estimatedTimeText}
    />
  );
}
