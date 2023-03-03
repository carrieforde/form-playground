import * as React from "react";
import Button from "../button/button";
import s from "./steps.module.css";

type StepsProps = {
  currentStep: number;
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
};

const StepsContext = React.createContext<StepsProps & { totalSteps: number }>({
  currentStep: 0,
  setCurrentStep: undefined,
  totalSteps: 0
});

const useSteps = () => {
  const { currentStep, setCurrentStep } = React.useContext(StepsContext);

  if (!setCurrentStep) {
    throw new Error("`setCurrentStep` is required to use Steps!");
  }

  return { currentStep, setCurrentStep };
};

export const Steps: React.FC<React.PropsWithChildren<StepsProps>> = ({
  children,
  currentStep,
  setCurrentStep
}) => {
  const totalSteps = React.Children.count(children);
  return (
    <StepsContext.Provider value={{ currentStep, setCurrentStep, totalSteps }}>
      <ol className={s.steps}>
        {/* https://mxstbr.blog/2017/02/react-children-deepdive/#manipulating-children */}
        {React.Children.map(children, (child, i) => (
          <li>
            {child.props.title && <h3>{child.props.title}</h3>}
            {React.cloneElement(child, {
              isCurrent: currentStep === i
            })}
          </li>
        ))}
      </ol>
    </StepsContext.Provider>
  );
};

type StepProps = {
  isCurrent?: boolean;
  title?: string;
};

export const Step: React.FC<React.PropsWithChildren<StepProps>> = ({
  children,
  isCurrent,
  title
}) => <div hidden={!isCurrent}>{children}</div>;

export const StepNavigation: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const { currentStep, setCurrentStep } = useSteps();
  const setNextStep = () => setCurrentStep((prevValue) => prevValue + 1);
  const setPreviousStep = () => setCurrentStep((prevValue) => prevValue - 1);

  return (
    <div className={s.navigation}>
      {!children && (
        <Button
          type="button"
          onClick={setNextStep}
          variant="filled"
          color="primary"
        >
          Next
        </Button>
      )}

      {children}

      {currentStep > 0 && (
        <Button type="button" onClick={setPreviousStep}>
          Go Back
        </Button>
      )}
    </div>
  );
};

export default Steps;
