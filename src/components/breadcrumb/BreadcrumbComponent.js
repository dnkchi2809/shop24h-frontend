import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom"

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});


function BreadcrumbComponent() {
  const navigate = useNavigate();

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb" className='mb-2'>
        <StyledBreadcrumb label="Home" icon={<HomeIcon fontSize="small" />} onClick={() => navigate("/")} />
        <StyledBreadcrumb label="Products" deleteIcon={<ExpandMoreIcon />} onClick={() => navigate("/products")}/>
      </Breadcrumbs>
    </div>
  );
}

export default BreadcrumbComponent;