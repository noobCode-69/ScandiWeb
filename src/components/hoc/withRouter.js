import React from 'react'
import { useNavigate, useParams, useLocation } from 'react-router';

const withRouter = (Component) => {
  function Wrapper(props) {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    return (
      <Component
        location={location}
        params={params}
        navigate={navigate}
        {...props}
      />
    );
  }

  return Wrapper;
};

export default withRouter;
