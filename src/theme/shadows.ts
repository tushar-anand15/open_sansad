import { alpha } from '@mui/material/styles';
import { Shadows } from '@mui/material/styles/shadows';

// Custom shadows for OpenSansad
export default function shadows(mode: 'light' | 'dark'): Shadows {
  const transparent = mode === 'light' ? alpha('#2E2E2E', 0.24) : alpha('#000000', 0.24);

  return [
    'none',
    `0 1px 2px 0 ${transparent}`,
    `0 1px 3px 0 ${transparent}`,
    `0 2px 4px -1px ${transparent}`,
    `0 2px 8px 0 ${alpha('#2E2E2E', 0.08)}`,
    `0 3px 5px -1px ${transparent}`,
    `0 3px 14px 2px ${transparent}`,
    `0 4px 5px -2px ${transparent}`,
    `0 5px 5px -3px ${transparent}`,
    `0 5px 6px -3px ${transparent}`,
    `0 6px 10px -1px ${transparent}`,
    `0 6px 30px 5px ${transparent}`,
    `0 7px 10px -5px ${transparent}`,
    `0 8px 10px 1px ${transparent}`,
    `0 9px 12px 1px ${transparent}`,
    `0 10px 14px 1px ${transparent}`,
    `0 10px 15px -3px ${transparent}`,
    `0 11px 15px 1px ${transparent}`,
    `0 12px 17px 2px ${transparent}`,
    `0 13px 19px 2px ${transparent}`,
    `0 14px 21px 2px ${transparent}`,
    `0 15px 22px 2px ${transparent}`,
    `0 16px 24px 2px ${transparent}`,
    `0 17px 26px 2px ${transparent}`,
    `0 24px 38px 3px ${transparent}`,
  ];
}
