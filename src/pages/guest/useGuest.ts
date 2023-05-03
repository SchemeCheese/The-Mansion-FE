import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { resetReservationCheckoutByRoomNoAction } from 'actions';

export const useGuest = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(resetReservationCheckoutByRoomNoAction());

    window.localStorage.removeItem('checkout_room_no');
    navigate('/guest');
  };

  return {
    handleCancel,
  };
};
