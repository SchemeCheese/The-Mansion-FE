import { useNavigate } from 'react-router-dom';

export const useGuest = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/guest');
  };

  return {
    handleCancel,
  };
};
