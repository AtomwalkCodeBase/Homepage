import { CrmManualStep } from '../data/crmManualData';
import { HrmManualStep } from '../data/hrmManualData';
import { ProjectManualStep } from '../data/projectManualData';
import { SalesOrderManualStep } from '../data/salesOrderManualData';
import { EmployeeHrmsManualStep } from '../data/employeeHrmsManualData';

export const manualStepsData = () => {
  const allSteps = [
    ...CrmManualStep,
    ...HrmManualStep,
    ...ProjectManualStep,
    ...SalesOrderManualStep,
    ...EmployeeHrmsManualStep
  ];
  const mergedSteps = {};

  allSteps.forEach(section => {
    Object.entries(section).forEach(([key, value]) => {
      mergedSteps[key] = value;
    });
  });

  return mergedSteps;
};
