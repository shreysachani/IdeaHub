// src/components/ToastNotification.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../store/toastSlice';

const ToastNotification = () => {
  const dispatch = useDispatch();
  const { isVisible, message, classes } = useSelector((state) => state.toast);

  const triggerToast = () => {
    dispatch(showToast({
      ms: 5000,  // Duration of toast
      message: "This is a toast notification!",
      classes: "bg-emerald-500"  // Toast styles (you can pass classes here)
    }));
  };

  return (
    <div>
      <button onClick={triggerToast}>Show Toast</button>

      {isVisible && (
        <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 ${classes} transition-all`}>
          <div className="text-white py-3 px-6 rounded-lg">{message}</div>
        </div>
      )}
    </div>
  );
};

export default ToastNotification;
