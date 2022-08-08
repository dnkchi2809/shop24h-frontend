import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor = "#FFFFFF"
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
  const { breadcrumb1, breadcrumb2, breadcrumb3 } = useSelector((reduxData) => reduxData.reducers);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb" className='mb-2'>
        <StyledBreadcrumb label="Home" icon={<HomeIcon fontSize="small" />} onClick={() => navigate("/")} />
        {
          breadcrumb1 !== null
            ?
            <StyledBreadcrumb label={breadcrumb1} onClick={() => navigate("/" + breadcrumb1)} />
            :
            null
        }
        {
          breadcrumb2 !== null
            ?
            <StyledBreadcrumb
              label={breadcrumb2}
              onClick={() => {
                navigate("/" + breadcrumb1);
                dispatch({
                  type: "SET_BREADCRUMB",
                  payload: {
                    breadcrumb1: breadcrumb1,
                    breadcrumb2: null,
                    breadcrumb3: null
                  }
                })
              }}
            />
            :
            null
        }
        {
          breadcrumb3 !== null
            ?
            <StyledBreadcrumb
              label={breadcrumb3}
              onClick={() => {
                navigate("/" + breadcrumb1);
                dispatch({
                  type: "SET_BREADCRUMB",
                  payload: {
                    breadcrumb1: breadcrumb1,
                    breadcrumb2: null,
                    breadcrumb3: null
                  }
                })
              }
              }
            />
            :
            null
        }

      </Breadcrumbs>
    </div>
  );
}

export default BreadcrumbComponent;
