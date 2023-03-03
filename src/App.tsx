import * as React from "react";

import Button from "./components/button/button";
import Form from "./components/form/form";
import FormControl from "./components/form-control/form-control";
import Input from "./components/input/input";
import Select from "./components/select/select";

import useForm from "./hooks/use-form/use-form";
import Steps, { Step, StepNavigation } from "./components/steps/steps";

import s from "./styles/utilities.module.css";

interface UserFormFields {
  firstName: string;
  lastName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: {
    type: "home" | "work" | "mobile" | "";
    value: string;
  };
}

const initialValues: UserFormFields = {
  firstName: "",
  lastName: "",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  state: "",
  zipCode: "",
  phoneNumber: {
    type: "",
    value: ""
  }
};

const useUserForm = () =>
  useForm<UserFormFields>({
    initialValues,
    onSubmit: async (values) => {
      await new Promise((resolve, reject) => setTimeout(resolve, 1000));

      console.log(values);
    },
    validators: {
      firstName: (value: string) => !!value === false,
      state: (value: string) => !!value === false
    }
  });

export default function App() {
  const [currentStep, setCurrentStep] = React.useState(0);

  const { fields, ...form } = useUserForm();

  React.useEffect(() => {
    if (fields.zipCode.value === "94401") {
      fields.city.setValue("San Mateo");
    }
  }, [fields.zipCode.value, fields.city]);

  return (
    <Form onSubmit={form.onSubmit} onReset={form.onReset}>
      {form.formError && <p>{form.formError}</p>}
      <Steps currentStep={currentStep} setCurrentStep={setCurrentStep}>
        <Step title="Your name">
          <div className={s.flexWrap}>
            <FormControl {...fields.firstName} label="First name" inline>
              <Input />
            </FormControl>

            <FormControl {...fields.lastName} label="Last name" inline>
              <Input />
            </FormControl>
          </div>
          <StepNavigation />
        </Step>

        <Step title="Your Address">
          <div className={s.flexWrap}>
            <FormControl {...fields.streetAddress1} label="Street Address 1">
              <Input />
            </FormControl>

            <FormControl
              {...fields.streetAddress2}
              label="Street Address 2"
              optional
            >
              <Input />
            </FormControl>

            <FormControl {...fields.city} label="City" inline>
              <Input />
            </FormControl>

            <FormControl {...fields.state} label="State" inline>
              <Select {...fields.state}>
                <option value="CA">California</option>
                <option value="NY">New York</option>
              </Select>
            </FormControl>

            <FormControl {...fields.zipCode} label="Zip Code" inline>
              <Input />
            </FormControl>
          </div>
          <StepNavigation>
            <Button type="submit" variant="filled" color="primary">
              {form.isSubmitting ? "Loading..." : "Submit"}
            </Button>
            {/* <Button type="reset">Cancel</Button> */}
          </StepNavigation>
        </Step>
      </Steps>
    </Form>
  );
}
