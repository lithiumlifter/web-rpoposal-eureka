export const tableCustomStyles = {
    rows: {
      style: {
        backgroundColor: '#d4edda',
        transition: 'background-color 0.3s ease',
      },
      highlightOnHoverStyle: {
        backgroundColor: '#fff3cd',
        cursor: 'pointer',
      },
    },
    headCells: {
      style: {
        backgroundColor: '#28a745',
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: '8px',
      paddingRight: '8px',
      fontSize: '13px',
      },
    },
    cells: {
    style: {
      paddingLeft: '8px',
      paddingRight: '8px',
      fontSize: '12px',
      whiteSpace: 'normal', 
    },
  },
  };
  
  export const rowConditionalStyles = [
    {
      when: () => true,
      style: {
        // backgroundColor: '#d4edda',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: '#fff3cd',
        },
      },
    },
  ];
  