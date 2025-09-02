import React from 'react';
import { Steps } from 'antd';
import { Step } from '../types/employee';

interface WizardProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

const Wizard: React.FC<WizardProps> = ({ steps, currentStep, onStepChange }) => {
  const items = steps.map((step) => ({
    title: step.title,
    icon: <span className="step-icon">{step.icon}</span>,
  }));

  return (
    <div className="wizard-container">
      <Steps
        current={currentStep}
        onChange={onStepChange}
        items={items}
        progressDot
        className="custom-steps"
      />
    </div>
  );
};

export default Wizard;
