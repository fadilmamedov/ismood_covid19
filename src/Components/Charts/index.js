import { defaults } from 'react-chartjs-2';

export { AgeBarChart } from './AgeBarChart/AgeBarChart';
export { GenderPieChart } from './GenderPieChart/GenderPieChart';
export { NewCasesPerDayChart } from './NewCasesPerDayChart/NewCasesPerDayChart';

export const SetDefaults = () => {
  console.log('[user]', { defaults });

  defaults.global.defaultFontFamily = 'Rubik';

  defaults.global.tooltips.xPadding = 10;
  defaults.global.tooltips.yPadding = 10;
  defaults.global.tooltips.cornerRadius = 3;

  defaults.bar.scales.xAxes[0].gridLines.color = '#f1f4f7';
  defaults.bar.scales.yAxes[0].gridLines = {
    color: '#f1f4f7',
  };
}