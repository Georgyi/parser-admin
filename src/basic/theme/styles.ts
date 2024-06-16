import { Styles } from '@chakra-ui/theme-tools';

const paginationStyles = {
  '.pagination': {
    display: 'flex',
    listStyleType: 'none',

    '.page-item': {
      padding: '0.625rem 0',
      backgroundColor: 'white',
      border: '1px solid #E0E0E0FF',

      '.page-link': {
        padding: '0.625rem 1rem',
      },

      _hover: {
        backgroundColor: '#d5eaff',
      },
    },

    '.active': {
      backgroundColor: '#6699ff',
      color: 'white',

      _hover: {
        backgroundColor: '#6699ff',
        color: 'white',
      },
    },

    '.disabled': {
      backgroundColor: '#e1e1e1',

      '.page-item': {
        cursor: 'not-allowed',
      },
      '.page-link': {
        cursor: 'not-allowed',
      },

      _hover: {
        backgroundColor: '#e1e1e1',
      },
    },
  },
};

export const styles: Styles = {
  global: {
    'html, body': {
      height: '100%',
    },
    '#__next, #__supress-nextjs-warnings': {
      height: '100%',
    },
    body: {
      fontFamily: 'body',
      color: 'typography.primary',
      bg: 'background.primary',
      textStyle: 'body_M',
    },
    _focusVisible: {
      outlineWidth: '2px',
      outlineStyle: 'solid',
      outlineColor: 'system.40',
      outlineOffset: '0',
    },
    ...paginationStyles,
  },
};
